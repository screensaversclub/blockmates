import Link from "next/link";

export default async function HelpingHands() {
  return (
    <div className='mt-8 flex flex-col gap-8'>
      <p className='f text-xl text-teal-600'>
        Find help, or offer help to someone!
      </p>
      <div className='flex flex-col items-stretch justify-start gap-4'>
        <Link href='/home/helping-hands/find'>
          <button
            className='w-full rounded border border-teal-700 bg-white px-4 py-2 text-teal-600 transition duration-300 ease-in-out hover:bg-teal-700 hover:text-white'
            type='button'
          >
            Find Help
          </button>
        </Link>
        <Link href='/home/helping-hands/offer'>
          <button
            className='w-full rounded border border-teal-600 bg-white px-4 py-2 text-teal-700 transition duration-300 ease-in-out hover:bg-teal-700 hover:text-white'
            type='button'
          >
            Offer Help
          </button>
        </Link>
      </div>
    </div>
  );
}
