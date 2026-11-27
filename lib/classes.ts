export type ClassInfo = { number: number; name: string; role: string; blurb: string; custom?: boolean; color: string };

export const CLASSES: ClassInfo[] = [
  { number: 4, name: 'Dark Knight', role: 'Melee tank', blurb: 'Armoured frontline fighter. Evolves into Blade Knight and Blade Master.', color: '#E5484D' },
  { number: 0, name: 'Dark Wizard', role: 'Ranged mage', blurb: 'Pure spell damage from afar. Evolves into Soul Master and Grand Master.', color: '#7C5CFF' },
  { number: 8, name: 'Fairy Elf', role: 'Archer / support', blurb: 'Bows, buffs and healing. Evolves into Muse Elf and High Elf.', color: '#3DD68C' },
  { number: 12, name: 'Magic Gladiator', role: 'Hybrid', blurb: 'Sword and sorcery in one body. Evolves into Duel Master.', color: '#D97706' },
  { number: 16, name: 'Dark Lord', role: 'Commander', blurb: 'Leads with a scepter and a fire-breathing pet. Evolves into Lord Emperor.', color: '#A855F7' },
  { number: 20, name: 'Summoner', role: 'Curse caster', blurb: 'Curses and summoned books. Evolves into Bloody Summoner and Dimension Master.', color: '#06B6D4' },
  { number: 24, name: 'Rage Fighter', role: 'Brawler', blurb: 'Fast fists and chained combos. Evolves into Fist Master.', color: '#F97316' },
  { number: 28, name: 'Arcane Blade', role: 'Battle mage (custom)', blurb: 'Exclusive to MU Zylo: a Blade Master and Soul Master hybrid that mixes steel with spells.', custom: true, color: '#E6C76A' },
  { number: 29, name: 'Grow Lancer', role: 'Lance & shield (custom)', blurb: 'The Season 12 class line: Grow Lancer, Mirage Lancer and Shining Lancer. Unlock it at level 250.', custom: true, color: '#3B82F6' },
];

const NAMES: Record<number, string> = {
  0: 'Dark Wizard', 1: 'Soul Master', 2: 'Soul Master', 3: 'Grand Master',
  4: 'Dark Knight', 5: 'Blade Knight', 6: 'Blade Knight', 7: 'Blade Master',
  8: 'Fairy Elf', 9: 'Muse Elf', 10: 'Muse Elf', 11: 'High Elf',
  12: 'Magic Gladiator', 13: 'Duel Master', 16: 'Dark Lord', 17: 'Lord Emperor',
  20: 'Summoner', 22: 'Bloody Summoner', 23: 'Dimension Master', 24: 'Rage Fighter', 25: 'Fist Master',
  28: 'Arcane Blade', 29: 'Grow Lancer', 30: 'Mirage Lancer', 31: 'Shining Lancer',
};

/** OpenMU class ids look like 00000040-00NN-0000-...; NN (hex) is the class number. */
export function className(classId: string): string {
  const n = parseInt(classId.split('-')[1] ?? '', 16);
  return NAMES[n] ?? `Class ${n}`;
}
