import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Gate de senha do dashboard DESATIVADO a pedido do Seven (2026-07-14) —
// estrutura mantida de propósito pra reativar rápido: troque o `return
// NextResponse.next()` abaixo por volta do bloco de checagem de cookie.
// Isso deixa /crm, /leads, /painel etc. (dado real via Supabase) públicos.
export function proxy(_request: NextRequest) {
  return NextResponse.next();

  // --- lógica original, preservada pra reativação rápida ---
  // const session = request.cookies.get("dash_session")?.value;
  // const expected = process.env.DASHBOARD_PASSWORD;
  // if (expected && session === expected) return NextResponse.next();
  // const url = new URL("/entrar", request.url);
  // url.searchParams.set("next", request.nextUrl.pathname);
  // return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/painel",
    "/crm",
    "/leads",
    "/pipeline",
    "/propostas",
    "/financeiro",
    "/whatsapp",
    "/ia",
    "/automacoes",
    "/campanhas",
    "/agenda",
    "/equipe",
    "/relatorios",
    "/integracoes",
    "/landing-pages",
    "/plano-marketing",
    "/plano-marketing/:path*",
    "/academia",
    "/notificacoes",
    "/configuracoes",
  ],
};
