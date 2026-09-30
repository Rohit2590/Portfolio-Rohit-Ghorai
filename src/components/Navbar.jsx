import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Sun,
  Moon,
  Menu,
  X,
  Layers,
  Mail,
} from 'lucide-react'
import { allProjects } from '../projectsData'

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-badge">
            <span>RG</span>
            <span className="brand-dot" />
          </div>
          <div className="brand-text">
            <span className="brand-name">Rohit Ghorai</span>
            <span className="brand-role">Web Developer</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {location.pathname === '/' ? (
            <>
              <a href="#about" className="nav-link">
                About
              </a>
              <a href="#projects" className="nav-link">
                Projects
              </a>
              <a href="#skills" className="nav-link">
                Skills
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <a href="/#about" className="nav-link">
                About
              </a>
              <Link
                to="/projects"
                className={`nav-link ${location.pathname.startsWith('/projects') ? 'active' : ''}`}
              >
                All Projects
              </Link>
              <a href="/#contact" className="nav-link">
                Contact
              </a>
            </>
          )}

          <Link to="/projects" className="nav-pill-link">
            <Layers size={15} />
            <span>Explore All Work</span>
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Theme Switcher Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="theme-icon sun-icon" />
            ) : (
              <Moon size={18} className="theme-icon moon-icon" />
            )}
          </button>

          {/* Contact Button */}
          <a
            href={location.pathname === '/' ? '#contact' : '/#contact'}
            className="btn-nav-cta"
          >
            <Mail size={16} />
            <span>Let's Talk</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="mobile-drawer-links">
            <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
              Home
            </Link>
            <a
              href={location.pathname === '/' ? '#about' : '/#about'}
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              About
            </a>
            <a
              href={location.pathname === '/' ? '#projects' : '/#projects'}
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              Featured Projects
            </a>
            <Link to="/projects" className="mobile-nav-link" onClick={closeMenu}>
              All Projects ({allProjects.length})
            </Link>
            <a
              href={location.pathname === '/' ? '#skills' : '/#skills'}
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              Skills & Tech
            </a>
            <a
              href={location.pathname === '/' ? '#contact' : '/#contact'}
              className="mobile-nav-link"
              onClick={closeMenu}
            >
              Contact
            </a>
          </div>

          <div className="mobile-drawer-footer">
            <a
              href="mailto:dasarathghorai2019@gmail.com"
              className="btn primary full-width"
              onClick={closeMenu}
            >
              <Mail size={16} />
              <span>dasarathghorai2019@gmail.com</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
