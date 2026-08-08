"use client";

import { Suspense, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Bloom, DepthOfField, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import UrusModel, { type UrusRefs } from "./UrusModel";
import CameraRig from "./CameraRig";

export type Bounds = { center: THREE.Vector3; size: THREE.Vector3 };

function useMousePointer() {
  const mouseRef = useRef({ x: 0, y: 0 });
  useFrame(({ pointer }) => {
    mouseRef.current.x += (pointer.x - mouseRef.current.x) * 0.06;
    mouseRef.current.y += (pointer.y - mouseRef.current.y) * 0.06;
  });
  return mouseRef;
}

function StudioBackdrop() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <circleGeometry args={[40, 64]} />
        <meshStandardMaterial color="#eeeeef" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, 14, -16]} receiveShadow>
        <planeGeometry args={[70, 34]} />
        <meshStandardMaterial color="#dcdcde" roughness={1} metalness={0} />
      </mesh>
    </>
  );
}

function SceneContents({
  modelUrl,
  progressRef,
  boundsRef,
  urusRef,
}: {
  modelUrl?: string;
  progressRef: RefObject<number>;
  boundsRef: RefObject<Bounds | null>;
  urusRef: RefObject<UrusRefs>;
}) {
  const mouseRef = useMousePointer();
  const [ready, setReady] = useState(false);

  return (
    <>
      <color attach="background" args={["#e7e7e9"]} />
      <fog attach="fog" args={["#e7e7e9", 10, 30]} />

      <ambientLight intensity={0.7} />
      <directionalLight castShadow position={[-4, 6, 3]} intensity={2.2} shadow-mapSize={[1024, 1024]} />
      <spotLight position={[0, 7, 2]} angle={0.55} penumbra={1} intensity={1.2} color="#ffffff" />
      <pointLight position={[4, 1.4, -3]} intensity={2.2} color="#fff4e8" distance={16} />

      <StudioBackdrop />

      <Suspense fallback={null}>
        <UrusModel
          url={modelUrl}
          progressRef={progressRef}
          mouseRef={mouseRef}
          urusRef={urusRef}
          onReady={(b) => {
            boundsRef.current = b;
            setReady(true);
          }}
        />
        <Environment preset="studio" environmentIntensity={0.6} />
      </Suspense>

      <ContactShadows position={[0, -0.02, 0]} opacity={0.38} scale={20} blur={2.6} far={4} color="#000000" />

      <CameraRig progressRef={progressRef} boundsRef={boundsRef} />

      <EffectComposer>
        <Bloom intensity={0.25} luminanceThreshold={0.75} luminanceSmoothing={0.25} mipmapBlur />
        <DepthOfField target={ready ? boundsRef.current?.center : undefined} focalLength={0.035} bokehScale={1.6} />
        <Vignette eskil={false} offset={0.2} darkness={0.32} />
      </EffectComposer>
    </>
  );
}

export default function LamborghiniScene({
  modelUrl,
  progressRef,
  boundsRef,
  urusRef,
  active = true,
}: {
  modelUrl?: string;
  progressRef: RefObject<number>;
  boundsRef: RefObject<Bounds | null>;
  urusRef: RefObject<UrusRefs>;
  active?: boolean;
}) {
  const dpr = useRef<[number, number]>([1, 1.8]);

  return (
    <Canvas
      shadows
      dpr={dpr.current}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true }}
      camera={{ fov: 32, position: [-3, 1.5, 5] }}
    >
      <SceneContents modelUrl={modelUrl} progressRef={progressRef} boundsRef={boundsRef} urusRef={urusRef} />
    </Canvas>
  );
}
