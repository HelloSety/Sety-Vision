"use client";

import { Suspense, useRef, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Sparkles } from "@react-three/drei";
import { Bloom, DepthOfField, EffectComposer, Vignette } from "@react-three/postprocessing";
import Katana, { useMousePointer } from "./Katana";
import CameraRig from "./CameraRig";

function SceneContents({
  explodeRef,
  progressRef,
  showLabels,
}: {
  explodeRef: RefObject<number>;
  progressRef: RefObject<number>;
  showLabels: boolean;
}) {
  const mouseRef = useMousePointer();

  return (
    <>
      <color attach="background" args={["#e4001b"]} />
      <fog attach="fog" args={["#b8021c", 9, 20]} />

      <ambientLight intensity={0.28} color="#ff9a6a" />
      <directionalLight
        castShadow
        position={[-2.5, 4.5, 2]}
        intensity={2.2}
        color="#fff2e0"
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight position={[0, 5, 3]} angle={0.55} penumbra={0.9} intensity={1.6} color="#fff2e0" />
      <pointLight position={[-3, 1.6, -2]} intensity={5} color="#ff7a1a" distance={11} />
      <pointLight position={[3.5, 0.6, -1.5]} intensity={4} color="#ffcf3d" distance={10} />
      <pointLight position={[0, -1.4, 3]} intensity={2.2} color="#8f0012" distance={8} />

      <Suspense fallback={null}>
        <Katana
          explodeRef={explodeRef}
          progressRef={progressRef}
          mouseRef={mouseRef}
          showLabels={showLabels}
        />
        <Environment preset="sunset" environmentIntensity={0.35} />
      </Suspense>

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.6}
        scale={12}
        blur={2.6}
        far={3.5}
        color="#2a0004"
      />

      <Sparkles count={70} scale={[7, 4, 5]} size={2.4} speed={0.3} color="#ffcf3d" opacity={0.6} />

      <CameraRig progressRef={progressRef} />

      <EffectComposer>
        <Bloom intensity={0.7} luminanceThreshold={0.32} luminanceSmoothing={0.35} mipmapBlur />
        <DepthOfField focusDistance={0.018} focalLength={0.04} bokehScale={3.5} />
        <Vignette eskil={false} offset={0.15} darkness={0.6} />
      </EffectComposer>
    </>
  );
}

export default function KatanaScene({
  explodeRef,
  progressRef,
  showLabels = false,
  active = true,
}: {
  explodeRef: RefObject<number>;
  progressRef: RefObject<number>;
  showLabels?: boolean;
  active?: boolean;
}) {
  const dpr = useRef<[number, number]>([1, 1.8]);

  return (
    <Canvas
      shadows
      dpr={dpr.current}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true }}
      camera={{ fov: 34, position: [-0.7, 0.68, 7.8] }}
    >
      <SceneContents explodeRef={explodeRef} progressRef={progressRef} showLabels={showLabels} />
    </Canvas>
  );
}
