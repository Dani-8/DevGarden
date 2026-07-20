# DevGarden 🌳

Welcome to **DevGarden** — an interactive multiplayer 2D pixel-art greenhouse sandbox for developers! Log in via GitHub, walk around as your custom retro character avatar, chat in real-time with peers, and showcase your profile on a live scoreboard. 

Every developer's character level, guild titles, cosmetic clothing sets, and sparkling magical trails are procedurally generated directly from their real-world GitHub contribution history.

---

## ✨ New Major Features

### 🧠 Custom AI Specialty Challenges
Nurture the Sprout Tree with **10x Golden Water** by conquering specialized coding challenges.
- **Dynamic Specialties**: Type *any* custom technology specialty (e.g., Svelte, Go, Rust, GCP, Docker, CSS).
- **Gemini-Powered Challenges**: Generates a quick custom conceptual Q&A or single-line code completion challenge tailor-made for your field.
- **Instant Rewards**: Solve the challenge to unleash spectacular golden trail visual effects and gain a **10x growth multiplier** for the community garden!

### 🎨 Visual Cohesion & Hover States
- **Aesthetic Avatar Filtering**: All GitHub profile pictures are dynamically styled with a custom-engineered sepia, foliage-green hue-shift filter matching our cozy natural color palette perfectly.
- **Interactive Micro-Transitions**: Hovering over any avatar on the scoreboard, sidebar, or inspector smooths out the colors to reveal their original image with fluid transition feedback.
- **Readable Interface**: Upgraded proximity prompts with comfortable human fonts for maximum legibility and comfort.

---

## 🛠️ Stack Architecture

- **Backend**: Node.js + Express + Socket.io (for real-time coordinate position syncing & chat rate-limiting)
- **AI Core**: `@google/genai` TypeScript SDK (seamless Gemini 3.5 Flash prompt synthesis & schema-strict challenge verification)
- **Database Engine**: Native `node:sqlite` in Node 22+ (zero-dependency persistent storage engine)
- **Frontend Engine**: Phaser 3 (2D physics, particle effects, and dynamic canvas-drawn pixel textures)
- **UI Framework**: React + Tailwind CSS + Lucide Icons (onboarding, challenge cards, and profiles)

---

## 🚀 Step-by-Step GitHub OAuth Setup

Since OAuth flows cannot safely run inside parent-restricted sandbox frames, DevGarden implements a secure, popup-based OAuth authorization mechanism. To enable logins in your environment, perform these steps:

### 1. Register a GitHub OAuth App
1. Go to your GitHub profile settings: **[GitHub Developer Applications Dashboard](https://github.com/settings/developers)**.
2. Click **New OAuth App** and configure:
   - **Application Name**: `DevGarden`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization Callback URL**: `http://localhost:3000/auth/callback`

*(Note: If you deploy to production, register your production callback URL separately.)*

### 2. Configure Environment Variables
Local development (recommended): create a `.env` file at the project root or export these variables in your shell before running locally:

```
CLIENT_ID=your_github_client_id
CLIENT_SECRET=your_github_client_secret
APP_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key
```

- Make sure your GitHub OAuth app's Authorization Callback URL matches `http://localhost:3000/auth/callback` (or `http://127.0.0.1:3000/auth/callback`).

---

## 💻 Local Commands

### Installation
```bash
npm install
```

### Run Development Live
Launch the Express backend + Socket.io server with integrated Vite HMR middleware:
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### Compile & Build Production
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```
