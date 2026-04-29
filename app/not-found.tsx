import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#080808',
        backgroundImage: 'radial-gradient(ellipse at 33% 33%, rgba(212,212,212,0.03) 0%, transparent 70%)',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(6.6rem, 20vw, 9.9rem)',
          color: 'rgba(212,212,212,0.08)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          position: 'absolute',
        }}
      >
        404
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.66rem',
            letterSpacing: '0.3em',
            color: '#D4D4D4',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          — NOT FOUND
        </div>

        <h1
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(2.2rem, 6vw, 3.3rem)',
            letterSpacing: '0.05em',
            color: '#FFFFFF',
            marginBottom: '1rem',
          }}
        >
          This Page Doesn&apos;t Exist
        </h1>

        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.32rem',
            fontStyle: 'italic',
            color: '#555555',
            marginBottom: '3rem',
            maxWidth: '400px',
          }}
        >
          Even at the 33rd degree, some coordinates don&apos;t exist in this dimension.
        </p>

        <Link href="/">
          <button
            style={{
              background: 'linear-gradient(135deg, #D4D4D4 0%, #F0F0F0 33%, #D4D4D4 66%, #7A7A7A 100%)',
              backgroundSize: '200% auto',
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
            RETURN HOME
          </button>
        </Link>
      </div>
    </div>
  )
}
