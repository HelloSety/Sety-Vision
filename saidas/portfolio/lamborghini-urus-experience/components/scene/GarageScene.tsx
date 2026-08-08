"use client";

import { Suspense, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import GarageBackdrop from "./GarageBackdrop";
import GarageCameraRig from "./GarageCameraRig";
import CarStage, { type CarSpec } from "./CarStage";
import type { UrusRefs } from "./UrusModel";
import type { Bounds } from "./LamborghiniScene";

function useMousePointer() {
  const mouseRef = useRef({ x: 0, y: 0 });
  useFrame(({ pointer }) => {
    mouseRef.current.x += (pointer.x - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (pointer.y - mouseRef.current.y) * 0.05;
  });
  return mouseRef;
}

function SceneContents({
  cars,
  activeIndex,
  carRefs,
  zoomRef,
  onCarBounds,
}: {
  cars: CarSpec[];
  activeIndex: number;
  carRefs: RefObject<UrusRefs>[];
  zoomRef: RefObject<number>;
  onCarBounds?: (index: number, b: Bounds) => void;
}) {
  const mouseRef = useMousePointer();

  return (
    <>
      <color attach="background" args={["#08080a"]} />
      <fog attach="fog" args={["#08080a", 9, 26]} />

      <ambientLight intensity={0.18} />
      <spotLight position={[-2, 8, 3]} angle={0.4} penumbra={0.9} intensity={3.2} color="#e8ecf5" castShadow />
      <spotLight position={[3, 5, -2]} angle={0.5} penumbra={1} intensity={1.4} color="#9fb4ff" />
      <pointLight position={[0, 1.2, 4]} intensity={1.8} color="#ff8a3d" distance={12} />
      <pointLight position={[-5, 1, -4]} intensity={1.2} color="#3d6bff" distance={14} />

      <GarageBackdrop />

      <Suspense fallback={null}>
        <CarStage cars={cars} activeIndex={activeIndex} carRefs={carRefs} onCarBounds={onCarBounds} />
        <Environment preset="warehouse" environmentIntensity={0.35} />
      </Suspense>

      <ContactShadows position={[0, -0.02, 0]} opacity={0.55} scale={22} blur={2.4} far={4} color="#000000" />

      <GarageCameraRig mouseRef={mouseRef} zoomRef={zoomRef} />

      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.6} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.35} />
      </EffectComposer>
    </>
  );
}

export default function GarageScene({
  cars,
  activeIndex,
  carRefs,
  zoomRef,
  onCarBounds,
}: {
  cars: CarSpec[];
  activeIndex: number;
  carRefs: RefObject<UrusRefs>[];
  zoomRef: RefObject<number>;
  onCarBounds?: (index: number, b: Bounds) => void;
}) {
  const dpr = useRef<[number, number]>([1, 1.5]);

  return (
    <Canvas
      shadows
      dpr={dpr.current}
      gl={{ antialias: true }}
      camera={{ fov: 32, position: [-3, 1.7, 8] }}
    >
      <SceneContents
        cars={cars}
        activeIndex={activeIndex}
        carRefs={carRefs}
        zoomRef={zoomRef}
        onCarBounds={onCarBounds}
      />
    </Canvas>
  );
}
