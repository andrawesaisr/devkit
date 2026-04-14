import { lazy } from 'react'
import type { ComponentType } from 'react'

export interface Tool {
  id: string
  name: string
  description: string
  category: string
  icon: string
  path: string
  keywords: string[]
  component: ComponentType<any>
}

const toolsData: Omit<Tool, 'component'>[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, minify, and validate JSON with syntax highlighting',
    category: 'Formatters',
    icon: '{}',
    path: '/json-formatter',
    keywords: ['json', 'format', 'validate', 'minify', 'pretty', 'parse'],
  },
  {
    id: 'base64',
    name: 'Base64 Encoder/Decoder',
    description: 'Encode text to Base64 or decode Base64 to text',
    category: 'Encoders/Decoders',
    icon: '🔐',
    path: '/base64',
    keywords: ['base64', 'encode', 'decode', 'encoding', 'decoding'],
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens',
    category: 'Encoders/Decoders',
    icon: '🎫',
    path: '/jwt-decoder',
    keywords: ['jwt', 'token', 'decode', 'json web token', 'auth'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate UUIDs in various formats',
    category: 'Generators',
    icon: '🆔',
    path: '/uuid-generator',
    keywords: ['uuid', 'guid', 'generate', 'unique', 'identifier'],
  },
  {
    id: 'timestamp',
    name: 'Unix Timestamp Converter',
    description: 'Convert between Unix timestamps and human-readable dates',
    category: 'Converters',
    icon: '⏰',
    path: '/timestamp',
    keywords: ['timestamp', 'unix', 'time', 'date', 'convert', 'epoch'],
  },
  {
    id: 'regex',
    name: 'Regex Tester',
    description: 'Test regular expressions with real-time matching',
    category: 'Testers',
    icon: '🔍',
    path: '/regex',
    keywords: ['regex', 'regexp', 'regular expression', 'pattern', 'match', 'test'],
  },
  {
    id: 'url-codec',
    name: 'URL Encoder/Decoder',
    description: 'Encode or decode URLs and URL components',
    category: 'Encoders/Decoders',
    icon: '🔗',
    path: '/url-codec',
    keywords: ['url', 'encode', 'decode', 'uri', 'percent', 'encoding'],
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes',
    category: 'Generators',
    icon: '#️⃣',
    path: '/hash-generator',
    keywords: ['hash', 'md5', 'sha', 'sha1', 'sha256', 'sha512', 'checksum'],
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert colors between HEX, RGB, and HSL formats',
    category: 'Converters',
    icon: '🎨',
    path: '/color-converter',
    keywords: ['color', 'hex', 'rgb', 'hsl', 'convert', 'picker', 'palette'],
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text in various formats',
    category: 'Generators',
    icon: '📝',
    path: '/lorem-ipsum',
    keywords: ['lorem', 'ipsum', 'text', 'placeholder', 'generate', 'dummy'],
  },
]

// Lazy load all tool components
const tools: Tool[] = toolsData.map((tool) => ({
  ...tool,
  component: lazy(() => import(`../components/tools/${tool.id
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')}.tsx`)),
}))

export { tools }

export function getToolByPath(path: string): Tool | undefined {
  return tools.find((tool) => tool.path === path)
}

export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase()
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
  )
}

export const categories = Array.from(new Set(tools.map((tool) => tool.category)))
