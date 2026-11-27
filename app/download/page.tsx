import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata = { title: 'Download | MU Zylo' };

export default function Download() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="eyebrow">Download</div>
      <h1 className="h2 mb-8 mt-2">Get the game client</h1>
      <div className="card p-8">
        <p className="text-mute">Download the launcher, run it, and it keeps the client up to date for you. Always start the game through the launcher.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a href={site.download} className="btn-gold">Download Launcher</a>
          <Link href="/register" className="btn-ghost">Create Account</Link>
        </div>
      </div>
      <div className="card mt-6 p-8">
        <h2 className="font-display text-xl font-bold">Requirements</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-mute">
          <li>Windows 10 or 11</li>
          <li>Any GPU with OpenGL support, 4 GB RAM</li>
        </ul>
      </div>
    </main>
  );
}
