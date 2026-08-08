"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import UrusModel, { type UrusRefs } from "./UrusModel";
import type { Bounds } from "./LamborghiniScene";

export type CarSpec = { name: string; url: string };

const CENTER = new THREE.Vector3(0, 0, 0);
const SLOT_OFFSETS = [
  new THREE.Vector3(-7.5, 0, -3.5),
  new THREE.Vector3(7.5, 0, -3.5),
  new THREE.Vector3(-7.5, 0, 3.5),
  new THREE.Vector3(7.5, 0, 3.5),
];

function CarSlot({
  url,
  active,
  slotPosition,
  urusRef,
  onReady,
}: {
  url: string;
  active: boolean;
  slotPosition: THREE.Vector3;
  urusRef: RefObject<UrusRefs>;
  onReady?: (b: Bounds) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const target = active ? CENTER : slotPosition;
    const current = groupRef.current.position;
    const lerpFactor = 1 - Math.pow(0.001, delta);
    current.lerp(target, lerpFactor);

    const distToTarget = current.distanceTo(target);
    const movingYaw = Math.atan2(target.x - current.x, target.z - current.z);
    const restYaw = active ? 0 : Math.PI * 0.15;
    const targetYaw = distToTarget > 0.15 ? movingYaw : restYaw;
    groupRef.current.rotation.y += (targetYaw - groupRef.current.rotation.y) * lerpFactor * 0.6;

    const t = state.clock.elapsedTime;
    groupRef.current.position.y += Math.sin(t * 0.6 + slotPosition.x) * 0.0004;
  });

  return (
    <group ref={groupRef} position={slotPosition.toArray()}>
      <UrusModel
        url={url}
        progressRef={progressRef}
        mouseRef={mouseRef}
        urusRef={urusRef}
        onReady={onReady}
        autoRotate={false}
      />
    </group>
  );
}

export default function CarStage({
  cars,
  activeIndex,
  carRefs,
  onCarBounds,
}: {
  cars: CarSpec[];
  activeIndex: number;
  carRefs: RefObject<UrusRefs>[];
  onCarBounds?: (index: number, b: Bounds) => void;
}) {
  return (
    <>
      {cars.map((car, i) => (
        <CarSlot
          key={car.url}
          url={car.url}
          active={i === activeIndex}
          slotPosition={SLOT_OFFSETS[i % SLOT_OFFSETS.length]}
          urusRef={carRefs[i]}
          onReady={(b) => onCarBounds?.(i, b)}
        />
      ))}
    </>
  );
}
