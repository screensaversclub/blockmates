import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sb = createClient();
  const user = await sb.auth.getUser();

  if (user.data.user === null) {
    redirect("/");
  }

  const { data: nameData } = await sb
    .from("user_metadata")
    .select("name")
    .filter("user_id", "eq", user.data.user.id)
    .single();
  const name = nameData === null ? null : nameData.name;

  return (
    <Fragment>
      <nav className="flex items-center justify-between w-full p-4 text-white bg-green-800">
        <Link href="/home">
          <span>BlockMates</span>
        </Link>

        <div className="flex items-center gap-4">
          {name || user.data.user.email}

          <button type="button" className="text-green-700">
            Log out
          </button>
        </div>
      </nav>
      <div className="w-full max-w-4xl px-4">{children}</div>
    </Fragment>
  );
}
