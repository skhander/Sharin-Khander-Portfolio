const STORAGE_KEY = 'portfolio-taste-preview';
export const TASTE_PREVIEW = 'taste';

export function readPreviewQuery(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('preview');
}

export function isTastePreview(): boolean {
  if (typeof window === 'undefined') return false;
  const query = readPreviewQuery();
  if (query === 'off' || query === 'original') return false;
  if (query === TASTE_PREVIEW) return true;
  return sessionStorage.getItem(STORAGE_KEY) === TASTE_PREVIEW;
}

export function applyTastePreview(): boolean {
  if (typeof document === 'undefined') return false;
  const on = isTastePreview();
  document.documentElement.classList.toggle('preview-taste', on);
  if (on) sessionStorage.setItem(STORAGE_KEY, TASTE_PREVIEW);
  else if (readPreviewQuery() === 'off' || readPreviewQuery() === 'original') {
    sessionStorage.removeItem(STORAGE_KEY);
  }
  return on;
}

export function exitTastePreview() {
  sessionStorage.removeItem(STORAGE_KEY);
  const url = new URL(window.location.href);
  url.searchParams.set('preview', 'off');
  window.history.replaceState({}, '', url);
  window.location.reload();
}
