/**
 * Theme names drive the data-theme attribute on <html> (set by tailwind-theme-engine's
 * createThemeController in ThemeProvider).  CSS selectors in index.css target
 * [data-theme="festive"] etc. to override the --c-* channel variables.
 * The default theme has no data-theme attribute (null dataTheme).
 */
export const THEME_STORAGE_KEY = 'homefood-theme'

export const THEMES = {
  default: {
    id: 'default',
    label: 'Classic',
    themeColor: '#c0392b',
    icon: '🍲',
    /** null = no data-theme attribute; CSS :root variables apply */
    dataTheme: null as string | null,
  },
  festive: {
    id: 'festive',
    label: 'Festive',
    themeColor: '#9b2335',
    icon: '🎄',
    dataTheme: 'festive',
  },
  midnight: {
    id: 'midnight',
    label: 'Midnight',
    themeColor: '#1b1815',
    icon: '🌙',
    dataTheme: 'midnight',
  },
  harvest: {
    id: 'harvest',
    label: 'Harvest',
    themeColor: '#b5531f',
    icon: '🍂',
    dataTheme: 'harvest',
  },
} as const

export type ThemeId = keyof typeof THEMES

export const THEME_IDS = Object.keys(THEMES) as ThemeId[]

export function isThemeId(value: string): value is ThemeId {
  return value in THEMES
}

export function resolveThemeId(stored: string | null): ThemeId {
  return stored && isThemeId(stored) ? stored : 'default'
}

export function nextThemeId(current: ThemeId): ThemeId {
  const index = THEME_IDS.indexOf(current)
  return THEME_IDS[(index + 1) % THEME_IDS.length]
}
