"use client";

import { Sparkles } from "@react-three/drei";

export default function GarageBackdrop() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <circleGeometry args={[40, 64]} />
        <meshStandardMaterial color="#0d0d0f" roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[0, 8, -14]} receiveShadow>
        <planeGeometry args={[60, 24]} />
        <meshStandardMaterial color="#111114" roughness={0.9} metalness={0} />
      </mesh>

      <Sparkles
        count={80}
        scale={[16, 6, 12]}
        position={[0, 3, 0]}
        size={2}
        speed={0.15}
        opacity={0.25}
        color="#d9d9dc"
      />
    </>
  );
}
