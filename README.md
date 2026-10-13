# Our Forever — A Love Story

A private, cinematic, six-screen romantic website built with **React + Vite, Tailwind CSS, Framer Motion and Lucide icons**. JavaScript only: no backend, no database, no API calls, no TypeScript.

| Route | Screen |
|---|---|
| `/` | Secret password gate |
| `/home` | Cinematic welcome |
| `/story` | Our Love Story timeline |
| `/memories` | Polaroid photo gallery with lightbox |
| `/letter` | Sealed envelope → animated love letter |
| `/forever` | Night-sky finale with glowing heart and confetti |
| anything else | Friendly "not found" page |

---

## 1. Quick start

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
cd our-forever
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173). The **demo password is `forever`**.

```bash
npm run build      # production build into /dist
npm run preview    # test the production build locally
```

<details>
<summary>Starting from an empty folder instead? (exact commands)</summary>

```bash
npm create vite@latest our-forever -- --template react
cd our-forever
npm install react-router-dom framer-motion lucide-react
npm install -D tailwindcss@3 postcss autoprefixer
```
Then copy `tailwind.config.js`, `postcss.config.js`, `index.html`, `public/` and `src/` from this project over the new one.
</details>

---

## 2. ⚠️ Security limitation (please read)

The password gate is a **front-end demo, not real security.**
The password lives in `src/data/config.js`, which is shipped to every visitor's browser inside the JavaScript bundle. Anyone who opens the browser's developer tools (or reads the bundle) can find it and open any route.

Use it as a charming "knock before you enter" moment, **not** to protect anything sensitive. Likewise, the "remember I unlocked" flag is stored in `sessionStorage` purely so refreshing the page doesn't annoy you.

If you need genuine privacy:
- Share the site only through a private link and don't index it (the page already has `noindex`), or
- Host it behind real authentication (e.g. Cloudflare Access, Netlify/Vercel password protection, or basic auth on your server).

---

## 3. What to edit (all in `src/data/`)

| File | What it controls |
|---|---|
| `config.js` | **Password**, gate/hero/finale wording, music on/off and file path |
| `timeline.js` | Timeline milestones (date, title, description, optional photo) |
| `memories.js` | Gallery photos (file path, alt text, caption, shape, tilt, instructions) |
| `letter.js` | The love letter. Set `isPlaceholder: false` when it's yours |

Everything is placeholder text on purpose: dates say `ADD YOUR DATE`, and no real events are invented.

### Change the password
Open `src/data/config.js` and edit `password: 'forever'`. It's not case-sensitive.

### Change the final message
`config.js` → `forever.message` and `forever.subMessage`.

---

## 4. Image replacement guide

All photos live in the **`public/`** folder (the web root). You never need to import them in code, just drop the files in with the exact names below. **Until a file exists, a styled placeholder is shown automatically, and if a file is missing or fails to load you will never see a broken-image icon.**

| File path | What to put there | Aspect ratio | Used as |
|---|---|---|---|
| `public/images/memories/memory-01.jpg` | Our first special memory | Portrait (4:5) or square | Polaroid frame + lightbox |
| `public/images/memories/memory-02.jpg` | A favourite photo together | Square (1:1) | Polaroid frame + lightbox |
| `public/images/memories/memory-03.jpg` | A happy, candid moment | Landscape (4:3) | Polaroid frame + lightbox |
| `public/images/memories/memory-04.jpg` | A celebration or anniversary | Portrait (4:5) | Polaroid frame + lightbox |
| `public/images/memories/memory-05.jpg` | A favourite selfie | Square (1:1) | Polaroid frame + lightbox |
| `public/images/memories/memory-06.jpg` | A meaningful memory | Portrait (4:5) or landscape | Polaroid frame + lightbox |
| `public/images/timeline/story-01.jpg` … *(optional)* | A photo for a timeline milestone | Landscape (4:3) | Small framed picture beside a milestone |

There are no background photos. Every background is built from gradients, so nothing else needs replacing.

**To replace a placeholder**
1. Copy your photo into `public/images/memories/` and name it exactly like the table (e.g. `memory-01.jpg`). Use `.jpg`, and keep the filename identical, or change `src` in `memories.js` to match your file.
2. Open `src/data/memories.js` and update that entry's `alt` (describe the photo for screen-reader users) and `caption`.
3. Optionally change `aspect` (`'portrait' | 'square' | 'landscape'`) so the frame matches your photo's shape, and `rotate` for the tilt.
4. Refresh the page.

**To add a seventh photo:** copy any entry in `memories.js`, give it a new `id`, `src`, `alt`, and `caption`.

**To add a photo to the timeline:** save it as `public/images/timeline/story-01.jpg`, then in `src/data/timeline.js` set `image: '/images/timeline/story-01.jpg'`, plus `imageAlt` and (optionally) `caption`. Milestones with `image: null` simply show no picture.

