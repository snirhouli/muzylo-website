import { site } from '@/lib/site';

export const metadata = { title: 'Server Info | MU Zylo' };

export default function Info() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="eyebrow">Server info</div>
      <h1 className="h2 mb-8 mt-2">Rates &amp; features</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {site.rates.map((r) => (
          <div key={r.label} className="card p-6"><div className="text-xs uppercase tracking-widest text-mute">{r.label}</div><div className="mt-2 font-display text-3xl font-bold text-gold">{r.value}</div></div>
        ))}
      </div>
      <ul className="mt-10 list-disc space-y-2 pl-5 text-mute">
        <li>Custom classes: Arcane Blade and the Grow Lancer line.</li>
        <li>World boss Thanatos with a public damage leaderboard.</li>
        <li>Raids with Normal, Hard and Extreme difficulty: Sunken Citadel and Tempest Spire.</li>
        <li>Item levels up to +18, professions, achievement logs, a trading post and companion pets.</li>
      </ul>
    </main>
  );
}
