import { ArrowUp, Heart, Sparkles } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-badge">RG</span>
            <span className="logo-name">Rohit Ghorai</span>
          </div>
          <p className="footer-tagline">
            Building modern web applications, interactive 3D visualizations, and responsive frontend experiences.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-nav-col">
            <h4>Navigation</h4>
            <a href="#about">About</a>
            <a href="#projects">Featured Work</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            <a href="/#about">About</a>
            <a href="/#projects">Featured Work</a>
            <a href="/#skills">Skills</a>
            <a href="/#contact">Contact</a>
          </div>

          <div className="footer-nav-col">
            <h4>Connect</h4>
            <a href="mailto:dasarathghorai2019@gmail.com">Email</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} Rohit Ghorai. Crafted with React, Three.js & Anime.js.
        </p>

        <button
          type="button"
          className="back-to-top-btn"
          onClick={scrollToTop}
          title="Scroll back to top"
          aria-label="Scroll to top"
        >
          <span>Top</span>
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  )
}

