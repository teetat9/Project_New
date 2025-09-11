import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 to-white border border-slate-200">
      <div className="grid md:grid-cols-2 gap-6 p-8 md:p-12">
        <div className="flex flex-col gap-4 justify-center">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Learn, collaborate, and launch your{" "}
            <span className="text-brand">AdvCompro</span> projects.
          </h1>
          <p className="text-slate-600">
            This UI was generated from Figma references. Use the dashboard to manage rooms,
            tasks, and schedules—all in one place.
          </p>
          <div className="flex gap-3">
            <Link href="/dashboard" className="rounded-lg px-4 py-2 bg-brand text-white hover:bg-brand-dark shadow-soft">
              Go to Dashboard
            </Link>
            <Link href="/register" className="rounded-lg px-4 py-2 border border-slate-300 hover:border-brand hover:text-brand">
              Create account
            </Link>
          </div>
        </div>
        <div className="relative h-64 md:h-80">
          <Image
            src="/images/Change Password.png"
            alt="Figma preview"
            fill
            className="object-cover rounded-xl border border-slate-200"
            priority
          />
        </div>
      </div>
    </section>
  );
}
