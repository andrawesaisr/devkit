import { useClipboard } from '../../hooks/useClipboard'
import { cn } from '../../lib/utils'

interface CopyButtonProps {
  text: string
  className?: string
  onCopy?: () => void
}

export function CopyButton({ text, className, onCopy }: CopyButtonProps) {
  const { isCopied, copy } = useClipboard()

  const handleCopy = async () => {
    const success = await copy(text)
    if (success) {
      onCopy?.()
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'px-3 py-1.5 text-sm font-medium rounded-md transition-smooth',
        'hover:scale-105 active:scale-95',
        isCopied
          ? 'bg-accent-success/20 text-accent-success border border-accent-success'
          : 'bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-elevated hover:border-accent-primary',
        className
      )}
      disabled={isCopied}
    >
      {isCopied ? (
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Copy
        </span>
      )}
    </button>
  )
}
