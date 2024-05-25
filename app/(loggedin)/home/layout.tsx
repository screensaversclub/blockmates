import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sb = createClient();
  const { data } = await sb.auth.getUser();

  const hasRow = await sb
    .from("user_metadata")
    .select()
    .eq("user_id", data.user!.id);

  if (hasRow.data == null || hasRow.data.length !== 1) {
    redirect("/welcome");
  }

  return <Fragment>{children}</Fragment>;
}
