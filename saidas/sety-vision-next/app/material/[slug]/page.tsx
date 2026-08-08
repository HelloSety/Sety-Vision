import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLeadMagnet } from "@/lib/lead-magnets";
import { MaterialCaptura } from "@/app/components/landing/MaterialCaptura";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const magnet = getLeadMagnet(slug);
  if (!magnet) return {};
  return {
    title: `${magnet.titulo} | Sety Vision`,
    description: magnet.subtitulo,
  };
}

export default async function MaterialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const magnet = getLeadMagnet(slug);
  if (!magnet) notFound();
  const { whatsappMensagem: _fn, ...magnetSerializavel } = magnet;
  return <MaterialCaptura magnet={magnetSerializavel} />;
}
