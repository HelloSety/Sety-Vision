"use client";

import { Suspense, useEffect, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveEvents, ContactShadows, Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import CarModel, { type CarRefs, type CarConfig } from "./CarModel";
import CameraRig from "./CameraRig";

export type Bounds = { center: THREE.Vector3; size: THREE.Vector3 };

// Abaixo de 768px trata como mobile: DPR menor, sem multisampling extra,
// Environment mais barato — o maior ganho de leveza sem perder qualidade
// visível (celular não tem tela grande o bastante pra notar a diferença).
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

function useMousePointer() {
  const mouseRef = useRef({ x: 0, y: 0 });
  useFrame(({ pointer }) => {
    mouseRef.current.x += (pointer.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (pointer.y - mouseRef.current.y) * 0.05;
  });
  return mouseRef;
}

// Estúdio branco/neutro — bate com a fotografia real de configurador
// (Porsche.com): piso e cúpula quase brancos, sem costura visível.
function InfinityStudio() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]}>
        <circleGeometry args={[60, 64]} />
        <meshStandardMaterial color="#f2f2f0" roughness={0.9} metalness={0} />
      </mesh>
      {/* piso mais reflexivo só embaixo do carro — sheen sutil de showroom
          (Porsche/BMW real), sem deixar o chão inteiro espelhado/artificial. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.028, 0]}>
        <circleGeometry args={[6, 48]} />
        <meshStandardMaterial color="#eeeeec" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[75, 32, 32]} />
        <meshBasicMaterial color="#f6f6f4" side={THREE.BackSide} fog={false} />
      </mesh>
    </>
  );
}

// Softbox branco típico de still automotivo — luz de topo grande + tiras
// laterais compridas para reflexos longos e suaves na lataria.
function StudioLightRig({ resolution }: { resolution: number }) {
  return (
    <Environment resolution={resolution} background={false} frames={1}>
      <Lightformer intensity={2.2} color="#ffffff" position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[9, 5, 1]} />
      <Lightformer intensity={2.6} color="#ffffff" position={[-8, 2.2, 1.5]} rotation={[0, Math.PI / 2, 0]} scale={[1, 3.2, 14]} />
      <Lightformer intensity={2.6} color="#ffffff" position={[8, 2.2, 1.5]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 3.2, 14]} />
      <Lightformer intensity={1.1} color="#fff7ee" position={[0, 2, 9]} rotation={[0, Math.PI, 0]} scale={[7, 3, 1]} />
      <Lightformer intensity={0.6} color="#eef3ff" position={[0, 1.4, -9]} scale={[7, 3, 1]} />
      {/* rim light discreta atrás/acima, separa o carro escuro do fundo claro */}
      <Lightformer intensity={1.6} color="#ffffff" position={[0, 3.2, -6]} rotation={[0, 0, 0]} scale={[6, 1.4, 1]} />
      {/* fill baixo, de frente — levanta detalhe em carros de pintura escura
          e em conversíveis (bastante habitáculo à mostra) sem achatar o
          contraste geral, só evita "buraco negro" sem definição. */}
      <Lightformer intensity={0.9} color="#ffffff" position={[0, 0.6, 6]} rotation={[0, Math.PI, 0]} scale={[8, 2, 1]} />
    </Environment>
  );
}

