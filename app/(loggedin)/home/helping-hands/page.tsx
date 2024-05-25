import Link from "next/link";

export default async function HelpingHands() {
  return (
    <div className="flex flex-col mt-8 gap-8">
      <p className="text-lg">Find help, or offer help to someone!</p>
      <div className="flex flex-col items-stretch justify-start gap-4">
        <Link href="/home/helping-hands/find">
          <button className="w-full" type="button">
            Find Help
          </button>
        </Link>
        <Link href="/home/helping-hands/offer">
          <button className="w-full" type="button">
            Offer Help
          </button>
        </Link>
      </div>
    </div>
  );
}
