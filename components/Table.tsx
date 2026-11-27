import { ReactNode } from 'react';

export function Rank({ n }: { n: number }) {
  return <span className={n <= 3 ? 'font-bold text-gold' : 'text-mute'}>{n}</span>;
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full">
        <thead><tr className="border-b border-line">{head.map((h) => <th key={h} className="th">{h}</th>)}</tr></thead>
        <tbody className="[&>tr:nth-child(even)]:bg-panel2">{children}</tbody>
      </table>
    </div>
  );
}

export function Empty({ text }: { text: string }) {
  return <div className="card p-10 text-center text-sm text-mute">{text}</div>;
}