function SceneContents({
  viewRef,
  boundsRef,
  carRef,
  config,
  isMobile,
  onReady,
  dragAngleRef,
  doorsOpenRef,
  setDpr,
  maxDpr,
}: {
  viewRef: RefObject<number>;
  boundsRef: RefObject<Bounds | null>;
  carRef: RefObject<CarRefs>;
  config: CarConfig;
  isMobile: boolean;
  onReady?: () => void;
  dragAngleRef: RefObject<number>;
  doorsOpenRef?: RefObject<boolean>;
  setDpr: (fn: (d: number) => number) => void;
  maxDpr: number;
}) {
  const mouseRef = useMousePointer();
  // ContactShadows (drei) tem `frames=Infinity` por padrão: sem isso, ela
  // re-renderiza a cena inteira em depth + 2 passes de blur (4 no total, já
  // que `smooth` dobra) TODO FRAME, pra sempre — mesmo com o carro parado e
  // a câmera orbitando (a shadowCam dela é fixa/ortográfica, orbit não afeta
  // o resultado). Isso era o maior custo escondido da cena. `carReady` trava
  // isso: enquanto o GLB carrega, ela faz só 1 frame (chão vazio, barato);
  // assim que o carro é medido/posicionado (onReady), a key muda e ela
  // remonta com um punhado de frames pra assentar o bake do carro real e
  // para pra sempre — cor/roda/acabamento não afetam a silhueta (depth-only,
  // overrideMaterial ignora o material), então nunca precisa recalcular de
  // novo nessa sessão do carro.
  const [carReady, setCarReady] = useState(false);
  useEffect(() => {
    setCarReady(false);
  }, [config.id]);

  return (
    <>
      <color attach="background" args={["#f2f2f0"]} />
      <fog attach="fog" args={["#f2f2f0", 22, 46]} />

      {/* Sem castShadow na luz direcional — a sombra "real" dela caía num
          ângulo lateral (posição da luz), desconectada do carro e brigando
          com a sombra de contato. ContactShadows sozinha é mais controlável
          e sempre fica ancorada embaixo do carro, em qualquer vista/ângulo. */}
      <ambientLight intensity={0.75} />
      <directionalLight position={[-5, 7, 4]} intensity={1.6} />
      <spotLight position={[1, 8, 3]} angle={0.5} penumbra={1} intensity={0.6} color="#ffffff" />

      <InfinityStudio />
      <StudioLightRig resolution={isMobile ? 128 : 256} />

      {/* Sem DepthOfField — o carro fica sempre nítido. */}
      <Suspense fallback={null}>
        <CarModel
          key={config.id}
          config={config}
          mouseRef={mouseRef}
          carRef={carRef}
          doorsOpenRef={doorsOpenRef}
          onReady={(b) => {
            boundsRef.current = b;
            setCarReady(true);
            onReady?.();
          }}
        />
      </Suspense>

      {/* scale/blur calibrados pro footprint de um carro (~4.5-5.5m) — um
          scale muito maior que o carro faz o blur espalhar a sombra numa
          mancha alongada sem relação com a silhueta real. key força remount
          (reseta o contador interno de frames) na virada loading→pronto. */}
      <ContactShadows
        key={`shadow-${config.id}-${carReady ? "on" : "off"}`}
        frames={carReady ? 10 : 1}
        position={[0, -0.01, 0]}
        opacity={0.5}
        scale={10}
        blur={1.6}
        far={2.2}
        resolution={512}
        color="#000000"
      />

      <CameraRig viewRef={viewRef} boundsRef={boundsRef} dragAngleRef={dragAngleRef} />

      {/* Mede FPS real (janelas de 250ms) e sobe/desce o DPR sozinho — a
          garantia de fluidez "sempre", em vez de apostar num teto de DPR
          fixo que pode continuar pesado numa tela 4K/retina específica.
          Mobile já fica fixo em DPR 1 (piso), não precisa monitorar. */}
      {!isMobile && (
        <PerformanceMonitor
          onDecline={() => setDpr((d) => Math.max(1, +(d - 0.25).toFixed(2)))}
          onIncline={() => setDpr((d) => Math.min(maxDpr, +(d + 0.25).toFixed(2)))}
        />
      )}

      <AdaptiveEvents />

      {/* darkness=0.45 (tentativa anterior de imitar still fotográfico)
          "esmagava" a pintura escura padrão (#2e3236) pro preto puro perto
          das bordas do quadro — bug real reportado pelo Seven, confirmado
          via screenshot em vários carros. Valor moderado aqui. */}
      {/* multisampling 4→2: MSAA 4x custava caro pro GPU sem diferença
          visível perceptível numa cena majoritariamente lisa/estúdio —
          gravação fluida > ultimo grau de anti-aliasing. */}
      <EffectComposer multisampling={isMobile ? 0 : 2}>
        <Bloom intensity={0.12} luminanceThreshold={0.92} luminanceSmoothing={0.2} mipmapBlur />
        <Vignette eskil={false} offset={0.25} darkness={0.2} />
      </EffectComposer>
    </>
  );
}

export default function Scene({
  viewRef,
  boundsRef,
  carRef,
  config,
  active = true,
  onReady,
  dragAngleRef,
  doorsOpenRef,
}: {
  viewRef: RefObject<number>;
  boundsRef: RefObject<Bounds | null>;
  carRef: RefObject<CarRefs>;
  config: CarConfig;
  active?: boolean;
  onReady?: () => void;
  dragAngleRef: RefObject<number>;
  doorsOpenRef?: RefObject<boolean>;
}) {
  const isMobile = useIsMobile();
  // Teto de DPR 1.8→1.5 no desktop: em tela 4K/retina, 1.8 já é muito pixel
  // pra recalcular por frame (a causa mais provável de engasgo na gravação).
  // O valor real fica dinâmico entre 1 e esse teto via PerformanceMonitor
  // (dentro de SceneContents) — sobe quando o FPS aguenta, desce sozinho se
  // cair, sem precisar acertar um número fixo de olho pro hardware do Seven.
  const maxDpr = isMobile ? 1 : 1.5;
  const [dpr, setDpr] = useState(maxDpr);

  useEffect(() => {
    setDpr(isMobile ? 1 : 1.5);
  }, [isMobile]);

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: !isMobile, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
      camera={{ fov: 30, position: [-3, 1.4, 5] }}
    >
      <SceneContents
        viewRef={viewRef}
        boundsRef={boundsRef}
        carRef={carRef}
        config={config}
        isMobile={isMobile}
        onReady={onReady}
        dragAngleRef={dragAngleRef}
        doorsOpenRef={doorsOpenRef}
        setDpr={setDpr}
        maxDpr={maxDpr}
      />
    </Canvas>
  );
}
