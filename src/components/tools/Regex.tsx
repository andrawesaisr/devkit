import { useState, useEffect, useMemo } from 'react'
import { ToolPage } from '../shared/ToolPage'
import { TextArea } from '../shared/TextArea'

const commonPatterns = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { name: 'URL', pattern: 'https?://[^\\s]+', flags: 'g' },
  { name: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-.]?\\d{3}[-.]?\\d{4}', flags: 'g' },
  { name: 'Hex Color', pattern: '#[0-9A-Fa-f]{6}\\b', flags: 'g' },
  { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}', flags: 'g' },
]

export default function Regex() {
  const [pattern, setPattern] = useState('')
  const [testString, setTestString] = useState('')
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false, u: false })
  const [error, setError] = useState('')
  const [matches, setMatches] = useState<RegExpMatchArray[]>([])

  const flagString = useMemo(() => {
    return Object.entries(flags)
      .filter(([_, enabled]) => enabled)
      .map(([flag]) => flag)
      .join('')
  }, [flags])

  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([])
      setError('')
      return
    }

    try {
      const regex = new RegExp(pattern, flagString)
      const results: RegExpMatchArray[] = []

      if (flags.g) {
        let match
        while ((match = regex.exec(testString)) !== null) {
          results.push(match)
          if (match.index === regex.lastIndex) {
            regex.lastIndex++
          }
        }
      } else {
        const match = testString.match(regex)
        if (match) results.push(match)
      }

      setMatches(results)
      setError('')
    } catch (err) {
      setError((err as Error).message)
      setMatches([])
    }
  }, [pattern, testString, flagString, flags.g])

  const highlightedText = useMemo(() => {
    if (!testString || matches.length === 0) return testString

    let result = ''
    let lastIndex = 0

    const sortedMatches = [...matches].sort((a, b) => (a.index ?? 0) - (b.index ?? 0))

    sortedMatches.forEach((match) => {
      const index = match.index ?? 0
      result += testString.slice(lastIndex, index)
      result += `<mark class="bg-accent-primary/30 rounded px-0.5">${match[0]}</mark>`
      lastIndex = index + match[0].length
    })

    result += testString.slice(lastIndex)
    return result
  }, [testString, matches])

  const loadPattern = (p: typeof commonPatterns[0]) => {
    setPattern(p.pattern)
    setFlags({
      g: p.flags.includes('g'),
      i: p.flags.includes('i'),
      m: p.flags.includes('m'),
      s: p.flags.includes('s'),
      u: p.flags.includes('u'),
    })
  }

  return (
    <ToolPage
      title="Regex Tester"
      description="Test regular expressions with real-time matching and explanation"
    >
      <div className="space-y-4">
        {/* Pattern Input */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Regular Expression
          </label>
          <div className="flex items-center gap-2">
            <span className="text-text-secondary">/</span>
            <input
              type="text"
              placeholder="Enter regex pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 px-3 py-2 bg-bg-tertiary text-text-primary border border-border-default rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-accent-primary"
            />
            <span className="text-text-secondary">/{flagString}</span>
          </div>
          {error && <p className="text-sm text-accent-error mt-1">{error}</p>}
        </div>

        {/* Flags */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Flags
          </label>
          <div className="flex flex-wrap gap-3">
            {Object.entries(flags).map(([flag, enabled]) => (
              <label key={flag} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setFlags({ ...flags, [flag]: e.target.checked })}
                  className="w-4 h-4 accent-accent-primary"
                />
                <span className="text-sm text-text-primary">
                  <code className="font-mono">{flag}</code> -{' '}
                  {flag === 'g' && 'global'}
                  {flag === 'i' && 'case insensitive'}
                  {flag === 'm' && 'multiline'}
                  {flag === 's' && 'dotall'}
                  {flag === 'u' && 'unicode'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Common Patterns */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Common Patterns
          </label>
          <div className="flex flex-wrap gap-2">
            {commonPatterns.map((p) => (
              <button
                key={p.name}
                onClick={() => loadPattern(p)}
                className="px-3 py-1.5 text-sm bg-bg-tertiary text-text-primary border border-border-default rounded-md hover:bg-bg-elevated hover:border-accent-primary transition-smooth"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Test String */}
        <TextArea
          label="Test String"
          placeholder="Enter text to test against the regex"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
        />

        {/* Highlighted Results */}
        {testString && (
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Highlighted Matches
            </label>
            <div
              className="min-h-[100px] p-3 bg-bg-tertiary border border-border-default rounded-lg font-mono text-sm leading-6 whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          </div>
        )}

        {/* Match Results */}
        {matches.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Matches ({matches.length})
            </label>
            <div className="space-y-2">
              {matches.map((match, i) => (
                <div
                  key={i}
                  className="p-3 bg-bg-secondary border border-border-default rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-accent-primary">
                      Match {i + 1}
                    </span>
                    <span className="text-xs text-text-tertiary">
                      Index: {match.index}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-text-primary break-all">
                    {match[0]}
                  </p>
                  {match.length > 1 && (
                    <div className="mt-2 pt-2 border-t border-border-subtle">
                      <p className="text-xs text-text-tertiary mb-1">Captured Groups:</p>
                      {match.slice(1).map((group, j) => (
                        <p key={j} className="text-xs font-mono text-text-secondary">
                          Group {j + 1}: {group ?? 'undefined'}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
