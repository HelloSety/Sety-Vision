"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { RefObject } from "react";

function useBladeGeometry() {
  return useMemo(() => {
    const length = 3.4;
    const baseWidth = 0.072;
    const shape = new THREE.Shape();
    shape.moveTo(0, -baseWidth / 2);
    shape.quadraticCurveTo(length * 0.55, -baseWidth / 2 - 0.01, length * 0.975, -0.003);
    shape.lineTo(length, 0);
    shape.quadraticCurveTo(length * 0.4, baseWidth / 2 + 0.26, 0, baseWidth / 2);
    shape.lineTo(0, -baseWidth / 2);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.024,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 3,
      curveSegments: 32,
    });
    geometry.translate(0, 0, -0.012);
    geometry.computeVertexNormals();
    return { geometry, length, baseWidth };
  }, []);
}

function useHamonGeometry(length: number, baseWidth: number) {
  return useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 48;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = t * length * 0.96;
      const wobble = Math.sin(t * 16) * 0.005 + Math.sin(t * 6.1) * 0.009;
      const edgeHug = -baseWidth * 0.24 * (1 - t * 0.7);
      const y = edgeHug + wobble;
      points.push(new THREE.Vector3(x, y, 0.013));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 70, 0.0065, 8, false);
  }, [length, baseWidth]);
}

export type KatanaHandle = {
  group: THREE.Group | null;
};

export default function Katana({
  explodeRef,
  progressRef,
  mouseRef,
  showLabels = false,
}: {
  explodeRef: RefObject<number>;
  progressRef: RefObject<number>;
  mouseRef: RefObject<{ x: number; y: number }>;
  showLabels?: boolean;
}) {
  const { geometry: bladeGeo, length, baseWidth } = useBladeGeometry();
  const hamonGeo = useHamonGeometry(length, baseWidth);

  const rootRef = useRef<THREE.Group>(null);
  const bladeRef = useRef<THREE.Group>(null);
  const tsubaRef = useRef<THREE.Group>(null);
  const handleRef = useRef<THREE.Group>(null);
  const pommelRef = useRef<THREE.Group>(null);
  const hamonMatRef = useRef<THREE.MeshStandardMaterial>(null);

  const wrapRings = useMemo(() => Array.from({ length: 10 }, (_, i) => -0.1 - i * 0.088), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const explode = explodeRef.current ?? 0;
    const p = progressRef.current ?? 0;
    const mouse = mouseRef.current ?? { x: 0, y: 0 };

    if (bladeRef.current) bladeRef.current.position.x = explode * 0.55;
    if (tsubaRef.current) tsubaRef.current.position.x = -explode * 0.35;
    if (handleRef.current) handleRef.current.position.x = -explode * 0.9;
    if (pommelRef.current) pommelRef.current.position.x = -explode * 1.35;

    if (hamonMatRef.current) {
      hamonMatRef.current.emissiveIntensity = 2.4 + Math.sin(t * 1.6) * 0.7;
    }

    if (rootRef.current) {
      const idleSway = Math.sin(t * 0.18) * 0.16;
      const idleFloat = Math.sin(t * 0.7) * 0.05;
      rootRef.current.rotation.y = idleSway + p * 1.3;
      rootRef.current.rotation.z = -0.42 + mouse.x * 0.12;
      rootRef.current.rotation.x = 0.08 + mouse.y * 0.1;
      rootRef.current.position.y = idleFloat - p * 0.2;
    }
  });

  return (
    <group ref={rootRef}>
      <group ref={bladeRef} position={[0, 0, 0]}>
        <mesh geometry={bladeGeo} castShadow>
          <meshPhysicalMaterial
            color="#cfd6de"
            metalness={1}
            roughness={0.14}
            clearcoat={0.7}
            clearcoatRoughness={0.2}
            envMapIntensity={1.6}
          />
        </mesh>
        <mesh geometry={hamonGeo}>
          <meshStandardMaterial
            ref={hamonMatRef}
            color="#f3ede2"
            emissive="#f3ede2"
            emissiveIntensity={1.4}
            metalness={0.2}
            roughness={0.4}
          />
        </mesh>
        {showLabels && (
          <Html position={[length * 0.5, 0, 0.02]} distanceFactor={7} center>
            <div className="glass whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fire-yellow">
              Lâmina
            </div>
          </Html>
        )}
      </group>

      <group ref={tsubaRef} position={[-0.05, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.145, 0.145, 0.022, 32]} />
          <meshStandardMaterial color="#b0913f" metalness={0.92} roughness={0.3} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.145, 0.006, 8, 32]} />
          <meshStandardMaterial color="#6b5423" metalness={0.85} roughness={0.4} />
        </mesh>
        {showLabels && (
          <Html distanceFactor={7} center>
            <div className="glass whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fire-yellow">
              Tsuba
            </div>
          </Html>
        )}
      </group>

      <group ref={handleRef} position={[-0.06, 0, 0]}>
        <mesh position={[-0.48, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.042, 0.048, 0.86, 16]} />
          <meshStandardMaterial color="#0f0a08" metalness={0.1} roughness={0.85} />
        </mesh>
        {wrapRings.map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.05, 0.0095, 10, 20]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#8a0c14" : "#0c0807"}
              metalness={0.25}
              roughness={0.55}
            />
          </mesh>
        ))}
        {showLabels && (
          <Html position={[-0.5, 0, 0]} distanceFactor={7} center>
            <div className="glass whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fire-yellow">
              Tsuka
            </div>
          </Html>
        )}
      </group>

      <group ref={pommelRef} position={[-0.06, 0, 0]}>
        <mesh position={[-0.93, 0, 0]}>
          <sphereGeometry args={[0.058, 20, 20]} />
          <meshStandardMaterial color="#b0913f" metalness={0.92} roughness={0.28} />
        </mesh>
      </group>
    </group>
  );
}

export function useMousePointer() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useFrame(({ pointer }) => {
    mouseRef.current.x += (pointer.x - mouseRef.current.x) * 0.06;
    mouseRef.current.y += (pointer.y - mouseRef.current.y) * 0.06;
  });

  void size;
  return mouseRef;
}
