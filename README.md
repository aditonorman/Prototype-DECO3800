# Legitimate Checker — Digital Literacy Prototype

A React Native (Expo) visual prototype for a university design project on
**digital literacy and misinformation in Indonesia**.

The app simulates a phone environment: a lock screen, a home screen with app
icons, and four dummy apps (Instagram, WhatsApp, X/Twitter, TikTok). After the user
activates the **Legitimate Checker**, a small floating bubble appears on top
of those apps. Tapping the bubble opens a reflective pop-up that helps the
user pause, check sources, and notice warning signs — without claiming to
decide truth for them.

> This is a **prototype simulation**, not a real OS-level overlay. React Native
> cannot draw on top of other apps without native permissions, so we simulate
> the whole phone inside one Expo app.

---

## Quick start

```bash
npm install
npx expo start
```

Then:

- Press `i` to open in the iOS simulator (Mac only)
- Press `a` to open in the Android emulator
- Press `w` to open in the browser
- Or scan the QR code with the **Expo Go** app on your phone

---

## Folder structure

```
code/
├── App.js                         # Main app, holds navigation + modal state
├── app.json                       # Expo project config
├── package.json                   # Dependencies + scripts
├── babel.config.js                # Babel preset for Expo
├── README.md                      # This file
│
├── data/
│   └── dummyContent.js            # Posts, messages, tweets, videos, result + verification data
│
└── components/
    ├── PhoneFrame.js              # Black phone-shaped frame (for desktop preview)
    ├── LockScreen.js              # Fake lock screen with clock
    ├── HomeScreen.js              # Fake home screen with app icons
    ├── AppIcon.js                 # Single home-screen app icon
    ├── OnboardingEntry.js         # Entry chooser: assisted vs solo + community paths
    ├── SoloOnboarding.js          # State B onboarding — 3 slides + consent in Bahasa
    ├── CheckerApp.js              # State A Legitimate Checker app (intro + agreement + settings)
    ├── FakeInstagram.js           # Dummy Instagram feed
    ├── FakeWhatsApp.js            # Dummy WhatsApp Family Group chat
    ├── FakeTwitter.js             # Dummy X/Twitter feed
    ├── FakeTikTok.js              # Dummy TikTok-style vertical feed
    ├── FloatingCheckerBubble.js   # Round button shown on top of social apps
    ├── CheckerModal.js            # Bottom-sheet modal (confirm | source | result steps)
    ├── SourceVerificationModal.js # Source-verification layer (between confirm and result)
    └── ResultCard.js              # The reflective result view
```

If you have a logo, drop it in `assets/appLogo.png` — the prototype currently
uses a simple **LC** circle so no asset is required.

---

## How the prototype flows

1. **Lock screen** → tap *Swipe up to unlock*.
2. **Home screen** → five app icons: Instagram, WhatsApp, X, TikTok, Legitimate Checker.
3. **Open Legitimate Checker** → on first visit, the *Onboarding Entry* chooser appears:
   - *"Seorang anggota keluarga membantu saya menyiapkan"* (A family member is helping me set up) → **State A** (English-led `CheckerApp` with the family/self toggle).
   - *"Saya sendiri"* (By myself) → **State B** (`SoloOnboarding`, three illustrated slides + consent screen in plain Bahasa Indonesia).
   - Three community entry cards (mosque/RT QR, community WhatsApp link, Kemenkomdigi page) all route to State B.
4. **Activate Checker** → State A reuses the existing English flow; State B applies kinder defaults automatically (Simple language, Source reminders, One-tap dismiss).
5. **Back to Home** → open Instagram, WhatsApp, X, or TikTok. The blue **LC** floating bubble now appears at bottom-right.
6. **Tap a post / message / tweet / video** to select it, *or* tap its Share/Forward/Repost button to intercept the share moment in one tap.
7. **Confirm step** — the bottom sheet asks *"Who posted this?"* and shows the source name + a category-specific question (health, political, scam, celebrity, news, lifestyle, or family).
8. **Source step (new — proposal §5.4)** — tapping *Periksa sumber* opens the source-verification layer:
   - Simulated outlet/profile view (what would happen if you opened the source's official profile).
   - Corroboration list of 1–3 recognised Indonesian outlets (Kompas, Detik, CNN Indonesia, Kementerian Kesehatan RI, OJK, …) and whether each is reporting the same thing.
   - A soft verdict line — one of: *Sumber dikonfirmasi*, *Sumber teridentifikasi sebagai opini*, *Konten pribadi, bukan klaim faktual*, or *Sumber belum dikonfirmasi* (the default fallback).
   - First-time tooltip for solo-onboarded users explaining what the step does.
9. **Result step** — tapping *Lihat hasil lengkap* shows the full reflective result: judgement label (English + Bahasa gloss), source / evidence / bias checks, literacy reminders, suggested references, and a recommended next action.

---

## Result types

The wording is intentionally **soft and non-absolute**:

- **Most likely reliable** ✅ — *Kemungkinan dapat dipercaya*
- **Possible bias** ⚖️ — *Kemungkinan ada bias*
- **Not enough evidence** ❓ — *Bukti belum cukup*
- **Likely misleading** ⚠️ — *Berpotensi menyesatkan*

The new source-verification layer adds four soft *source-status* labels in Bahasa Indonesia:

- **Sumber dikonfirmasi** — *Source confirmed*
- **Sumber teridentifikasi sebagai opini** — *Source identified as opinion*
- **Konten pribadi, bukan klaim faktual** — *Personal content, not a factual claim*
- **Sumber belum dikonfirmasi** — *Source not yet confirmed* (the default fallback for unknown sources)

The checker never says *"this is true"* or *"this is false"*. The final decision is always with the user.

---

## Notes for the team

- All code is **JavaScript** (not TypeScript), as requested.
- All components are **functional components with React hooks**.
- Navigation uses **simple `useState`** — no React Navigation library needed.
- No backend, no real API. All content lives in `data/dummyContent.js`.
- Adding a new dummy post is as easy as adding an object to the relevant array
  with a `riskType` of `reliable | bias | low_evidence | misleading` and a
  `contentCategory` like `health | political | scam | celebrity | news`.
