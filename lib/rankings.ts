import { rows } from './db';

export const LEVEL = '560931ad-0901-4342-b7f4-fd2e2fcc0563';
export const MASTER = '70cd8c10-391a-4c51-9aa4-a854600e3a9f';
export const RESETS = '89a891a7-f9f9-4ab5-af36-12056e53a5f7';

export const topPlayers = (limit = 50) =>
  rows<{ name: string; classid: string; resets: number; lvl: number; masterlvl: number }>(
    `SELECT c."Name" AS name, c."CharacterClassId"::text AS classid,
       MAX(CASE WHEN sa."DefinitionId" = $1 THEN sa."Value" ELSE 0 END)::int AS resets,
       MAX(CASE WHEN sa."DefinitionId" = $2 THEN sa."Value" ELSE 0 END)::int AS lvl,
       MAX(CASE WHEN sa."DefinitionId" = $3 THEN sa."Value" ELSE 0 END)::int AS masterlvl
     FROM data."StatAttribute" sa JOIN data."Character" c ON sa."CharacterId" = c."Id"
     GROUP BY c."Id", c."Name", c."CharacterClassId"
     ORDER BY resets DESC, lvl DESC, masterlvl DESC LIMIT $4`,
    [RESETS, LEVEL, MASTER, limit],
  );

export const topKillers = (limit = 50) =>
  rows<{ name: string; classid: string; kills: number }>(
    `SELECT "Name" AS name, "CharacterClassId"::text AS classid, "PlayerKillCount" AS kills
     FROM data."Character" ORDER BY "PlayerKillCount" DESC LIMIT $1`,
    [limit],
  );

export const topGuilds = (limit = 30) =>
  rows<{ name: string; score: number; members: number }>(
    `SELECT g."Name" AS name, g."Score" AS score,
       (SELECT COUNT(*) FROM guild."GuildMember" m WHERE m."GuildId" = g."Id")::int AS members
     FROM guild."Guild" g ORDER BY g."Score" DESC LIMIT $1`,
    [limit],
  );

export async function counts() {
  const [a] = await rows<{ n: number }>(`SELECT COUNT(*)::int AS n FROM data."Account"`);
  const [c] = await rows<{ n: number }>(`SELECT COUNT(*)::int AS n FROM data."Character"`);
  const [g] = await rows<{ n: number }>(`SELECT COUNT(*)::int AS n FROM guild."Guild"`);
  return { accounts: a?.n ?? 0, characters: c?.n ?? 0, guilds: g?.n ?? 0 };
}
