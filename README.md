# Happy Birthday Janvii! 🌸 — Interactive Digital Experience (2026 Blossom Edition)

A bespoke, interactive birthday celebration website created with care and friendship by **Kaushal** for **Janvii**.

---

## 📖 Project Context & Evolution

- **Background**: In the previous year, a single-file jQuery card (`D:\download\trial\trail.html`) was created. For 2026, the experience was redesigned into a modern, modular, responsive web journey using vanilla web standards.
- **Recipient**: **Janvii** (Instagram: `@definitelynot.janvii`)
- **Author**: **Kaushal**
- **Design Philosophy**: Modern glassmorphism, fluid canvas animations, Web Audio API procedural sound synthesis, and a soft, elegant pastel floral aesthetic.

---

## 🎨 Theme & Visual Design

### 1. Dedicated Light Blossom Theme
The entire website uses a **Blossom Light Theme** balanced with warm ivory, dusty rose, deep plum, and subtle champagne accents:
- **Base Background**: A soft ivory-to-blush radial gradient with fixed attachment.
- **Glassmorphism Panels (`.glass-card`, `.glass-panel`)**: Warm white frosted glass with delicate dusty-rose borders and restrained plum-tinted shadows.
- **Typography**:
  - Headings: Deep cherry-rose gradient (`linear-gradient(135deg, #be185d, #e11d48, #d97706)`) in *Dancing Script*.
  - Body Text: Rich, readable dark plum tones (`#331538` & `#5a3058`) for readability against the light background.
  - Handwritten accents: *Caveat* font for Polaroid captions and friendship letter.

### 2. Soft Blossom First Page (Welcome Overlay)
The first screen pairs a warm ivory card with a muted rose-and-blush gateway:
- **Atmospheric Background**: A soft ivory-to-dusty-rose radial gradient.
- **Ambient Glow Orbs**: Dual floating pseudo-element light orbs (`::before` and `::after`) animated with gentle scaling and shifting (`floatOrb`).
- **Floating Bubbles**: 5 independent bubbles (`.pink-bubble`) that gently float upward from bottom to top with varied animation delays and scale factors.
- **Frosted Glass Welcome Card (`.welcome-card-pink`)**: Warm pearl glass, a fine rose border, restrained shadows, and a subtle champagne glow.
- **Bouncing Blossom & Rose Title**: *"Happy Birthday, Janvii!"* in a soft rose gradient with a bouncy flower emoji (`animate-bounce`).
- **Pulsing CTA Button (`.welcome-btn-pink`)**: A deep dusty-rose button with a gentle animated glow (`pinkPulse`), triggering confetti, sound effects, and music playback upon click.

---

## 🌟 Interactive Features & Sections

### 1. 🌸 "Tap to Bloom" Opening Gateway
- Solves browser audio autoplay restrictions smoothly.
- Unlocks the Web Audio API context, plays synthesized sparkle chime, triggers a colorful confetti burst, and fades out the welcome overlay.

### 2. 🍃 Living Sakura Blossom Simulation (`#sakura-canvas`)
- High-performance HTML5 2D Canvas simulation rendering 45 organic cherry blossom petals.
- Real-time sinusoidal fluttering physics with wind oscillation.
- **Interactive**: Mouse movement and touch gestures repel nearby petals with fluid momentum.

### 3. 🎂 3D Interactive Cake & Candle Extinguishing Ceremony
- Multi-tiered strawberry cream cake with frosted drips and a ceramic pearl cake plate.
- **Centered Cake Topper**: Features *"Janvii ✨"* perfectly centered via `left: 0; right: 0; text-align: center;` spanning the full 280px cake stage width.
- 3 striped candles with animated flickering fire glow.
- **Extinguish Mechanism**: Tapping "Make a Wish & Blow Candles" (or individual candle flames) synthesizes a soft candle-blow wind sound, activates rising smoke particles, extinguishes the flames, fires confetti, and reveals the celebration banner.

### 4. 📸 Polaroid Memory Gallery & Cinematic Lightbox
- 8 tactile Polaroid photo cards with washi-tape headers and subtle rotation angles (`-3deg` to `+3deg`).
- Interactive 3D hover scale and tilt.
- **Cinematic Lightbox Modal**: Clicking any card opens a full-screen viewer with captions, heartfelt descriptions, and Next/Previous navigation controls.
- **Video Reels**: Dedicated modal buttons to watch Janvii's memory reel video (`janvii4.mp4`) and the Teddy Bear Wishes video (`teddy_bear_wishes.mp4`).

