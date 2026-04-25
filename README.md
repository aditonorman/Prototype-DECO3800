# Legitimate Checker — Digital Literacy Prototype

A React Native (Expo) visual prototype for a university design project on
**digital literacy and misinformation in Indonesia**.

The app simulates a phone environment: a lock screen, a home screen with app
icons, and three dummy apps (Instagram, WhatsApp, X/Twitter). After the user
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
├── App.js                       # Main app, holds navigation + modal state
├── app.json                     # Expo project config
├── package.json                 # Dependencies + scripts
├── babel.config.js              # Babel preset for Expo
├── README.md                    # This file
│
├── data/
│   └── dummyContent.js          # Posts, messages, tweets, result templates
│
└── components/
    ├── PhoneFrame.js            # Black phone-shaped frame (for desktop preview)
    ├── LockScreen.js            # Fake lock screen with clock
    ├── HomeScreen.js            # Fake home screen with app icons
    ├── AppIcon.js               # Single home-screen app icon
    ├── CheckerApp.js            # Legitimate Checker app (intro + agreement + settings)
    ├── FakeInstagram.js         # Dummy Instagram feed
    ├── FakeWhatsApp.js          # Dummy WhatsApp Family Group chat
    ├── FakeTwitter.js           # Dummy X/Twitter feed
    ├── FloatingCheckerBubble.js # Round button shown on top of social apps
    ├── CheckerModal.js          # Bottom-sheet modal (confirm + result steps)
    └── ResultCard.js            # The reflective result view
```

If you have a logo, drop it in `assets/appLogo.png` — the prototype currently
uses a simple **LC** circle so no asset is required.

---

## How the prototype flows

1. **Lock screen** → tap *Swipe up to unlock*.
2. **Home screen** → four app icons: Instagram, WhatsApp, X, Legitimate Checker.
3. **Open Legitimate Checker** → read the purpose, tick the three agreement
   boxes, then tap *Activate Checker*. You can also toggle visual settings
   (Simple language mode, Show source reminders, One-tap dismiss).
4. **Back to Home** → open Instagram, WhatsApp, or X. The blue **LC** floating
   bubble now appears at bottom-right.
5. **Tap a post / message / tweet** to select it for checking.
6. **Tap the floating bubble** → confirm in the bottom sheet → see the result.
7. The result includes: overall judgement label, source check, evidence check,
   bias check, digital literacy reminders, suggested references, and a
   recommended next action.

---

## Result types

The wording is intentionally **soft and non-absolute**:

- **Most likely reliable** ✅
- **Possible bias** ⚖️
- **Not enough evidence** ❓
- **Likely misleading** ⚠️

The checker never says *"this is true"* or *"this is false"*.
The final decision is always with the user.

---

## Notes for the team

- All code is **JavaScript** (not TypeScript), as requested.
- All components are **functional components with React hooks**.
- Navigation uses **simple `useState`** — no React Navigation library needed.
- No backend, no real API. All content lives in `data/dummyContent.js`.
- Adding a new dummy post is as easy as adding an object to the relevant array
  with a `riskType` of `reliable | bias | low_evidence | misleading` and a
  `contentCategory` like `health | political | scam | celebrity | news`.
