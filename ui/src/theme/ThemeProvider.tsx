import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  THEME_STORAGE_KEY,
  THEMES,
  resolveThemeId,
  type ThemeId,
} from '../constants/theme'

/**
 * Applies a theme by setting (or removing) the data-theme attribute on <html>.
 * CSS in index.css uses [data-theme="midnight"] etc. to override --c-* variables.
 * tailwind-theme-engine (the Tailwind plugin) reads those same --c-* values and
 * exposes them as --color-* custom properties that index.css component styles use.
 */
function applyThemeToDocument(themeId: ThemeId) {
  const root = document.documentElement
  const active = THEMES[themeId]

  // null dataTheme = default; no attribute needed (CSS :root variables apply)
  if (active.dataTheme) {
    root.setAttribute('data-theme', active.dataTheme)
  } else {
    root.removeAttribute('data-theme')
  }

  // Syncs class="dark" with midnight so tailwind-theme-engine's html.dark
  // selector activates and --theme-* CSS vars take effect in index.css.
  root.classList.toggle('dark', themeId === 'midnight')

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (meta) meta.content = active.themeColor
}

function readStoredTheme(): ThemeId {
  if (typeof window === 'undefined') return 'default'
  try {
    return resolveThemeId(localStorage.getItem(THEME_STORAGE_KEY))
  } catch {
    return 'default'
  }
}

type ThemeContextValue = {
  themeId: ThemeId
  setThemeId: (id: ThemeId) => void
  toggleFestive: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState<ThemeId>(readStoredTheme)

  const setThemeId = useCallback((id: ThemeId) => {
    setThemeIdState(id)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id)
    } catch {
      /* private browsing */
    }
    applyThemeToDocument(id)
  }, [])

  useEffect(() => {
    applyThemeToDocument(themeId)
  }, [themeId])

  const toggleFestive = useCallback(() => {
    setThemeId(themeId === 'festive' ? 'default' : 'festive')
  }, [setThemeId, themeId])

  const value = useMemo(
    () => ({ themeId, setThemeId, toggleFestive }),
    [themeId, setThemeId, toggleFestive],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
