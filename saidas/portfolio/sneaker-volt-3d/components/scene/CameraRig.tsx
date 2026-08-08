"use client";

import { useFrame, useThree } from "@react-three/fiber";
import type { RefObject } from "react";

export default function CameraRig({ progressRef }: { progressRef: RefObject<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = progressRef.current ?? 0;

    const radius = 6.2 - p * 1.2;
    const angle = -0.5 + p * 1.2;
    const height = 0.95 + p * 0.6;

    camera.position.set(Math.sin(angle) * radius, height, Math.cos(angle) * radius);
    camera.lookAt(0, 0.3 + p * 0.1, 0.15);
  });

  return null;
}
