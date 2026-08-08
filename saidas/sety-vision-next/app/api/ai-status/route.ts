import { NextResponse } from "next/server";
import { getModelManagerStatus } from "@/lib/ai-model-manager";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getModelManagerStatus());
}
