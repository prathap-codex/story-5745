// ============================================================
//  PHOTO GALLERY — edit these entries
//
//  HOW TO ADD YOUR PHOTO
//   1. Copy your photo into  public/images/memories/
//   2. Name it exactly as the `src` below (or change `src` to match)
//   3. Update `alt` (describe the photo) and `caption`
//
//  Until a photo exists, a tasteful placeholder is shown automatically.
//
//  Fields
//   src          path starting with "/" (public folder is the web root)
//   alt          description for screen readers
//   caption      short line under the photo
//   aspect       'portrait' (4:5) | 'square' (1:1) | 'landscape' (4:3)
//   rotate       small tilt in degrees (try -3 … 3)
//   instructions what photo to add here (shown on the placeholder)
// ============================================================

export const memories = [
  {
    id: 'memory-01',
    src: '/images/memories/memory-01.jpg',
    alt: 'Our first special memory together',
    caption: 'Love you di azhagi ❤️',
    aspect: 'portrait',
    rotate: -2.5,
    instructions: 'Add a photo from a first special moment together. Portrait or square.',
  },
  {
    id: 'memory-02',
    src: '/images/memories/memory-02.jpg',
    alt: 'A favourite picture of the two of us',
    caption: 'Ippdi onna eppovum irrukanu 🫂',
    aspect: 'square',
    rotate: 2,
    instructions: 'Add your favourite photo of the two of you. Square works best.',
  },
  {
    id: 'memory-03',
    src: '/images/memories/memory-03.jpg',
    alt: 'A happy moment together',
    caption: 'En aluku pulla 😘',
    aspect: 'landscape',
    rotate: -1.5,
    instructions: 'Add a happy, candid moment. Landscape works best.',
  },
  {
    id: 'memory-04',
    src: '/images/memories/memory-04.jpg',
    alt: 'A celebration we shared',
    caption: 'Azhagu pondati 🥰',
    aspect: 'portrait',
    rotate: 2.5,
    instructions: 'Add a photo from a celebration or anniversary. Portrait works best.',
  },
  {
    id: 'memory-05',
    src: '/images/memories/memory-05.jpg',
    alt: 'A candid moment between us',
    caption: 'Ennoda aluku kunju 😘',
    aspect: 'square',
    rotate: -2,
    instructions: 'Add a favourite selfie or unposed shot. Square works best.',
  },
  {
    id: 'memory-06',
    src: '/images/memories/memory-06.jpg',
    alt: 'A memory I never want to forget',
    caption: 'Seekram ippdi pic edukala di 💗',
    aspect: 'portrait',
    rotate: 1.5,
    instructions: 'Add the most meaningful photo you have. Portrait or landscape.',
  },
]
