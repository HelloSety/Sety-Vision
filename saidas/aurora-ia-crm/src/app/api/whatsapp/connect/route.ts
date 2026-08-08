import { NextResponse } from "next/server";

const BASE  = process.env.UAZAPI_BASE_URL!;
const TOKEN = process.env.UAZAPI_INSTANCE_TOKEN!;

export async function GET() {
  try {
    const res = await fetch(`${BASE}/instance/connect`, {
      headers: { token: TOKEN },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: await res.text() }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({
      base64: data?.qrcode ?? null,
      code:   data?.pairingCode ?? null,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
