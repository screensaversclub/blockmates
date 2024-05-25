import Link from "next/link";

export default function OfferHelp() {
  return (
    <div className="flex flex-col items-center justify-start w-full py-4 gap-4">
      <h1 className="mt-8 text-xl">Help make someone's day!</h1>
      <Link href="/home/helping-hands/offer">
        <button>Browse requests</button>
      </Link>
    </div>
  );
}
