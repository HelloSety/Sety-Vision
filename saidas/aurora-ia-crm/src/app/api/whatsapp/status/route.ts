import { NextResponse } from "next/server";

const BASE  = process.env.UAZAPI_BASE_URL!;
const TOKEN = process.env.UAZAPI_INSTANCE_TOKEN!;

export async function GET() {
  try {
    const res = await fetch(`${BASE}/instance/status`, {
      headers: { token: TOKEN },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ state: "error", detail: await res.text() }, { status: res.status });
    }

    const data = await res.json();
    const state = data?.status?.connected ? "open" : "close";
    return NextResponse.json({ state, phone: data?.instance?.owner ?? null });
  } catch (err) {
    return NextResponse.json({ state: "error", detail: String(err) }, { status: 500 });
  }
}
