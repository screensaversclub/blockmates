export default function UserHome() {
  return (
    <div className="py-8">
      <div className="w-full grid grid-cols-2 gap-4">
        {[{ title: "Helping Hands" }, { title: "Find Kaki" }].map((tool) => (
          <HomeIcon title={tool.title} key={tool.title} />
        ))}
      </div>
    </div>
  );
}

function HomeIcon({ title }: { title: string }) {
  return (
    <button className="flex flex-col items-center border-none gap-4">
      <div className="w-full bg-green-800 rounded-full aspect-square "> </div>
      <span className="block text-center">{title}</span>
    </button>
  );
}
