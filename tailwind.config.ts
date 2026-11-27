import type { Config } from 'tailwindcss';
// Tokens match the Figma file "MU Zylo Website" (color/* variables).
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A12', panel: '#12121E', panel2: '#181828', line: '#2A2A40',
        gold: '#E6C76A', gold2: '#B8913A', violet: '#7C5CFF', ink: '#ECE9DF', mute: '#9A98AC',
        danger: '#E5484D', ok: '#3DD68C',
      },
      fontFamily: { display: ['Cinzel', 'serif'], sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
export default config;
