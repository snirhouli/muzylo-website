import { site } from '@/lib/site';

export const metadata = { title: 'Events | MU Zylo' };

export default function Events() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="eyebrow">Events</div>
      <h1 className="h2 mb-8 mt-2">Daily schedule</h1>
      <div className="space-y-4">
        {site.events.map((e) => (
          <div key={e.name} className="card flex items-center gap-6 p-6">
            <div className="w-28 font-display text-2xl font-bold text-gold">{e.time}</div>
            <div><div className="font-bold">{e.name}</div><div className="text-sm text-mute">{e.desc}</div></div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-mute">Times are server time. Edit them in lib/site.ts.</p>
    </main>
  );
}
