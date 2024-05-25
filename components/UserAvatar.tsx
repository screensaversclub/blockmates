"use client";

import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function UserAvatar({
  userId,
  layout = "vertical",
}: {
  userId: string;
  layout?: "vertical" | "horizontal";
}) {
  const sb = createClient();

  const [userMeta, setUserMeta] =
    useState<Database["public"]["Tables"]["user_metadata"]["Row"]>();

  useEffect(() => {
    sb.from("user_metadata")
      .select()
      .eq("user_id", userId)
      .single()
      .then((response) => {
        if (response.error === null) {
          setUserMeta(response.data);
        }
      });
  }, [userId]);

  if (userMeta === undefined) {
    return <figure>...</figure>;
  }

  if (layout === "horizontal") {
    return (
      <figure className='flex w-full items-center justify-start gap-3'>
        <b className='flex aspect-[1] w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-800 text-white'>
          {userMeta.name.charAt(0)}
        </b>
        <small className='block text-center text-sm text-gray-600'>
          {userMeta.name}
        </small>
      </figure>
    );
  }

  return (
    <figure>
      <b className='flex aspect-[1] w-full items-center justify-center rounded-full bg-green-800 text-white'>
        {userMeta.name.charAt(0)}
      </b>
      <small className='mt-2 block text-center text-xs text-gray-600'>
        {userMeta.name}
      </small>
    </figure>
  );
}
