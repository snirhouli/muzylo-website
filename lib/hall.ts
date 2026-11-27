import { readFile } from 'fs/promises';

type Player = { name: string; damage?: number };
export type HallRecord = { kind: 'raid' | 'boss'; id: string; difficulty?: string; seconds: number; deaths: number; players: Player[]; atUtc: string };

export async function readHall(): Promise<HallRecord[]> {
  try {
    return JSON.parse(await readFile(process.env.HALL_FILE ?? '/data/hall/hall-of-fame.json', 'utf8'));
  } catch {
    return [];
  }
}

export function fmtTime(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** Fastest clears of a raid and difficulty. */
export function fastest(all: HallRecord[], raid: string, difficulty: string, limit = 20) {
  return all.filter((r) => r.kind === 'raid' && r.id === raid && r.difficulty === difficulty).sort((a, b) => a.seconds - b.seconds).slice(0, limit);
}

/** Total damage of each player over all kills of a boss, plus the best single kill. */
export function bossBoard(all: HallRecord[], boss: string, limit = 20) {
  const kills = all.filter((r) => r.kind === 'boss' && r.id === boss);
  const total = new Map<string, { damage: number; kills: number; best: number }>();
  for (const k of kills) for (const p of k.players) {
    const t = total.get(p.name) ?? { damage: 0, kills: 0, best: 0 };
    t.damage += p.damage ?? 0; t.kills += 1; t.best = Math.max(t.best, p.damage ?? 0);
    total.set(p.name, t);
  }
  return { kills: kills.length, rows: [...total.entries()].map(([name, v]) => ({ name, ...v })).sort((a, b) => b.damage - a.damage).slice(0, limit) };
}
