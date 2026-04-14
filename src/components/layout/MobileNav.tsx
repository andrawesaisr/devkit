import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { tools, categories } from '../../lib/toolRegistry'
import { cn } from '../../lib/utils'

export function MobileNav() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      {/* Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-16 border-t border-border-subtle bg-bg-secondary/95 backdrop-blur-sm">
        <Link
          to="/"
          className={cn(
            'flex flex-col items-center justify-center flex-1 h-full transition-smooth',
            location.pathname === '/'
              ? 'text-accent-primary'
              : 'text-text-secondary active:text-text-primary'
          )}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </Link>

        <button
          onClick={toggleMenu}
          className="flex flex-col items-center justify-center flex-1 h-full text-text-secondary active:text-text-primary transition-smooth"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-xs mt-1">Menu</span>
        </button>
      </nav>

      {/* Full-screen Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-bg-primary animate-fade-in">
          <div className="flex items-center justify-between h-16 px-4 border-b border-border-subtle">
            <Link to="/" className="flex items-center gap-2" onClick={toggleMenu}>
              <div className="text-2xl">🛠️</div>
              <span className="text-xl font-semibold text-text-primary">DevKit</span>
            </Link>
            <button
              onClick={toggleMenu}
              className="p-2 text-text-primary hover:bg-bg-tertiary rounded-lg transition-smooth"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="overflow-y-auto h-[calc(100vh-4rem)] scrollbar-thin py-4">
            {categories.map((category) => {
              const categoryTools = tools.filter((tool) => tool.category === category)
              return (
                <div key={category} className="mb-6">
                  <h3 className="px-6 mb-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider">
                    {category}
                  </h3>
                  <ul className="space-y-1 px-3">
                    {categoryTools.map((tool) => {
                      const isActive = location.pathname === tool.path
                      return (
                        <li key={tool.id}>
                          <Link
                            to={tool.path}
                            onClick={toggleMenu}
                            className={cn(
                              'flex items-center gap-3 px-3 py-3 rounded-lg transition-smooth',
                              isActive
                                ? 'bg-accent-primary/10 text-accent-primary'
                                : 'text-text-secondary active:text-text-primary active:bg-bg-tertiary'
                            )}
                          >
                            <span className="text-xl">{tool.icon}</span>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{tool.name}</div>
                              <div className="text-xs text-text-tertiary">{tool.description}</div>
                            </div>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
