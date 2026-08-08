"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { RefObject } from "react";

export type CarConfig = {
  id: string;
  name: string;
  url: string;
  targetLength: number;
  price: string;
  // testado contra o nome do NÓ e o nome do MATERIAL — cada asset tem uma
  // convenção de nomenclatura diferente (ver project_veltra_experience).
  hidePattern: RegExp;
  paintPattern: RegExp;
  // aro da roda — vira material físico configurável pelo painel "Rodas".
  wheelPattern: RegExp;
  // marca baked na TEXTURA de uma peça que não dá pra esconder inteira (ex:
  // pinça de freio com nome gravado) — remove o mapa e usa cor sólida fixa.
  debrandPattern?: RegExp;
  // vidro/janela com marca d'água de terceiro gravada na textura (achado real:
  // "Karol Salas 2017" no vidro do Type 01, visível só na vista de Topo) —
  // remove o mapa e vira vidro fumê genérico em vez da textura original.
  glassPattern?: RegExp;
  // conjunto óptico (farol/lanterna) — ganha emissive, como se o carro
  // estivesse ligado. lightColor opcional distingue farol (branco) de
  // lanterna (vermelho) quando o asset separa os dois; sem isso, usa branco
  // quente genérico pro conjunto inteiro.
  lightPattern?: RegExp;
  lightColor?: string;
  // índice em PAINT_SWATCHES pra cor padrão ao abrir o carro (default 0 =
  // Veltra Graphite). Conversíveis/carros com muito habitáculo visível
  // (F8 Spider, Huracán) ficam escuros demais com o grafite padrão — uma
  // cor mais clara resolve sem mexer em luz/geometria.
  defaultColorIndex?: number;
  // Porta animável — só existe em carros cujo asset de origem modela a
  // porta como peça separada da carroceria (nenhum dos 7 atuais tem essa
  // condição sem outro problema junto — ver project_veltra_experience,
  // caso do Huracán removido). Fica pronto pro próximo carro que servir.
  doorLeftPattern?: RegExp;
  doorRightPattern?: RegExp;
  // Ficha técnica — usada na tira de specs abaixo do hero 3D.
  specs: { zeroTo100: string; power: string; torque: string; topSpeed: string; consumption: string };
};

