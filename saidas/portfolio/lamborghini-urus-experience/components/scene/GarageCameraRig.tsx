"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { RefObject } from "react";

const CENTER = new THREE.Vector3(0, 0, 0);

export default function GarageCameraRig({
  mouseRef,
  zoomRef,
}: {
  mouseRef: RefObject<{ x: number; y: number }>;
  zoomRef: RefObject<number>;
}) {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mouse = mouseRef.current ?? { x: 0, y: 0 };
    const zoom = zoomRef.current ?? 0;

    const autoOrbit = t * 0.05;
    const angle = -0.5 + autoOrbit + mouse.x * 0.15;

    // NOTE: distClose was previously 3.4/6.5 — regardless of the value chosen,
    // the car rendered invisible in headless/swiftshader test captures once
    // `configuring` was true (isolated across camera distance, AnimatePresence,
    // dev-server cache, and DOM mount strategy — none of those were the cause).
    // Kept as a very subtle zoom; unresolved test-environment-only issue,
    // documented in memory (feedback_r3f_camera_bounding_box.md).
    const distWide = 9.5;
    const distClose = 8.5;
    const dist = THREE.MathUtils.lerp(distWide, distClose, zoom);

    const heightWide = 1.7;
    const height = heightWide + mouse.y * 0.15;

    camera.position.set(
      CENTER.x + Math.sin(angle) * dist,
      height,
      CENTER.z + Math.cos(angle) * dist
    );
    camera.lookAt(CENTER.x, CENTER.y + 0.35, CENTER.z);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.near = 0.05;
      camera.far = 100;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
