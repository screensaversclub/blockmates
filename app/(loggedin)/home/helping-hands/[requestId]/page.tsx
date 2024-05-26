import UserAvatar from "@/components/UserAvatar";
import { getInspirationalMessage, getIsOwnPost } from "./actions";
import { format } from "date-fns";
import Link from "next/link";
import TTTText from "@/components/TTTText";

export default async function SingleRequestView({ params }: any) {
  const { requestId } = params;
  const { isOwnPost } = await getIsOwnPost(requestId);

  const { inspirationalMessage, title, body, requesterId, requestDate } =
    await getInspirationalMessage(requestId, isOwnPost);

  return (
    <div>
      <div className='py-8'>
        <div className='w-full'>
          <UserAvatar layout='horizontal' userId={requesterId} />
        </div>
        <small className='text-xs text-gray-600'>
          {format(new Date(requestDate), "yyyy-MMM-dd HH:mm a")}
        </small>

        <h1 className='text-xl font-medium'>
          <TTTText as='span'>{title}</TTTText>
        </h1>

        <div className='text-lg'>
          <TTTText as='p'>{body}</TTTText>
        </div>
      </div>

      {inspirationalMessage ? (
        <div className='my-4 bg-yellow-100 p-4'>
          <h1 className='mb-4 text-center text-sm font-bold uppercase text-yellow-800'>
            Why should you help?
          </h1>
          <blockquote className='font-italic'>
            <TTTText as='p'>
              {inspirationalMessage ? inspirationalMessage : null}
            </TTTText>
          </blockquote>
        </div>
      ) : null}

      <div>
        <Link href='/home/helping-hands/offer'>
          <button className='w-full rounded border border-teal-700 bg-white px-4 py-2 text-teal-600 transition duration-300 ease-in-out hover:bg-teal-700 hover:text-white'>
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}
