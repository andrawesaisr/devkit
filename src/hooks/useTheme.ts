import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>('devkit-theme', 'dark')

  useEffect(() => {
    const root = window.document.documentElement

    // Remove both classes
    root.classList.remove('light', 'dark')

    // Add the current theme class
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light')
  }

  return { theme, setTheme, toggleTheme }
}
