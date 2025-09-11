import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="container h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-brand">Adv</span>Compro
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/dashboard" className="hover:text-brand">Dashboard</Link>
          <Link href="/library" className="hover:text-brand">Library</Link>
          <Link href="/about" className="hover:text-brand">About</Link>
          <Link href="/login" className="rounded-lg px-3 py-1.5 bg-brand text-white shadow-soft hover:bg-brand-dark">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
