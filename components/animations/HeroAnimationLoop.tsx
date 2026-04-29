'use client'

import { useEffect, useRef, useState, createContext, useContext } from 'react'

// ── Easing ──────────────────────────────────────────────────────────────────
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

const Easing = {
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeOutBack: (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2) },
  easeInCubic: (t: number) => t * t * t,
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
}

// ── Time context ─────────────────────────────────────────────────────────────
const TimeCtx = createContext<{ t: number }>({ t: 0 })
const useTime = () => useContext(TimeCtx).t

// ── 3D projection ─────────────────────────────────────────────────────────────
function project3D(p: { x: number; y: number; z: number }, camRotY = 0, tilt = 0.18, fov = 700, distance = 900) {
  const cosY = Math.cos(camRotY), sinY = Math.sin(camRotY)
  let x = p.x * cosY - p.z * sinY
  let z = p.x * sinY + p.z * cosY
  let y = p.y
  const cosP = Math.cos(tilt), sinP = Math.sin(tilt)
  const yT = y * cosP - z * sinP
  const zT = y * sinP + z * cosP
  const zCam = zT + distance
  const k = fov / Math.max(50, zCam)
  return { sx: x * k, sy: yT * k, scale: k, z: zCam }
}

// ── Lattice nodes ─────────────────────────────────────────────────────────────
function makeLattice(size = 4, spread = 320) {
  const nodes: { id: string; ix: number; iy: number; iz: number; x: number; y: number; z: number }[] = []
  const half = (size - 1) / 2
  for (let i = 0; i < size; i++)
    for (let j = 0; j < size; j++)
      for (let k = 0; k < size; k++)
        nodes.push({ id: `${i}-${j}-${k}`, ix: i, iy: j, iz: k, x: (i - half) * spread / (size - 1), y: (j - half) * spread / (size - 1), z: (k - half) * spread / (size - 1) })
  return nodes
}

const LATTICE = makeLattice(4, 320)

// Build edges (axial neighbors only)
const EDGES: [string, string][] = []
const SIZE = 4
for (const n of LATTICE) {
  const { ix, iy, iz, id } = n
  const tryAdd = (i: number, j: number, k: number) => {
    if (i < 0 || j < 0 || k < 0 || i >= SIZE || j >= SIZE || k >= SIZE) return
    const oid = `${i}-${j}-${k}`
    if (id < oid) EDGES.push([id, oid])
  }
  tryAdd(ix + 1, iy, iz); tryAdd(ix, iy + 1, iz); tryAdd(ix, iy, iz + 1)
}

// ── Backdrop ─────────────────────────────────────────────────────────────────
function Backdrop({ accent }: { accent: string }) {
  const t = useTime()
  const gridShift = (t * 60) % 60
  const vignettePulse = 0.55 + Math.sin(t * 0.6) * 0.04
  const scanY = ((t / 12) * 110) - 10 // % based
  const hudOpacity = clamp((t - 7.5) / 1.2, 0, 1) * (1 - clamp((t - 11.4) / 0.6, 0, 1))

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Base */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 55%, #080d14 0%, #030407 60%, #000 100%)' }} />

      {/* Floor grid */}
      <div style={{
        position: 'absolute', left: '-20%', right: '-20%', top: '55%', bottom: '-30%',
        transform: 'perspective(900px) rotateX(62deg)', transformOrigin: 'center top',
        backgroundImage: `linear-gradient(to right, ${accent}2e 1px, transparent 1px), linear-gradient(to bottom, ${accent}2e 1px, transparent 1px)`,
        backgroundSize: '60px 60px', backgroundPosition: `0 ${gridShift}px`,
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, transparent 90%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, transparent 90%)',
        opacity: 0.7,
      }} />

      {/* Ceiling grid */}
      <div style={{
        position: 'absolute', left: '-20%', right: '-20%', top: '-30%', bottom: '55%',
        transform: 'perspective(900px) rotateX(-62deg)', transformOrigin: 'center bottom',
        backgroundImage: `linear-gradient(to right, rgba(180,210,240,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(180,210,240,0.07) 1px, transparent 1px)`,
        backgroundSize: '60px 60px', backgroundPosition: `0 ${-gridShift}px`,
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 90%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 90%)',
        opacity: 0.5,
      }} />

      {/* Horizon glow */}
      <div style={{
        position: 'absolute', left: '20%', right: '20%', top: '48%', height: '14%',
        background: `radial-gradient(ellipse at center, ${accent}40 0%, transparent 70%)`,
        filter: 'blur(20px)', opacity: 0.7,
      }} />

      {/* Scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: `${scanY}%`, height: '8%',
        background: `linear-gradient(to bottom, transparent 0%, ${accent}12 50%, transparent 100%)`,
        mixBlendMode: 'screen', pointerEvents: 'none',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${vignettePulse}) 100%)`,
        pointerEvents: 'none',
      }} />

      {/* HUD corners */}
      {hudOpacity > 0.01 && <HUDCorners opacity={hudOpacity} accent={accent} t={t} />}

      {/* Film grain */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05, mixBlendMode: 'overlay', pointerEvents: 'none' }}>
        <filter id="hgrain"><feTurbulence type="fractalNoise" baseFrequency="2.4" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" /></filter>
        <rect width="100%" height="100%" filter="url(#hgrain)" />
      </svg>
    </div>
  )
}

