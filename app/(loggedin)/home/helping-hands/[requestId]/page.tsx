import UserAvatar from "@/components/UserAvatar";
import { getInspirationalMessage, getIsOwnPost } from "./actions";
import { format } from "date-fns";
import Link from "next/link";

export default async function SingleRequestView({ params }: any) {
  const { requestId } = params;
  const { isOwnPost } = await getIsOwnPost(requestId);

  const { inspirationalMessage, title, body, requesterId, requestDate } =
    await getInspirationalMessage(requestId, isOwnPost);

  return (
    <div>
      <div className='my-4'>
        <div className='w-full'>
          <UserAvatar layout='horizontal' userId={requesterId} />
        </div>

        <h1 className='text-xl font-medium'>{title}</h1>
        <h2>{body}</h2>
        <small className='text-xs text-gray-600'>
          {format(new Date(requestDate), "yyyy-MMM-dd HH:mm a")}
        </small>
      </div>
      <div className='my-4 bg-yellow-100 p-4'>
        <h1 className='mb-4 text-center text-sm font-bold uppercase text-yellow-800'>
          Why should you help?
        </h1>
        <blockquote className='font-italic'>
          <p>{inspirationalMessage ? inspirationalMessage : null}</p>
        </blockquote>
      </div>

      <div>
        <Link href='/home/helping-hands/offer'>
          <button>Back</button>
        </Link>
      </div>
    </div>
  );
}
