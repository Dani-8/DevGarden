import express from 'express';
import crypto from 'node:crypto';
import { config } from '../config/env.js';

export const SESSION_COOKIE_NAME = 'devgarden_session';
export const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function parseCookies(cookieHeader?: string): Record<string, string> {
  const list: Record<string, string> = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const name = parts.shift()?.trim();
    if (name) {
      list[name] = decodeURIComponent(parts.join('='));
    }
  });
  return list;
}

export function createSessionCookie(value: string, maxAge: number): string {
  return `${SESSION_COOKIE_NAME}=${value}; Path=/; Max-Age=${maxAge / 1000}; HttpOnly; Secure; SameSite=None`;
}

export function getRedirectUri(req: express.Request): string {
  if (config.githubRedirectUri) {
    return config.githubRedirectUri;
  }
  if (config.redirectUri) {
    return config.redirectUri;
  }

  if (config.appUrl) {
    const cleanAppUrl = config.appUrl.replace(/\/$/, '');
    return `${cleanAppUrl}/auth/callback`;
  }

  const requestHost = req.get('host') || '';
  const isLocal = requestHost.includes('localhost') || requestHost.includes('127.0.0.1');
  
  const protocol = isLocal 
    ? req.protocol 
    : (req.get('x-forwarded-proto') || 'https');

  const host = `${protocol}://${requestHost}`;
  return `${host}/auth/callback`;
}

export function getSessionIdFromRequest(req: express.Request): string | undefined {
  const cookies = parseCookies(req.headers.cookie);
  if (cookies[SESSION_COOKIE_NAME]) {
    return cookies[SESSION_COOKIE_NAME];
  }
  if (req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts[0] === 'Bearer' && parts[1]) {
      return parts[1];
    }
  }
  if (req.headers['x-session-id']) {
    return req.headers['x-session-id'] as string;
  }
  if (req.query.token) {
    return req.query.token as string;
  }
  return undefined;
}
