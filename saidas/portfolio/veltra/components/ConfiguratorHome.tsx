"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Bounds } from "./scene/Scene";
import { CAR_MODELS, PAINT_SWATCHES, WHEEL_SWATCHES, FINISH_SWATCHES, type CarRefs } from "./scene/CarModel";
import { VIEW_COUNT, VIEW_LABELS } from "./scene/CameraRig";
import Header from "./configurator/Header";
import ViewArrows from "./configurator/ViewArrows";
import Toolbar from "./configurator/Toolbar";
import SwatchPanel from "./configurator/SwatchPanel";
import ModelOverview from "./configurator/ModelOverview";
import SpecStrip from "./configurator/SpecStrip";
import InteriorShowcase from "./configurator/InteriorShowcase";
import PersonalizeSection from "./configurator/PersonalizeSection";
import DetailGallery from "./configurator/DetailGallery";
import SummaryFooter from "./configurator/SummaryFooter";

const Scene = dynamic(() => import("./scene/Scene"), { ssr: false, loading: () => null });

export default function ConfiguratorHome() {
  const [mode, setMode] = useState<"overview" | "configurator">("overview");
  const [modelIndex, setModelIndex] = useState(0);
  const viewRef = useRef(1);
  const boundsRef = useRef<Bounds | null>(null);
  const carRef = useRef<CarRefs>({ paintMaterial: null, wheelMaterial: null });
  const [viewIndex, setViewIndex] = useState(1);
  // Arrastar gira livremente 360° a partir da vista fixa atual — não usa
  // state (evitaria re-render a cada pixel), CameraRig lê isso por frame.
  const dragAngleRef = useRef(0);
  const dragStart = useRef<{ x: number; angle: number } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState(0);
  const [activeWheel, setActiveWheel] = useState(0);
  const [activeFinish, setActiveFinish] = useState(0);
  // GLB pode levar alguns segundos em rede lenta — sem isso o visitante
  // encara um estúdio branco vazio, primeira impressão ruim vindo de um post.
  const [loading, setLoading] = useState(true);
  // Porta animável — só existe em carros com peça separada no asset (hoje só
  // o Huracán, ver CarConfig.doorLeftPattern). doorsOpenRef é lido no useFrame
  // do CarModel; doorsOpen (state) só existe pra atualizar o texto do botão.
  const doorsOpenRef = useRef(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const hasDoors = Boolean(CAR_MODELS[modelIndex].doorLeftPattern);
  const toggleDoors = () => {
    const next = !doorsOpenRef.current;
    doorsOpenRef.current = next;
    setDoorsOpen(next);
  };

  const changeView = (delta: number) => {
    const next = (viewIndex + delta + VIEW_COUNT) % VIEW_COUNT;
    viewRef.current = next;
    setViewIndex(next);
    dragAngleRef.current = 0;
  };

  const jumpToView = (index: number) => {
    viewRef.current = index;
    setViewIndex(index);
    dragAngleRef.current = 0;
  };

  // 360° livre: arrasta com mouse/dedo pra girar em torno do carro. Só faz
  // sentido nas 4 vistas orbitais (Frente/3-4/Traseira) — Topo e Interior
  // usam pose fixa própria, CameraRig ignora o ângulo nesses casos.
  const onDragStart = (x: number) => {
    dragStart.current = { x, angle: dragAngleRef.current };
  };
  const onDragMove = (x: number) => {
    if (!dragStart.current) return;
    const deltaX = x - dragStart.current.x;
    dragAngleRef.current = dragStart.current.angle + deltaX * 0.008;
  };
  const onDragEnd = () => {
    dragStart.current = null;
  };

  // Reaplicado sempre que o modelo termina de carregar (onReady) — evita que
  // um clique durante o load pinte o material do carro anterior, e garante
  // que a cor/roda/acabamento ativos sempre reflitam no carro atual.
  const applyActiveConfig = () => {
    setLoading(false);
    const paint = carRef.current.paintMaterial;
    if (paint) {
      paint.color.set(PAINT_SWATCHES[activeColor].hex);
      const finish = FINISH_SWATCHES[activeFinish];
      paint.roughness = finish.roughness;
      paint.clearcoat = finish.clearcoat;
      paint.clearcoatRoughness = finish.clearcoatRoughness;
    }
    const wheel = carRef.current.wheelMaterial;
    if (wheel) {
      const w = WHEEL_SWATCHES[activeWheel];
      wheel.color.set(w.hex);
      wheel.metalness = w.metalness;
      wheel.roughness = w.roughness;
    }
  };

  const pickColor = (index: number) => {
    setActiveColor(index);
    const mat = carRef.current.paintMaterial;
    if (mat) mat.color.set(PAINT_SWATCHES[index].hex);
  };

  const pickWheel = (index: number) => {
    setActiveWheel(index);
    const mat = carRef.current.wheelMaterial;
    if (mat) {
      const w = WHEEL_SWATCHES[index];
      mat.color.set(w.hex);
      mat.metalness = w.metalness;
      mat.roughness = w.roughness;
    }
  };

  const pickFinish = (index: number) => {
    setActiveFinish(index);
    const mat = carRef.current.paintMaterial;
    if (mat) {
      const f = FINISH_SWATCHES[index];
      mat.roughness = f.roughness;
      mat.clearcoat = f.clearcoat;
      mat.clearcoatRoughness = f.clearcoatRoughness;
    }
  };

  const selectModel = (index: number) => {
    // troca de mode é interna (SPA, sem navegação real) — o scroll da
    // Visão Geral (que agora tem 9 cards, rola bem além da 1ª tela) senão
    // fica "herdado" e o configurador abre já rolado pra baixo do hero 3D.
    window.scrollTo(0, 0);
    boundsRef.current = null;
    carRef.current = { paintMaterial: null, wheelMaterial: null };
    setModelIndex(index);
    setActiveColor(CAR_MODELS[index].defaultColorIndex ?? 0);
    setActiveWheel(0);
    setActiveFinish(0);
    setActiveCategory(null);
    viewRef.current = 1;
    setViewIndex(1);
    dragAngleRef.current = 0;
    doorsOpenRef.current = false;
    setDoorsOpen(false);
    setLoading(true);
    setMode("configurator");
  };

  if (mode === "overview") {
    return <ModelOverview onSelect={selectModel} />;
  }

  const car = CAR_MODELS[modelIndex];

  return (
    <main className="relative w-full bg-paper">
      <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={(e) => onDragStart(e.clientX)}
        onPointerMove={(e) => onDragMove(e.clientX)}
        onPointerUp={onDragEnd}
        onPointerLeave={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <Scene
          viewRef={viewRef}
          boundsRef={boundsRef}
          carRef={carRef}
          config={CAR_MODELS[modelIndex]}
          onReady={applyActiveConfig}
          dragAngleRef={dragAngleRef}
          doorsOpenRef={doorsOpenRef}
          active
        />
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-paper transition-opacity duration-500 ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[13px] uppercase tracking-[0.4em] text-mist">Veltra</span>
      </div>

      <Header
        modelName={CAR_MODELS[modelIndex].name}
        onBack={() => {
          window.scrollTo(0, 0);
          setMode("overview");
        }}
      />
      <ViewArrows onPrev={() => changeView(-1)} onNext={() => changeView(1)} />

      {hasDoors && (
        <button
          onClick={toggleDoors}
          className="absolute bottom-34 left-1/2 z-20 -translate-x-1/2 rounded-full border border-ink/15 bg-white/80 px-5 py-2.5 text-[12px] text-ink backdrop-blur transition-colors hover:bg-white"
        >
          {doorsOpen ? "Fechar portas" : "Abrir portas"}
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-[130px] flex flex-col items-center gap-3">
        <span className="rounded-full bg-white/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-mist backdrop-blur">
          {VIEW_LABELS[viewIndex]}
        </span>
        {/* Botões numerados — pula direto pra qualquer vista (inclui Interior)
            sem precisar clicar na seta várias vezes. */}
        <div className="pointer-events-auto flex gap-2">
          {VIEW_LABELS.map((label, i) => (
            <button
              key={label}
              onClick={() => jumpToView(i)}
              aria-label={label}
              className={`grid h-7 w-7 place-items-center rounded-full border text-[11px] backdrop-blur transition-colors ${
                viewIndex === i ? "border-ink bg-ink text-paper" : "border-ink/15 bg-white/70 text-ink hover:bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {activeCategory === "Cores" && <SwatchPanel items={PAINT_SWATCHES} active={activeColor} onPick={pickColor} />}
      {activeCategory === "Rodas" && <SwatchPanel items={WHEEL_SWATCHES} active={activeWheel} onPick={pickWheel} />}
      {activeCategory === "Materiais" && (
        <SwatchPanel items={FINISH_SWATCHES} active={activeFinish} onPick={pickFinish} />
      )}

      <Toolbar
        active={activeCategory}
        onSelect={(name) => setActiveCategory(activeCategory === name ? null : name)}
        price={CAR_MODELS[modelIndex].price}
      />
      </section>

      <div className="py-16">
        <SpecStrip specs={car.specs} />
      </div>

      <InteriorShowcase carId={car.id} />

      <PersonalizeSection
        modelName={car.name}
        activeColor={activeColor}
        activeWheel={activeWheel}
        activeFinish={activeFinish}
        onPickColor={pickColor}
        onPickWheel={pickWheel}
        onPickFinish={pickFinish}
      />

      <DetailGallery carId={car.id} />

      <SummaryFooter
        carId={car.id}
        modelName={car.name}
        colorName={PAINT_SWATCHES[activeColor].name}
        wheelName={WHEEL_SWATCHES[activeWheel].name}
        price={car.price}
      />
    </main>
  );
}
