"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/sneaker.glb");

export type VariantName = "midnight" | "beach" | "street";

type MeshWithVariants = THREE.Mesh & {
  userData: {
    gltfExtensions?: {
      KHR_materials_variants?: {
        mappings: { material: number; variants: number[] }[];
      };
    };
    originalMaterial?: THREE.Material | THREE.Material[];
  };
};

export default function Sneaker({
  variant,
  dragYawRef,
}: {
  variant: VariantName;
  dragYawRef: React.RefObject<number>;
}) {
  const gltf = useGLTF("/models/sneaker.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const extension = (
      gltf as unknown as {
        userData?: { gltfExtensions?: { KHR_materials_variants?: { variants: { name: string }[] } } };
      }
    ).userData?.gltfExtensions?.KHR_materials_variants;
    if (!extension) return;

    const variantIndex = extension.variants.findIndex((v) => v.name === variant);
    if (variantIndex === -1) return;

    const parser = (gltf as unknown as { parser: { getDependency: (type: string, index: number) => Promise<THREE.Material>; assignFinalMaterial: (mesh: THREE.Mesh) => void } }).parser;

    gltf.scene.traverse((object) => {
      const mesh = object as MeshWithVariants;
      if (!mesh.isMesh) return;

      const meshVariantDef = mesh.userData.gltfExtensions?.KHR_materials_variants;
      if (!meshVariantDef) return;

      if (!mesh.userData.originalMaterial) {
        mesh.userData.originalMaterial = mesh.material;
      }

      const mapping = meshVariantDef.mappings.find((m) => m.variants.includes(variantIndex));

      if (mapping) {
        parser.getDependency("material", mapping.material).then((material) => {
          mesh.material = material;
          parser.assignFinalMaterial(mesh);
        });
      } else if (mesh.userData.originalMaterial) {
        mesh.material = mesh.userData.originalMaterial;
      }
    });
  }, [gltf, variant]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const idleFloat = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
    groupRef.current.position.y = idleFloat;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.12 + (dragYawRef.current ?? 0);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={gltf.scene} scale={10} position={[0, -0.5, 0.2]} />
    </group>
  );
}
