"use client";

import { Suspense, useRef, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, MeshReflectorMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Sneaker, { type VariantName } from "./Sneaker";
import CameraRig from "./CameraRig";

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.58, 0]}>
      <planeGeometry args={[24, 24]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={35}
        roughness={1}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050307"
        metalness={0.6}
        mirror={0}
      />
    </mesh>
  );
}

export default function SneakerScene({
  variant,
  progressRef,
  dragYawRef,
  active = true,
}: {
  variant: VariantName;
  progressRef: RefObject<number>;
  dragYawRef: RefObject<number>;
  active?: boolean;
}) {
  const dpr = useRef<[number, number]>([1, 1.8]);

  return (
    <Canvas
      dpr={dpr.current}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true }}
      camera={{ fov: 38, position: [-3, 1, 5.5] }}
    >
      <color attach="background" args={["#060608"]} />
      <fog attach="fog" args={["#060608", 8, 18]} />

      <ambientLight intensity={0.12} />
      <spotLight
        position={[0, 4.5, 1.5]}
        angle={0.5}
        penumbra={0.8}
        intensity={2.2}
        color="#ffffff"
      />
      <pointLight position={[-3.2, 1.4, -1.6]} intensity={7} color="#ff2e9a" distance={9} />
      <pointLight position={[3.2, 1, -2]} intensity={7} color="#00e5ff" distance={9} />
      <pointLight position={[0, -0.3, 2.6]} intensity={2.4} color="#8b2fff" distance={7} />

      <Suspense fallback={null}>
        <Sneaker variant={variant} dragYawRef={dragYawRef} />
        <Environment preset="city" environmentIntensity={0.5} />
      </Suspense>

      <Floor />
      <CameraRig progressRef={progressRef} />

      <EffectComposer>
        <Bloom intensity={0.55} luminanceThreshold={0.35} luminanceSmoothing={0.3} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
