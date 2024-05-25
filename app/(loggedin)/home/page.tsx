import Link from "next/link";

export default function UserHome() {
  return (
    <div className='py-8'>
      <div className='w-full max-w-2xl mx-auto grid grid-cols-2 gap-4'>
        {[
          { title: "Helping Hands" },
          { title: "Find Kaki" },
          { title: "NeighbourWatch" },
          { title: "Group Buy Groceries" },
        ].map((tool) => (
          <HomeIcon title={tool.title} key={tool.title} />
        ))}
      </div>
    </div>
  );
}

function HomeIcon({ title }: { title: string }) {
  return (
    <Link href='/home/helping-hands' className='w-full'>
      <button className='flex flex-col items-center w-full border-none gap-4'>
        <div className='w-full bg-green-800 rounded-full aspect-square'> </div>
        <span className='block text-center'>{title}</span>
      </button>
    </Link>
  );
}
