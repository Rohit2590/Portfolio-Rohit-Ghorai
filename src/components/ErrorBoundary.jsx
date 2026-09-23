import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback
      }

      return (
        this.props.fallback || (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
            <p>Something went wrong loading this component.</p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: '#38bdf8',
                color: '#090d16',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Try Again
            </button>
        <div className="main-content" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
          <div
            style={{
              maxWidth: '560px',
              margin: '0 auto',
              padding: '2.5rem',
              borderRadius: '24px',
              background: 'var(--bg-surface, rgba(17, 24, 39, 0.8))',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--text-primary, #fff)' }}>
              Something went wrong
            </h2>
            <p style={{ color: 'var(--text-secondary, #94a3b8)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              An unexpected error occurred while displaying this page.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn primary"
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.location.href = '/'
                }}
              >
                Return to Overview
              </button>
              <button
                type="button"
                className="btn secondary"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Try Again
              </button>
            </div>
          </div>
        )
        </div>
      )
    }

    return this.props.children
  }
}

