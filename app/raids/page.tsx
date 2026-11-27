import Link from 'next/link';
import { Empty, Rank, Table } from '@/components/Table';
import { bossBoard, fastest, fmtTime, readHall } from '@/lib/hall';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Raids & Bosses | MU Zylo' };

const raids = [['sunken-citadel', 'Sunken Citadel'], ['tempest-spire', 'Tempest Spire'], ['thanatos', 'Thanatos World Boss']];
const diffs = ['Normal', 'Hard', 'Extreme'];

export default async function Raids({ searchParams }: { searchParams: { r?: string; d?: string } }) {
  const raid = raids.find(([k]) => k === searchParams.r)?.[0] ?? 'sunken-citadel';
  const diff = diffs.includes(searchParams.d ?? '') ? searchParams.d! : 'Normal';
  const all = await readHall();
  const isBoss = raid === 'thanatos';

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="eyebrow">Hall of Fame</div>
      <h1 className="h2 mb-6 mt-2">Raids &amp; Bosses</h1>
      <div className="mb-4 flex flex-wrap gap-3">
        {raids.map(([k, l]) => (
          <Link key={k} href={`/raids?r=${k}`} className={`rounded-xl border border-line px-6 py-3 text-sm font-bold ${raid === k ? 'bg-gold text-[#1a1405]' : 'bg-panel text-ink hover:border-gold/60'}`}>{l}</Link>
        ))}
      </div>

      {!isBoss && (
        <div className="mb-6 flex gap-2">
          {diffs.map((d) => (
            <Link key={d} href={`/raids?r=${raid}&d=${d}`} className={`rounded-full px-5 py-2 text-xs font-bold ${diff === d ? (d === 'Extreme' ? 'bg-danger text-white' : 'bg-gold text-[#1a1405]') : 'bg-panel2 text-mute'}`}>{d}</Link>
          ))}
        </div>
      )}

      {isBoss ? <Boss all={all} /> : <Raid all={all} raid={raid} diff={diff} />}
    </main>
  );
}

function Raid({ all, raid, diff }: { all: Awaited<ReturnType<typeof readHall>>; raid: string; diff: string }) {
  const r = fastest(all, raid, diff);
  if (!r.length) return <Empty text={`No ${diff} clears yet. Be the first party to finish it.`} />;
  return (
    <Table head={['#', 'Party', 'Time', 'Deaths', 'Date']}>
      {r.map((x, i) => (
        <tr key={i}>
          <td className="td"><Rank n={i + 1} /></td>
          <td className="td"><div className="font-semibold">{x.players.map((p) => p.name).join(', ')}</div><div className="text-xs text-mute">{x.players.length} players</div></td>
          <td className="td font-bold text-gold">{fmtTime(x.seconds)}</td>
          <td className="td">{x.deaths}</td>
          <td className="td text-mute">{x.atUtc.slice(0, 10)}</td>
        </tr>
      ))}
    </Table>
  );
}

function Boss({ all }: { all: Awaited<ReturnType<typeof readHall>> }) {
  const b = bossBoard(all, 'thanatos');
  if (!b.rows.length) return <Empty text="Thanatos has not been defeated yet." />;
  return (
    <>
      <p className="mb-4 text-sm text-mute">Thanatos has been defeated {b.kills} time(s). Total damage dealt over all kills:</p>
      <Table head={['#', 'Player', 'Total damage', 'Best kill', 'Kills joined']}>
        {b.rows.map((p, i) => (
          <tr key={p.name}><td className="td"><Rank n={i + 1} /></td><td className="td font-semibold">{p.name}</td><td className="td font-bold text-gold">{p.damage.toLocaleString('en-US')}</td><td className="td">{p.best.toLocaleString('en-US')}</td><td className="td">{p.kills}</td></tr>
        ))}
      </Table>
    </>
  );
}
