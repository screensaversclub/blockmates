import UserAvatar from "@/components/UserAvatar";
import { createClient } from "@/utils/supabase/server";
import { format } from "date-fns";
import Link from "next/link";

export default async function OfferHelp() {
  const sb = createClient();
  await sb.auth.getUser();

  const helpRequests = await sb
    .from("help_request")
    .select("id, created_at, created_by, themes, title, body")
    .order("created_at", {
      ascending: false,
    });

  if (helpRequests.data === null) {
    return <div>Error fetching help requests. Try again. </div>;
  }

  return (
    <div className='flex flex-col items-center justify-start w-full min-h-screen py-4 gap-4'>
      <h1 className='mt-8 text-xl'>Help make someone's day!</h1>
      <p>See some requests for help by your neighbours.</p>

      <div id='list_of_requests' className='mt-8 grid grid-cols-1 gap-4'>
        {helpRequests.data.map((helpReq) => (
          <div
            key={helpReq.id}
            className='flex items-center px-2 py-4 bg-white rounded shadow gap-4'
          >
            <div className='flex-shrink-0 w-16'>
              <UserAvatar userId={helpReq.created_by} />
            </div>
            <div className='mb-2'>
              <div className=''>
                <h3 className='text-lg font-medium'>{helpReq.title}</h3>
                <div>
                  {helpReq.themes.map((theme) => (
                    <span
                      key={theme}
                      className='inline-block px-2 py-1 text-xs text-green-600 uppercase border border-green-600 rounded'
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
              <p className='text-gray-600 clamp-3-lines'>{helpReq.body}</p>

              <small>
                {format(new Date(helpReq.created_at), "yyyy-MMM-dd HH:mm a")}
              </small>
            </div>
          </div>
        ))}
      </div>

      <div className='sticky bottom-0 w-full p-4 bg-white'>
        <Link href='/home/helping-hands/find' className='w-full'>
          <button className='w-full'>Ask for help</button>
        </Link>
      </div>
    </div>
  );
}
