# MU Zylo website

Public site of https://mu-zylo.com: home, rankings (players, guilds, killers), raids and world boss Hall of Fame,
classes (incl. Arcane Blade and Grow Lancer), events, news, server info, download and account registration.

Design: Figma file "MU Zylo Website" (tokens = `tailwind.config.ts` colors). Stack: Next.js 14, Tailwind, `pg`.

## Data
* Rankings, counts and registration read/write the OpenMU Postgres database directly (`DATABASE_URL`).
* Live status: admin API `GAMESERVER_URL/api/status` (optional `GAMESERVER_API_KEY`).
* Raid clear times and Thanatos damage: `hall-of-fame.json` written by the game server
  (`src/GameLogic/HallOfFame` in muzylo-server), mounted read-only at `HALL_FILE`.
* News: `data/news.json`; rates and events: `lib/site.ts`.

## Run
    cp .env.example .env   # fill in
    npm install && npm run dev
Production: see `deploy/all-in-one/docker-compose.vps.yml` in muzylo-server (service `website`).
