import { CLASSES } from '@/lib/classes';

export const metadata = { title: 'Classes | MU Zylo' };

export default function Classes() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="eyebrow">Classes</div>
      <h1 className="h2 mb-8 mt-2">Choose your path</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CLASSES.map((c) => (
          <div key={c.number} className={`card overflow-hidden ${c.custom ? 'border-gold/60' : ''}`}>
            <div className="h-44" style={{ background: `linear-gradient(160deg, ${c.color}aa, #12121E)` }} />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">{c.name}</h3>
                {c.custom && <span className="rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">Exclusive</span>}
              </div>
              <div className="mt-1 text-xs text-mute">{c.role}</div>
              <p className="mt-3 text-sm text-mute">{c.blurb}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
