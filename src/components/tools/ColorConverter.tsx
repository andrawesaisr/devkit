import { useState } from 'react'
import { ToolPage } from '../shared/ToolPage'
import { CopyButton } from '../shared/CopyButton'

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  }
}

export default function ColorConverter() {
  const [hex, setHex] = useState('#FF5733')
  const [rgb, setRgb] = useState({ r: 255, g: 87, b: 51 })
  const [hsl, setHsl] = useState({ h: 11, s: 100, l: 60 })

  const updateFromHex = (value: string) => {
    setHex(value)
    const rgbVal = hexToRgb(value)
    if (rgbVal) {
      setRgb(rgbVal)
      setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b))
    }
  }

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b })
    setHex(rgbToHex(r, g, b))
    setHsl(rgbToHsl(r, g, b))
  }

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHsl({ h, s, l })
    const rgbVal = hslToRgb(h, s, l)
    setRgb(rgbVal)
    setHex(rgbToHex(rgbVal.r, rgbVal.g, rgbVal.b))
  }

  const currentColor = hex

  const complementary = rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b)
  const analogous1Rgb = hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l)
  const analogous1 = rgbToHex(analogous1Rgb.r, analogous1Rgb.g, analogous1Rgb.b)
  const analogous2Rgb = hslToRgb((hsl.h - 30 + 360) % 360, hsl.s, hsl.l)
  const analogous2 = rgbToHex(analogous2Rgb.r, analogous2Rgb.g, analogous2Rgb.b)
  const triadic1Rgb = hslToRgb((hsl.h + 120) % 360, hsl.s, hsl.l)
  const triadic1 = rgbToHex(triadic1Rgb.r, triadic1Rgb.g, triadic1Rgb.b)
  const triadic2Rgb = hslToRgb((hsl.h + 240) % 360, hsl.s, hsl.l)
  const triadic2 = rgbToHex(triadic2Rgb.r, triadic2Rgb.g, triadic2Rgb.b)

  return (
    <ToolPage
      title="Color Converter"
      description="Convert colors between HEX, RGB, and HSL formats"
    >
      <div className="space-y-6">
        {/* Color Preview */}
        <div className="flex flex-col md:flex-row gap-4">
          <div
            className="w-full md:w-48 h-48 rounded-xl border-4 border-border-default shadow-lg"
            style={{ backgroundColor: currentColor }}
          />
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-text-secondary w-20">Color Picker:</label>
              <input
                type="color"
                value={currentColor}
                onChange={(e) => updateFromHex(e.target.value)}
                className="w-16 h-10 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* HEX */}
        <div className="p-4 bg-bg-secondary border border-border-default rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary">HEX</h3>
            <CopyButton text={hex} />
          </div>
          <input
            type="text"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-full px-3 py-2 bg-bg-primary text-text-primary border border-border-default rounded-lg font-mono uppercase focus:outline-none focus:ring-2 focus:ring-accent-primary"
          />
        </div>

        {/* RGB */}
        <div className="p-4 bg-bg-secondary border border-border-default rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary">RGB</h3>
            <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
          </div>
          <div className="space-y-3">
            {(['r', 'g', 'b'] as const).map((channel) => (
              <div key={channel}>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-text-secondary uppercase">
                    {channel}
                  </label>
                  <span className="text-xs font-mono text-text-primary">{rgb[channel]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb[channel]}
                  onChange={(e) =>
                    updateFromRgb(
                      channel === 'r' ? Number(e.target.value) : rgb.r,
                      channel === 'g' ? Number(e.target.value) : rgb.g,
                      channel === 'b' ? Number(e.target.value) : rgb.b
                    )
                  }
                  className="w-full accent-accent-primary"
                />
              </div>
            ))}
          </div>
        </div>

        {/* HSL */}
        <div className="p-4 bg-bg-secondary border border-border-default rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary">HSL</h3>
            <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-text-secondary">H (Hue)</label>
                <span className="text-xs font-mono text-text-primary">{hsl.h}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={hsl.h}
                onChange={(e) => updateFromHsl(Number(e.target.value), hsl.s, hsl.l)}
                className="w-full accent-accent-primary"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-text-secondary">S (Saturation)</label>
                <span className="text-xs font-mono text-text-primary">{hsl.s}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={hsl.s}
                onChange={(e) => updateFromHsl(hsl.h, Number(e.target.value), hsl.l)}
                className="w-full accent-accent-primary"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-text-secondary">L (Lightness)</label>
                <span className="text-xs font-mono text-text-primary">{hsl.l}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={hsl.l}
                onChange={(e) => updateFromHsl(hsl.h, hsl.s, Number(e.target.value))}
                className="w-full accent-accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Color Harmonies */}
        <div className="p-4 bg-bg-secondary border border-border-default rounded-xl">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Color Harmonies</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-text-secondary mb-2">Complementary</p>
              <div className="flex gap-2">
                <div
                  className="w-16 h-16 rounded-lg border border-border-default cursor-pointer"
                  style={{ backgroundColor: complementary }}
                  title={complementary}
                  onClick={() => updateFromHex(complementary)}
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-2">Analogous</p>
              <div className="flex gap-2">
                {[analogous1, analogous2].map((color) => (
                  <div
                    key={color}
                    className="w-16 h-16 rounded-lg border border-border-default cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                    onClick={() => updateFromHex(color)}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-2">Triadic</p>
              <div className="flex gap-2">
                {[triadic1, triadic2].map((color) => (
                  <div
                    key={color}
                    className="w-16 h-16 rounded-lg border border-border-default cursor-pointer"
                    style={{ backgroundColor: color }}
                    title={color}
                    onClick={() => updateFromHex(color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
