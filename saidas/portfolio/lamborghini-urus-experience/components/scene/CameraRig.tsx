"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { RefObject } from "react";
import type { Bounds } from "./LamborghiniScene";

export default function CameraRig({
  progressRef,
  boundsRef,
}: {
  progressRef: RefObject<number>;
  boundsRef: RefObject<Bounds | null>;
}) {
  const { camera } = useThree();

  useFrame(() => {
    const bounds = boundsRef.current;
    if (!bounds) return;
    const p = progressRef.current ?? 0;

    const diag = bounds.size.length();
    const radius = diag * 0.9;
    const dist = radius * (1.9 - p * 0.55);
    const angle = -0.4 + p * 1.3;
    const height = bounds.center.y + bounds.size.y * (0.25 + p * 0.15);

    camera.position.set(
      bounds.center.x + Math.sin(angle) * dist,
      height,
      bounds.center.z + Math.cos(angle) * dist
    );
    camera.lookAt(bounds.center.x, bounds.center.y + bounds.size.y * 0.1, bounds.center.z);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.near = diag * 0.01;
      camera.far = diag * 20;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
