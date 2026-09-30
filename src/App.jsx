import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Code2,
  ExternalLink,
  Eye,
  Layers,
  Mail,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react'
import { Github } from './components/SocialIcons'
import { allProjects, categories, featuredProjects } from './projectsData'
import ThreeCanvas from './components/ThreeCanvas'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { animateFilterCards, animateHeroEntrance } from './utils/animations'
import './styles.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
    animateHeroEntrance('.hero-content')
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  const filteredProjects =
    activeCategory === 'All'
      ? featuredProjects
      : featuredProjects.filter((project) => project.category === activeCategory)

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setTimeout(() => animateFilterCards('.project-card'), 20)
  }

  return (
    <div className="portfolio-app">
      <ErrorBoundary fallback={null}>
        <ThreeCanvas currentTheme={theme} />
      </ErrorBoundary>
      <div className="ambient-glow glow-1" aria-hidden="true" />
      <div className="ambient-glow glow-2" aria-hidden="true" />
      <div className="ambient-glow glow-3" aria-hidden="true" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="main-content">
        {/* HERO SECTION */}
        <section className="hero-section" id="hero">
          <div className="hero-fullscreen-container">
            <div className="hero-content hero-content-immersive">
              <div className="hero-badge">
                <span className="badge-pulse-dot" />
                <span className="badge-text">Available for Web Development Projects</span>
              </div>

              <p className="hero-greeting">Hi there, I’m</p>
              <h1 className="hero-name">
                <span className="name-gradient">Rohit Ghorai</span>
              </h1>

              <div className="hero-role-wrapper">
                <span className="role-chip">Frontend Engineer</span>
                <span className="role-divider">•</span>
                <span className="role-chip">Creative 3D Web Developer</span>
              </div>

              <p className="hero-description">
                Crafting clean, responsive websites and modern web apps with{' '}
                <strong>React 19</strong>, immersive <strong>Three.js</strong> 3D visuals, and fluid{' '}
                <strong>anime.js</strong> micro-interactions.
              </p>

              <div className="hero-actions">
                <a href="#projects" className="btn primary">
                  <span>Explore Featured Work</span>
                  <ArrowRight size={16} />
                </a>
                <Link to="/projects" className="btn secondary">
                  <Layers size={16} />
                  <span>All Projects ({allProjects.length})</span>
                </Link>
                <a href="#contact" className="btn outline">
                  <Mail size={16} />
                  <span>Contact Me</span>
                </a>
              </div>

              {/* Quick Tech Snapshot Pills */}
              <div className="hero-tech-pills">
                <span className="tech-pill">
                  <Zap size={13} className="text-cyan" /> React 19
                </span>
                <span className="tech-pill">
                  <Sparkles size={13} className="text-violet" /> Three.js 3D WebGL
                </span>
                <span className="tech-pill">
                  <Terminal size={13} className="text-emerald" /> Anime.js Motion
                </span>
                <span className="tech-pill">
                  <Code2 size={13} className="text-amber" /> Modern Glassmorphism
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section className="section projects-section" id="projects">
          <div className="section-header-row">
            <div>
              <span className="section-badge">
                <Sparkles size={14} />
                <span>Selected Showcase</span>
              </span>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">
                A curation of published live web apps, real-time betting platforms, and interactive user interfaces.
              </p>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="filter-tabs-wrapper" role="tablist" aria-label="Project categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                className={`filter-tab-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article className="project-card" key={project.slug}>
                <div className="card-top-bar">
                  <div className="card-top-meta">
                    <span className="card-category-tag">{project.category}</span>
                    {project.isPublished && (
                      <span className="live-status-pill">
                        <span className="pulse-dot-green" />
                        Live
                      </span>
                    )}
                  </div>
                  <div className="card-actions-quick">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-action-btn"
                        title="View Source Code"
                        aria-label="View Source Code"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.isPublished && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-action-btn highlight-live"
                        title="Open Live Site"
                        aria-label="Open Live Site"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <Link
                      to={`/projects/${project.slug}`}
                      className="icon-action-btn"
                      title="Open Live Demo & Details"
                      aria-label="Open Live Demo & Details"
                    >
                      <Eye size={16} />
                    </Link>
                  </div>
                </div>

                <h3 className="card-title">
                  <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                </h3>

                <p className="card-desc">{project.description}</p>

                {project.tags && (
                  <div className="card-tags-list">
                    {project.tags.map((tag) => (
                      <span className="card-tag-pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="card-footer">
                  {project.isPublished ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="card-view-link live-link"
                    >
                      <span>Launch Published Site</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <Link to={`/projects/${project.slug}`} className="card-view-link">
                      <span>Explore Live Demo</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="section-cta-center">
            <Link to="/projects" className="btn secondary view-all-btn">
              <Layers size={18} />
              <span>Browse Full Portfolio Directory ({allProjects.length} Projects)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <About />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App