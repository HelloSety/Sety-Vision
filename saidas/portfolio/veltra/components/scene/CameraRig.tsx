"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import type { RefObject } from "react";
import type { Bounds } from "./Scene";

// 6 vistas fixas, estilo configurador Porsche — clique nas setas troca entre
// elas, a câmera desliza suavemente (sem cortar), nunca dirigido por scroll.
export const VIEW_COUNT = 6;
export const VIEW_LABELS = ["Frente", "3/4 frente", "3/4 traseira", "Traseira", "Topo", "Interior"];

// Frente/Traseira (visão de cabeceira, quase de frente pro carro) precisam
// de uma distância bem maior que os outros ângulos: como a câmera olha
// direto pro para-choque (a ponta mais próxima do carro nessa direção), o
// mesmo distMul usado nas vistas 3/4 deixava a câmera perto demais e o
// enquadramento quebrava (carro cortado, vazio no resto do quadro).
// Confirmado empiricamente: aumentar só o distMul resolve por completo.
const PRESETS: { angle: number; distMul: number; heightMul: number; interior?: false }[] = [
  { angle: 0.06, distMul: 1.6, heightMul: 0.17 }, // Frente
  { angle: -0.75, distMul: 1.05, heightMul: 0.17 }, // 3/4 frente
  { angle: Math.PI - 0.75, distMul: 1.2, heightMul: 0.24 }, // 3/4 traseira
  { angle: Math.PI - 0.06, distMul: 1.6, heightMul: 0.17 }, // Traseira
  { angle: -0.4, distMul: 0.55, heightMul: 3.6 }, // Topo
];

// fov (30°) é vertical — a cobertura HORIZONTAL do enquadramento varia com o
// aspect ratio real da janela. Calibrado/testado numa tela larga (~1.7); em
// proporções mais estreitas (celular retrato, ~0.5) o fov horizontal cai e o
// carro corta nas laterais em TODAS as vistas. Corrigir recuando a câmera
// proporcionalmente quando o aspect for menor que a referência.
const REFERENCE_ASPECT = 1.7;

// `poseFor` roda dentro de useFrame — todo frame, sempre, mesmo parado.
// Antes criava 2 `new THREE.Vector3()` por chamada (2×60/s = 120 alocações/s
// só de câmera), gerando lixo pro garbage collector que pode se manifestar
// como um micro-engasgo periódico durante a gravação. Agora recebe 2 vetores
// escrató (de CameraRig, alocados uma vez só) e escreve neles com `.set()`.
function poseFor(
  index: number,
  bounds: Bounds,
  aspect: number,
  dragAngle: number,
  outPosition: THREE.Vector3,
  outLookAt: THREE.Vector3
) {
  const diag = bounds.size.length();

  if (index === 5) {
    // Interior — câmera aproximadamente na posição do banco do motorista,
    // olhando pro painel/volante. Estimativa genérica a partir do bounding
    // box (sem dado exato de onde fica o painel em cada asset importado) —
    // ver feedback_processo_sites_3d_premium, precisa de conferência visual.
    // Duas rodadas de calibração visual: 0.32 de altura grudava no teto,
    // 0.08 ficava baixo demais (câmera olhando por baixo do painel, mostrando
    // as rodas em vez do habitáculo) — meio-termo aqui, ainda aproximado.
    outPosition.set(
      bounds.center.x,
      bounds.center.y + bounds.size.y * 0.19,
      bounds.center.z - bounds.size.z * 0.1
    );
    outLookAt.set(
      bounds.center.x,
      bounds.center.y + bounds.size.y * 0.13,
      bounds.center.z + bounds.size.z * 0.35
    );
    return diag;
  }

  const preset = PRESETS[index];
  const aspectCorrection = Math.max(1, REFERENCE_ASPECT / aspect);
  const dist = diag * preset.distMul * aspectCorrection;
  // arrastar com o mouse/dedo gira livremente em torno do carro (360°) a
  // partir do ângulo da vista fixa atual — soltar mantém a rotação; trocar
  // de vista pelas setas reresenta o offset (ver ConfiguratorHome).
  const angle = preset.angle + dragAngle;
  outPosition.set(
    bounds.center.x + Math.sin(angle) * dist,
    bounds.center.y + bounds.size.y * preset.heightMul,
    bounds.center.z + Math.cos(angle) * dist
  );
  outLookAt.set(bounds.center.x, bounds.center.y + bounds.size.y * 0.08, bounds.center.z);
  return diag;
}

export default function CameraRig({
  viewRef,
  boundsRef,
  dragAngleRef,
}: {
  viewRef: RefObject<number>;
  boundsRef: RefObject<Bounds | null>;
  dragAngleRef: RefObject<number>;
}) {
  const { camera } = useThree();
  const currentPos = useRef<THREE.Vector3 | null>(null);
  const currentLookAt = useRef<THREE.Vector3 | null>(null);
  // Vetores escrató reaproveitados frame a frame por `poseFor` — ver comentário
  // acima da função (evita 2 `new THREE.Vector3()` por frame, sempre).
  const targetPos = useRef(new THREE.Vector3()).current;
  const targetLookAt = useRef(new THREE.Vector3()).current;

  useFrame((state, delta) => {
    const bounds = boundsRef.current;
    if (!bounds) return;
    const view = Math.max(0, Math.min(VIEW_COUNT - 1, viewRef.current ?? 0));
    const aspect = state.size.width / state.size.height;
    const dragAngle = view <= 3 ? dragAngleRef.current ?? 0 : 0;
    const diag = poseFor(view, bounds, aspect, dragAngle, targetPos, targetLookAt);

    if (!currentPos.current) {
      currentPos.current = targetPos.clone();
      currentLookAt.current = targetLookAt.clone();
    }

    const speed = 1 - Math.pow(0.001, delta);
    currentPos.current.lerp(targetPos, speed);
    currentLookAt.current!.lerp(targetLookAt, speed);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current!);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.near = diag * 0.01;
      camera.far = diag * 25;
      // Interior precisa de fov bem mais aberto — a câmera fica perto de
      // superfícies do habitáculo, e o fov de 30° (calibrado pras vistas
      // externas) deixa a vista de dentro extremamente fechada/cortada.
      const targetFov = view === 5 ? 70 : 30;
      camera.fov += (targetFov - camera.fov) * speed;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
