'use client';
import { FormEvent, useState } from 'react';

export default function Register() {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const j = await res.json().catch(() => ({}));
    setMsg({ ok: res.ok, text: j.message ?? (res.ok ? 'Account created.' : 'Something went wrong.') });
    setBusy(false);
  }

  const input = 'w-full rounded-lg border border-line bg-panel2 px-4 py-3 text-sm outline-none focus:border-gold';
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <div className="eyebrow">Join</div>
      <h1 className="h2 mb-8 mt-2">Create account</h1>
      <form onSubmit={submit} className="card space-y-4 p-7">
        <input name="username" placeholder="Username (4-10 characters)" minLength={4} maxLength={10} required className={input} />
        <input name="email" type="email" placeholder="Email" required className={input} />
        <input name="password" type="password" placeholder="Password (8-20 characters)" minLength={8} maxLength={20} required className={input} />
        <input name="repeat" type="password" placeholder="Repeat password" required className={input} />
        <button disabled={busy} className="btn-gold w-full">Create account</button>
        {msg && <p className={`text-sm ${msg.ok ? 'text-ok' : 'text-danger'}`}>{msg.text}</p>}
      </form>
    </main>
  );
}
