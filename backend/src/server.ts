import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { config } from './config/env.js';
import { initDB, cleanExpiredSessions } from './db/index.js';
import { routes } from './routes/index.js';

const app = express();

// Initialize backend services
let initialized = false;
async function initializeServer() {
    if (initialized) return;
    await initDB();
    await cleanExpiredSessions();
    initialized = true;
}

// 1. Run Initialization FIRST for serverless / Cloud Run environment
app.use(async (req, res, next) => {
    try {
        await initializeServer();
        next();
    } catch (error) {
        console.error('Server initialization failed:', error);
        res.status(500).json({ error: 'Server initialization failed' });
    }
});

// 2. Dynamic CORS middleware
app.use((req, res, next) => {
    const origin = req.headers.origin;

    let isAllowed = false;
    if (origin) {
        if (
            origin.startsWith('http://localhost:') ||
            origin.startsWith('http://127.0.0.1:') ||
            origin.endsWith('.run.app') ||
            origin.endsWith('.vercel.app') ||
            origin === 'https://dev-garden-35o4.vercel.app' ||
            origin === 'https://dev-garden-kappa.vercel.app'
        ) {
            isAllowed = true;
        }
    }

    if (isAllowed && origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie, X-Requested-With, X-Session-ID, x-session-id');
    res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');

    // Intercept and immediately respond to OPTIONS preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

app.use(express.json());

// 3. Mount Routes
app.use(routes);

// Support both ESM and CJS path resolution
let currentDirname = '';
try {
    const filename = fileURLToPath(import.meta.url);
    currentDirname = path.dirname(filename);
} catch (e) {
    currentDirname = typeof __dirname !== 'undefined' ? __dirname : '';
}

// Serve static assets from frontend/dist in production
const frontendDistPath = path.resolve(currentDirname, '../../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));
}

// SPA fallback
app.get('*', (req, res, next) => {
    if (req.method === 'GET' && req.accepts('html') && !req.path.startsWith('/api/') && !req.path.startsWith('/auth/')) {
        if (fs.existsSync(path.join(frontendDistPath, 'index.html'))) {
            res.sendFile(path.join(frontendDistPath, 'index.html'));
            return;
        }
    }
    next();
});

// Local development or Cloud Run server listener
if (!config.isVercel) {
    const PORT = config.isProd ? config.port : 3001;

    initializeServer()
        .then(() => {
            app.listen(PORT, '0.0.0.0', () => {
                console.log('======================================');
                console.log(`DevGarden backend running on port ${PORT}`);
                console.log('======================================');
            });
        })
        .catch((err) => {
            console.error('Startup error:', err);
            process.exit(1);
        });
}

export default app;
