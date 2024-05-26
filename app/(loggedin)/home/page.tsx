import Link from "next/link";
import {
  IconHeartHandshake,
  IconFriends,
  IconScanEye,
  IconShoppingCart,
} from "@tabler/icons-react";

export default function UserHome() {
  return (
    <div className='py-8'>
      <div className='mx-auto grid w-full max-w-2xl grid-cols-2 gap-4'>
        {[
          {
            title: "Helping Hands",
            icon: (
              <IconHeartHandshake size={120} color='white' strokeWidth={1} />
            ),
          },
          {
            title: "Find Kaki",
            icon: <IconFriends size={120} color='white' strokeWidth={1} />,
          },
          {
            title: "NeighbourWatch",
            icon: <IconScanEye size={120} color='white' strokeWidth={1} />,
          },
          {
            title: "Group Buy Groceries",
            icon: <IconShoppingCart size={120} color='white' strokeWidth={1} />,
          },
        ].map((tool) => (
          <HomeIcon title={tool.title} key={tool.title} icon={tool.icon} />
        ))}
      </div>
    </div>
  );
}

function HomeIcon({ title, icon }: { title: string; icon: any }) {
  return (
    <Link href='/home/helping-hands' className='w-full'>
      <button className='flex w-full flex-col items-center gap-4 border-none'>
        <div className='flex aspect-square w-full items-center justify-center rounded-full bg-teal-700'>
          {icon}
        </div>
        <span className='block text-center'>{title}</span>
      </button>
    </Link>
  );
}
