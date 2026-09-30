import { useState } from 'react'
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
  ShoppingCart,
  TrendingUp,
  Activity,
  DollarSign,
  Eye,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Globe,
  Trophy,
} from 'lucide-react'
import { Github } from './components/SocialIcons'
import { allProjects } from './projectsData'
import './styles.css'

function ProjectDetailDemo({ slug }) {
  // E-commerce state
  const [cartCount, setCartCount] = useState(2)
  const [cartFeedback, setCartFeedback] = useState('')

  // Chat prototype state
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Alex', text: 'Hey Rohit! Did you check out the new 3D portfolio release?' },
    { id: 2, sender: 'You', text: 'Yes! The Three.js canvas and Anime.js transitions look super clean.' },
  ])
  const [chatInput, setChatInput] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // Task planner state
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Implement Three.js shader', status: 'done' },
    { id: 2, title: 'Optimize anime.js staggers', status: 'progress' },
    { id: 3, title: 'Setup responsive breakpoints', status: 'todo' },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  // 1. BoomBox Music Player state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(85)
  const playlist = [
    { title: 'Synthwave Odyssey', artist: 'Rohit Ghorai', duration: '3:45' },
    { title: 'Cyber Pulse Beats', artist: 'AudioFX Lab', duration: '4:12' },
    { title: 'Stardust Reverie', artist: 'Cosmic Echo', duration: '2:58' },
  ]

  // 2. YONO Casino Game state
  const [casinoBalance, setCasinoBalance] = useState(2500)
  const [slotBet, setSlotBet] = useState(100)
  const [slotReels, setSlotReels] = useState(['🎰', '💎', '7️⃣'])
  const [isSpinning, setIsSpinning] = useState(false)
  const [casinoNotice, setCasinoNotice] = useState('Choose bet & spin the reels!')

  // 3. WinX88 Betting Game UI state
  const [selectedOdd, setSelectedOdd] = useState(2.15)
  const [selectedTeam, setSelectedTeam] = useState('Real Madrid')
  const [betWager, setBetWager] = useState(500)
  const [betFeedback, setBetFeedback] = useState('')

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

  const handleSpinSlot = () => {
    if (isSpinning) return
    if (casinoBalance < slotBet) {
      setCasinoNotice('Insufficient coins! Lower your bet.')
      return
    }
    setCasinoBalance((b) => b - slotBet)
    setIsSpinning(true)
    setCasinoNotice('Spinning reels...')

    const symbols = ['🎰', '💎', '7️⃣', '🍒', '⭐', '🔥']
    setTimeout(() => {
      const r1 = symbols[Math.floor(Math.random() * symbols.length)]
      const r2 = symbols[Math.floor(Math.random() * symbols.length)]
      const r3 = symbols[Math.floor(Math.random() * symbols.length)]
      setSlotReels([r1, r2, r3])
      setIsSpinning(false)

      if (r1 === r2 && r2 === r3) {
        const win = slotBet * 10
        setCasinoBalance((b) => b + win)
        setCasinoNotice(`🎉 JACKPOT! 3x ${r1} MATCH! You won +${win} coins!`)
      } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        const win = slotBet * 2
        setCasinoBalance((b) => b + win)
        setCasinoNotice(`✨ Pair Match! You won +${win} coins!`)
      } else {
        setCasinoNotice('No match this round. Spin again!')
      }
    }, 600)
  }

  const handlePlaceBet = (e) => {
    e.preventDefault()
    setBetFeedback(`✅ Bet Placed: $${betWager} on ${selectedTeam} (${selectedOdd}x). Potential win: $${(betWager * selectedOdd).toFixed(0)}!`)
    setTimeout(() => setBetFeedback(''), 4000)
  }

  switch (slug) {
    case 'boombox-music-player':
      return (
        <div className="demo-sandbox music-demo">
          <div className="music-player-card">
            <div className="music-cover-art">
              <div className={`vinyl-record ${isPlaying ? 'spinning' : ''}`}>
                <div className="vinyl-center">🎵</div>
              </div>
            </div>

            <div className="music-track-info">
              <h3>{playlist[currentTrack].title}</h3>
              <p className="music-artist">{playlist[currentTrack].artist}</p>
            </div>

            {/* Equalizer Visualizer Bars */}
            <div className="audio-visualizer-bars">
              {[40, 75, 95, 60, 85, 100, 70, 50, 90, 65, 80, 45, 95, 70, 60].map((h, i) => (
                <span
                  key={i}
                  className={`bar ${isPlaying ? 'animate' : ''}`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * (i % 2 === 0 ? 0.9 : 1.1)))}%` : '15%',
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="music-controls-row">
              <button
                type="button"
                className="music-ctrl-btn"
                onClick={() => setCurrentTrack((t) => (t > 0 ? t - 1 : playlist.length - 1))}
                title="Previous Track"
              >
                ⏮
              </button>
              <button
                type="button"
                className="music-play-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button
                type="button"
                className="music-ctrl-btn"
                onClick={() => setCurrentTrack((t) => (t + 1) % playlist.length)}
                title="Next Track"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Playlist Preview */}
            <div className="music-playlist-box">
              <h4>Up Next in Playlist</h4>
              {playlist.map((track, idx) => (
                <div
                  key={track.title}
                  className={`playlist-item ${currentTrack === idx ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentTrack(idx)
                    setIsPlaying(true)
                  }}
                >
                  <span className="track-num">{idx + 1}</span>
                  <div className="track-details">
                    <span className="track-name">{track.title}</span>
                    <span className="track-by">{track.artist}</span>
                  </div>
                  <span className="track-time">{track.duration}</span>
                </div>
              ))}
            </div>

            <div className="demo-live-cta-bar">
              <a
                href="https://boombox.priyaghorai009.workers.dev/"
                target="_blank"
                rel="noreferrer"
                className="btn primary"
              >
                <Globe size={16} />
                <span>Launch Full Published BoomBox Player</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )

    case 'yono-betting-game':
      return (
        <div className="demo-sandbox casino-demo">
          <div className="casino-arcade-card">
            <div className="casino-top-bar">
              <div className="casino-brand">
                <Trophy size={18} className="text-amber" />
                <span>YONO VIP ARCADE</span>
              </div>
              <div className="casino-wallet-badge">
                <span>Coins:</span>
                <strong>{casinoBalance.toLocaleString()}</strong>
              </div>
            </div>

            {/* Slot Reel Frame */}
            <div className="slot-machine-display">
              <div className={`slot-reel ${isSpinning ? 'spinning' : ''}`}>
                <span>{slotReels[0]}</span>
              </div>
              <div className={`slot-reel ${isSpinning ? 'spinning' : ''}`}>
                <span>{slotReels[1]}</span>
              </div>
              <div className={`slot-reel ${isSpinning ? 'spinning' : ''}`}>
                <span>{slotReels[2]}</span>
              </div>
            </div>

            <div className="casino-notice-text">{casinoNotice}</div>

            {/* Bet Selector */}
            <div className="casino-bet-controls">
              <span className="bet-label">Select Bet:</span>
              <div className="bet-chips-group">
                {[50, 100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`bet-chip-btn ${slotBet === amt ? 'active' : ''}`}
                    onClick={() => setSlotBet(amt)}
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={`casino-spin-btn ${isSpinning ? 'disabled' : ''}`}
              onClick={handleSpinSlot}
              disabled={isSpinning}
            >
              {isSpinning ? 'SPINNING REELS...' : `🎰 SPIN REEL (${slotBet} COINS)`}
            </button>

            <div className="demo-live-cta-bar">
              <a
                href="https://betting-game.priyaghorai009.workers.dev/"
                target="_blank"
                rel="noreferrer"
                className="btn primary"
              >
                <Globe size={16} />
                <span>Play Live YONO Games & Arcade</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )

    case 'winx88-betting-game-ui':
      return (
        <div className="demo-sandbox betting-ui-demo">
          <div className="betting-slip-container">
            <div className="fixture-card">
              <div className="fixture-badge-live">
                <span className="pulse-dot-green" />
                <span>LIVE • 68&apos;</span>
              </div>

              <div className="fixture-teams-row">
                <div className="team-col">
                  <span className="team-flag">🇪🇸</span>
                  <strong>Real Madrid</strong>
                  <span className="team-score">2</span>
                </div>
                <div className="fixture-vs">VS</div>
                <div className="team-col">
                  <span className="team-flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
                  <strong>Manchester City</strong>
                  <span className="team-score">1</span>
                </div>
              </div>

              {/* Odds Grid */}
              <div className="odds-selection-grid">
                <button
                  type="button"
                  className={`odd-btn ${selectedTeam === 'Real Madrid' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTeam('Real Madrid')
                    setSelectedOdd(2.15)
                  }}
                >
                  <span className="odd-pick">1 (Home)</span>
                  <span className="odd-val">2.15</span>
                </button>

                <button
                  type="button"
                  className={`odd-btn ${selectedTeam === 'Draw' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTeam('Draw')
                    setSelectedOdd(3.40)
                  }}
                >
                  <span className="odd-pick">X (Draw)</span>
                  <span className="odd-val">3.40</span>
                </button>

                <button
                  type="button"
                  className={`odd-btn ${selectedTeam === 'Man City' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTeam('Man City')
                    setSelectedOdd(2.90)
                  }}
                >
                  <span className="odd-pick">2 (Away)</span>
                  <span className="odd-val">2.90</span>
                </button>
              </div>
            </div>

            {/* Bet Slip */}
            <form className="bet-slip-panel" onSubmit={handlePlaceBet}>
              <div className="slip-header">
                <h4>Instant Bet Slip</h4>
                <span className="slip-odd-badge">{selectedOdd}x Multiplier</span>
              </div>

              <p className="slip-summary">
                Selection: <strong>{selectedTeam}</strong> to win
              </p>

              <div className="slip-input-row">
                <label>Wager ($):</label>
                <input
                  type="number"
                  value={betWager}
                  min="10"
                  max="10000"
                  onChange={(e) => setBetWager(Number(e.target.value))}
                />
              </div>

              <div className="slip-payout-row">
                <span>Potential Payout:</span>
                <strong>${(betWager * selectedOdd).toFixed(2)}</strong>
              </div>

              <button type="submit" className="btn primary full-width">
                Confirm Wager Slip
              </button>

              {betFeedback && <div className="sandbox-toast">{betFeedback}</div>}
            </form>

            <div className="demo-live-cta-bar">
              <a
                href="https://new-betting-game.priyaghorai009.workers.dev/"
                target="_blank"
                rel="noreferrer"
                className="btn primary"
              >
                <Globe size={16} />
                <span>Open Live WinX88 Betting Platform</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      )

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
                Audio &amp; Wearables
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

    default:
      return (
        <div className="demo-sandbox generic-demo">
          <div className="generic-preview-card">
            <div className="generic-icon-box">
              <Sparkles size={28} className="text-cyan" />
            </div>
            <h4>Interactive Prototype &amp; Architecture Preview</h4>
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

  const projectIndex = allProjects.findIndex((item) => item.slug === slug)
  const project = allProjects[projectIndex]

  // Default to live view if project is published
  const [previewTab, setPreviewTab] = useState(project?.isPublished ? 'live' : 'component')

  if (!project) {
    return (
      <main className="main-content">
        <div className="empty-results-box" style={{ marginTop: '5rem' }}>
          <h2>Project Not Found</h2>
          <p>We couldn&apos;t find the project you are looking for.</p>
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
          {project.isPublished && (
            <span className="live-status-pill">
              <span className="pulse-dot-green" />
              Published Live Project
            </span>
          )}
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
          {project.isPublished && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn primary live-glow-btn"
            >
              <Globe size={16} />
              <span>Launch Live Published App</span>
              <ExternalLink size={14} />
            </a>
          )}
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
          <a href="#sandbox-section" className="btn outline">
            <Eye size={16} />
            <span>Interactive Sandbox</span>
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
          <h3>Overview &amp; Purpose</h3>
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
              <span>{project.isPublished ? 'Live Deployment & Simulator' : 'Interactive Demonstration'}</span>
            </span>
            <h2 className="section-title">
              {project.isPublished ? 'Live Application Preview' : 'Live Sandbox Preview'}
            </h2>
            <p className="section-subtitle">
              {project.isPublished
                ? 'Interact directly with the live published web application or switch to the component simulator below.'
                : 'Interact with the component simulator below to experience the responsive layout and state flows.'}
            </p>
          </div>

          <div className="sandbox-controls-group">
            {/* If published, switch between Live Webview and Component Simulator */}
            {project.isPublished && (
              <div className="preview-mode-tabs" role="tablist" aria-label="Preview mode">
                <button
                  type="button"
                  className={`preview-tab-btn ${previewTab === 'live' ? 'active' : ''}`}
                  onClick={() => setPreviewTab('live')}
                >
                  <Globe size={14} />
                  <span>Live Webview</span>
                </button>
                <button
                  type="button"
                  className={`preview-tab-btn ${previewTab === 'component' ? 'active' : ''}`}
                  onClick={() => setPreviewTab('component')}
                >
                  <Sparkles size={14} />
                  <span>Component Simulator</span>
                </button>
              </div>
            )}

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
              <span>
                {project.liveUrl.startsWith('http')
                  ? project.liveUrl.replace('https://', '')
                  : `rohitghorai.dev/demo/${project.slug}`}
              </span>
            </div>
            {project.isPublished && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="chrome-open-link"
                title="Open in new window"
              >
                <ExternalLink size={14} />
                <span>Open in Tab</span>
              </a>
            )}
          </div>

          <div className={`device-screen-content ${previewTab === 'live' && project.isPublished ? 'iframe-mode' : ''}`}>
            {previewTab === 'live' && project.isPublished ? (
              <iframe
                src={project.liveUrl}
                title={project.title}
                className="live-demo-iframe"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen"
                loading="lazy"
              />
            ) : (
              <ProjectDetailDemo slug={project.slug} />
            )}
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
  )
}
