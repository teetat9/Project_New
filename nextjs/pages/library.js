import Card from "@/components/Card";

export default function LibraryPage() {
  const items = [
    { title: "Sorting Algorithms", tag: "CS101" },
    { title: "Pointers & Memory", tag: "C Lang" },
    { title: "Git Branching", tag: "Dev Tools" },
    { title: "ROS2 Basics", tag: "Robotics" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Library</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((x) => (
          <Card 
            key={x.title} 
            title={x.title} 
            aside={<span className="text-xs bg-slate-100 px-2 py-1 rounded-md">{x.tag}</span>}
          >
            <p>Open guides, code snippets, and references to help you learn faster.</p>
            <div className="mt-3">
              <a className="text-brand hover:underline" href="#">Open resource</a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
