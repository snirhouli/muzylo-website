import { ReactNode } from 'react';

export function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-20">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="h2 mb-8 mt-2">{title}</h2>
      {children}
    </section>
  );
}
