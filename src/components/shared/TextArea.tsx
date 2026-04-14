import { cn } from '../../lib/utils'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  showLineNumbers?: boolean
}

export function TextArea({
  label,
  error,
  showLineNumbers,
  className,
  ...props
}: TextAreaProps) {
  const lines = props.value ? String(props.value).split('\n').length : 1

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-semibold text-text-primary">
          {label}
        </label>
      )}
      <div className="relative flex">
        {showLineNumbers && (
          <div className="flex-shrink-0 w-12 bg-bg-secondary border-r border-border-subtle overflow-hidden rounded-l-lg">
            <div className="py-3 px-2 text-right text-xs text-text-tertiary font-mono leading-6">
              {Array.from({ length: lines }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          </div>
        )}
        <textarea
          {...props}
          className={cn(
            'flex-1 min-h-[200px] p-3 bg-bg-tertiary text-text-primary border border-border-default',
            'rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent',
            'font-mono text-sm leading-6 resize-y scrollbar-thin',
            'placeholder:text-text-tertiary',
            error && 'border-accent-error focus:ring-accent-error',
            showLineNumbers && 'rounded-l-none',
            className
          )}
        />
      </div>
      {error && (
        <p className="text-sm text-accent-error">{error}</p>
      )}
    </div>
  )
}
