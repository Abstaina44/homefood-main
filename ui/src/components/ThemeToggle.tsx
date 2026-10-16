import { nextThemeId, THEMES } from '../constants/theme'
import { useTheme } from '../theme/ThemeProvider'

/** Cycles through the tailwindcss-themer palettes via a class on <html> (see tailwind.config.js). */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { themeId, setThemeId } = useTheme()
  const active = THEMES[themeId]
  const next = THEMES[nextThemeId(themeId)]

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-xl border border-beige bg-panel/80 px-3 py-2 text-sm font-medium text-charcoal shadow-sm transition hover:border-tomato/40 hover:text-tomato ${className}`}
      onClick={() => setThemeId(next.id)}
      aria-label={`Theme: ${active.label}. Switch to ${next.label}.`}
      title={`Theme: ${active.label} — click for ${next.label}`}
    >
      <span aria-hidden>{active.icon}</span>
      <span className="hidden sm:inline">{active.label}</span>
    </button>
  )
}
