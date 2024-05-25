import { createClient } from "@/utils/supabase/server";
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

  return (
    <Fragment>
      <nav className="flex items-center justify-between w-full p-4 text-white bg-green-800">
        Hello {user.data.user.email}
        <button type="button" className="border-white">
          Log out
        </button>
      </nav>
      <main>{children}</main>
    </Fragment>
  );
}
