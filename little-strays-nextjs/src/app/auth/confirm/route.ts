import type { EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const next = requestUrl.searchParams.get("next") ?? "/account";
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/account";

  if (tokenHash && type) {
    const supabase = await createClient();

    if (supabase) {
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash: tokenHash
      });

      if (!error) {
        redirect(safeNext);
      }
    }
  }

  redirect(
    `/login?message=${encodeURIComponent("Could not confirm your account. Please try again.")}`
  );
}
