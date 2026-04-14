import { useState, useEffect } from 'react'
import { ToolPage } from '../shared/ToolPage'
import { CopyButton } from '../shared/CopyButton'

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum',
]

const loremStart = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'

function generateWords(count: number, startWithLorem: boolean): string {
  const words: string[] = []

  if (startWithLorem && count >= 5) {
    words.push(...loremStart.split(' ').slice(0, Math.min(count, 8)))
  }

  while (words.length < count) {
    const word = loremWords[Math.floor(Math.random() * loremWords.length)]
    words.push(word)
  }

  return words.slice(0, count).join(' ') + '.'
}

function generateSentences(count: number, startWithLorem: boolean): string {
  const sentences: string[] = []

  if (startWithLorem) {
    sentences.push(loremStart + '.')
  }

  while (sentences.length < count) {
    const wordCount = Math.floor(Math.random() * 10) + 5
    const words: string[] = []

    for (let i = 0; i < wordCount; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
    }

    const sentence = words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' ' + words.slice(1).join(' ') + '.'
    sentences.push(sentence)
  }

  return sentences.slice(0, count).join(' ')
}

function generateParagraphs(count: number, startWithLorem: boolean): string {
  const paragraphs: string[] = []

  if (startWithLorem) {
    const firstPara = generateSentences(Math.floor(Math.random() * 3) + 3, true)
    paragraphs.push(firstPara)
  }

  while (paragraphs.length < count) {
    const sentenceCount = Math.floor(Math.random() * 4) + 3
    const para = generateSentences(sentenceCount, false)
    paragraphs.push(para)
  }

  return paragraphs.slice(0, count).join('\n\n')
}

export default function LoremIpsum() {
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [quantity, setQuantity] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')

  useEffect(() => {
    let generated = ''

    switch (unit) {
      case 'words':
        generated = generateWords(quantity, startWithLorem)
        break
      case 'sentences':
        generated = generateSentences(quantity, startWithLorem)
        break
      case 'paragraphs':
        generated = generateParagraphs(quantity, startWithLorem)
        break
    }

    setOutput(generated)
  }, [unit, quantity, startWithLorem])

  const wordCount = output.split(/\s+/).length
  const charCount = output.length

  return (
    <ToolPage
      title="Lorem Ipsum Generator"
      description="Generate placeholder text in various formats"
    >
      <div className="space-y-4">
        {/* Controls */}
        <div className="p-4 bg-bg-secondary border border-border-default rounded-xl space-y-4">
          {/* Unit Selection */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Unit
            </label>
            <div className="flex gap-2">
              {(['paragraphs', 'sentences', 'words'] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-smooth capitalize ${
                    unit === u
                      ? 'bg-accent-primary text-white'
                      : 'bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-elevated'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Quantity (1-50)
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(Math.max(1, Number(e.target.value)), 50))}
              className="w-32 px-3 py-2 bg-bg-tertiary text-text-primary border border-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
            />
          </div>

          {/* Start with Lorem */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="w-4 h-4 accent-accent-primary"
              />
              <span className="text-sm text-text-primary">
                Start with "Lorem ipsum dolor sit amet..."
              </span>
            </label>
          </div>
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-text-primary">Generated Text</label>
            {output && <CopyButton text={output} />}
          </div>
          <div className="p-4 bg-bg-tertiary border border-border-default rounded-xl min-h-[300px] max-h-[500px] overflow-y-auto scrollbar-thin">
            <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
              {output}
            </p>
          </div>
        </div>

        {/* Stats */}
        {output && (
          <div className="flex gap-4 text-xs text-text-tertiary">
            <span>Words: {wordCount}</span>
            <span>Characters: {charCount}</span>
          </div>
        )}
      </div>
    </ToolPage>
  )
}
