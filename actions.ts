"use server";

import { createClient } from "@/utils/supabase/server";

export const postSecretPayload = async (msg: string) => {
  const sb = createClient();
  await sb.auth.getUser();
};