function HUDCorners({ opacity, accent, t }: { opacity: number; accent: string; t: number }) {
  const len = 56, inset = 48, stroke = 1.5
  const s = `0 0 8px ${accent}`
  const C = ({ style }: { style: React.CSSProperties }) => (
    <div style={{ position: 'absolute', width: len, height: len, ...style }} />
  )
  return (
    <div style={{ position: 'absolute', inset: 0, opacity, pointerEvents: 'none', mixBlendMode: 'screen' }}>
      {/* TL */}
      <div style={{ position: 'absolute', left: inset, top: inset, width: len, height: len }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: len, height: stroke, background: accent, boxShadow: s }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: stroke, height: len, background: accent, boxShadow: s }} />
      </div>
      {/* TR */}
      <div style={{ position: 'absolute', right: inset, top: inset, width: len, height: len }}>
        <div style={{ position: 'absolute', right: 0, top: 0, width: len, height: stroke, background: accent, boxShadow: s }} />
        <div style={{ position: 'absolute', right: 0, top: 0, width: stroke, height: len, background: accent, boxShadow: s }} />
      </div>
      {/* BL */}
      <div style={{ position: 'absolute', left: inset, bottom: inset, width: len, height: len }}>
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: len, height: stroke, background: accent, boxShadow: s }} />
        <div style={{ position: 'absolute', left: 0, bottom: 0, width: stroke, height: len, background: accent, boxShadow: s }} />
      </div>
      {/* BR */}
      <div style={{ position: 'absolute', right: inset, bottom: inset, width: len, height: len }}>
        <div style={{ position: 'absolute', right: 0, bottom: 0, width: len, height: stroke, background: accent, boxShadow: s }} />
        <div style={{ position: 'absolute', right: 0, bottom: 0, width: stroke, height: len, background: accent, boxShadow: s }} />
      </div>
      {/* Labels */}
      <div style={{ position: 'absolute', left: '50%', top: inset - 6, transform: 'translateX(-50%)', color: accent, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.3em', opacity: 0.8 }}>
        N — 33° — E
      </div>
      <div style={{ position: 'absolute', left: inset + len + 12, bottom: inset - 4, color: accent, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', opacity: 0.7 }}>
        SYS_FREQ // 33.000 GHz
      </div>
      <div style={{ position: 'absolute', right: inset + len + 12, bottom: inset - 4, color: accent, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', opacity: 0.7, textAlign: 'right' }}>
        STATUS // CONVERGED
      </div>
    </div>
  )
}

// ── Lattice scene ─────────────────────────────────────────────────────────────
function LatticeScene({ accent }: { accent: string }) {
  const t = useTime()

  const archIn = clamp((t - 2.2) / 1.4, 0, 1)
  const nexusIn = clamp((t - 5.5) / 2.2, 0, 1)
  const resetFade = clamp((t - 10.8) / 1.0, 0, 1)

  const camYawArch = -0.55 + Easing.easeInOutCubic(archIn) * 0.4
  const camYawHold = -0.15 + Math.sin(t * 0.4) * 0.05
  const camYawNexus = camYawHold * (1 - Easing.easeInOutCubic(nexusIn))
  const camYaw = t < 3.6 ? camYawArch : t < 5.5 ? camYawHold : camYawNexus
  const camTilt = 0.20 - Easing.easeInOutCubic(nexusIn) * 0.2

  const ideaP = clamp((t - 0.0) / 2.0, 0, 1)
  const sparkOpacity = ideaP * (1 - clamp((t - 2.5) / 0.4, 0, 1))
  const sparkLoop = clamp((t - 11.2) / 0.6, 0, 1)
  const sparkOpacityFinal = Math.max(sparkOpacity, sparkLoop)
  const sparkPulse = 0.6 + Math.sin(t * 6) * 0.15 + (1 - ideaP) * 0.4

  const projected = LATTICE.map((n, idx) => {
    const stagger = idx / LATTICE.length
    const spawn = clamp((archIn - stagger * 0.6) / 0.4, 0, 1)
    const spawnEase = Easing.easeOutCubic(spawn)
    const collapse = Easing.easeInOutCubic(nexusIn)
    const orbit = Math.sin(t * 0.6 + idx * 0.5) * 6 * (1 - collapse)
    const p3 = { x: n.x * (1 - collapse * 0.9) + orbit, y: n.y * (1 - collapse * 0.9), z: n.z * (1 - collapse * 0.9) + orbit }
    const proj = project3D(p3, camYaw, camTilt)
    const nodeFadeOut = 1 - clamp((t - 7.0) / 1.5, 0, 1)
    const alpha = spawnEase * nodeFadeOut
    return { ...n, proj, alpha }
  })

  const projMap = Object.fromEntries(projected.map(p => [p.id, p]))
  const edgeAlpha = clamp((t - 3.4) / 1.2, 0, 1) * (1 - clamp((t - 6.5) / 1.5, 0, 1))

  const coreIn = clamp((t - 6.5) / 1.6, 0, 1)
  const coreOut = 1 - clamp((t - 10.6) / 0.8, 0, 1)
  const coreAlpha = Easing.easeOutCubic(coreIn) * coreOut
  const coreScale = 0.4 + Easing.easeOutCubic(coreIn) * 1.0 + Math.sin(t * 4) * 0.04

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '50%', top: '46%', width: 0, height: 0, pointerEvents: 'none' }}>
        {/* Edges SVG */}
        <svg style={{ position: 'absolute', left: -1500, top: -800, width: 3000, height: 1600, opacity: edgeAlpha, overflow: 'visible', pointerEvents: 'none' }}>
          <g transform="translate(1500, 800)">
            {EDGES.map(([a, b], i) => {
              const pa = projMap[a], pb = projMap[b]
              if (!pa || !pb) return null
              const localAlpha = Math.min(pa.alpha, pb.alpha)
              if (localAlpha < 0.02) return null
              const avgScale = (pa.proj.scale + pb.proj.scale) / 2
              const depthAlpha = clamp((avgScale - 0.4) / 0.7, 0.15, 1)
              return <line key={i} x1={pa.proj.sx} y1={pa.proj.sy} x2={pb.proj.sx} y2={pb.proj.sy} stroke={accent} strokeWidth={0.8} strokeOpacity={localAlpha * depthAlpha * 0.55} />
            })}
          </g>
        </svg>

        {/* Nodes */}
        {projected.slice().sort((a, b) => b.proj.z - a.proj.z).map(p => {
          if (p.alpha < 0.02) return null
          const r = Math.max(1, 4 * p.proj.scale)
          const depthAlpha = clamp((p.proj.scale - 0.4) / 0.7, 0.2, 1)
          return (
            <div key={p.id} style={{
              position: 'absolute', left: p.proj.sx - r, top: p.proj.sy - r,
              width: r * 2, height: r * 2, borderRadius: '50%',
              background: '#fff', boxShadow: `0 0 ${10 * p.proj.scale}px ${accent}`,
              opacity: p.alpha * depthAlpha,
            }} />
          )
        })}

        {/* Idea spark */}
        {sparkOpacityFinal > 0.01 && (
          <>
            <div style={{
              position: 'absolute', left: -8, top: -8, width: 16, height: 16, borderRadius: '50%',
              background: '#fff', boxShadow: `0 0 ${20 * sparkPulse}px #fff, 0 0 ${60 * sparkPulse}px ${accent}`,
              opacity: sparkOpacityFinal, transform: `scale(${0.5 + sparkPulse * 0.5})`,
            }} />
            <div style={{
              position: 'absolute', left: -200, top: -200, width: 400, height: 400, borderRadius: '50%',
              border: `1px solid ${accent}`, opacity: sparkOpacityFinal * (1 - ideaP) * 0.8,
              transform: `scale(${0.2 + ideaP * 1.0})`,
            }} />
          </>
        )}

        {/* Nexus core */}
        {coreAlpha > 0.01 && (
          <div style={{ position: 'absolute', left: 0, top: 0, transform: `translate(-50%, -50%) scale(${coreScale})`, opacity: coreAlpha }}>
            <div style={{ width: 360, height: 360, marginLeft: -180, marginTop: -180, borderRadius: '50%', background: `radial-gradient(circle, ${accent}55 0%, ${accent}00 60%)`, filter: 'blur(8px)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: 180, height: 180, marginLeft: -90, marginTop: -90, borderRadius: '50%', border: `1.5px solid ${accent}`, boxShadow: `0 0 24px ${accent}, inset 0 0 24px ${accent}88` }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: 120, height: 120, marginLeft: -60, marginTop: -60, borderRadius: '50%', border: `1px solid ${accent}cc`, transform: `rotate(${t * 30}deg)`, borderTopColor: '#fff', borderRightColor: 'transparent' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', width: 60, height: 60, marginLeft: -30, marginTop: -30, borderRadius: '50%', background: 'radial-gradient(circle, #fff 0%, #fff 30%, transparent 70%)', boxShadow: `0 0 40px #fff, 0 0 80px ${accent}` }} />
            {[0,1,2,3,4,5].map(i => {
              const a = (i / 6) * Math.PI * 2 + t * 0.4
              return <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: 4, height: 4, marginLeft: -2 + Math.cos(a) * 95, marginTop: -2 + Math.sin(a) * 95, background: '#fff', borderRadius: '50%', boxShadow: `0 0 6px ${accent}` }} />
            })}
          </div>
        )}
      </div>

      {/* Reset wash */}
      <div style={{ position: 'absolute', inset: 0, background: '#000', opacity: resetFade * (1 - clamp((t - 11.6) / 0.4, 0, 1)) * 0.85, pointerEvents: 'none' }} />
    </div>
  )
}

// ── Wordmark ─────────────────────────────────────────────────────────────────
function WordmarkScene({ accent }: { accent: string }) {
  const t = useTime()
  const inP = clamp((t - 8.2) / 1.4, 0, 1)
  const taglineP = clamp((t - 9.2) / 1.0, 0, 1)
  const chipsP = clamp((t - 9.8) / 0.9, 0, 1)
  const lineP = clamp((t - 8.4) / 1.2, 0, 1)
  const out = 1 - clamp((t - 11.0) / 0.7, 0, 1)
  const eyebrow = clamp((t - 8.4) / 0.8, 0, 1)
  const breath = Math.sin(t * 0.8) * 2

  const chars = ['3', '3', ' ', 'N', 'E', 'X', 'U', 'S']

  return (
    <div style={{ position: 'absolute', left: '50%', top: '46%', transform: `translate(-50%, calc(-50% + ${breath}px))`, opacity: out, textAlign: 'center', width: '100%', pointerEvents: 'none' }}>
      {/* Eyebrow */}
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.5em', color: accent, opacity: eyebrow * out, textTransform: 'uppercase', marginBottom: 24, textIndent: '0.5em' }}>
        — Nexus // Where intelligence converges
      </div>

      {/* Wordmark */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', lineHeight: 1, filter: `drop-shadow(0 0 18px ${accent}55)` }}>
        {chars.map((c, i) => {
          if (c === ' ') return <div key={i} style={{ width: 24 }} />
          const delay = i * 0.06
          const local = clamp((inP - delay) / 0.4, 0, 1)
          const e = Easing.easeOutBack(local)
          const isThree = c === '3'
          return (
            <span key={i} style={{
              fontFamily: 'Inter, system-ui, sans-serif', fontWeight: isThree ? 700 : 300,
              fontSize: isThree ? 'clamp(60px, 8vw, 120px)' : 'clamp(50px, 6.5vw, 100px)',
              color: '#fff', letterSpacing: isThree ? '-0.04em' : '0.06em',
              opacity: local, transform: `translateY(${(1 - e) * 30}px) scale(${0.85 + e * 0.15})`,
              display: 'inline-block', padding: isThree ? '0 4px' : '0 2px',
              textShadow: `0 0 24px ${accent}77`,
            }}>
              {c}
            </span>
          )
        })}
      </div>

      {/* Line */}
      <div style={{ margin: '20px auto 0', height: 1, width: `${lineP * 480}px`, maxWidth: '55%', background: `linear-gradient(to right, transparent, ${accent}, transparent)`, boxShadow: `0 0 8px ${accent}` }} />

      {/* Tagline */}
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(13px, 1.6vw, 20px)', fontWeight: 300, color: '#e9eef5', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 18, opacity: taglineP, transform: `translateY(${(1 - taglineP) * 12}px)` }}>
        Idea · Architecture · Convergence
      </div>

      {/* Chips */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28, opacity: chipsP, flexWrap: 'wrap' }}>
        {['ENGINEERING', 'AI SYSTEMS', 'CYBERSECURITY'].map((label, i) => {
          const local = clamp(((t - 9.8) - i * 0.08) / 0.4, 0, 1)
          const e = Easing.easeOutCubic(local)
          return (
            <div key={label} style={{ padding: '6px 13px', border: `1px solid ${accent}66`, borderRadius: 999, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.24em', color: accent, background: `${accent}0a`, opacity: local, transform: `translateY(${(1 - e) * 14}px)` }}>
              {label}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Captions ─────────────────────────────────────────────────────────────────
const BEATS = [
  { start: 0.4, end: 2.4, label: '> initialize_idea', status: 'IGNITING' },
  { start: 2.6, end: 5.4, label: '> compose_architecture', status: 'BUILDING' },
  { start: 5.6, end: 8.0, label: '> converge_to_nexus', status: 'LOCKING' },
  { start: 8.2, end: 11.0, label: '> ship_product', status: 'DELIVERED' },
]

function CaptionsScene({ accent }: { accent: string }) {
  const t = useTime()
  const active = BEATS.find(b => t >= b.start && t <= b.end)
  if (!active) return null

  const localT = t - active.start
  const fadeIn = clamp(localT / 0.35, 0, 1)
  const opacity = fadeIn * Math.max(0, 1 - clamp((t - (active.end - 0.4)) / 0.4, 0, 1))
  const typeChars = clamp(localT / 0.7, 0, 1)
  const visibleLabel = active.label.slice(0, Math.ceil(active.label.length * typeChars))
  const cursorOn = Math.floor(t * 2) % 2 === 0
  const pulse = 0.5 + Math.sin(t * 4) * 0.5

  return (
    <div style={{ position: 'absolute', left: '5%', bottom: '12%', opacity, pointerEvents: 'none', mixBlendMode: 'screen' }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', color: '#e9eef5', fontSize: 'clamp(11px, 1.5vw, 16px)', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: accent }}>{visibleLabel}</span>
        {cursorOn && typeChars >= 1 && <span style={{ width: 8, height: 16, background: accent, display: 'inline-block', boxShadow: `0 0 8px ${accent}` }} />}
      </div>
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.3em', color: 'rgba(233,238,245,0.65)' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, boxShadow: `0 0 ${4 + pulse * 8}px ${accent}`, opacity: 0.5 + pulse * 0.5, display: 'inline-block' }} />
        STATUS // {active.status}
      </div>
    </div>
  )
}

function CounterScene({ accent }: { accent: string }) {
  const t = useTime()
  const opacity = clamp((t - 1) / 0.6, 0, 1) * (1 - clamp((t - 11) / 0.5, 0, 1))
  if (opacity < 0.02) return null
  const value = Math.floor(Easing.easeInOutCubic(clamp((t - 1) / 7.5, 0, 1)) * 33)
  return (
    <div style={{ position: 'absolute', right: '5%', top: '12%', opacity, pointerEvents: 'none', textAlign: 'right', mixBlendMode: 'screen' }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(233,238,245,0.55)', fontSize: 10, letterSpacing: '0.32em' }}>FREQUENCY</div>
      <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#fff', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 200, lineHeight: 1, letterSpacing: '-0.04em', textShadow: `0 0 16px ${accent}55`, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
        {String(value).padStart(2, '0')}<span style={{ fontSize: '52%', opacity: 0.5, fontWeight: 300 }}>°</span>
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export function HeroAnimationLoop({ accent = '#7BC5FF' }: { accent?: string }) {
  const [t, setT] = useState(0)
  const raf = useRef<number>(0)
  const start = useRef<number | null>(null)
  const DURATION = 12

  useEffect(() => {
    const tick = (now: number) => {
      if (start.current === null) start.current = now
      const elapsed = (now - start.current) / 1000
      setT(elapsed % DURATION)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  return (
    <TimeCtx.Provider value={{ t }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <Backdrop accent={accent} />
        <LatticeScene accent={accent} />
        <WordmarkScene accent={accent} />
        <CaptionsScene accent={accent} />
        <CounterScene accent={accent} />
      </div>
    </TimeCtx.Provider>
  )
}
