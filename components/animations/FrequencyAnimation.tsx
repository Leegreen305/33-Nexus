'use client'

import { useEffect, useRef, useState, createContext, useContext } from 'react'

// ── Time context ──────────────────────────────────────────────────────────────
const TimeCtx = createContext<{ t: number; D: number }>({ t: 0, D: 16 })
const useTime = () => useContext(TimeCtx).t
const useTimeline = () => useContext(TimeCtx)

// ── Easing ────────────────────────────────────────────────────────────────────
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))
const Easing = {
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeOutBack: (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2) },
}

// ── Timecode ──────────────────────────────────────────────────────────────────
function formatTC(t: number) {
  const s = Math.floor(t % 60)
  const m = Math.floor(t / 60)
  const f = Math.floor((t % 1) * 24)
  return `00:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(f).padStart(2,'0')}`
}

// ── BackdropV2 ────────────────────────────────────────────────────────────────
function BackdropV2({ accent, warm }: { accent: string; warm: string }) {
  const t = useTime()
  const { D } = useTimeline()

  const pan = Math.sin((t / D) * Math.PI * 2) * 8
  const rayX = -20 + (t / D) * 140

  const flareIn = clamp((t - 8.6) / 1.2, 0, 1)
  const flareOut = 1 - clamp((t - 14.5) / 1.2, 0, 1)
  const flareOpacity = flareIn * flareOut

  const hudOpacity = clamp((t - 0.5) / 1.0, 0, 1) * (1 - clamp((t - (D - 1.0)) / 0.8, 0, 1))

  const tickIdx = Math.floor((t / D) * 33)
  const tc = formatTC(t)

  const phases = [
    { start: 0.5, end: 2.8, label: 'I.   PULSE' },
    { start: 3.0, end: 5.8, label: 'II.  SPECTRUM' },
    { start: 6.0, end: 8.8, label: 'III. LATTICE' },
    { start: 9.0, end: 12.8, label: 'IV.  CONVERGENCE' },
    { start: 13.0, end: 15.6, label: 'V.   NEXUS' },
  ]
  const activePhase = phases.find(p => t >= p.start && t <= p.end)
  const phaseOpacity = activePhase ? (() => {
    const local = t - activePhase.start
    const span = activePhase.end - activePhase.start
    return clamp(local / 0.4, 0, 1) * (1 - clamp((local - (span - 0.5)) / 0.5, 0, 1))
  })() : 0

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', transform: `translateX(${pan}px)` }}>
      {/* Base */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 60% at 50% 60%, #1a1612 0%, #0a0807 45%, #030302 100%)' }} />

      {/* Warm horizon */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: '20%', height: '40%', background: `radial-gradient(ellipse at 50% 100%, ${warm}26 0%, transparent 65%)`, filter: 'blur(40px)', opacity: 0.7 }} />

      {/* God ray */}
      <div style={{ position: 'absolute', left: `${rayX}%`, top: '-40%', width: '40%', height: '180%', background: `linear-gradient(100deg, transparent 0%, ${warm}10 40%, ${warm}1f 50%, ${warm}10 60%, transparent 100%)`, filter: 'blur(30px)', transform: 'rotate(8deg)', mixBlendMode: 'screen', opacity: 0.7 }} />

      {/* Scan strata */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0 2px, rgba(255,255,255,0.012) 2px 3px)', mixBlendMode: 'overlay', pointerEvents: 'none' }} />

      {/* Anamorphic flare */}
      {flareOpacity > 0.01 && (
        <>
          <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 6, marginTop: -3, background: `linear-gradient(to right, transparent 0%, ${accent}cc 40%, #fff 50%, ${accent}cc 60%, transparent 100%)`, filter: 'blur(2px)', opacity: flareOpacity * 0.9, mixBlendMode: 'screen', boxShadow: `0 0 80px ${accent}66` }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: `linear-gradient(to right, transparent 0%, #fff 50%, transparent 100%)`, opacity: flareOpacity, mixBlendMode: 'screen' }} />
        </>
      )}

      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at center, transparent 0%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.92) 100%)', pointerEvents: 'none' }} />

      {/* Grain */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, mixBlendMode: 'overlay', pointerEvents: 'none' }}>
        <filter id="grain2"><feTurbulence type="fractalNoise" baseFrequency="3.2" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" /></filter>
        <rect width="100%" height="100%" filter="url(#grain2)" />
      </svg>

      {/* HUD Chrome */}
      <div style={{ position: 'absolute', inset: 0, opacity: hudOpacity, pointerEvents: 'none' }}>
        {/* Top-left brand */}
        <div style={{ position: 'absolute', left: '4%', top: '8%', display: 'flex', alignItems: 'center', gap: 14, color: `${warm}dd`, fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(8px, 1.2vw, 14px)', letterSpacing: '0.4em' }}>
          <div style={{ width: 22, height: 22, border: `1px solid ${warm}`, display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 600, letterSpacing: 0, flexShrink: 0 }}>33</div>
          NEXUS
        </div>

        {/* Top-right TC */}
        <div style={{ position: 'absolute', right: '4%', top: '8%', display: 'flex', alignItems: 'center', gap: 14, color: `${warm}aa`, fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(8px, 1.1vw, 12px)', letterSpacing: '0.32em', fontVariantNumeric: 'tabular-nums' }}>
          <span>TC // {tc}</span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#e74c3c', opacity: Math.floor(t * 2) % 2 === 0 ? 1 : 0.3, boxShadow: '0 0 8px #e74c3c', display: 'inline-block' }} />
          <span>REC</span>
        </div>

        {/* Phase title — center top */}
        {activePhase && phaseOpacity > 0.01 && (
          <div style={{ position: 'absolute', left: '50%', top: '8%', transform: 'translateX(-50%)', color: warm, fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(7px, 1.1vw, 12px)', letterSpacing: '0.5em', opacity: phaseOpacity * 0.85, whiteSpace: 'pre' }}>
            {activePhase.label}
          </div>
        )}

        {/* Bottom-left coordinates */}
        <div style={{ position: 'absolute', left: '4%', bottom: '4%', color: `${warm}44`, fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(7px, 1vw, 11px)', letterSpacing: '0.3em', lineHeight: 1.8 }}>
          <div>LAT  +33°00'00.0"</div>
          <div>LON  −97°00'00.0"</div>
          <div>SYS  NEXUS//STABLE</div>
        </div>

        {/* Bottom-right metrics */}
        <div style={{ position: 'absolute', right: '4%', bottom: '4%', color: `${warm}44`, fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(7px, 1vw, 11px)', letterSpacing: '0.3em', textAlign: 'right', lineHeight: 1.8, fontVariantNumeric: 'tabular-nums' }}>
          <div>FREQ  33.000 GHz</div>
          <div>PHASE  04 / 08</div>
          <div>SIG   −12.0 dB</div>
        </div>

        {/* 33-tick playhead rail — center bottom */}
        <div style={{ position: 'absolute', left: '50%', bottom: '5%', transform: 'translateX(-50%)', display: 'flex', gap: 5, alignItems: 'flex-end' }}>
          {Array.from({ length: 33 }).map((_, i) => {
            const isPlayhead = i === tickIdx
            const isMajor = i % 8 === 0
            return (
              <div key={i} style={{ width: 2, height: isPlayhead ? '18px' : isMajor ? '14px' : '7px', background: isPlayhead ? accent : warm, opacity: isPlayhead ? 1 : isMajor ? 0.7 : 0.3, boxShadow: isPlayhead ? `0 0 8px ${accent}` : 'none' }} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Waveform ──────────────────────────────────────────────────────────────────
function Waveform({ width, amplitude, phase, yOffset, rotDeg, color, alpha, highlight }: {
  width: number; amplitude: number; phase: number; yOffset: number; rotDeg: number; color: string; alpha: number; highlight: boolean
}) {
  const segments = 80
  let d = ''
  for (let i = 0; i <= segments; i++) {
    const x = -width / 2 + (i / segments) * width
    const damp = Math.cos((i / segments - 0.5) * Math.PI)
    const y = Math.sin((i / segments) * Math.PI * 2 * 1.5 + phase) * amplitude * Math.max(0, damp)
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' '
  }
  return (
    <svg style={{ position: 'absolute', left: -width / 2, top: yOffset - 200, width, height: 400, overflow: 'visible', transform: `rotate(${rotDeg}deg)`, transformOrigin: 'center', mixBlendMode: 'screen' }}>
      <g transform="translate(0, 200)">
        <path d={d} fill="none" stroke={color} strokeWidth={highlight ? 1.4 : 0.7} strokeOpacity={alpha * (highlight ? 1 : 0.55)} style={highlight ? { filter: `drop-shadow(0 0 6px ${color})` } : undefined} />
      </g>
    </svg>
  )
}

// ── PulseSpectrum ─────────────────────────────────────────────────────────────
function PulseSpectrum({ accent, warm }: { accent: string; warm: string }) {
  const t = useTime()
  const N = 33
  const lineW = 1400
  const lineH = 360

  const pulseIn  = clamp((t - 0.3) / 1.0, 0, 1)
  const multiply = clamp((t - 1.2) / 1.6, 0, 1)
  const rotateIn = clamp((t - 3.0) / 1.8, 0, 1)
  const sphereIn = clamp((t - 4.5) / 1.5, 0, 1)
  const sphereOut = 1 - clamp((t - 6.5) / 1.5, 0, 1)
  const overall  = 1 - clamp((t - 7.5) / 1.0, 0, 1)

  if (overall < 0.01) return null

  return (
    <div style={{ position: 'absolute', left: '50%', top: '38%', width: 0, height: 0, opacity: overall, pointerEvents: 'none' }}>
      {/* Center glow */}
      {pulseIn > 0.05 && (
        <div style={{ position: 'absolute', left: -200, top: -200, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${accent}66 0%, transparent 60%)`, filter: 'blur(20px)', opacity: pulseIn * (1 - multiply * 0.6) * sphereOut, mixBlendMode: 'screen' }} />
      )}

      {/* 33 waveforms */}
      {Array.from({ length: N }).map((_, i) => {
        const stagger = i / N
        const appear = clamp((multiply - Math.abs(stagger - 0.5) * 0.9) / 0.4, 0, 1)
        if (appear < 0.02 && multiply < 1) return null

        const baseRotDeg = (i / (N - 1)) * 180 - 90
        const rotEase = Easing.easeInOutCubic(rotateIn)
        const rotDeg = baseRotDeg * rotEase
        const yOffset = (1 - rotEase) * (i - N / 2) * 4
        const baseAmp = 26 - i * 0.2
        const ampSettle = 1 - Easing.easeInOutCubic(sphereIn) * 0.85
        const amp = baseAmp * ampSettle + 4
        const phase = (i * 0.32) + t * 1.4
        const alpha = appear * sphereOut
        const highlight = i === Math.floor(N / 2)

        return (
          <Waveform key={i} width={lineW} amplitude={amp} phase={phase} yOffset={yOffset} rotDeg={rotDeg} color={highlight ? '#fff' : warm} alpha={alpha} highlight={highlight} />
        )
      })}

      {/* Outer sphere ring */}
      {sphereIn > 0.05 && (
        <div style={{ position: 'absolute', left: -lineH, top: -lineH, width: lineH * 2, height: lineH * 2, borderRadius: '50%', border: `1px solid ${warm}`, opacity: Easing.easeInOutCubic(sphereIn) * sphereOut * 0.5, boxShadow: `0 0 60px ${accent}33` }} />
      )}

      {/* Equatorial slash */}
      {sphereIn > 0.3 && (
        <div style={{ position: 'absolute', left: -lineW / 2, top: -1, width: lineW, height: 2, background: `linear-gradient(to right, transparent, ${accent}, #fff, ${accent}, transparent)`, opacity: Easing.easeInOutCubic(sphereIn) * sphereOut * 0.9, filter: 'blur(0.4px)', boxShadow: `0 0 16px ${accent}`, mixBlendMode: 'screen' }} />
      )}
    </div>
  )
}

// ── LatticeV2 ─────────────────────────────────────────────────────────────────
const DISCIPLINES = [
  { sym: '◇', label: 'SOFTWARE' }, { sym: '⬡', label: 'WEB' },
  { sym: '◐', label: 'AI' }, { sym: '▣', label: 'MOBILE' },
  { sym: '◊', label: 'VOICE' }, { sym: '⬢', label: 'AUTOMATION' },
  { sym: '◈', label: 'AGENTS' }, { sym: '✕', label: 'SECURITY' },
]

function RingComponent({ t, accent, warm, radius, tilt, speed, count, glyphs, dotted, entryDelay, inP }: {
  t: number; accent: string; warm: string; radius: number; tilt: number; speed: number; count: number;
  glyphs: typeof DISCIPLINES | null; dotted: boolean; entryDelay: number; inP: number
}) {
  const localIn = clamp((inP - entryDelay) / 0.5, 0, 1)
  const e = Easing.easeOutCubic(localIn)
  const highlightIdx = Math.floor((t * 1.5) % count)

  return (
    <div style={{ position: 'absolute', left: -radius, top: -radius, width: radius * 2, height: radius * 2, transform: `rotateX(${tilt}deg) scale(${0.7 + e * 0.3})`, transformStyle: 'preserve-3d', opacity: e }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1px ${dotted ? 'dashed' : 'solid'} ${warm}`, opacity: dotted ? 0.25 : 0.55 }} />
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 + t * speed
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        const isHighlight = i === highlightIdx

        if (glyphs) {
          const g = glyphs[i % glyphs.length]
          return (
            <div key={i} style={{ position: 'absolute', left: radius + x - 28, top: radius + y - 28, width: 56, height: 56, transform: `rotateX(${-tilt}deg)`, display: 'grid', placeItems: 'center', color: isHighlight ? '#fff' : warm, fontSize: 'clamp(14px, 2vw, 28px)', fontWeight: 300, filter: isHighlight ? `drop-shadow(0 0 12px ${accent})` : 'none' }}>
              <div style={{ width: 56, height: 56, border: `1px solid ${isHighlight ? accent : warm}66`, background: isHighlight ? `${accent}1a` : 'rgba(0,0,0,0.4)', display: 'grid', placeItems: 'center', position: 'relative', fontSize: 'clamp(12px, 1.8vw, 24px)' }}>
                {g.sym}
                <div style={{ position: 'absolute', top: '105%', left: '50%', transform: 'translateX(-50%)', fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(5px, 0.7vw, 8px)', letterSpacing: '0.3em', color: warm, opacity: 0.7, whiteSpace: 'nowrap', marginTop: 4 }}>{g.label}</div>
              </div>
            </div>
          )
        }
        return (
          <div key={i} style={{ position: 'absolute', left: radius + x - 2, top: radius + y - 2, width: 4, height: 4, borderRadius: '50%', background: warm, boxShadow: `0 0 6px ${accent}`, opacity: 0.7 }} />
        )
      })}
    </div>
  )
}

function LatticeV2({ accent, warm }: { accent: string; warm: string }) {
  const t = useTime()
  const inP  = clamp((t - 5.8) / 1.4, 0, 1)
  const outP = 1 - clamp((t - 9.4) / 1.0, 0, 1)
  const alpha = inP * outP
  if (alpha < 0.01) return null

  const rings = [
    { radius: 200, tilt: 70,  speed: 0.35,  count: 8,  glyphs: DISCIPLINES, dotted: false },
    { radius: 260, tilt: 110, speed: -0.22, count: 16, glyphs: null,        dotted: true  },
    { radius: 320, tilt: 55,  speed: 0.14,  count: 24, glyphs: null,        dotted: true  },
  ]

  return (
    <div style={{ position: 'absolute', left: '50%', top: '38%', width: 0, height: 0, opacity: alpha, pointerEvents: 'none' }}>
      {rings.map((r, ri) => (
        <RingComponent key={ri} t={t} accent={accent} warm={warm} {...r} entryDelay={ri * 0.12} inP={inP} />
      ))}
      {/* Center eye */}
      <div style={{ position: 'absolute', left: -6, top: -6, width: 12, height: 12, borderRadius: '50%', background: '#fff', boxShadow: `0 0 24px #fff, 0 0 60px ${accent}`, opacity: Easing.easeOutCubic(inP) }} />
      {/* Crosshair */}
      <svg style={{ position: 'absolute', left: -60, top: -60, width: 120, height: 120, opacity: alpha * 0.5, mixBlendMode: 'screen' }} viewBox="0 0 120 120">
        <line x1="0" y1="60" x2="50" y2="60" stroke={warm} strokeWidth="0.6" />
        <line x1="70" y1="60" x2="120" y2="60" stroke={warm} strokeWidth="0.6" />
        <line x1="60" y1="0" x2="60" y2="50" stroke={warm} strokeWidth="0.6" />
        <line x1="60" y1="70" x2="60" y2="120" stroke={warm} strokeWidth="0.6" />
        <circle cx="60" cy="60" r="7.2" fill="none" stroke={warm} strokeWidth="0.6" />
      </svg>
    </div>
  )
}

// ── MarkV2 ────────────────────────────────────────────────────────────────────
const DIGIT_PATTERN = [
  [1,1,1,1,1,1,1],
  [0,0,0,0,0,0,1],
  [0,0,0,0,0,0,1],
  [0,0,0,0,0,0,1],
  [0,0,0,1,1,1,1],
  [0,0,0,0,0,0,1],
  [0,0,0,0,0,0,1],
  [0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1],
]

function SlitDigit({ inP, accent, warm, stagger = 0 }: { inP: number; accent: string; warm: string; stagger?: number }) {
  const cellW = 22, cellH = 28, gap = 2
  const cols = DIGIT_PATTERN[0].length
  const rows = DIGIT_PATTERN.length
  return (
    <div style={{ position: 'relative', width: cols * (cellW + gap), height: rows * (cellH + gap), filter: `drop-shadow(0 0 18px ${accent}55)` }}>
      {DIGIT_PATTERN.map((row, ri) =>
        row.map((on, ci) => {
          if (!on) return null
          const order = (ri / rows) * 0.7 + (ci / cols) * 0.3
          const local = clamp((inP - stagger - order * 0.5) / 0.35, 0, 1)
          const e = Easing.easeOutCubic(local)
          return (
            <div key={`${ri}-${ci}`} style={{ position: 'absolute', left: ci * (cellW + gap), top: ri * (cellH + gap), width: cellW * e, height: cellH, background: `linear-gradient(to right, ${warm} 0%, #fff 50%, ${warm} 100%)`, opacity: e, boxShadow: `0 0 6px ${warm}88` }} />
          )
        })
      )}
    </div>
  )
}

function MarkV2({ accent, warm }: { accent: string; warm: string }) {
  const t = useTime()
  const { D } = useTimeline()

  const inP    = clamp((t - 8.8) / 1.6, 0, 1)
  const wordIn = clamp((t - 10.6) / 1.0, 0, 1)
  const tagIn  = clamp((t - 11.4) / 1.0, 0, 1)
  const railIn = clamp((t - 11.8) / 0.8, 0, 1)
  const outP   = 1 - clamp((t - (D - 1.2)) / 1.0, 0, 1)
  const eyebrow = clamp((t - 9.2) / 0.8, 0, 1)

  if (inP < 0.01 || outP < 0.01) return null

  return (
    <div style={{ position: 'absolute', left: '50%', top: '38%', transform: 'translate(-50%, -50%)', width: '80%', maxWidth: 1200, pointerEvents: 'none', opacity: outP, textAlign: 'center' }}>
      {/* Eyebrow */}
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(8px, 1.1vw, 12px)', letterSpacing: '0.55em', color: accent, opacity: eyebrow, marginBottom: 28, textIndent: '0.55em' }}>
        — THE 33RD DEGREE
      </div>

      {/* Slit "33" */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(8px, 2vw, 28px)', height: 'clamp(80px, 14vw, 200px)', transform: 'scale(0.65)', transformOrigin: 'center' }}>
        <SlitDigit inP={inP} accent={accent} warm={warm} />
        <SlitDigit inP={inP} accent={accent} warm={warm} stagger={0.25} />
      </div>

      {/* NEXUS */}
      <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 14, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 200, fontSize: 'clamp(20px, 4vw, 56px)', color: '#fff', letterSpacing: '0.5em', textIndent: '0.5em', opacity: wordIn }}>
        {'NEXUS'.split('').map((c, i) => {
          const local = clamp((wordIn - i * 0.08) / 0.3, 0, 1)
          return (
            <span key={i} style={{ display: 'inline-block', opacity: local, transform: `translateY(${(1 - local) * 8}px)`, filter: `drop-shadow(0 0 12px ${accent}55)` }}>{c}</span>
          )
        })}
      </div>

      {/* Hairline */}
      <div style={{ margin: '24px auto 0', height: 1, width: `${railIn * 60}%`, maxWidth: 720, background: `linear-gradient(to right, transparent, ${warm}, ${accent}, ${warm}, transparent)`, boxShadow: `0 0 12px ${accent}55` }} />

      {/* Tagline */}
      <div style={{ marginTop: 20, fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 300, fontSize: 'clamp(10px, 1.6vw, 22px)', color: warm, letterSpacing: '0.4em', textIndent: '0.4em', opacity: tagIn, transform: `translateY(${(1 - tagIn) * 10}px)` }}>
        WHERE INTELLIGENCE CONVERGES
      </div>

      {/* Triplet */}
      <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 32, fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(7px, 1vw, 11px)', letterSpacing: '0.4em', color: warm, opacity: clamp((tagIn - 0.4) / 0.6, 0, 1) * 0.8, flexWrap: 'wrap' }}>
        <span>ENGINEERING</span><span>·</span><span>AI SYSTEMS</span><span>·</span><span>SECURITY</span>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export function FrequencyAnimation() {
  const [t, setT] = useState(0)
  const raf = useRef<number>(0)
  const start = useRef<number | null>(null)
  const D = 16

  useEffect(() => {
    const tick = (now: number) => {
      if (start.current === null) start.current = now
      setT(((now - start.current) / 1000) % D)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  const accent = '#7CD3E0'
  const warm   = '#E8DDC4'

  return (
    <TimeCtx.Provider value={{ t, D }}>
      <div style={{ position: 'absolute', inset: 0, background: '#030302', overflow: 'hidden' }}>
        <BackdropV2 accent={accent} warm={warm} />
        <PulseSpectrum accent={accent} warm={warm} />
        <LatticeV2 accent={accent} warm={warm} />
        <MarkV2 accent={accent} warm={warm} />
      </div>
    </TimeCtx.Provider>
  )
}
