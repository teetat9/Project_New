import Image from "next/image";
import Card from "@/components/Card";

const sampleRooms = [
  { name: "AdvCompro 101", members: 23, code: "A1B2C3" },
  { name: "Robotics Lab", members: 12, code: "R0B0TS" },
  { name: "UI/UX Squad", members: 7, code: "U1UX42" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {sampleRooms.map((room) => (
          <Card
            key={room.code}
            title={room.name}
            subtitle={`${room.members} members`}
            aside={<span className="text-xs bg-slate-100 px-2 py-1 rounded-md font-mono">{room.code}</span>}
          >
            <div className="flex items-center justify-between">
              <a className="text-brand hover:underline" href="#">Open</a>
              <button className="text-xs border px-3 py-1 rounded-md hover:border-brand hover:text-brand">
                Copy code
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Recent Uploads">
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative h-28 border rounded-lg overflow-hidden">
                <Image src={`/images/${i === 0 ? "Register Page.png" : "Login Page.png"}`} alt="Preview" fill className="object-cover" />
              </div>
            ))}
          </div>
        </Card>
        <Card title="Upcoming Deadlines">
          <ul className="list-disc pl-5 text-sm space-y-2">
            <li>Project Proposal – Sep 20</li>
            <li>Prototype Demo – Oct 4</li>
            <li>Final Report – Nov 10</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
