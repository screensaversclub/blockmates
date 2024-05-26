import TTTText from "@/components/TTTText";
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
    <div className='flex min-h-screen w-full flex-col items-center justify-start gap-4 py-4'>
      <h1 className='mt-8 text-xl'>Help make someone's day!</h1>
      <TTTText target='my' as='p'>
        Help me with this!
      </TTTText>
      <p>See some requests for help by your neighbours.</p>

      <div id='list_of_requests' className='mt-8 grid grid-cols-1 gap-4'>
        {helpRequests.data.map((helpReq) => (
          <div
            key={helpReq.id}
            className='flex items-center gap-4 rounded bg-white px-2 py-4 shadow'
          >
            <div className='w-16 flex-shrink-0'>
              <UserAvatar userId={helpReq.created_by} />
            </div>
            <div className='mb-2'>
              <div className=''>
                <Link href={`/home/helping-hands/${helpReq.id}`}>
                  <h3 className='text-lg font-medium'>
                    <TTTText as='span' target='my'>
                      {helpReq.title}
                    </TTTText>
                  </h3>
                </Link>
                <div>
                  {helpReq.themes.map((theme) => (
                    <span
                      key={theme}
                      className='inline-block rounded border border-green-600 px-2 py-1 text-xs uppercase text-green-600'
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
              <p className='clamp-3-lines text-gray-600'>{helpReq.body}</p>

              <small>
                {format(new Date(helpReq.created_at), "yyyy-MMM-dd HH:mm a")}
                {/* {formatRelative(new Date(helpReq.created_at))} */}
              </small>
            </div>
          </div>
        ))}
      </div>

      <div className='sticky bottom-0 w-full bg-white p-4'>
        <Link href='/home/helping-hands/find' className='w-full'>
          <button className='w-full'>Ask for help</button>
        </Link>
      </div>
    </div>
  );
}
