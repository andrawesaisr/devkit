# 🛠️ DevKit

**Every tool a developer needs. Fast, free, offline.**

DevKit is a free, offline-first Progressive Web App that provides a comprehensive collection of developer utilities. Built with React, TypeScript, and Tailwind CSS, it delivers a native app-like experience with zero server costs and complete privacy.

![DevKit Preview](https://via.placeholder.com/1200x600/6366F1/ffffff?text=DevKit+Screenshot)

## ✨ Features

- 🚀 **Lightning Fast** - Instant tool switching and real-time processing
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark Mode** - Beautiful dark and light themes
- 💾 **Offline-First** - Full functionality without internet connection
- 🔒 **Privacy-Focused** - No analytics, no tracking, no cookies
- ⌨️ **Keyboard Shortcuts** - Cmd/Ctrl+K spotlight search
- 📦 **Zero Dependencies** - All tool logic uses native browser APIs
- 🎨 **Premium UI** - Designed to feel like a native macOS/desktop app

## 🛠️ Tools

### Formatters
- **JSON Formatter** ([/json-formatter](/json-formatter)) - Format, minify, and validate JSON with syntax highlighting

### Encoders/Decoders
- **Base64 Encoder/Decoder** ([/base64](/base64)) - Encode text to Base64 or decode Base64 to text
- **JWT Decoder** ([/jwt-decoder](/jwt-decoder)) - Decode and inspect JSON Web Tokens
- **URL Encoder/Decoder** ([/url-codec](/url-codec)) - Encode or decode URLs and URL components

### Generators
- **UUID Generator** ([/uuid-generator](/uuid-generator)) - Generate UUIDs in various formats (v4, bulk generation)
- **Hash Generator** ([/hash-generator](/hash-generator)) - Generate MD5, SHA-1, SHA-256, and SHA-512 hashes
- **Lorem Ipsum Generator** ([/lorem-ipsum](/lorem-ipsum)) - Generate placeholder text in various formats

### Converters
- **Unix Timestamp Converter** ([/timestamp](/timestamp)) - Convert between Unix timestamps and human-readable dates
- **Color Converter** ([/color-converter](/color-converter)) - Convert colors between HEX, RGB, and HSL formats

### Testers
- **Regex Tester** ([/regex](/regex)) - Test regular expressions with real-time matching

## 🚀 Tech Stack

- **React 18+** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS v3** - Utility-first styling
- **React Router v6** - Client-side routing
- **vite-plugin-pwa** - Progressive Web App support
- **Zero npm dependencies for tool logic** - Uses native browser APIs

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/devkit.git
cd devkit

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

## 🏗️ Project Structure

```
devkit/
├── public/
│   ├── icons/              # PWA icons
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/         # Layout components (Sidebar, Header, etc.)
│   │   ├── shared/         # Reusable components
│   │   └── tools/          # Individual tool components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and tool registry
│   ├── pages/              # Page components
│   ├── styles/             # Global styles
│   └── App.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

## 🎨 Design Philosophy

DevKit is designed to feel like a premium native app, not a typical web app. The UI takes inspiration from modern desktop applications like Linear, Raycast, and Arc Browser:

- **Subtle animations** - Smooth 150ms transitions
- **Generous spacing** - Comfortable, uncluttered layouts
- **Premium typography** - Plus Jakarta Sans for UI, JetBrains Mono for code
- **Thoughtful colors** - Carefully crafted dark and light themes
- **Real-time feedback** - Instant processing as you type

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

### Adding a New Tool

1. Create a new component in `src/components/tools/`
2. Add the tool to `src/lib/toolRegistry.ts`
3. The router will automatically pick it up!

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with [Vite](https://vite.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from emoji (no external dependencies!)

## 📧 Contact

Have questions or suggestions? Open an issue on GitHub!

---

**Made with ❤️ for developers, by Andrawes Aisr**
