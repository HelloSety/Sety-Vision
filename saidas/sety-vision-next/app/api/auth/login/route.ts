import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.DASHBOARD_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("dash_session", expected, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("dash_session");
  return NextResponse.json({ ok: true });
}
