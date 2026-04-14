import { useState, useEffect } from 'react'
import { ToolPage } from '../shared/ToolPage'
import { TextArea } from '../shared/TextArea'
import { CopyButton } from '../shared/CopyButton'

// Simple MD5 implementation (no dependencies)
function md5(input: string): string {
  function rotateLeft(value: number, shift: number): number {
    return (value << shift) | (value >>> (32 - shift))
  }

  function addUnsigned(x: number, y: number): number {
    const lsw = (x & 0xffff) + (y & 0xffff)
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
  }

  function cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
    return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, q), addUnsigned(x, t)), s), b)
  }

  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn((b & c) | (~b & d), a, b, x, s, t)
  }

  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn((b & d) | (c & ~d), a, b, x, s, t)
  }

  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn(b ^ c ^ d, a, b, x, s, t)
  }

  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
    return cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  function convertToWordArray(string: string): number[] {
    const lWordCount = ((string.length + 8) >> 6) + 1
    const lWordArray = new Array(lWordCount * 16)
    for (let i = 0; i < lWordArray.length; i++) lWordArray[i] = 0

    for (let i = 0; i < string.length; i++) {
      lWordArray[i >> 2] |= (string.charCodeAt(i) & 0xff) << ((i % 4) * 8)
    }
    lWordArray[string.length >> 2] |= 0x80 << ((string.length % 4) * 8)
    lWordArray[lWordCount * 16 - 2] = string.length * 8

    return lWordArray
  }

  function wordToHex(value: number): string {
    let str = ''
    for (let i = 0; i <= 3; i++) {
      str += ((value >> (i * 8)) & 0xff).toString(16).padStart(2, '0')
    }
    return str
  }

  const x = convertToWordArray(input)
  let a = 0x67452301
  let b = 0xefcdab89
  let c = 0x98badcfe
  let d = 0x10325476

  for (let k = 0; k < x.length; k += 16) {
    const AA = a, BB = b, CC = c, DD = d

    a = ff(a, b, c, d, x[k + 0], 7, 0xd76aa478)
    d = ff(d, a, b, c, x[k + 1], 12, 0xe8c7b756)
    c = ff(c, d, a, b, x[k + 2], 17, 0x242070db)
    b = ff(b, c, d, a, x[k + 3], 22, 0xc1bdceee)
    a = ff(a, b, c, d, x[k + 4], 7, 0xf57c0faf)
    d = ff(d, a, b, c, x[k + 5], 12, 0x4787c62a)
    c = ff(c, d, a, b, x[k + 6], 17, 0xa8304613)
    b = ff(b, c, d, a, x[k + 7], 22, 0xfd469501)
    a = ff(a, b, c, d, x[k + 8], 7, 0x698098d8)
    d = ff(d, a, b, c, x[k + 9], 12, 0x8b44f7af)
    c = ff(c, d, a, b, x[k + 10], 17, 0xffff5bb1)
    b = ff(b, c, d, a, x[k + 11], 22, 0x895cd7be)
    a = ff(a, b, c, d, x[k + 12], 7, 0x6b901122)
    d = ff(d, a, b, c, x[k + 13], 12, 0xfd987193)
    c = ff(c, d, a, b, x[k + 14], 17, 0xa679438e)
    b = ff(b, c, d, a, x[k + 15], 22, 0x49b40821)

    a = gg(a, b, c, d, x[k + 1], 5, 0xf61e2562)
    d = gg(d, a, b, c, x[k + 6], 9, 0xc040b340)
    c = gg(c, d, a, b, x[k + 11], 14, 0x265e5a51)
    b = gg(b, c, d, a, x[k + 0], 20, 0xe9b6c7aa)
    a = gg(a, b, c, d, x[k + 5], 5, 0xd62f105d)
    d = gg(d, a, b, c, x[k + 10], 9, 0x02441453)
    c = gg(c, d, a, b, x[k + 15], 14, 0xd8a1e681)
    b = gg(b, c, d, a, x[k + 4], 20, 0xe7d3fbc8)
    a = gg(a, b, c, d, x[k + 9], 5, 0x21e1cde6)
    d = gg(d, a, b, c, x[k + 14], 9, 0xc33707d6)
    c = gg(c, d, a, b, x[k + 3], 14, 0xf4d50d87)
    b = gg(b, c, d, a, x[k + 8], 20, 0x455a14ed)
    a = gg(a, b, c, d, x[k + 13], 5, 0xa9e3e905)
    d = gg(d, a, b, c, x[k + 2], 9, 0xfcefa3f8)
    c = gg(c, d, a, b, x[k + 7], 14, 0x676f02d9)
    b = gg(b, c, d, a, x[k + 12], 20, 0x8d2a4c8a)

    a = hh(a, b, c, d, x[k + 5], 4, 0xfffa3942)
    d = hh(d, a, b, c, x[k + 8], 11, 0x8771f681)
    c = hh(c, d, a, b, x[k + 11], 16, 0x6d9d6122)
    b = hh(b, c, d, a, x[k + 14], 23, 0xfde5380c)
    a = hh(a, b, c, d, x[k + 1], 4, 0xa4beea44)
    d = hh(d, a, b, c, x[k + 4], 11, 0x4bdecfa9)
    c = hh(c, d, a, b, x[k + 7], 16, 0xf6bb4b60)
    b = hh(b, c, d, a, x[k + 10], 23, 0xbebfbc70)
    a = hh(a, b, c, d, x[k + 13], 4, 0x289b7ec6)
    d = hh(d, a, b, c, x[k + 0], 11, 0xeaa127fa)
    c = hh(c, d, a, b, x[k + 3], 16, 0xd4ef3085)
    b = hh(b, c, d, a, x[k + 6], 23, 0x04881d05)
    a = hh(a, b, c, d, x[k + 9], 4, 0xd9d4d039)
    d = hh(d, a, b, c, x[k + 12], 11, 0xe6db99e5)
    c = hh(c, d, a, b, x[k + 15], 16, 0x1fa27cf8)
    b = hh(b, c, d, a, x[k + 2], 23, 0xc4ac5665)

    a = ii(a, b, c, d, x[k + 0], 6, 0xf4292244)
    d = ii(d, a, b, c, x[k + 7], 10, 0x432aff97)
    c = ii(c, d, a, b, x[k + 14], 15, 0xab9423a7)
    b = ii(b, c, d, a, x[k + 5], 21, 0xfc93a039)
    a = ii(a, b, c, d, x[k + 12], 6, 0x655b59c3)
    d = ii(d, a, b, c, x[k + 3], 10, 0x8f0ccc92)
    c = ii(c, d, a, b, x[k + 10], 15, 0xffeff47d)
    b = ii(b, c, d, a, x[k + 1], 21, 0x85845dd1)
    a = ii(a, b, c, d, x[k + 8], 6, 0x6fa87e4f)
    d = ii(d, a, b, c, x[k + 15], 10, 0xfe2ce6e0)
    c = ii(c, d, a, b, x[k + 6], 15, 0xa3014314)
    b = ii(b, c, d, a, x[k + 13], 21, 0x4e0811a1)
    a = ii(a, b, c, d, x[k + 4], 6, 0xf7537e82)
    d = ii(d, a, b, c, x[k + 11], 10, 0xbd3af235)
    c = ii(c, d, a, b, x[k + 2], 15, 0x2ad7d2bb)
    b = ii(b, c, d, a, x[k + 9], 21, 0xeb86d391)

    a = addUnsigned(a, AA)
    b = addUnsigned(b, BB)
    c = addUnsigned(c, CC)
    d = addUnsigned(d, DD)
  }

  return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)
}

