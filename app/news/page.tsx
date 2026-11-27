import news from '@/data/news.json';

export const metadata = { title: 'News | MU Zylo' };

export default function News() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="eyebrow">News</div>
      <h1 className="h2 mb-8 mt-2">What is happening</h1>
      <div className="space-y-5">
        {news.map((n) => (
          <article key={n.id} className="card p-7">
            <div className="eyebrow !text-[10px]">{n.tag} · {n.date}</div>
            <h2 className="mt-2 text-2xl font-bold">{n.title}</h2>
            <p className="mt-3 text-mute">{n.text}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
