import { useState, useEffect, useMemo } from 'react'
import { ToolPage } from '../shared/ToolPage'
import { TextArea } from '../shared/TextArea'
import { CopyButton } from '../shared/CopyButton'
import { InputOutput } from '../shared/InputOutput'
import { formatBytes, debounce } from '../../lib/utils'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [indentation, setIndentation] = useState<'2' | '4' | 'tab'>('2')
  const [isMinify, setIsMinify] = useState(false)
  const [error, setError] = useState('')
  const [output, setOutput] = useState('')
  const [stats, setStats] = useState({ inputSize: 0, outputSize: 0, lines: 0 })

  const processJSON = useMemo(
    () =>
      debounce((value: string, indent: string, minify: boolean) => {
        if (!value.trim()) {
          setOutput('')
          setError('')
          setStats({ inputSize: 0, outputSize: 0, lines: 0 })
          return
        }

        try {
          const parsed = JSON.parse(value)
          let formatted: string

          if (minify) {
            formatted = JSON.stringify(parsed)
          } else {
            const indentValue = indent === 'tab' ? '\t' : Number(indent)
            formatted = JSON.stringify(parsed, null, indentValue)
          }

          setOutput(formatted)
          setError('')
          setStats({
            inputSize: new Blob([value]).size,
            outputSize: new Blob([formatted]).size,
            lines: formatted.split('\n').length,
          })
        } catch (err) {
          setError((err as Error).message)
          setOutput('')
          setStats({ inputSize: new Blob([value]).size, outputSize: 0, lines: 0 })
        }
      }, 300),
    []
  )

  useEffect(() => {
    processJSON(input, indentation, isMinify)
  }, [input, indentation, isMinify, processJSON])

  // Syntax highlighting for JSON
  const highlightJSON = (json: string) => {
    if (!json) return ''

    return json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
        let cls = 'text-accent-warning' // number
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'text-accent-info' // key
          } else {
            cls = 'text-accent-success' // string
          }
        } else if (/true|false/.test(match)) {
          cls = 'text-accent-primary' // boolean
        } else if (/null/.test(match)) {
          cls = 'text-text-tertiary' // null
        }
        return `<span class="${cls}">${match}</span>`
      })
  }

  return (
    <ToolPage
      title="JSON Formatter"
      description="Format, minify, and validate JSON with syntax highlighting"
    >
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-text-secondary">Indentation:</label>
            <select
              value={indentation}
              onChange={(e) => setIndentation(e.target.value as '2' | '4' | 'tab')}
              className="px-3 py-1.5 text-sm bg-bg-tertiary text-text-primary border border-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="tab">Tab</option>
            </select>
          </div>

          <button
            onClick={() => setIsMinify(!isMinify)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${
              isMinify
                ? 'bg-accent-primary text-white'
                : 'bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-elevated'
            }`}
          >
            {isMinify ? 'Minified' : 'Formatted'}
          </button>

          {stats.inputSize > 0 && (
            <div className="ml-auto text-xs text-text-tertiary">
              Input: {formatBytes(stats.inputSize)} | Output: {formatBytes(stats.outputSize)} | Lines: {stats.lines}
            </div>
          )}
        </div>

        <InputOutput
          input={
            <TextArea
              label="Input"
              placeholder='{"name":"test","age":30}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              error={error}
              showLineNumbers
            />
          }
          output={
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-text-primary">Output</label>
                {output && <CopyButton text={output} />}
              </div>
              {output ? (
                <div
                  className="min-h-[200px] p-3 bg-bg-tertiary border border-border-default rounded-lg overflow-auto scrollbar-thin font-mono text-sm leading-6"
                  dangerouslySetInnerHTML={{ __html: highlightJSON(output) }}
                />
              ) : (
                <div className="min-h-[200px] p-3 bg-bg-tertiary border border-border-default rounded-lg flex items-center justify-center text-text-tertiary text-sm">
                  {error ? 'Invalid JSON' : 'Paste your JSON here to format it'}
                </div>
              )}
            </div>
          }
        />
      </div>
    </ToolPage>
  )
}