**Tip:** resize photos to about 1600 px on the long edge and 300–500 KB each, so the site loads fast on phones.

---

## 5. Music (optional)

Music never plays automatically. A small round button (bottom-left on every page after the gate) lets the visitor start and pause it.

1. Save your song as `public/audio/background-music.mp3`.
2. To disable music completely, set `music.enabled` to `false` in `config.js`.

If the file isn't there yet, pressing the button shows a short note telling you where to put it, rather than failing silently.

---

## 6. Project structure

```
our-forever/
├── index.html
├── package.json
├── tailwind.config.js · postcss.config.js · vite.config.js
├── vercel.json                     (SPA rewrite for Vercel)
├── public/
│   ├── _redirects                  (SPA rewrite for Netlify)
│   ├── images/memories/            ← your gallery photos
│   ├── images/timeline/            ← optional timeline photos
│   └── audio/                      ← background-music.mp3
└── src/
    ├── main.jsx · App.jsx · index.css
    ├── styles/animations.css       keyframes, paper texture, reduced-motion rules
    ├── lib/session.js              remembers the unlocked state (demo only)
    ├── data/                       ← config.js, timeline.js, memories.js, letter.js
    ├── pages/                      one file per screen (+ NotFoundPage)
    └── components/
        Navbar · FloatingParticles · PhotoCard · Lightbox · Envelope
        HeartConfetti · ProtectedRoute · MusicPlayer · SafeImage
        PageTransition · PageHeader · RevealText · ChapterLink
```

---

## 7. Behaviour notes

- **Direct links work.** Opening e.g. `/letter` while locked sends you to the gate, then straight back to `/letter` after unlocking. Refreshing keeps you unlocked for that browser tab. A **lock icon** in the navigation locks it again.
- **Nobody is trapped.** The navigation bar is always available (hamburger menu on phones), the lightbox closes with ✕, `Esc` or a tap on the backdrop, and the letter has a **"Show the whole letter"** button to skip the animation.
- **Reduced motion.** If the device asks for reduced motion, movement is removed: particles become still, the envelope skips its animation, the letter appears immediately and the confetti shows briefly without flying.
- **Accessibility.** Semantic landmarks, a skip link, visible focus rings, labelled controls, keyboard-navigable lightbox (←/→/Esc, focus trapped, focus restored), `aria-live` error messages.
- **Performance.** Particles use one lightweight canvas each (fewer and 30 fps on phones, paused in hidden tabs); background movement uses transforms only.

## 8. Deploying

`npm run build` creates `dist/`. Upload it to any static host. Because the site uses clean URLs (`/story`, not `/#/story`), the host must serve `index.html` for unknown paths. This is already configured for **Netlify** (`public/_redirects`) and **Vercel** (`vercel.json`). On other hosts, add the equivalent "single-page app" fallback.

---

## 9. Testing checklist

**Desktop**
- [ ] Wrong password shows the error and the page doesn't reload; the password is never displayed (unless you press the eye icon while typing)
- [ ] Correct password → smooth transition to the welcome page
- [ ] Hero heading reveals word by word; "Scroll" cue scrolls to the chapter list; "Enter Our Story" opens `/story`
- [ ] Timeline alternates left/right and fades in as you scroll
- [ ] Gallery photos tilt, straighten on hover; clicking opens the lightbox
- [ ] Lightbox: ←/→ change photo, `Esc` closes, Tab stays inside, focus returns to the photo you opened
- [ ] Letter: envelope flap opens, letter rises, text appears line by line; Skip, Replay and Close-envelope buttons work
- [ ] Finale: heart draws itself, message appears, confetti works, "Replay our story" and "Back to the welcome" navigate
- [ ] Music button plays/pauses (after you add an mp3)
- [ ] Typing a random address (e.g. `/nothing`) shows the friendly not-found page
- [ ] Opening `/letter` directly while locked → gate → back to `/letter`

**Mobile / tablet** (use a real phone, or browser dev tools)
- [ ] Hero heading fits without awkward breaks at ~360 px width
- [ ] Hamburger menu opens/closes; links work
- [ ] Timeline is a single column with the line on the left
- [ ] Gallery is one column on phones, two on tablets, three on desktop
- [ ] Lightbox swipes left/right; buttons are easy to tap
- [ ] Envelope and letter are readable without horizontal scrolling
- [ ] Finale buttons are stacked and easy to tap
- [ ] Animations feel smooth (no stutter) on an older phone

**Accessibility**
- [ ] Tab through every page; focus ring is always visible
- [ ] Turn on "Reduce motion" in your OS → animations calm down, everything still works
- [ ] All your own photos have meaningful `alt` text in `memories.js`
