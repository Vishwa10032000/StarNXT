// theme.ts
export type Theme = 'light' | 'dark' | 'system';

const KEY = 'theme';

export function getStoredTheme(): Theme | null {
  return (localStorage.getItem(KEY) as Theme) || null;
}

export function applyTheme(theme: Theme | null) {
  const root = document.documentElement;
  if (!theme || theme === 'system') {
    root.removeAttribute('data-theme');     // let prefers-color-scheme drive it
  } else {
    root.setAttribute('data-theme', theme); // force theme
  }
  localStorage.setItem(KEY, theme ?? 'system');
}

export function initTheme() {
  applyTheme(getStoredTheme());
}
