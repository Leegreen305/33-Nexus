'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#080808',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.66rem',
          letterSpacing: '0.3em',
          color: '#8B0000',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}
      >
        — SYSTEM ERROR
      </div>

      <h2
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(2.2rem, 6vw, 3.3rem)',
          letterSpacing: '0.05em',
          color: '#F5F0E8',
          marginBottom: '1rem',
        }}
      >
        Something Went Wrong
      </h2>

      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.99rem',
          color: '#6B6560',
          marginBottom: '3rem',
          maxWidth: '400px',
          lineHeight: 1.7,
        }}
      >
        An unexpected error occurred. Our systems have been notified.
      </p>

      <button
        onClick={reset}
        style={{
          background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 33%, #C9A84C 66%, #8B6914 100%)',
          color: '#080808',
          fontFamily: 'Bebas Neue, sans-serif',
          letterSpacing: '0.15em',
          borderRadius: '33px',
          padding: '8px 88px',
          fontSize: '1rem',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        TRY AGAIN
      </button>
    </div>
  )
}
