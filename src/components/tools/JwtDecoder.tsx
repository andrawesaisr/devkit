import { useState, useEffect } from 'react'
import { ToolPage } from '../shared/ToolPage'
import { TextArea } from '../shared/TextArea'
import { CopyButton } from '../shared/CopyButton'

export default function JwtDecoder() {
  const [input, setInput] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [signature, setSignature] = useState('')
  const [error, setError] = useState('')
  const [isExpired, setIsExpired] = useState(false)
  const [expiryDate, setExpiryDate] = useState('')

  useEffect(() => {
    if (!input.trim()) {
      setHeader('')
      setPayload('')
      setSignature('')
      setError('')
      setIsExpired(false)
      setExpiryDate('')
      return
    }

    try {
      const parts = input.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format')
      }

      // Decode header
      const decodedHeader = JSON.parse(atob(parts[0]))
      setHeader(JSON.stringify(decodedHeader, null, 2))

      // Decode payload
      const decodedPayload = JSON.parse(atob(parts[1]))
      setPayload(JSON.stringify(decodedPayload, null, 2))

      // Signature (keep as base64)
      setSignature(parts[2])

      // Check expiry
      if (decodedPayload.exp) {
        const exp = decodedPayload.exp * 1000
        const now = Date.now()
        setIsExpired(exp < now)
        setExpiryDate(new Date(exp).toLocaleString())
      } else {
        setIsExpired(false)
        setExpiryDate('')
      }

      setError('')
    } catch (err) {
      setError('Invalid JWT token')
      setHeader('')
      setPayload('')
      setSignature('')
      setIsExpired(false)
      setExpiryDate('')
    }
  }, [input])

  return (
    <ToolPage
      title="JWT Decoder"
      description="Decode and inspect JSON Web Tokens"
    >
      <div className="space-y-4">
        <TextArea
          label="JWT Token"
          placeholder="Paste your JWT token here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={error}
        />

        {(header || payload || signature) && !error && (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-accent-info">Header</h3>
                {header && <CopyButton text={header} />}
              </div>
              <pre className="p-3 bg-bg-tertiary border border-accent-info/30 rounded-lg overflow-auto scrollbar-thin font-mono text-xs leading-6 text-text-primary">
                {header}
              </pre>
            </div>

            {/* Payload */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-accent-primary">Payload</h3>
                  {expiryDate && (
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                      isExpired ? 'bg-accent-error/20 text-accent-error' : 'bg-accent-success/20 text-accent-success'
                    }`}>
                      {isExpired ? 'EXPIRED' : 'VALID'}
                    </span>
                  )}
                </div>
                {payload && <CopyButton text={payload} />}
              </div>
              <pre className="p-3 bg-bg-tertiary border border-accent-primary/30 rounded-lg overflow-auto scrollbar-thin font-mono text-xs leading-6 text-text-primary">
                {payload}
              </pre>
              {expiryDate && (
                <p className="mt-2 text-xs text-text-secondary">
                  Expiry: {expiryDate}
                </p>
              )}
            </div>

            {/* Signature */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-text-secondary">Signature</h3>
                {signature && <CopyButton text={signature} />}
              </div>
              <pre className="p-3 bg-bg-tertiary border border-border-default rounded-lg overflow-auto scrollbar-thin font-mono text-xs leading-6 text-text-secondary break-all">
                {signature}
              </pre>
            </div>
          </div>
        )}

        {!input && !error && (
          <div className="p-8 bg-bg-tertiary border border-border-default rounded-lg text-center text-text-tertiary text-sm">
            Paste a JWT token above to decode and inspect it
          </div>
        )}
      </div>
    </ToolPage>
  )
}
