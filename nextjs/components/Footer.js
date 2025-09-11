export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container py-8 text-sm text-slate-600 flex flex-wrap items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} AdvCompro. All rights reserved.</p>
        <div className="flex gap-4">
          <a className="hover:text-brand" href="#">Terms</a>
          <a className="hover:text-brand" href="#">Privacy</a>
          <a className="hover:text-brand" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
