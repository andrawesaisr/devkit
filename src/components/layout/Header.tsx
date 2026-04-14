import { useTheme } from '../../hooks/useTheme'

interface HeaderProps {
  onSearchClick: () => void
}

export function Header({ onSearchClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-bg-primary/80 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <button
          onClick={onSearchClick}
          className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary bg-bg-tertiary rounded-lg border border-border-default hover:border-accent-primary transition-smooth"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="hidden md:inline">Search tools...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-xs font-mono bg-bg-secondary border border-border-subtle rounded">
            {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+K
          </kbd>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 text-text-primary hover:bg-bg-tertiary rounded-lg transition-smooth"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}
