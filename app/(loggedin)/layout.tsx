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

  const { data: userData } = await sb
    .from("user_metadata")
    .select("name,language")
    .filter("user_id", "eq", user.data.user.id)
    .single();
  const name = userData === null ? null : userData.name;
  const userLang =
    userData === null ? null : (
      <small className='font-bold uppercase'>{userData.language}</small>
    );

  return (
    <Fragment>
      <nav className='sticky top-0 z-[300] flex w-full items-center justify-between bg-teal-600 p-4 text-white'>
        <Link href='/home'>
          <img
            src='/logo.png'
            alt='logo'
            className='absolute left-0 top-[50%] w-36 -translate-y-[50%]'
          />
        </Link>

        <div className='flex items-center gap-4'>
          <div className='flex flex-col items-end gap-1 leading-[1]'>
            <span>{name || user.data.user.email}</span>
            {userLang}
          </div>

          <LogoutButton />
        </div>
      </nav>
      <div className='w-full max-w-4xl px-4'>{children}</div>
    </Fragment>
  );
}
