import { useState, useEffect } from 'react'
import { ToolPage } from '../shared/ToolPage'
import { TextArea } from '../shared/TextArea'
import { CopyButton } from '../shared/CopyButton'
import { InputOutput } from '../shared/InputOutput'

export default function UrlCodec() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [encodeType, setEncodeType] = useState<'full' | 'component'>('component')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [urlParts, setUrlParts] = useState<{
    protocol?: string
    host?: string
    path?: string
    query?: Record<string, string>
    fragment?: string
  } | null>(null)

  useEffect(() => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      setUrlParts(null)
      return
    }

    try {
      if (mode === 'encode') {
        const encoded = encodeType === 'full' ? encodeURI(input) : encodeURIComponent(input)
        setOutput(encoded)
        setError('')
      } else {
        const decoded = encodeType === 'full' ? decodeURI(input) : decodeURIComponent(input)
        setOutput(decoded)
        setError('')

        // Try to parse URL if in full mode
        if (encodeType === 'full') {
          try {
            const url = new URL(decoded)
            const query: Record<string, string> = {}
            url.searchParams.forEach((value, key) => {
              query[key] = value
            })

            setUrlParts({
              protocol: url.protocol,
              host: url.host,
              path: url.pathname,
              query: Object.keys(query).length > 0 ? query : undefined,
              fragment: url.hash ? url.hash.slice(1) : undefined,
            })
          } catch {
            setUrlParts(null)
          }
        } else {
          setUrlParts(null)
        }
      }
    } catch (err) {
      setError('Invalid input for ' + mode)
      setOutput('')
      setUrlParts(null)
    }
  }, [input, mode, encodeType])

  return (
    <ToolPage
      title="URL Encoder/Decoder"
      description="Encode or decode URLs and URL components"
    >
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
                mode === 'encode'
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-elevated'
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
                mode === 'decode'
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-elevated'
              }`}
            >
              Decode
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setEncodeType('component')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${
                encodeType === 'component'
                  ? 'bg-accent-info text-white'
                  : 'bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-elevated'
              }`}
            >
              Component
            </button>
            <button
              onClick={() => setEncodeType('full')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${
                encodeType === 'full'
                  ? 'bg-accent-info text-white'
                  : 'bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-elevated'
              }`}
            >
              Full URL
            </button>
          </div>
        </div>

        <InputOutput
          input={
            <TextArea
              label="Input"
              placeholder={
                mode === 'encode'
                  ? encodeType === 'full'
                    ? 'https://example.com/path?key=value'
                    : 'hello world'
                  : encodeType === 'full'
                  ? 'https://example.com/path?key=value%20here'
                  : 'hello%20world'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          }
          output={
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-text-primary">Output</label>
                {output && <CopyButton text={output} />}
              </div>
              {error ? (
                <div className="min-h-[200px] p-3 bg-bg-tertiary border border-accent-error rounded-lg flex items-center justify-center">
                  <p className="text-accent-error text-sm">{error}</p>
                </div>
              ) : output ? (
                <textarea
                  value={output}
                  readOnly
                  className="min-h-[200px] p-3 bg-bg-tertiary text-text-primary border border-border-default rounded-lg font-mono text-sm leading-6 resize-y scrollbar-thin break-all"
                />
              ) : (
                <div className="min-h-[200px] p-3 bg-bg-tertiary border border-border-default rounded-lg flex items-center justify-center text-text-tertiary text-sm">
                  {mode === 'encode' ? 'Enter text to encode' : 'Enter text to decode'}
                </div>
              )}
            </div>
          }
        />

        {/* URL Parts Breakdown */}
        {urlParts && (
          <div className="p-4 bg-bg-secondary border border-border-default rounded-xl">
            <h3 className="text-sm font-semibold text-text-primary mb-3">URL Breakdown</h3>
            <div className="space-y-2">
              {urlParts.protocol && (
                <div className="flex gap-2">
                  <span className="text-xs text-text-tertiary w-20">Protocol:</span>
                  <span className="text-xs font-mono text-text-primary">{urlParts.protocol}</span>
                </div>
              )}
              {urlParts.host && (
                <div className="flex gap-2">
                  <span className="text-xs text-text-tertiary w-20">Host:</span>
                  <span className="text-xs font-mono text-text-primary">{urlParts.host}</span>
                </div>
              )}
              {urlParts.path && (
                <div className="flex gap-2">
                  <span className="text-xs text-text-tertiary w-20">Path:</span>
                  <span className="text-xs font-mono text-text-primary">{urlParts.path}</span>
                </div>
              )}
              {urlParts.query && (
                <div>
                  <span className="text-xs text-text-tertiary block mb-1">Query Params:</span>
                  <div className="ml-20 space-y-1">
                    {Object.entries(urlParts.query).map(([key, value]) => (
                      <div key={key} className="text-xs font-mono text-text-primary">
                        {key} = {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {urlParts.fragment && (
                <div className="flex gap-2">
                  <span className="text-xs text-text-tertiary w-20">Fragment:</span>
                  <span className="text-xs font-mono text-text-primary">{urlParts.fragment}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
