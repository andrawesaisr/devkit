import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchTools } from '../../lib/toolRegistry'
import { cn } from '../../lib/utils'

interface SpotlightSearchProps {
  isOpen: boolean
  onClose: () => void
}

export function SpotlightSearch({ isOpen, onClose }: SpotlightSearchProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = query.trim() ? searchTools(query) : []

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          onClose()
          setTimeout(() => {
            onClose()
          }, 0)
        }
      }

      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
      } else if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault()
        navigate(results[selectedIndex].path)
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, results, selectedIndex, navigate])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4 bg-black/50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-bg-elevated rounded-xl shadow-2xl border border-border-default overflow-hidden animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
          <svg className="w-5 h-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools..."
            className="flex-1 bg-transparent text-text-primary placeholder:text-text-tertiary outline-none text-base"
          />
          <kbd className="px-2 py-1 text-xs font-mono text-text-tertiary bg-bg-secondary border border-border-subtle rounded">
            ESC
          </kbd>
        </div>

        {results.length > 0 ? (
          <ul className="max-h-[400px] overflow-y-auto scrollbar-thin py-2">
            {results.map((tool, index) => (
              <li key={tool.id}>
                <button
                  onClick={() => {
                    navigate(tool.path)
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-left transition-smooth',
                    index === selectedIndex
                      ? 'bg-accent-primary/10 text-text-primary'
                      : 'text-text-secondary hover:bg-bg-tertiary'
                  )}
                >
                  <span className="text-2xl">{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{tool.name}</div>
                    <div className="text-xs text-text-tertiary truncate">{tool.description}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : query.trim() ? (
          <div className="px-4 py-8 text-center text-text-tertiary">
            No tools found for "{query}"
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-text-tertiary">
            Start typing to search tools...
          </div>
        )}
      </div>
    </div>
  )
}