// Cada carro vem de um asset de origem diferente, com convenção de nomes
// própria — por isso o padrão de ocultar-marca/pintura é configurável por
// carro, não fixo.
export const CAR_MODELS: CarConfig[] = [
  {
    id: "type-01",
    name: "Veltra Type 01",
    url: "/models/veltra-bmw-x3.glb",
    targetLength: 4.72,
    price: "a partir de R$ 690.000",
    // TENTATIVA REVERTIDA: achei que Object_218-221 era uma roda solta fora
    // do corpo (heurística de posição por soma de translation, sem
    // considerar rotação/escala herdada — aproximação ruim). Escondê-los
    // sumiu com a carroceria inteira (eram peças reais do corpo). A peça
    // solta que aparece na vista Traseira ainda não identificada — ver
    // project_veltra_experience, pendente pra próxima sessão com diagnóstico
    // correto (matriz mundial completa, não só soma de translation).
    hidePattern: /Logo/i,
    paintPattern: /^PaletteMaterial001$/,
    wheelPattern: /ChangeA_Rim/i,
    debrandPattern: /Change_Brake/i,
    specs: { zeroTo100: "4.8s", power: "387 cv", torque: "500 Nm", topSpeed: "250 km/h", consumption: "9,5 km/l" },
  },
  {
    id: "type-02",
    name: "Veltra Type 02",
    url: "/models/veltra-porsche-gt3rs.glb",
    targetLength: 4.58,
    price: "a partir de R$ 1.980.000",
    // mesma família "RewardRecycled" do resto — Base_Geo é o painel
    // principal (lição já registrada nos outros carros dessa família).
    hidePattern: /Badge|ManufacturerPlate/i,
    paintPattern: /Paint_Material|Coloured|Base_Geo/i,
    wheelPattern: /Wheel.*Material/i,
    debrandPattern: /Calliper/i,
    lightPattern: /Light/i,
    specs: { zeroTo100: "3.2s", power: "525 cv", torque: "465 Nm", topSpeed: "296 km/h", consumption: "7,5 km/l" },
  },
  {
    id: "type-03",
    name: "Veltra Type 03",
    url: "/models/veltra-bmw-m4.glb",
    targetLength: 4.78,
    price: "a partir de R$ 890.000",
    // Convenção totalmente diferente (nomes de NÓ descritivos, materiais só
    // numerados) — "tail_Material" é lanterna (não painel), confirmado por
    // simetria com headlight/glsslight/headglass.
    // TESTADO E REVERTIDO: "Cylinder00X" como roda estava errado — pintou um
    // disco plano (provável blindagem/backing de freio, não o aro) de branco.
    // Sem candidato melhor identificado — wheelPattern fica sem alvo real até
    // confirmar o nome certo (evita pintar peça errada de novo).
    // Portas (Driver_Door/Passenger_Door) também testadas e removidas: o
    // carro ficou flutuando acima do chão junto com o bug da roda — não
    // confirmei se é causa ou coincidência, mas sem tempo pra investigar
    // agora, reverti as duas coisas juntas por segurança.
    hidePattern: /^Plate_Material/i,
    paintPattern: /^Body_Material|^Driver_Door_Material|^Passenger_Door_Material|^bumpers_Material|^bottom_Material/i,
    wheelPattern: /^NoWheelMaterialIdentified$/,
    lightPattern: /^headlight_Material|^glsslight_Material|^headglass_Material|^tail_Material/i,
    specs: { zeroTo100: "3.9s", power: "510 cv", torque: "650 Nm", topSpeed: "290 km/h", consumption: "8,0 km/l" },
  },
  {
    id: "type-04",
    name: "Veltra Type 04",
    url: "/models/veltra-mercedes-g63.glb",
    targetLength: 4.62,
    price: "a partir de R$ 1.590.000",
    // sem "Paint_Material"/"Base_Material" nomeado — mesclado em Palette na
    // otimização (família RewardRecycled). Sem tempo de medir vértice por
    // vértice como fiz no Urus; "Coloured_Material1" + todos os Palette
    // como aposta calculada, não confirmado visualmente ainda.
    hidePattern: /BadgeA|ManufacturerPlateA/i,
    paintPattern: /Coloured_Material1|^PaletteMaterial00[1-6]$/i,
    wheelPattern: /Wheel1A_3D/i,
    debrandPattern: /CallipersCalliper/i,
    lightPattern: /LightA_Material/i,
    specs: { zeroTo100: "4.5s", power: "585 cv", torque: "850 Nm", topSpeed: "240 km/h", consumption: "6,0 km/l" },
  },
  {
    id: "type-05",
    name: "Veltra Type 05",
    url: "/models/veltra-mclaren-artura.glb",
    targetLength: 4.54,
    price: "a partir de R$ 2.390.000",
    // mesmo caso do type-04: sem Paint/Base nomeado, aposta calculada.
    hidePattern: /BadgeB|ManufacturerPlat/i,
    paintPattern: /Coloured_Material1|^PaletteMaterial00[1-5]$/i,
    wheelPattern: /Wheel1A_3D/i,
    debrandPattern: /CallipersCallip/i,
    lightPattern: /LightA_Material/i,
    // conversível — mesmo cuidado de cor clara do antigo F8 Spider.
    defaultColorIndex: 3,
    specs: { zeroTo100: "3.0s", power: "700 cv", torque: "720 Nm", topSpeed: "330 km/h", consumption: "10,5 km/l" },
  },
  {
    id: "type-06",
    name: "Veltra Type 06",
    url: "/models/veltra-ferrari-roma.glb",
    targetLength: 4.66,
    price: "a partir de R$ 1.780.000",
    // nenhum Paint/Coloured/Base sobrevive — 100% mesclado em Palette,
    // aposta mais arriscada dessa leva (nenhuma pista de nome pra ancorar).
    hidePattern: /BadgeA|ManufacturerPlateA/i,
    paintPattern: /^PaletteMaterial00[1-8]$/i,
    wheelPattern: /Wheel2A_3D/i,
    lightPattern: /LightA_Material/i,
    specs: { zeroTo100: "3.4s", power: "620 cv", torque: "760 Nm", topSpeed: "320 km/h", consumption: "8,5 km/l" },
  },
  {
    id: "type-07",
    name: "Veltra Type 07",
    url: "/models/veltra-ferrari-purosangue.glb",
    targetLength: 4.97,
    price: "a partir de R$ 2.190.000",
    hidePattern: /BadgeA|ManufacturerPlateA/i,
    paintPattern: /^PaletteMaterial00[1-5]$/i,
    wheelPattern: /Wheel1A_3D/i,
    debrandPattern: /CallipersCalliperA/i,
    lightPattern: /LightA_Material/i,
    specs: { zeroTo100: "3.3s", power: "725 cv", torque: "716 Nm", topSpeed: "310 km/h", consumption: "6,5 km/l" },
  },
  {
    id: "type-08",
    name: "Veltra Type 08",
    url: "/models/veltra-ferrari-gtc4.glb",
    targetLength: 4.92,
    price: "a partir de R$ 1.690.000",
    // asset com nomes de material garbled/genéricos ("Meshesuntitled...") —
    // "base00"/"coloured0"/"paintdam" são os candidatos a pintura por
    // eliminação, "wheel"/"hubrf" pra roda. Configuração menos confiável do
    // catálogo, precisa de conferência visual assim que possível.
    hidePattern: /badge0|badgeok/i,
    paintPattern: /base00|coloured0|paintdam/i,
    wheelPattern: /wheel/i,
    lightPattern: /headlight/i,
    specs: { zeroTo100: "3.4s", power: "690 cv", torque: "697 Nm", topSpeed: "335 km/h", consumption: "6,0 km/l" },
  },
  {
    id: "type-09",
    name: "Veltra Type 09",
    url: "/models/veltra-porsche-911-interior.glb",
    targetLength: 4.53,
    price: "a partir de R$ 1.150.000",
    // asset com nomes semânticos claros (não é da família RewardRecycled) —
    // confirmado ter habitáculo modelado de verdade ("with_interior" no
    // nome original). "rim_black"/"rim_chrome" parecem 2 peças da roda
    // (não 2 opções alternativas) — pintadas juntas, sem risco identificado.
    hidePattern: /number_plate|LOGO1|invisible_all/i,
    paintPattern: /body_main/i,
    wheelPattern: /rim_black|rim_chrome/i,
    lightPattern: /headlights_pattern|headlights_plastic_ring|hedlights_grid|red_light_main/i,
    specs: { zeroTo100: "3.5s", power: "450 cv", torque: "530 Nm", topSpeed: "308 km/h", consumption: "9,0 km/l" },
  },
];

