import { useState } from 'react'
import { ToolPage } from '../shared/ToolPage'
import { CopyButton } from '../shared/CopyButton'

export default function UuidGenerator() {
  const [uuid, setUuid] = useState(crypto.randomUUID())
  const [format, setFormat] = useState<'lowercase' | 'uppercase' | 'nodash'>('lowercase')
  const [bulkCount, setBulkCount] = useState(5)
  const [bulkUuids, setBulkUuids] = useState<string[]>([])

  const formatUuid = (id: string, fmt: typeof format) => {
    if (fmt === 'uppercase') return id.toUpperCase()
    if (fmt === 'nodash') return id.replace(/-/g, '')
    return id
  }

  const generate = () => {
    setUuid(crypto.randomUUID())
  }

  const generateBulk = () => {
    const count = Math.min(Math.max(1, bulkCount), 100)
    const uuids = Array.from({ length: count }, () => crypto.randomUUID())
    setBulkUuids(uuids)
  }

  const displayedUuid = formatUuid(uuid, format)
  const displayedBulk = bulkUuids.map((id) => formatUuid(id, format))

  return (
    <ToolPage
      title="UUID Generator"
      description="Generate UUIDs in various formats"
    >
      <div className="space-y-6">
        {/* Single UUID Generator */}
        <div className="p-6 bg-bg-secondary border border-border-default rounded-xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-full p-4 bg-bg-primary border border-border-default rounded-lg">
              <p className="text-center font-mono text-lg md:text-xl text-accent-primary break-all">
                {displayedUuid}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={generate}
                className="px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white font-medium rounded-lg transition-smooth"
              >
                Generate New
              </button>
              <CopyButton text={displayedUuid} />
            </div>
          </div>
        </div>

        {/* Format Options */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Format
          </label>
          <div className="flex flex-wrap gap-2">
            {(['lowercase', 'uppercase', 'nodash'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
                  format === fmt
                    ? 'bg-accent-primary text-white'
                    : 'bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-elevated'
                }`}
              >
                {fmt === 'lowercase' && 'Lowercase'}
                {fmt === 'uppercase' && 'UPPERCASE'}
                {fmt === 'nodash' && 'No Dashes'}
              </button>
            ))}
          </div>
        </div>

        {/* Bulk Generate */}
        <div className="p-6 bg-bg-secondary border border-border-default rounded-xl">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Bulk Generate
          </h3>

          <div className="flex flex-wrap items-end gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Quantity (1-100)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={bulkCount}
                onChange={(e) => setBulkCount(Number(e.target.value))}
                className="w-24 px-3 py-2 bg-bg-tertiary text-text-primary border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>
            <button
              onClick={generateBulk}
              className="px-4 py-2 bg-accent-primary hover:bg-accent-primary-hover text-white font-medium rounded-lg transition-smooth"
            >
              Generate
            </button>
            {bulkUuids.length > 0 && (
              <CopyButton text={displayedBulk.join('\n')} />
            )}
          </div>

          {bulkUuids.length > 0 && (
            <div className="p-3 bg-bg-primary border border-border-default rounded-lg max-h-[300px] overflow-y-auto scrollbar-thin">
              <pre className="font-mono text-xs text-text-primary">
                {displayedBulk.join('\n')}
              </pre>
            </div>
          )}
        </div>
      </div>
    </ToolPage>
  )
}
