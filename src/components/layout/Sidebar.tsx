import { Link, useLocation } from 'react-router-dom'
import { tools, categories } from '../../lib/toolRegistry'
import { cn } from '../../lib/utils'

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden md:flex flex-col w-[260px] h-screen sticky top-0 border-r border-border-subtle bg-bg-secondary">
      <div className="flex items-center h-16 px-6 border-b border-border-subtle">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="text-2xl">🛠️</div>
          <span className="text-xl font-semibold text-text-primary group-hover:text-accent-primary transition-smooth">
            DevKit
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4">
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
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth group',
                          isActive
                            ? 'bg-accent-primary/10 text-accent-primary'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                        )}
                      >
                        <span className="text-lg">{tool.icon}</span>
                        <span className="text-sm font-medium truncate">{tool.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
