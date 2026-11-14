// @vitest-environment node
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const theme = readFileSync(
  new URL('../src/constants/theme.css', import.meta.url),
  'utf8',
)

const tokens = Object.fromEntries(
  [...theme.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [
    name,
    value.trim(),
  ]),
)

function resolve(name: string): string {
  const value = tokens[name]
  if (!value) throw new Error(`Missing theme token: ${name}`)
  const alias = /^var\((--[\w-]+)\)$/.exec(value)
  return alias ? resolve(alias[1]) : value
}

function luminance(hex: string) {
  if (!/^#[\da-f]{6}$/i.test(hex)) throw new Error(`Expected hex: ${hex}`)
  return [0.2126, 0.7152, 0.0722].reduce((sum, weight, index) => {
    const channel = parseInt(hex.slice(index * 2 + 1, index * 2 + 3), 16) / 255
    return (
      sum +
      weight *
        (channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4)
    )
  }, 0)
}

function contrast(foreground: string, background: string) {
  const values = [
    luminance(resolve(foreground)),
    luminance(resolve(background)),
  ]
  return (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05)
}

describe('R-34 / R-42 theme contrast', () => {
  it('R-34: palette matches the approved DESIGN §4.2 extraction', () => {
    const approved = {
      '--page': '#fafafb',
      '--surface': '#ffffff',
      '--subtle': '#f4f3f6',
      '--subtle-2': '#f7f7f9',
      '--line': '#e7e5ec',
      '--line-strong': '#c9c5d3',
      '--ink': '#1c1a22',
      '--ink-muted': '#5e5a6b',
      '--accent': '#6b5ba8',
      '--accent-ink': '#5a4b94',
      '--accent-tint': '#f1eef8',
      '--ink-band': '#2e2350',
      '--status-ok': '#f1eef8',
      '--status-ok-foreground': '#5a4b94',
      '--status-warn': '#f8f0e2',
      '--status-warn-foreground': '#80551a',
      '--status-risk': '#f7e8e6',
      '--status-risk-foreground': '#94382c',
    }
    expect(
      Object.fromEntries(
        Object.keys(approved).map((name) => [name, resolve(name)]),
      ),
    ).toEqual(approved)
  })

  it.each([
    ['--foreground', '--background'],
    ['--card-foreground', '--card'],
    ['--popover-foreground', '--popover'],
    ['--muted-foreground', '--page'],
    ['--muted-foreground', '--muted'],
    ['--primary-foreground', '--primary'],
    ['--primary-foreground', '--primary-hover'],
    ['--secondary-foreground', '--secondary'],
    ['--accent-foreground', '--accent'],
    ['--accent-ink', '--subtle-2'],
    ['--status-ok-foreground', '--status-ok'],
    ['--status-warn-foreground', '--status-warn'],
    ['--status-risk-foreground', '--status-risk'],
    ['--surface', '--ink-band'],
    ['--sidebar-foreground', '--sidebar'],
    ['--sidebar-primary-foreground', '--sidebar-primary'],
    ['--sidebar-accent-foreground', '--sidebar-accent'],
  ])('R-42: %s on %s meets 4.5:1 for normal text', (ink, surface) => {
    expect(contrast(ink, surface)).toBeGreaterThanOrEqual(4.5)
  })

  it.each([
    '--page',
    '--surface',
    '--subtle',
    '--subtle-2',
    '--accent-tint',
    '--ink-band',
    '--primary',
    '--primary-hover',
    '--status-warn',
    '--status-risk',
  ])('R-42: at least one focus stroke contrasts 3:1 against %s', (surface) => {
    expect(
      Math.max(
        contrast('--focus-ring', surface),
        contrast('--focus-contrast', surface),
      ),
    ).toBeGreaterThanOrEqual(3)
  })

  it('R-42 negative: decorative borders cannot replace the accessible input boundary', () => {
    expect(contrast('--line-strong', '--surface')).toBeLessThan(3)
    expect(contrast('--input', '--surface')).toBeGreaterThanOrEqual(3)
  })
})
