import Link from 'next/link';

const links = [['/', 'Home'], ['/rankings', 'Rankings'], ['/raids', 'Raids & Bosses'], ['/classes', 'Classes'], ['/events', 'Events'], ['/news', 'News'], ['/info', 'Server Info'], ['/download', 'Download']];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-display text-2xl font-bold tracking-wider text-gold">MU ZYLO</Link>
        <nav className="hidden gap-7 lg:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="text-sm font-semibold text-mute transition hover:text-gold">{label}</Link>
          ))}
        </nav>
        <Link href="/register" className="btn-gold !px-5 !py-2.5">Play Now</Link>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-line px-6 py-2 lg:hidden">
        {links.map(([href, label]) => (<Link key={href} href={href} className="whitespace-nowrap text-xs font-semibold text-mute">{label}</Link>))}
      </nav>
    </header>
  );
}
