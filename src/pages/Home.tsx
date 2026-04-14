import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { tools, categories } from '../lib/toolRegistry'
import { cn } from '../lib/utils'

export function Home() {
  useEffect(() => {
    document.title = 'DevKit — Free Developer Utilities'
  }, [])

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center animate-fade-in">
        <div className="text-6xl md:text-7xl mb-4">🛠️</div>
        <h1 className="text-3xl md:text-4xl font-semibold text-text-primary mb-3">
          DevKit
        </h1>
        <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
          Every tool a developer needs. Fast, free, offline.
        </p>
      </div>

      {/* Tool Grid by Category */}
      <div className="space-y-12">
        {categories.map((category) => {
          const categoryTools = tools.filter((tool) => tool.category === category)
          return (
            <div key={category} className="animate-slide-up">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTools.map((tool) => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className={cn(
                      'group p-6 rounded-xl border border-border-default bg-bg-secondary',
                      'hover:border-accent-primary hover:bg-bg-tertiary hover:scale-105',
                      'hover:shadow-lg transition-all duration-150'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{tool.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-text-primary mb-1 group-hover:text-accent-primary transition-smooth">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-text-secondary line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-border-subtle text-center text-sm text-text-tertiary">
        <p>
          Made with ❤️  for developers, by Andrawes Aisr
        </p>
      </div>
    </div>
  )
}
