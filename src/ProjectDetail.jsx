import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Monitor,
  Smartphone,
  Sparkles,
  Layers,
  Code2,
  CheckCircle,
  Clock,
  Send,
  Plus,
  Trash2,
  ShoppingCart,
  TrendingUp,
  Activity,
  CloudSun,
  DollarSign,
  Utensils,
  BookOpen,
  Boxes,
  MapPin,
  Flame,
  Eye,
} from 'lucide-react'
import { Github } from './components/SocialIcons'
import { allProjects } from './projectsData'
import ThreeCanvas from './components/ThreeCanvas'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './styles.css'

function ProjectDetailDemo({ slug }) {
  // Interactive mini-state for demos
  const [cartCount, setCartCount] = useState(2)
  const [cartFeedback, setCartFeedback] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Alex', text: 'Hey Rohit! Did you check out the new 3D portfolio release?' },
    { id: 2, sender: 'You', text: 'Yes! The Three.js canvas and Anime.js transitions look super clean.' },
  ])
  const [chatInput, setChatInput] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Implement Three.js shader', status: 'done' },
    { id: 2, title: 'Optimize anime.js staggers', status: 'progress' },
    { id: 3, title: 'Setup responsive breakpoints', status: 'todo' },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const handleAddToCart = (productName) => {
    setCartCount((c) => c + 1)
    setCartFeedback(`Added "${productName}" to cart!`)
    setTimeout(() => setCartFeedback(''), 2000)
  }

  const handleSendChat = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    const msg = { id: Date.now(), sender: 'You', text: chatInput }
    setChatMessages((prev) => [...prev, msg])
    setChatInput('')
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'Alex', text: 'Looks fantastic and responsive! 🚀' },
      ])
    }, 900)
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title: newTaskTitle, status: 'todo' },
    ])
    setNewTaskTitle('')
  }

  switch (slug) {
    case 'e-commerce-platform':
      return (
        <div className="demo-sandbox ecommerce-demo">
          <div className="sandbox-bar">
            <div className="sandbox-chips">
              <button
                type="button"
                className={`sandbox-chip ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Products
              </button>
              <button
                type="button"
                className={`sandbox-chip ${activeTab === 'audio' ? 'active' : ''}`}
                onClick={() => setActiveTab('audio')}
              >
                Audio & Wearables
              </button>
            </div>
            <div className="sandbox-cart-badge">
              <ShoppingCart size={16} />
              <span>Cart: {cartCount} items</span>
            </div>
          </div>

          {cartFeedback && <div className="sandbox-toast">{cartFeedback}</div>}

          <div className="sandbox-grid">
            <div className="sandbox-product-card">
              <div className="product-icon-box">⌚</div>
              <span className="product-tag">New In</span>
              <h4>Smart Pro Watch</h4>
              <p className="product-price">$149.00</p>
              <button
                type="button"
                className="btn-add-cart"
                onClick={() => handleAddToCart('Smart Pro Watch')}
              >
                Add to Cart
              </button>
            </div>

            <div className="sandbox-product-card featured">
              <div className="product-icon-box">🎧</div>
              <span className="product-tag highlight">Bestseller</span>
              <h4>Spatial Headphones</h4>
              <p className="product-price">$89.00</p>
              <button
                type="button"
                className="btn-add-cart"
                onClick={() => handleAddToCart('Spatial Headphones')}
              >
                Add to Cart
              </button>
            </div>

            <div className="sandbox-product-card">
              <div className="product-icon-box">💼</div>
              <span className="product-tag">Leather</span>
              <h4>Minimalist Pack</h4>
              <p className="product-price">$129.00</p>
              <button
                type="button"
                className="btn-add-cart"
                onClick={() => handleAddToCart('Minimalist Pack')}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )

    case 'admin-dashboard':
      return (
        <div className="demo-sandbox dashboard-demo">
          <div className="dashboard-metric-cards">
            <div className="metric-box">
              <div className="metric-header">
                <span>Total Users</span>
                <TrendingUp size={16} className="text-cyan" />
              </div>
              <h4>18,249</h4>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: '82%' }} />
              </div>
              <span className="metric-caption">+14% vs last month</span>
            </div>

            <div className="metric-box">
              <div className="metric-header">
                <span>Revenue (ARR)</span>
                <DollarSign size={16} className="text-emerald" />
              </div>
              <h4>$42,650</h4>
              <div className="progress-track">
                <div className="progress-bar emerald" style={{ width: '68%' }} />
              </div>
              <span className="metric-caption">On track to Q3 goal</span>
            </div>

            <div className="metric-box">
              <div className="metric-header">
                <span>Server Uptime</span>
                <Activity size={16} className="text-violet" />
              </div>
              <h4>99.98%</h4>
              <div className="progress-track">
                <div className="progress-bar violet" style={{ width: '99%' }} />
              </div>
              <span className="metric-caption">Zero degradation events</span>
            </div>
          </div>

          <div className="dashboard-activity-list">
            <h5>Recent System Activity</h5>
            <div className="activity-item">
              <span className="activity-bullet online" />
              <span>Database cluster auto-scaled to 4 nodes</span>
              <span className="activity-time">2m ago</span>
            </div>
            <div className="activity-item">
              <span className="activity-bullet user" />
              <span>Enterprise subscription activated by Acme Corp</span>
              <span className="activity-time">14m ago</span>
            </div>
            <div className="activity-item">
              <span className="activity-bullet ticket" />
              <span>Automated integrity health checks passed</span>
              <span className="activity-time">32m ago</span>
            </div>
          </div>
        </div>
      )

    case 'task-planner-app':
      return (
        <div className="demo-sandbox task-demo">
          <form className="task-add-bar" onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <button type="submit" className="btn primary small">
              <Plus size={15} />
              <span>Add</span>
            </button>
          </form>

          <div className="kanban-columns-grid">
            <div className="kanban-col">
              <div className="kanban-col-header">
                <span className="col-status-pill todo">Todo</span>
                <span className="col-count">
                  {tasks.filter((t) => t.status === 'todo').length}
                </span>
              </div>
              <div className="kanban-task-list">
                {tasks
                  .filter((t) => t.status === 'todo')
                  .map((t) => (
                    <div className="kanban-card" key={t.id}>
                      <span>{t.title}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="kanban-col">
              <div className="kanban-col-header">
                <span className="col-status-pill progress">In Progress</span>
                <span className="col-count">
                  {tasks.filter((t) => t.status === 'progress').length}
                </span>
              </div>
              <div className="kanban-task-list">
                {tasks
                  .filter((t) => t.status === 'progress')
                  .map((t) => (
                    <div className="kanban-card in-progress" key={t.id}>
                      <span>{t.title}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="kanban-col">
              <div className="kanban-col-header">
                <span className="col-status-pill done">Completed</span>
                <span className="col-count">
                  {tasks.filter((t) => t.status === 'done').length}
                </span>
              </div>
              <div className="kanban-task-list">
                {tasks
                  .filter((t) => t.status === 'done')
                  .map((t) => (
                    <div className="kanban-card done" key={t.id}>
                      <span>{t.title}</span>
                      <CheckCircle size={14} className="text-emerald" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )

    case 'chat-ui-prototype':
      return (
        <div className="demo-sandbox chat-demo">
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-avatar">AM</div>
              <div>
                <h4>Alex Morgan</h4>
                <span className="chat-status-text">Active Now</span>
              </div>
            </div>

            <div className="chat-messages-container">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-bubble-row ${msg.sender === 'You' ? 'sent' : 'received'}`}
                >
                  <div className="chat-bubble">
                    <span className="bubble-sender">{msg.sender}</span>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form className="chat-input-bar" onSubmit={handleSendChat}>
              <input
                type="text"
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="chat-send-btn" title="Send message">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )

    case 'weather-forecast-app':
      return (
        <div className="demo-sandbox weather-demo">
          <div className="weather-hero-card">
            <div className="weather-icon-huge">☀️</div>
            <div className="weather-temp-block">
              <h2>24°C</h2>
              <p>Partly Cloudy • San Francisco, CA</p>
            </div>
            <div className="weather-stats-row">
              <div>
                <span>Wind</span>
                <strong>14 km/h</strong>
              </div>
              <div>
                <span>Humidity</span>
                <strong>62%</strong>
              </div>
              <div>
                <span>UV Index</span>
                <strong>3 (Low)</strong>
              </div>
            </div>
          </div>

          <div className="weather-hourly-row">
            {['12:00', '14:00', '16:00', '18:00', '20:00'].map((time, idx) => (
              <div className="hourly-slot" key={time}>
                <span>{time}</span>
                <span className="slot-icon">{idx % 2 === 0 ? '⛅' : '🌤️'}</span>
                <strong>{24 - idx}°</strong>
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return (
        <div className="demo-sandbox generic-demo">
          <div className="generic-preview-card">
            <div className="generic-icon-box">
              <Sparkles size={28} className="text-cyan" />
            </div>
            <h4>Interactive Prototype & Architecture Preview</h4>
            <p>
              This project is built with modular components, responsive layout systems, and clean animations.
            </p>

            <div className="generic-feature-cards">
              <div className="feature-mini-card">
                <CheckCircle size={18} className="text-cyan" />
                <span>Responsive Viewport</span>
              </div>
              <div className="feature-mini-card">
                <CheckCircle size={18} className="text-violet" />
                <span>Optimized Performance</span>
              </div>
              <div className="feature-mini-card">
                <CheckCircle size={18} className="text-emerald" />
                <span>Modern Clean UI</span>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const [deviceMode, setDeviceMode] = useState('desktop') // 'desktop' | 'mobile'
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

  const projectIndex = allProjects.findIndex((item) => item.slug === slug)
  const project = allProjects[projectIndex]

  if (!project) {
    return (
      <div className="portfolio-app">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="main-content">
          <div className="empty-results-box" style={{ marginTop: '5rem' }}>
            <h2>Project Not Found</h2>
            <p>We couldn't find the project you are looking for.</p>
            <Link to="/projects" className="btn primary">
              <ArrowLeft size={16} />
              <span>Back to Projects Directory</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
      <main className="main-content">
        <div className="empty-results-box" style={{ marginTop: '5rem' }}>
          <h2>Project Not Found</h2>
          <p>We couldn't find the project you are looking for.</p>
          <Link to="/projects" className="btn primary">
            <ArrowLeft size={16} />
            <span>Back to Projects Directory</span>
          </Link>
        </div>
      </main>
    )
  }

  const prevProject = projectIndex > 0 ? allProjects[projectIndex - 1] : null
  const nextProject =
    projectIndex < allProjects.length - 1 ? allProjects[projectIndex + 1] : null

  return (
    <div className="portfolio-app">
      {/* Full-Screen Animated Three.js 3D Canvas Background */}
      <ErrorBoundary fallback={null}>
        <ThreeCanvas currentTheme={theme} />
      </ErrorBoundary>

      {/* Background ambient lighting */}
      <div className="ambient-glow glow-1" aria-hidden="true" />
      <div className="ambient-glow glow-2" aria-hidden="true" />
      <div className="ambient-glow glow-3" aria-hidden="true" />

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="main-content project-detail-page">
    <main className="main-content project-detail-page">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-nav">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/projects" className="breadcrumb-link">
            Projects
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{project.title}</span>
        </div>

        {/* Project Header Banner */}
        <header className="detail-hero-header">
          <div className="detail-meta-top">
            <span className="card-category-tag">{project.category}</span>
            {project.tags && (
              <div className="detail-tags-list">
                {project.tags.map((t) => (
                  <span className="detail-tag-pill" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-lead">{project.description}</p>

          <div className="detail-actions-bar">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn secondary"
              >
                <Github size={16} />
                <span>GitHub Source</span>
              </a>
            )}
            <a href="#sandbox-section" className="btn primary">
              <Eye size={16} />
              <span>Jump to Live Sandbox</span>
            </a>
            <Link to="/projects" className="btn outline">
              <ArrowLeft size={16} />
              <span>All Projects</span>
            </Link>
          </div>
        </header>

        {/* Project Specs & Architectural Overview */}
        <section className="detail-overview-grid">
          <div className="overview-card">
            <h3>Overview & Purpose</h3>
            <p>{project.details || project.description}</p>
          </div>

          {project.stats && (
            <div className="overview-stats-card">
              <h3>Key Specifications</h3>
              <div className="detail-stats-grid">
                {Object.entries(project.stats).map(([key, val]) => (
                  <div className="stat-spec-item" key={key}>
                    <span className="stat-spec-key">{key}</span>
                    <span className="stat-spec-val">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Interactive Live Sandbox Section */}
        <section className="section sandbox-section" id="sandbox-section">
          <div className="sandbox-header-row">
            <div>
              <span className="section-badge">
                <Sparkles size={14} />
                <span>Interactive Demonstration</span>
              </span>
              <h2 className="section-title">Live Sandbox Preview</h2>
              <p className="section-subtitle">
                Interact with the component simulator below to experience the responsive layout and state flows.
              </p>
            </div>

            {/* Device Frame Viewport Switcher */}
            <div className="device-switcher" role="group" aria-label="Device viewport switcher">
              <button
                type="button"
                className={`device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setDeviceMode('desktop')}
                title="Desktop View"
              >
                <Monitor size={16} />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                className={`device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setDeviceMode('mobile')}
                title="Mobile View"
              >
                <Smartphone size={16} />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          {/* Device Frame Shell */}
          <div className={`sandbox-device-frame ${deviceMode}`}>
            <div className="device-top-chrome">
              <div className="chrome-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="chrome-url-bar">
                <span>rohitghorai.dev/demo/{project.slug}</span>
              </div>
            </div>

            <div className="device-screen-content">
              <ProjectDetailDemo slug={project.slug} />
            </div>
          </div>
        </section>

        {/* Previous / Next Project Navigation */}
        <div className="project-pagination-row">
          {prevProject ? (
            <Link to={`/projects/${prevProject.slug}`} className="pagination-card prev">
              <ArrowLeft size={16} />
              <div>
                <span className="direction">Previous Project</span>
                <span className="title">{prevProject.title}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link to={`/projects/${nextProject.slug}`} className="pagination-card next">
              <div>
                <span className="direction">Next Project</span>
                <span className="title">{nextProject.title}</span>
              </div>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
    )
}
