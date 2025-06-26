import { parse } from 'cookie';

export function setAuthCookie(name: string, value: string, maxAge = 86400) {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge};`;
}

export function clearAuthCookie(name: string) {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}

export function getAuthCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  const cookies = parse(document.cookie || '');
  return cookies[name] || null;
}
