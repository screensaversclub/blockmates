import { LogoutButton } from "@/components/LogoutButton";
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
      <nav className='sticky top-0 flex items-center justify-between w-full p-4 text-white bg-teal-600'>
        <Link href='/home'>
          <img
            src='/logo.png'
            alt='logo'
            className='absolute left-0 top-[50%] w-36 -translate-y-[50%]'
          />
        </Link>

        <div className='flex items-center gap-4'>
          {name || user.data.user.email}

          <LogoutButton />
        </div>
      </nav>
      <div className='w-full max-w-4xl px-4'>{children}</div>
    </Fragment>
  );
}
