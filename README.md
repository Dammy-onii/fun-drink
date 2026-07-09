# 🧪 GLORP & CO. — Secret Soda Works

An interactive story-site: **Flavor №7 has escaped** and the visitor is deputized as a
Flavor Recovery Agent. Six chapters, three puzzles, one sentient soda, multiple endings,
hidden easter eggs, and a shareable certificate for X.

## Run it

```bash
npm install
npm run dev
```

Production build: `npm run build` (output in `dist/` — deploy anywhere: Vercel, Netlify, GitHub Pages).

## Stack

Vite · React 19 · Tailwind CSS v4 · Framer Motion · Web Audio API (all sounds synthesized, zero assets)

## The story

1. **Briefing** — wanted poster. Accept the mission.
2. **The Lab** — brew the bait batch (ingredient puzzle; read the torn recipe).
3. **The Vault** — crack the founder's 3-symbol code (the note has the clues).
4. **The Bottling Line** — repeat the machine's burp sequence (memory game).
5. **The Rooftop** — corner Glorp. Your choice changes the ending flavor.
6. **Case Closed** — unlock your flavor, get a certificate, brag on X.

Chapters stay sealed until the previous puzzle is solved.

## Easter eggs (spoilers)

- Click "est. 1962" seven times on the hero.
- Find Reginald the rat in the lab (bottom-left).
- Finding all secrets changes the ending's P.S.

## Tuning

- Colors/fonts: `src/index.css` (`@theme` block)
- Sounds: `src/sound.js`
- Puzzle answers: `src/scenes/Lab.jsx` (ingredients), `src/scenes/Vault.jsx` (`CODE`), endings in `src/scenes/Finale.jsx`

Sound is off by default — toggle top-right.
