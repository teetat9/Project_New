import Hero from "@/components/Hero";
import Card from "@/components/Card";

export default function Page() {
  return (
    <div className="space-y-8">
      <Hero />
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Create Room" subtitle="Generate a join code">
          Kick off a new workspace and invite teammates instantly.
        </Card>
        <Card title="Join Room" subtitle="Use a join code">
          Enter a code to access your course/project room.
        </Card>
        <Card title="Tasks & Calendar" subtitle="FullCalendar ready">
          Plan sprints, labs, and deadlines in one calendar view.
        </Card>
      </div>
    </div>
  );
}