### 5. 💌 Vintage Wax-Sealed Friendship Letter
- An interactive 3D envelope with a ruby wax seal (`🌸`).
- Tapping breaks the seal, flips open the envelope flap, and presents an authentic lined parchment letter with a personal message from Kaushal.

### 6. ⭐ "Jar of 365 Smiles" (Affirmation Capsules)
- A frosted glass jar containing animated origami stars (`starWiggle`).
- Tapping the jar draws from 14+ personalized uplifting affirmations with synthesized chime sounds and a live counter capped at 9 (`Smiles Drawn: X of 9`) to match Janvii's November 9 birthday.

### 7. 🎆 Grand Finale: Sky Lanterns & Fireworks Engine
- Releasing sky lanterns with wishes (*"Joy"*, *"Peace"*, *"Success"*, *"Health"*, *"Love"*) ascending into the sky.
- Full-screen interactive fireworks canvas (`#fireworks-canvas`) with a midnight-blue sky and a subtle twinkling star field.
- **Tap-to-Launch**: Tapping anywhere launches bright, multi-colored glowing bursts with synthesized explosion sound effects and soft fading trails against the dark sky.

### 8. 🎵 Click-to-Play Floating Music Dock
- Stays anchored at the bottom-right of the viewport.
- 4-bar animated equalizer visualizer synced to play/pause state.
- **Single Track**: *Jashn E Bahaaraa — Instrumental Flute* (`assets/audio/jashn_e_bahaaraa_flute.mp3`), starting at 22 seconds.
- Starts when entering the birthday page; pauses while a video reel is open and resumes at its previous position when the reel closes, if it was playing before.
- Native volume slider with live gain adjustment.

---

## 📁 File Structure

```
c:\Users\kaush\Downloads\New folder (2)\
├── index.html                    # Main HTML5 application
├── styles.css                    # Complete CSS (Dedicated Light Blossom Theme + First Page)
├── script.js                     # All interactions, Web Audio SFX, canvas simulations
├── README.md                     # Project documentation
├── Janvii_Birthday_Surprise.zip  # Full offline standalone zip package
└── assets/
    ├── audio/
    │   └── jashn_e_bahaaraa_flute.mp3 # Click-to-play background track
    ├── images/
    │   ├── photo_1.jpg to photo_3.jpg, photo_4.png, photo_5.jpg to photo_9.jpg
    │   ├── birthday_collage.png
    │   ├── janvii1.jpeg, janvii2.png, janvii3.png
    │   ├── 20.jpg, 22.jpg, 23.jpg, 29.jpg, 67.jpg, bd1.jpg
    │   └── decorative PNGs (balloons, banner, bulbs)
    └── videos/
        ├── Cute_Teddy_Bear_Birthday_Video.mp4
        ├── janvii4.mp4
        ├── reel1.mp4
        └── teddy_bear_wishes.mp4
```

---

## 🛠️ Technical Stack & Implementation Details

- **Zero Build Tools / Zero Node.js Requirement**: Runs directly in the browser via `file://` protocol or any static server.
- **Responsive Design**: Mobile layouts support narrow phone screens, touch-sized controls, scrollable modals, and a compact floating music dock.
- **Tailwind CSS (CDN)**: Utility styling for layout, spacing, and grid.
- **Canvas Confetti (CDN)**: Multi-burst celebration confetti.
- **Web Audio API**:
  - `playSparkleSound()`: Arpeggiated high chime frequencies (523Hz &rarr; 1046Hz).
  - `playBlowSound()`: Procedural bandpass-filtered white noise buffer simulating a breath puff.
  - `playPopSound()`: Quick sine oscillator frequency drop for affirmation star draws.
  - `playFireworkSound()`: Low-pass filtered noise burst with exponential decay.
- **Git Version Control**: Clean history with atomic commits tracking every design milestone.

---

## 🚀 How to Run & Share

1. **Direct Local Launch**:
   Double click `index.html` to open in Google Chrome, Microsoft Edge, or Safari.
2. **Sharing with Janvii**:
   Send `Janvii_Birthday_Surprise.zip` (unzip and open `index.html`), or host on GitHub Pages / Netlify by deploying the folder directly.
