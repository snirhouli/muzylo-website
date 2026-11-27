export const site = {
  name: 'MU Zylo',
  tagline: 'Forge your legend',
  season: 'Season 22',
  rates: [
    { label: 'Experience', value: 'x5' },
    { label: 'Master Experience', value: 'x3' },
    { label: 'Item Drop', value: 'x3' },
    { label: 'Max Level', value: '400' },
    { label: 'Max Master Level', value: '200' },
    { label: 'Max Stats', value: '65535' },
  ],
  discord: process.env.NEXT_PUBLIC_DISCORD_LINK ?? '#',
  download: process.env.NEXT_PUBLIC_DOWNLOAD_URL ?? '/download',
  events: [
    { name: 'Thanatos World Boss', time: '21:00', desc: 'GM-spawned boss. Top 10 damage dealers get EXP buffs and Credits.' },
    { name: 'Raid Night', time: '22:00', desc: 'Sunken Citadel & Tempest Spire. Party of 1-4 in Normal, Hard or Extreme.' },
    { name: 'Blood Castle', time: 'Every 2h', desc: 'The classic. Entrance from level 15.' },
    { name: 'Chaos Castle', time: 'Every 2h', desc: 'Last one standing.' },
    { name: 'Devil Square', time: 'Every 2h', desc: 'Kill waves for experience.' },
  ],
};
