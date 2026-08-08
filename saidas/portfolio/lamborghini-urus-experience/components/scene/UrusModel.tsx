"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { RefObject } from "react";

useGLTF.preload("/models/urus.glb");

export type UrusRefs = {
  paintMaterial: THREE.MeshStandardMaterial | null;
};

export default function UrusModel({
  url = "/models/urus.glb",
  progressRef,
  mouseRef,
  urusRef,
  onReady,
  autoRotate = true,
}: {
  url?: string;
  progressRef: RefObject<number>;
  mouseRef: RefObject<{ x: number; y: number }>;
  urusRef: RefObject<UrusRefs>;
  onReady?: (bounds: { center: THREE.Vector3; size: THREE.Vector3 }) => void;
  autoRotate?: boolean;
}) {
  const gltf = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const readyFired = useRef(false);
  const [scale, setScale] = useState(1);

  const TARGET_LENGTH = 5.4; // meters-equivalent, matches a real Urus length

  useEffect(() => {
    gltf.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat && /Paint_Material$/i.test(mat.name)) {
        urusRef.current.paintMaterial = mat;
      }
    });

    if (!readyFired.current) {
      readyFired.current = true;
      // Measure via a detached clone: gltf.scene may already be parented under a
      // group with its own position/animation (e.g. CarStage), and Box3.setFromObject
      // uses world-space matrices, so measuring gltf.scene directly would bake in
      // whatever offset its parent currently has. A parent-less clone always has
      // matrixWorld === local matrix, giving a true local-space measurement.
      const probe = gltf.scene.clone(true);
      probe.updateMatrixWorld(true);
      const rawBox = new THREE.Box3().setFromObject(probe);
      const rawSize = rawBox.getSize(new THREE.Vector3());
      const rawCenter = rawBox.getCenter(new THREE.Vector3());
      const computedScale = TARGET_LENGTH / Math.max(rawSize.x, rawSize.y, rawSize.z);
      setScale(computedScale);
      gltf.scene.position.set(-rawCenter.x, -rawCenter.y, -rawCenter.z);

      const center = new THREE.Vector3(0, 0, 0);
      const size = rawSize.clone().multiplyScalar(computedScale);
      onReady?.({ center, size });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gltf]);

  useFrame((state) => {
    if (!autoRotate) return;
    const p = progressRef.current ?? 0;
    const mouse = mouseRef.current ?? { x: 0, y: 0 };
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = -0.5 + p * 1.7 + Math.sin(t * 0.15) * 0.03 + mouse.x * 0.06;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.015;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={gltf.scene} />
    </group>
  );
}
