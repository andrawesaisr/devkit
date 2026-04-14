import { useEffect } from 'react'
import type { ReactNode } from 'react'

interface ToolPageProps {
  title: string
  description: string
  children: ReactNode
}

export function ToolPage({ title, description, children }: ToolPageProps) {
  useEffect(() => {
    document.title = `${title} - DevKit`
  }, [title])

  return (
    <div className="w-full max-w-[900px] mx-auto px-4 md:px-8 py-8 md:py-12 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-text-primary mb-2">
          {title}
        </h1>
        <p className="text-sm md:text-base text-text-secondary">
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}