const PAINT_COLOR = "#2e3236"; // Veltra Graphite — cor padrão, trocável pelo painel de Cores
const WHEEL_COLOR = "#8f9296"; // acabamento padrão da roda, trocável pelo painel de Rodas

export type CarRefs = {
  paintMaterial: THREE.MeshPhysicalMaterial | null;
  wheelMaterial: THREE.MeshPhysicalMaterial | null;
  // null = carro sem porta animável (a maioria — casca única, ver CarConfig).
  doors?: { left: THREE.Group | null; right: THREE.Group | null } | null;
};

// Paleta baseada em cores reais de mostruário automotivo (inspiração Porsche:
// Guards Red, Jet Black, GT Silver) — bem saturadas de propósito, pra
// destacar contra o estúdio neutro em vez de se perder nele.
export const PAINT_SWATCHES = [
  { name: "Veltra Graphite", hex: "#2e3236" },
  { name: "Guards Red", hex: "#c11c1f" },
  { name: "Jet Black", hex: "#0a0a0a" },
  { name: "GT Silver", hex: "#d6d7d9" },
  { name: "Racing Yellow", hex: "#f0b400" },
  { name: "Miami Blue", hex: "#0090c9" },
  { name: "Python Green", hex: "#0f6b3a" },
];

export const WHEEL_SWATCHES = [
  { name: "Prata Polido", hex: "#c7c9cc", metalness: 0.95, roughness: 0.18 },
  { name: "Grafite", hex: "#3a3a3d", metalness: 0.85, roughness: 0.32 },
  { name: "Preto Fosco", hex: "#0e0e10", metalness: 0.5, roughness: 0.55 },
  { name: "Bronze", hex: "#8a6a3c", metalness: 0.9, roughness: 0.28 },
];

export const FINISH_SWATCHES = [
  { name: "Brilhante", roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.08 },
  { name: "Acetinado", roughness: 0.55, clearcoat: 0.35, clearcoatRoughness: 0.25 },
  { name: "Fosco", roughness: 0.78, clearcoat: 0, clearcoatRoughness: 0.5 },
];

