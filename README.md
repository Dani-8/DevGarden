# DevGarden 🌳

Welcome to **DevGarden** — a multiplayer 2D pixel-art sandbox where developers log in via GitHub OAuth, synchronize live as cute retro character avatars, chat, express themselves with pixel emotes, and compare stats on a Hall of Fame scoreboard. Every developer's level, guild title, clothing styles, and shiny magical auras are procedurally generated directly from their actual, real-world GitHub contribution histories.

---

## 🛠️ Stack Architecture

- **Backend**: Node.js + Express + Socket.io (for real-time coordinate position syncing & chat rate-limiting)
- **Database Engine**: Built-in `node:sqlite` (native SQLite client in Node 22+ — zero compilation or native addon issues)
- **Frontend Engine**: Phaser 3 (2D physics, animation manager, particle engines, and custom canvas-drawn pixel texture sets)
- **Visuals UI**: React + Tailwind CSS + Lucide Icons (onboarding, scoreboard panels, profile inspector badges)

---

## 🚀 Step-by-Step GitHub OAuth Setup

Since OAuth flows cannot safely run inside parent-restricted sandbox frames, DevGarden implements a secure, popup-based OAuth authorization mechanism. To enable logins in your environment, perform these steps:

### 1. Register a GitHub OAuth App
1. Go to your GitHub profile settings: **[GitHub Developer Applications Dashboard](https://github.com/settings/developers)**.
2. Click **New OAuth App** and configure:
   - **Application Name**: `DevGarden`
   - **Homepage URL**: `https://ais-dev-gca6tjjvrnq2mfd6yvxqy4-489397614410.asia-southeast1.run.app`
   - **Authorization Callback URL**: `https://ais-dev-gca6tjjvrnq2mfd6yvxqy4-489397614410.asia-southeast1.run.app/auth/callback`

*(Note: If deploying/sharing, also register `https://ais-pre-gca6tjjvrnq2mfd6yvxqy4-489397614410.asia-southeast1.run.app/auth/callback`)*

### 2. Configure Environment Variables in AI Studio
Click on the **Secrets / Settings** gear inside the AI Studio top panel to inject:
- `CLIENT_ID`: Your GitHub app's Client ID.
- `CLIENT_SECRET`: Your GitHub app's generated Client Secret.

*(Note: `APP_URL` and `GEMINI_API_KEY` are automatically managed and injected by the AI Studio platform. You do not need to supply them.)*

---

## 💻 Local Commands

### Installation
Ensure dependencies are up to date:
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
Compiles client assets and bundles the TypeScript backend server using `esbuild` into a single, high-performance CommonJS file inside `/dist`:
```bash
npm run build
```

### Start Production Server
Launch the bundled, lightweight server standalone:
```bash
npm run start
```
