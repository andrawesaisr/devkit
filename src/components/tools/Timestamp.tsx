import { useState, useEffect } from 'react'
import { ToolPage } from '../shared/ToolPage'
import { CopyButton } from '../shared/CopyButton'

export default function Timestamp() {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [timestampInput, setTimestampInput] = useState('')
  const [dateInput, setDateInput] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatRelativeTime = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const seconds = Math.floor(Math.abs(diff) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (diff > 0) {
      if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
      if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`
    } else {
      if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`
      if (hours > 0) return `in ${hours} hour${hours > 1 ? 's' : ''}`
      if (minutes > 0) return `in ${minutes} minute${minutes > 1 ? 's' : ''}`
      return `in ${seconds} second${seconds > 1 ? 's' : ''}`
    }
  }

  const timestampToDate = (timestamp: string) => {
    try {
      const num = Number(timestamp)
      if (isNaN(num)) return null

      const date = new Date(num.toString().length === 10 ? num * 1000 : num)
      return {
        iso: date.toISOString(),
        utc: date.toUTCString(),
        locale: date.toLocaleString(),
        relative: formatRelativeTime(date.getTime()),
      }
    } catch {
      return null
    }
  }

  const dateToTimestamp = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) return null

      return {
        seconds: Math.floor(date.getTime() / 1000),
        milliseconds: date.getTime(),
      }
    } catch {
      return null
    }
  }

  const timestampResult = timestampInput ? timestampToDate(timestampInput) : null
  const dateResult = dateInput ? dateToTimestamp(dateInput) : null

  return (
    <ToolPage
      title="Unix Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates"
    >
      <div className="space-y-6">
        {/* Current Time */}
        <div className="p-6 bg-gradient-to-br from-accent-primary/10 to-accent-info/10 border border-accent-primary/30 rounded-xl">
          <h3 className="text-sm font-semibold text-text-secondary mb-3">Current Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-tertiary mb-1">Unix Timestamp (seconds)</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-mono text-accent-primary">
                  {Math.floor(currentTime / 1000)}
                </p>
                <CopyButton text={Math.floor(currentTime / 1000).toString()} />
              </div>
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-1">Milliseconds</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-mono text-accent-primary">{currentTime}</p>
                <CopyButton text={currentTime.toString()} />
              </div>
            </div>
          </div>
          <p className="text-sm text-text-secondary mt-3">
            {new Date(currentTime).toLocaleString()}
          </p>
        </div>

        {/* Timestamp to Date */}
        <div className="p-6 bg-bg-secondary border border-border-default rounded-xl">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Timestamp → Date
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Unix Timestamp
              </label>
              <input
                type="text"
                placeholder="1700000000"
                value={timestampInput}
                onChange={(e) => setTimestampInput(e.target.value)}
                className="w-full px-3 py-2 bg-bg-tertiary text-text-primary border border-border-default rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            {timestampResult && (
              <div className="space-y-2">
                <div className="p-3 bg-bg-primary border border-border-default rounded-lg">
                  <p className="text-xs text-text-tertiary mb-1">ISO 8601</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-mono text-text-primary break-all">
                      {timestampResult.iso}
                    </p>
                    <CopyButton text={timestampResult.iso} />
                  </div>
                </div>
                <div className="p-3 bg-bg-primary border border-border-default rounded-lg">
                  <p className="text-xs text-text-tertiary mb-1">UTC</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-mono text-text-primary break-all">
                      {timestampResult.utc}
                    </p>
                    <CopyButton text={timestampResult.utc} />
                  </div>
                </div>
                <div className="p-3 bg-bg-primary border border-border-default rounded-lg">
                  <p className="text-xs text-text-tertiary mb-1">Local</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-mono text-text-primary break-all">
                      {timestampResult.locale}
                    </p>
                    <CopyButton text={timestampResult.locale} />
                  </div>
                </div>
                <div className="p-3 bg-bg-primary border border-accent-info/30 rounded-lg">
                  <p className="text-xs text-text-tertiary mb-1">Relative Time</p>
                  <p className="text-sm text-accent-info">{timestampResult.relative}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date to Timestamp */}
        <div className="p-6 bg-bg-secondary border border-border-default rounded-xl">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Date → Timestamp
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Date/Time
              </label>
              <input
                type="datetime-local"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full px-3 py-2 bg-bg-tertiary text-text-primary border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
            </div>

            {dateResult && (
              <div className="space-y-2">
                <div className="p-3 bg-bg-primary border border-border-default rounded-lg">
                  <p className="text-xs text-text-tertiary mb-1">Seconds</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-mono text-text-primary">
                      {dateResult.seconds}
                    </p>
                    <CopyButton text={dateResult.seconds.toString()} />
                  </div>
                </div>
                <div className="p-3 bg-bg-primary border border-border-default rounded-lg">
                  <p className="text-xs text-text-tertiary mb-1">Milliseconds</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-mono text-text-primary">
                      {dateResult.milliseconds}
                    </p>
                    <CopyButton text={dateResult.milliseconds.toString()} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
