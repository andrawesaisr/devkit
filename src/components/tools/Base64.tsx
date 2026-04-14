import { useState, useEffect } from 'react'
import { ToolPage } from '../shared/ToolPage'
import { TextArea } from '../shared/TextArea'
import { CopyButton } from '../shared/CopyButton'
import { InputOutput } from '../shared/InputOutput'

export default function Base64() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)))
        setOutput(encoded)
        setError('')
      } else {
        const decoded = decodeURIComponent(escape(atob(input)))
        setOutput(decoded)
        setError('')
      }
    } catch (err) {
      setError('Invalid input for ' + mode)
      setOutput('')
    }
  }, [input, mode])

  return (
    <ToolPage
      title="Base64 Encoder/Decoder"
      description="Encode text to Base64 or decode Base64 to text"
    >
      <div className="space-y-4">
        {/* Mode Toggle */}
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

        <InputOutput
          input={
            <TextArea
              label="Input"
              placeholder={mode === 'encode' ? 'Enter text to encode' : 'Enter Base64 to decode'}
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
                  className="min-h-[200px] p-3 bg-bg-tertiary text-text-primary border border-border-default rounded-lg font-mono text-sm leading-6 resize-y scrollbar-thin"
                />
              ) : (
                <div className="min-h-[200px] p-3 bg-bg-tertiary border border-border-default rounded-lg flex items-center justify-center text-text-tertiary text-sm">
                  {mode === 'encode' ? 'Enter text to encode to Base64' : 'Enter Base64 to decode'}
                </div>
              )}
            </div>
          }
        />
      </div>
    </ToolPage>
  )
}
