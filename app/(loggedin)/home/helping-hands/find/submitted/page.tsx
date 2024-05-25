import Link from "next/link";

export default function AskForHelp() {
  return (
    <div className="flex flex-col items-center justify-start w-full py-4 gap-4">
      <h1 className="mt-8 text-xl">Your request is submitted 👍</h1>
      <p>Browse other requests to see if you can help someone too!</p>
      <Link href="/home/helping-hands/offer">
        <button>Browse requests</button>
      </Link>
    </div>
  );
}