// Sem preload de todos os carros aqui — com 10+ no catálogo isso baixaria
// todos os GLBs de uma vez no primeiro load. Cada CarModel só carrega o
// próprio config.url quando montado (o catálogo troca via `key={config.id}`).

// O traverse abaixo troca o material original de pintura/roda por uma
// instância compartilhada (paintMaterial/wheelMaterial) — sem isso o carro
// perde todo o relevo real do GLB (normal map de brushed-metal, AO de
// painel) e fica "achatado"/plástico comparado ao Blender. Essa função
// recupera esses mapas de detalhe do material ORIGINAL (`source`) e aplica
// na instância compartilhada (`target`), preservando o relevo sem perder a
// recolorabilidade do configurador (nunca copia o `map` de cor base).
function applyDetailMaps(
  target: THREE.MeshPhysicalMaterial,
  source: THREE.MeshStandardMaterial,
  mesh: THREE.Mesh
) {
  let changed = false;

  if (source.normalMap) {
    target.normalMap = source.normalMap;
    target.normalScale = source.normalScale ? source.normalScale.clone() : new THREE.Vector2(1, 1);
    changed = true;
  }
  if (source.roughnessMap) {
    target.roughnessMap = source.roughnessMap;
    changed = true;
  }
  if (source.metalnessMap) {
    target.metalnessMap = source.metalnessMap;
    changed = true;
  }
  if (source.aoMap && (mesh.geometry.attributes.uv2 || mesh.geometry.attributes.uv)) {
    // aoMap no three.js exige um 2º canal de UV (uv2/TEXCOORD_1) — assets
    // dessa leva (GLTF exportado) normalmente só têm TEXCOORD_0. Nesse caso
    // reaproveita o próprio uv como uv2 (comum ter a mesma malha de UV nos
    // dois canais); ensureAoUv2 abaixo garante isso mesh a mesh.
    target.aoMap = source.aoMap;
    target.aoMapIntensity = source.aoMapIntensity ?? 1;
    changed = true;
  }

  if (changed) target.needsUpdate = true;
}

// aoMap é textura por-material mas a amostragem usa o atributo uv2 de CADA
// geometria — como paintMaterial/wheelMaterial são compartilhados entre
// várias peças do carro, todo mesh que recebe o material precisa do próprio
// uv2, não só o primeiro que forneceu o mapa.
function ensureAoUv2(mesh: THREE.Mesh) {
  const geo = mesh.geometry;
  if (!geo.attributes.uv2 && geo.attributes.uv) {
    geo.setAttribute("uv2", geo.attributes.uv);
  }
}

