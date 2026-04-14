import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface InputOutputProps {
  input: ReactNode
  output: ReactNode
  vertical?: boolean
  className?: string
}

export function InputOutput({ input, output, vertical = false, className }: InputOutputProps) {
  return (
    <div
      className={cn(
        'flex gap-4 w-full',
        vertical ? 'flex-col' : 'flex-col md:flex-row',
        className
      )}
    >
      <div className="flex-1 min-w-0">{input}</div>
      <div className="flex-1 min-w-0">{output}</div>
    </div>
  )
}
