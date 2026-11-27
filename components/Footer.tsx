import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-[#07070D]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="font-display text-xl font-bold text-gold">MU ZYLO</div>
          <p className="mt-3 text-sm text-mute">A custom MU Online server with new classes, world bosses and raids.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-mute">
          <Link href="/rankings" className="hover:text-gold">Rankings</Link>
          <Link href="/raids" className="hover:text-gold">Raids &amp; Bosses</Link>
          <Link href="/download" className="hover:text-gold">Download</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm text-mute">
          <a href={site.discord} className="hover:text-gold">Discord</a>
          <Link href="/register" className="hover:text-gold">Create account</Link>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-mute">© 2026 MU Zylo. Not affiliated with Webzen or any official MU Online publisher.</div>
    </footer>
  );
}
