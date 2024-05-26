"use client";

import { createClient } from "@/utils/supabase/client";

export function LogoutButton() {
  return (
    <button
      type='button'
      className='border-white bg-[transparent] p-1 px-2 text-white'
      onClick={async () => {
        const sb = createClient();
        await sb.auth.getUser();
        await sb.auth.signOut();
      }}
    >
      Log out
    </button>
  );
}