async function sha(algorithm: 'SHA-1' | 'SHA-256' | 'SHA-512', text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [uppercase, setUppercase] = useState(false)
  const [hashes, setHashes] = useState<{
    md5: string
    sha1: string
    sha256: string
    sha512: string
  }>({ md5: '', sha1: '', sha256: '', sha512: '' })

  useEffect(() => {
    if (!input) {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' })
      return
    }

    const generateHashes = async () => {
      const results = {
        md5: md5(input),
        sha1: await sha('SHA-1', input),
        sha256: await sha('SHA-256', input),
        sha512: await sha('SHA-512', input),
      }
      setHashes(results)
    }

    generateHashes()
  }, [input])

  const formatHash = (hash: string) => (uppercase ? hash.toUpperCase() : hash)

  return (
    <ToolPage
      title="Hash Generator"
      description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes"
    >
      <div className="space-y-4">
        <TextArea
          label="Input"
          placeholder="Enter text to hash"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-4 h-4 accent-accent-primary"
            />
            <span className="text-sm text-text-primary">Uppercase output</span>
          </label>
        </div>

        {input && (
          <div className="space-y-3">
            {[
              { name: 'MD5', value: hashes.md5, color: 'border-accent-warning/30' },
              { name: 'SHA-1', value: hashes.sha1, color: 'border-accent-info/30' },
              { name: 'SHA-256', value: hashes.sha256, color: 'border-accent-success/30' },
              { name: 'SHA-512', value: hashes.sha512, color: 'border-accent-primary/30' },
            ].map((hash) => (
              <div
                key={hash.name}
                className={`p-4 bg-bg-secondary border ${hash.color} rounded-xl`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-text-primary">{hash.name}</h3>
                  {hash.value && <CopyButton text={formatHash(hash.value)} />}
                </div>
                <p className="font-mono text-xs text-text-primary break-all">
                  {formatHash(hash.value)}
                </p>
              </div>
            ))}
          </div>
        )}

        {!input && (
          <div className="p-8 bg-bg-tertiary border border-border-default rounded-lg text-center text-text-tertiary text-sm">
            Enter text above to generate hashes
          </div>
        )}
      </div>
    </ToolPage>
  )
}
