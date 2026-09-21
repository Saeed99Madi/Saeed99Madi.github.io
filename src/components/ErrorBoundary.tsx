import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

/**
 * Last line of defence. A render crash would otherwise leave a blank page with
 * no way to contact Said — the one thing this site exists to do. The fallback
 * is dependency-free inline markup, so it still renders if the theme, the RTL
 * cache or the i18n layer is what broke.
 */
export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // No analytics or error service is wired up, by design — no third-party
    // scripts, no cookie banner. The console is the only sink.
    console.error('Unhandled render error:', error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          background: '#0E1013',
          color: '#ECEAE5',
          fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
          textAlign: 'center',
        }}
      >
        <main>
          <h1 style={{ fontSize: 'clamp(1.5rem, 6vw, 2.25rem)', margin: 0 }}>Said Madi</h1>
          <p style={{ color: '#9AA0AB', marginTop: 12 }}>Something went wrong loading this page.</p>
          <p style={{ marginTop: 24 }}>
            <a href="mailto:saed.dev9@gmail.com" style={{ color: '#E9A23B' }}>
              saed.dev9@gmail.com
            </a>
            <br />
            <a href="https://github.com/Saeed99Madi" style={{ color: '#E9A23B' }}>
              github.com/Saeed99Madi
            </a>
          </p>
          <p style={{ marginTop: 24 }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                borderRadius: 99,
                border: 'none',
                background: '#E9A23B',
                color: '#0E1013',
                font: 'inherit',
                cursor: 'pointer',
              }}
            >
              Reload
            </button>
          </p>
        </main>
      </div>
    )
  }
}
