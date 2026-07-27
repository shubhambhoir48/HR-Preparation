import { getStore } from '@netlify/blobs';
import { AppState } from '@/types';

const STORE_NAME = 'hr-prep-user-data';

export async function getAppStateFromStore(): Promise<AppState | null> {
  try {
    // Check if Netlify Blobs store environment is configured
    if (process.env.NETLIFY_BLOBS_CONTEXT || process.env.NETLIFY_SITE_ID) {
      const store = getStore(STORE_NAME);
      const data = await store.get('user_state', { type: 'json' });
      return data as AppState | null;
    }
  } catch (err) {
    console.warn('Netlify Blobs fetch error (fallback to local):', err);
  }
  return null;
}

export async function saveAppStateToStore(state: AppState): Promise<boolean> {
  try {
    if (process.env.NETLIFY_BLOBS_CONTEXT || process.env.NETLIFY_SITE_ID) {
      const store = getStore(STORE_NAME);
      await store.setJSON('user_state', { ...state, updatedAt: new Date().toISOString() });
      return true;
    }
  } catch (err) {
    console.warn('Netlify Blobs save error:', err);
  }
  return false;
}