export default function CarModel({
  config,
  mouseRef,
  carRef,
  onReady,
  doorsOpenRef,
}: {
  config: CarConfig;
  mouseRef: RefObject<{ x: number; y: number }>;
  carRef: RefObject<CarRefs>;
  onReady?: (bounds: { center: THREE.Vector3; size: THREE.Vector3 }) => void;
  doorsOpenRef?: RefObject<boolean>;
}) {
  const gltf = useGLTF(config.url);
  const groupRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState(1);

  // Pintura automotiva real: base coat + clearcoat separado, reflexo mais
  // profundo que um MeshStandardMaterial simples consegue dar.
  const paintMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: PAINT_COLOR,
        metalness: 0.6,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 2.1,
      }),
    []
  );

  const wheelMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: WHEEL_COLOR,
        metalness: 0.9,
        roughness: 0.18,
        envMapIntensity: 1.8,
      }),
    []
  );

  useEffect(() => {
    // useGLTF cacheia a cena por URL — ao revisitar o mesmo carro, a cena já
    // vem com o offset da montagem anterior aplicado em `.position`. Sem
    // zerar antes de medir, o box é lido deslocado e o recálculo devolve o
    // carro pro pivô cru (afundado/deslocado). Sempre resetar antes de medir.
    gltf.scene.position.set(0, 0, 0);

    // Passo 1: identifica a(s) textura(s) usada(s) pelos materiais de marca
    // (crest/plaqueta) — a mesma imagem pode estar compartilhada num atlas
    // com outro material que continuaria visível.
    const brandedTextures = new Set<THREE.Texture>();
    gltf.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const isBranded = config.hidePattern.test(mesh.name) || (mat && config.hidePattern.test(mat.name));
      if (isBranded && mat?.map) brandedTextures.add(mat.map);
    });

    gltf.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      // só recalcula se a malha não trouxe normal própria — forçar em todo
      // mesh quebra o tangent space de peças com normal map (sombreado errado).
      if (!mesh.geometry.attributes.normal) mesh.geometry.computeVertexNormals();

      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat) return;

      // Qualquer material que aponte pra mesma textura do crest/placa some
      // também, mesmo que o nome não bata com o padrão — evita vazamento de
      // marca de terceiro num atlas compartilhado.
      if (
        config.hidePattern.test(mesh.name) ||
        config.hidePattern.test(mat.name) ||
        (mat.map && brandedTextures.has(mat.map))
      ) {
        mesh.visible = false;
        return;
      }

      if (config.paintPattern.test(mesh.name) || config.paintPattern.test(mat.name)) {
        // recalcula normal SEMPRE aqui, mesmo se a malha já tinha uma — em
        // alguns GLBs a normal comprimida via Draco sai degradada/invertida
        // nesse painel específico, fazendo a pintura nova (sem mapa) renderizar
        // como se estivesse desligada da luz (quase preta). Como paintMaterial
        // não usa normal map de pintura, recalcular aqui nunca piora, só pode
        // corrigir (o normalMap de detalhe capturado abaixo é textura própria,
        // não afetada pela normal de vértice).
        mesh.geometry.computeVertexNormals();
        if (!paintMaterial.userData.mapsApplied) {
          applyDetailMaps(paintMaterial, mat, mesh);
          paintMaterial.userData.mapsApplied = true;
        }
        if (paintMaterial.aoMap) ensureAoUv2(mesh);
        mesh.material = paintMaterial;
        carRef.current.paintMaterial = paintMaterial;
        return;
      }

      if (config.wheelPattern.test(mesh.name) || config.wheelPattern.test(mat.name)) {
        if (!wheelMaterial.userData.mapsApplied) {
          applyDetailMaps(wheelMaterial, mat, mesh);
          wheelMaterial.userData.mapsApplied = true;
        }
        if (wheelMaterial.aoMap) ensureAoUv2(mesh);
        mesh.material = wheelMaterial;
        carRef.current.wheelMaterial = wheelMaterial;
        return;
      }

      // Conjunto óptico (farol/lanterna) — emissive ligado, como se o carro
      // estivesse aceso. Distingue vermelho (lanterna traseira) de branco
      // quente (farol) só quando o nome do material já diferencia os dois
      // (ex: LightGlass_Red vs LightGlass_Clear); senão usa branco quente
      // genérico pro conjunto óptico inteiro.
      if (config.lightPattern && (config.lightPattern.test(mesh.name) || config.lightPattern.test(mat.name))) {
        const isRear = /red|tail|traseir/i.test(mesh.name) || /red|tail|traseir/i.test(mat.name);
        mat.emissive = new THREE.Color(config.lightColor ?? (isRear ? "#ff3b30" : "#fff4d6"));
        mat.emissiveIntensity = isRear ? 1.4 : 1.8;
        mat.toneMapped = false;
        return;
      }

      // Vidro/janela com marca d'água de terceiro na textura — tira o mapa e
      // vira vidro fumê genérico (fake glass: transparência + reflexo, sem
      // transmission real, mais barato e sem a marca).
      if (config.glassPattern && (config.glassPattern.test(mesh.name) || config.glassPattern.test(mat.name))) {
        mat.map = null;
        mat.color.set("#1a1e22");
        mat.transparent = true;
        mat.opacity = 0.55;
        mat.roughness = 0.05;
        mat.metalness = 0.1;
        return;
      }

      // Crest/nome de marca gravado na própria textura de uma peça (ex: pinça
      // de freio) — não dá pra esconder a peça inteira, então tira o mapa e
      // usa cor sólida fixa (não é configurável pelo usuário).
      if (config.debrandPattern && (config.debrandPattern.test(mesh.name) || config.debrandPattern.test(mat.name))) {
        mat.map = null;
        mat.color.set("#8a1418");
      }

      // Blindagem genérica: material do GLB original que sobrou sem
      // classificação (não é paint/wheel/light/glass/debrand) e é um espelho
      // quase perfeito (roughness ~0 + metalness alto) estoura como "disco
      // branco" sob a luz forte do estúdio — achado real no Type 03 (BMW M4):
      // "brake disc_Material #408" (metalness 0.85, roughness 0) e
      // "Cylinder002_Material #574" (metalness 0.72, roughness 0), nenhum dos
      // dois com textura de roughness pra restaurar (é factor puro, sem mapa).
      // Só um piso mínimo evita o estouro sem embaçar cromados propositais.
      if (mat.metalness > 0.3 && mat.roughness < 0.12) {
        console.log("[DEBUG roughness-fix]", mesh.name, mat.name, "metalness=", mat.metalness, "roughness before=", mat.roughness);
        mat.roughness = 0.12;
      }
      if (/tire/i.test(mesh.name)) {
        console.log("[DEBUG tire]", mesh.name, mat.name, "metalness=", mat.metalness, "roughness=", mat.roughness, "vertexColors=", mat.vertexColors);
      }

      mat.flatShading = false;
    });

    // Porta animável (só Huracán tem peça separada — ver CarConfig.doorLeftPattern).
    // Reagrupa os meshes da porta num THREE.Group pivotado na dobradiça (borda
    // frontal-externa), usando `attach()` pra preservar a posição visual ao
    // trocar de pai — depois só gira o group.rotation.y pra abrir/fechar.
    const buildDoorGroup = (pattern: RegExp | undefined, sign: 1 | -1) => {
      if (!pattern) return null;
      const doorMeshes: THREE.Mesh[] = [];
      gltf.scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh && pattern.test(mesh.name)) doorMeshes.push(mesh);
      });
      if (doorMeshes.length === 0) return null;

      const box = new THREE.Box3();
      doorMeshes.forEach((m) => box.expandByObject(m));
      const size = box.getSize(new THREE.Vector3());
      // dobradiça na borda frontal-externa: lado externo = min.x pra porta
      // esquerda (sign -1), max.x pra direita (sign +1); frente do carro é
      // +Z nessa convenção — usa a borda de maior Z como aproximação da
      // dobradiça frontal (ajuste fino visual pode ser necessário depois).
      const hinge = new THREE.Vector3(
        sign < 0 ? box.min.x : box.max.x,
        box.min.y,
        box.max.z - size.z * 0.05
      );

      const group = new THREE.Group();
      group.position.copy(hinge);
      gltf.scene.add(group);
      doorMeshes.forEach((m) => group.attach(m));
      return group;
    };

    const leftDoor = buildDoorGroup(config.doorLeftPattern, -1);
    const rightDoor = buildDoorGroup(config.doorRightPattern, 1);
    carRef.current.doors = leftDoor || rightDoor ? { left: leftDoor, right: rightDoor } : null;

    const probe = gltf.scene.clone(true);
    probe.updateMatrixWorld(true);
    const rawBox = new THREE.Box3().setFromObject(probe);
    const rawSize = rawBox.getSize(new THREE.Vector3());
    const rawCenter = rawBox.getCenter(new THREE.Vector3());
    const computedScale = config.targetLength / Math.max(rawSize.x, rawSize.y, rawSize.z);
    setScale(computedScale);
    gltf.scene.position.set(-rawCenter.x, -rawBox.min.y, -rawCenter.z);

    const size = rawSize.clone().multiplyScalar(computedScale);
    const center = new THREE.Vector3(0, size.y / 2, 0);
    onReady?.({ center, size });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gltf, paintMaterial, wheelMaterial, config]);

  useFrame((state, delta) => {
    const mouse = mouseRef.current ?? { x: 0, y: 0 };
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      // Movimento quase imperceptível — a câmera é quem conta a história,
      // o carro só "respira".
      groupRef.current.rotation.y = mouse.x * 0.02 + Math.sin(t * 0.08) * 0.003;
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.004;
    }

    // Porta abre/fecha suavemente (lerp), só existe quando o asset tem peça
    // separada (Huracán) — carRef.current.doors fica null nos outros.
    const doors = carRef.current.doors;
    if (doors) {
      const targetAngle = doorsOpenRef?.current ? Math.PI * 0.32 : 0;
      const speed = 1 - Math.pow(0.001, delta);
      if (doors.left) doors.left.rotation.y += (-targetAngle - doors.left.rotation.y) * speed;
      if (doors.right) doors.right.rotation.y += (targetAngle - doors.right.rotation.y) * speed;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={gltf.scene} />
    </group>
  );
}
