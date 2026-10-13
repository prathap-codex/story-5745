// ============================================================
//  OUR FOREVER — MAIN CONFIGURATION
//  Everything personal that is not a photo, a timeline entry
//  or the letter lives in this file. Edit freely.
// ============================================================

export const config = {
  // ------------------------------------------------------------
  // DEMO PASSWORD  ← CHANGE THIS
  // Not case-sensitive. NOTE: this is NOT real security.
  // Anyone who inspects the site's JavaScript can find it.
  // See "Security limitation" in README.md.
  // ------------------------------------------------------------
  password: 'love you da mama',

  // Key used to remember (for this browser tab only) that the gate was passed.
  sessionKey: 'our-forever-unlocked',

  siteName: 'Dear Pondati',
  tagline: 'A Love Story',

  // Page 1 — password gate
  gate: {
    heading: 'A Little World, Just for You',
    text: 'Some stories are too special to be shared with everyone.',
    inputLabel: 'Secret password',
    inputPlaceholder: 'Enter the password',
    button: 'Unlock',
    errorMessage: "Mama ku prapose pannu thangoo 😘",
  },

  // Page 2 — welcome
  hero: {
    intro: 'Love you di Azhagi',
    heading: 'In a World Full of People, My Heart Found You.',
    text: 'Unkooda alika mudiyatha memories ennaku neraya venu di. Life full ahh unnakaga vaala aasai padaren di',
    button: 'Itha thodu di !',
  },

  // Page 3 — timeline header
  story: {
    heading: 'Our Love Story',
    intro: 'Intha naal ellam niyabagam irruka da thangoo ❤️',
  },

  // Page 4 — gallery header
  memories: {
    heading: 'Namma Memories',
    intro: 'Oru chinna memories kooda unkitta na miss panna virumbala da thangoo 🫂🩷 ',
  },

  // Page 6 — finale
  forever: {
    message: "Na unnoda lifela oru chapter ahh irruka virumbala. Na un lifela mulu story ahh irrukanum.",
    subMessage:
      'En koodave irru di. unna vitta ennaku yaar di irrukanga 🥺. Nee illana ennaku sanda poda kooda aal illa papa 😭😭😭. Thaniya vitratha di 😫.',
    surpriseButton: 'Itha touch pannu',
    replayButton: 'Replay our story',
    homeButton: 'Back to the welcome',
  },

  // Optional background music. It NEVER plays automatically.
  // Put your song at public/audio/background-music.mp3 (or change src).
  music: {
    enabled: true,
    src: '/audio/background-music.mp3',
  },
}
