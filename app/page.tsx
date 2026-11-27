import Link from 'next/link';
import news from '@/data/news.json';
import { Section } from '@/components/Section';
import { Rank, Table } from '@/components/Table';
import { CLASSES, className } from '@/lib/classes';
import { site } from '@/lib/site';
import { getStatus } from '@/lib/status';
import { counts, topPlayers } from '@/lib/rankings';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [status, stats, players] = await Promise.all([getStatus(), counts(), topPlayers(7)]);
  return (
    <main>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(124,92,255,0.35),transparent_60%),radial-gradient(ellipse_at_90%_80%,rgba(230,199,106,0.14),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:py-32">
          <div>
            <div className="eyebrow">{site.season} · Custom server</div>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] md:text-7xl">Forge your legend in <span className="text-gold">MU Zylo</span></h1>
            <p className="mt-6 max-w-xl text-lg text-mute">New classes, a world boss, OSRS-style raids with three difficulties and a living economy. Free to play, tuned for veterans.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/download" className="btn-gold">Download Client</Link>
              <Link href="/register" className="btn-ghost">Create Account</Link>
            </div>
          </div>
          <div className="card p-6 shadow-[0_0_60px_rgba(124,92,255,0.15)]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-widest text-mute">Server status</span>
              <span className={`text-sm font-bold ${status ? 'text-ok' : 'text-danger'}`}>● {status ? 'Online' : 'Offline'}</span>
            </div>
            <div className="mt-5 flex items-end gap-3">
              <span className="font-display text-5xl font-bold text-gold">{status?.online ?? 0}</span>
              <span className="pb-1.5 text-sm text-mute">players online</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[['Accounts', stats.accounts], ['Characters', stats.characters], ['Guilds', stats.guilds]].map(([l, v]) => (
                <div key={l as string} className="rounded-xl bg-panel2 py-3"><div className="text-lg font-bold">{v}</div><div className="text-[11px] text-mute">{l}</div></div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {site.rates.slice(0, 3).map((r) => <span key={r.label} className="rounded-full bg-panel2 px-3 py-1 text-xs font-semibold text-gold">{r.label} {r.value}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <Section eyebrow="Why MU Zylo" title="Not just another season">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ['Custom classes', 'Arcane Blade and the Season 12 Grow Lancer line, found nowhere else.', '/classes'],
            ['Raids & world boss', 'Sunken Citadel, Tempest Spire and Thanatos, with a public Hall of Fame.', '/raids'],
            ['Rankings', 'Players, guilds, killers, raid clear times and boss damage, live.', '/rankings'],
          ].map(([t, d, h]) => (
            <Link key={t} href={h} className="card p-7 transition hover:border-gold/60">
              <h3 className="font-display text-xl font-bold text-gold">{t}</h3>
              <p className="mt-3 text-sm text-mute">{d}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Latest news" title="What is happening">
        <div className="grid gap-5 md:grid-cols-3">
          {news.slice(0, 3).map((n) => (
            <Link key={n.id} href="/news" className="card overflow-hidden transition hover:border-gold/60">
              <div className="h-32 bg-gradient-to-br from-violet/60 to-gold2/40" />
              <div className="p-5"><div className="eyebrow !text-[10px]">{n.tag} · {n.date}</div><h3 className="mt-2 text-lg font-bold">{n.title}</h3></div>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Rankings" title="Top of the realm">
        {players.length === 0 ? <div className="card p-10 text-center text-sm text-mute">No characters yet.</div> : (
          <Table head={['#', 'Character', 'Class', 'Resets', 'Level']}>
            {players.map((p, i) => (
              <tr key={p.name}><td className="td"><Rank n={i + 1} /></td><td className="td font-semibold">{p.name}</td><td className="td text-mute">{className(p.classid)}</td><td className="td">{p.resets}</td><td className="td">{p.lvl}</td></tr>
            ))}
          </Table>
        )}
        <div className="mt-5 text-right"><Link href="/rankings" className="text-sm font-semibold text-gold">Full rankings →</Link></div>
      </Section>

      <Section eyebrow="Classes" title="Choose your path">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {CLASSES.filter((c) => c.custom || [4, 0, 8].includes(c.number)).map((c) => (
            <Link key={c.number} href="/classes" className={`card overflow-hidden transition hover:-translate-y-1 ${c.custom ? 'border-gold/60' : ''}`}>
              <div className="h-40" style={{ background: `linear-gradient(160deg, ${c.color}99, #12121E)` }} />
              <div className="p-4"><div className="font-bold">{c.name}</div><div className={`text-xs ${c.custom ? 'text-gold' : 'text-mute'}`}>{c.role}</div></div>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Events" title="Daily schedule">
        <div className="grid gap-4 md:grid-cols-4">
          {site.events.slice(0, 4).map((e) => (
            <div key={e.name} className="card p-5"><div className="font-display text-2xl font-bold text-gold">{e.time}</div><div className="mt-1 font-semibold">{e.name}</div></div>
          ))}
        </div>
      </Section>
    </main>
  );
}
