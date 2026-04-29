'use client'

const ITEMS = [
  'Software Development',
  '✦',
  'AI Systems',
  '✦',
  'Cybersecurity',
  '✦',
  'Mobile Apps',
  '✦',
  'AI Voice Agents',
  '✦',
  'AI Automation',
  '✦',
  'Custom AI Agents',
  '✦',
  'Web Development',
  '✦',
]

const DOUBLED = [...ITEMS, ...ITEMS]

interface MarqueeStripProps {
  inverted?: boolean
}

export function MarqueeStrip({ inverted = false }: MarqueeStripProps) {
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid rgba(242,237,229,0.08)',
      borderBottom: '1px solid rgba(242,237,229,0.08)',
      padding: '16px 0',
      background: inverted ? 'var(--lime)' : 'transparent',
    }}>
      <div className="marquee-track">
        {DOUBLED.map((item, i) => (
          <span key={i} style={{
            fontFamily: item === '✦' ? 'sans-serif' : 'Syne, sans-serif',
            fontWeight: item === '✦' ? 400 : 700,
            fontSize: item === '✦' ? '0.6rem' : '0.85rem',
            letterSpacing: item === '✦' ? 0 : '0.08em',
            textTransform: 'uppercase',
            color: inverted ? 'var(--ink)' : 'var(--cream-30)',
            paddingRight: '32px',
            whiteSpace: 'nowrap',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
