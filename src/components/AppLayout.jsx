import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import ThreeCanvas from './ThreeCanvas'
import Navbar from './Navbar'
import Footer from './Footer'
import ErrorBoundary from './ErrorBoundary'
import ScrollToTop from './ScrollToTop'

export default function AppLayout() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="portfolio-app">
      {/* Scroll restoration across route transitions */}
      <ScrollToTop />

      {/* Persistent Full-Screen 3D WebGL Canvas (Never torn down on route change) */}
      <ErrorBoundary fallback={null}>
        <ThreeCanvas currentTheme={theme} />
      </ErrorBoundary>

      {/* Persistent Ambient Glows */}
      <div className="ambient-glow glow-1" aria-hidden="true" />
      <div className="ambient-glow glow-2" aria-hidden="true" />
      <div className="ambient-glow glow-3" aria-hidden="true" />

      {/* Persistent Navigation Bar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Page Content wrapped in top-level ErrorBoundary */}
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>

      {/* Persistent Footer */}
      <Footer />
    </div>
  )
}

