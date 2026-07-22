import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  isVercel: !!process.env.VERCEL,
  isProd: process.env.NODE_ENV === 'production',
  
  // Supabase Config
  supabaseUrl: (process.env.SUPABASE_URL || '').trim(),
  supabaseAnonKey: (process.env.SUPABASE_ANON_KEY || '').trim(),
  supabaseServiceRoleKey: (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim(),

  // GitHub OAuth Config
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  githubRedirectUri: process.env.GITHUB_REDIRECT_URI || '',
  redirectUri: process.env.REDIRECT_URI || '',
  appUrl: process.env.APP_URL || '',

  // AI Gemini Config
  geminiApiKey: process.env.GEMINI_API_KEY || '',
};

export function isSupabaseConfigured(): boolean {
  return !!(config.supabaseUrl && config.supabaseServiceRoleKey);
}
