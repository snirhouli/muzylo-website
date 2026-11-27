import Link from 'next/link';
import { Empty, Rank, Table } from '@/components/Table';
import { className } from '@/lib/classes';
import { topGuilds, topKillers, topPlayers } from '@/lib/rankings';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Rankings | MU Zylo' };

const tabs = [['players', 'Players'], ['guilds', 'Guilds'], ['killers', 'Killers']];

export default async function Rankings({ searchParams }: { searchParams: { t?: string } }) {
  const t = searchParams.t ?? 'players';
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="eyebrow">Rankings</div>
      <h1 className="h2 mb-6 mt-2">Top of the realm</h1>
      <div className="mb-6 flex flex-wrap gap-3">
        {tabs.map(([k, l]) => (
          <Link key={k} href={`/rankings?t=${k}`} className={`rounded-lg px-5 py-2.5 text-sm font-bold ${t === k ? 'bg-gold text-[#1a1405]' : 'bg-panel2 text-mute hover:text-gold'}`}>{l}</Link>
        ))}
        <Link href="/raids" className="rounded-lg bg-panel2 px-5 py-2.5 text-sm font-bold text-mute hover:text-gold">Raids &amp; Bosses →</Link>
      </div>
      {t === 'players' && <Players />}
      {t === 'guilds' && <Guilds />}
      {t === 'killers' && <Killers />}
    </main>
  );
}

async function Players() {
  const r = await topPlayers(50);
  if (!r.length) return <Empty text="No characters yet." />;
  return (
    <Table head={['#', 'Character', 'Class', 'Resets', 'Level', 'Master']}>
      {r.map((p, i) => (<tr key={p.name}><td className="td"><Rank n={i + 1} /></td><td className="td font-semibold">{p.name}</td><td className="td text-mute">{className(p.classid)}</td><td className="td">{p.resets}</td><td className="td">{p.lvl}</td><td className="td">{p.masterlvl}</td></tr>))}
    </Table>
  );
}

async function Guilds() {
  const r = await topGuilds();
  if (!r.length) return <Empty text="No guilds yet." />;
  return (
    <Table head={['#', 'Guild', 'Members', 'Score']}>
      {r.map((g, i) => (<tr key={g.name}><td className="td"><Rank n={i + 1} /></td><td className="td font-semibold">{g.name}</td><td className="td">{g.members}</td><td className="td">{g.score}</td></tr>))}
    </Table>
  );
}

async function Killers() {
  const r = await topKillers();
  if (!r.length) return <Empty text="No kills yet." />;
  return (
    <Table head={['#', 'Character', 'Class', 'Kills']}>
      {r.map((p, i) => (<tr key={p.name}><td className="td"><Rank n={i + 1} /></td><td className="td font-semibold">{p.name}</td><td className="td text-mute">{className(p.classid)}</td><td className="td">{p.kills}</td></tr>))}
    </Table>
  );
}
