"use client";

import { useFrame, useThree } from "@react-three/fiber";
import type { RefObject } from "react";

export default function CameraRig({ progressRef }: { progressRef: RefObject<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = progressRef.current ?? 0;

    const radius = 7.8 - p * 2.2;
    const angle = -0.09 + p * 1.3;
    const height = 0.68 + p * 0.4;

    camera.position.set(Math.sin(angle) * radius, height, Math.cos(angle) * radius);
    camera.lookAt(0.4, 0.05, 0);
  });

  return null;
}
