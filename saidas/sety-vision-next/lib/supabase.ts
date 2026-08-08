import { createClient } from "@supabase/supabase-js";

/**
 * Client server-side (service role) — nunca importar em componente "use client".
 * RLS do banco só libera leitura/escrita pra service_role ou usuário autenticado;
 * este app não tem login próprio, então todo acesso a dados reais passa por aqui,
 * dentro de route handlers protegidos pelo middleware (Basic Auth).
 */
export function getSupabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
