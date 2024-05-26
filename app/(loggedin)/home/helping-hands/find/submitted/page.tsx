import Link from "next/link";

export default function AskForHelp() {
  return (
    <div className='flex w-full flex-col items-center justify-start gap-4 py-4'>
      <h1 className='mt-8 text-xl'>Your request is submitted 👍</h1>
      <p>Browse other requests to see if you can help someone too!</p>
      <Link href='/home/helping-hands/offer'>
        <button className='w-full rounded border border-teal-700 bg-white px-4 py-2 text-teal-600 transition duration-300 ease-in-out hover:bg-teal-700 hover:text-white'>
          Browse requests
        </button>
      </Link>
    </div>
  );
}
