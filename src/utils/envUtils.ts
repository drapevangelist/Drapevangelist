/**
 * Environment detection utility to distinguish between:
 * 1. AI Studio / Local Development ("the backend here") -> Editor & curation tools enabled
 * 2. Production deployments (e.g. Vercel, custom domains) -> Clean, finished product ONLY, no edit/curate controls
 */

const STORAGE_ADMIN_KEY = 'drape_admin_override_v1';

export function isEditorEnvironment(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Check if admin override is explicitly set in localStorage
  try {
    if (localStorage.getItem(STORAGE_ADMIN_KEY) === 'true') {
      return true;
    }
  } catch {
    // Ignore storage issues
  }

  // 2. Check for secret query param unlock on any domain (e.g. ?edit=drape or ?admin=true)
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') === 'drape' || params.get('admin') === 'true' || params.get('curate') === '1') {
      try {
        localStorage.setItem(STORAGE_ADMIN_KEY, 'true');
      } catch {
        // Safe
      }
      return true;
    }
    if (params.get('exit_admin') === 'true') {
      try {
        localStorage.removeItem(STORAGE_ADMIN_KEY);
      } catch {
        // Safe
      }
      return false;
    }
  } catch {
    // URL parsing fallback
  }

  // 3. Vite development environment (AI Studio build & preview runner)
  if (import.meta.env.DEV) {
    return true;
  }

  // 4. Hostname check for AI Studio / Google Cloud development containers
  const hostname = window.location.hostname.toLowerCase();

  // AI Studio preview domain (*.run.app)
  if (hostname.includes('.run.app')) {
    return true;
  }

  // Local development hostnames
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0') {
    return true;
  }

  // In all other environments (Vercel, custom domain, etc.), editing tools are completely disabled
  return false;
}

export function revokeAdminOverride(): void {
  try {
    localStorage.removeItem(STORAGE_ADMIN_KEY);
  } catch {
    // Safe
  }
}
