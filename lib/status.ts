/** Live status from the game server's admin API; null if it is not reachable. */
export async function getStatus(): Promise<{ online: number; servers: number } | null> {
  try {
    const res = await fetch(`${process.env.GAMESERVER_URL}/api/status`, {
      headers: process.env.GAMESERVER_API_KEY ? { 'X-Api-Key': process.env.GAMESERVER_API_KEY } : {},
      cache: 'no-store',
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const j = await res.json();
    const servers: any[] = j.servers ?? j.Servers ?? [];
    const online = servers.reduce((a, s) => a + (s.currentConnections ?? s.CurrentConnections ?? s.onlinePlayers ?? 0), 0);
    return { online, servers: servers.length };
  } catch {
    return null;
  }
}
