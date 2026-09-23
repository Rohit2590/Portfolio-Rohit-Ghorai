import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Eye, Layers, Search, Sparkles } from 'lucide-react'
import { Github } from './components/SocialIcons'
import { allProjects, categories } from './projectsData'
import ThreeCanvas from './components/ThreeCanvas'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { animateFilterCards } from './utils/animations'
import './styles.css'

function Project() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark')
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('portfolio-theme', theme) }, [theme])
  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  const filteredProjects = allProjects.filter((project) => {
    const query = searchQuery.toLowerCase()
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory
    const matchesSearch = project.title.toLowerCase().includes(query) || project.description.toLowerCase().includes(query) || project.tags?.some((tag) => tag.toLowerCase().includes(query))
    return matchesCategory && matchesSearch
  })
  const handleCategoryChange = (category) => { setActiveCategory(category); setTimeout(() => animateFilterCards('.project-card'), 20) }

  return (
    <div className="portfolio-app">
      <ErrorBoundary fallback={null}><ThreeCanvas currentTheme={theme} /></ErrorBoundary>
      <div className="ambient-glow glow-1" aria-hidden="true" /><div className="ambient-glow glow-2" aria-hidden="true" /><div className="ambient-glow glow-3" aria-hidden="true" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content projects-page-container">
        <section className="page-intro-header"><div className="page-nav-row"><Link to="/" className="back-link-btn"><ArrowLeft size={16} /><span>Back to Overview</span></Link></div><div className="page-title-block"><span className="section-badge"><Layers size={14} /><span>Full Work Portfolio</span></span><h1 className="page-headline">All Projects &amp; Prototypes</h1><p className="page-desc">Explore the complete collection of {allProjects.length} web applications, interactive experiments, UI prototypes, and dashboards.</p></div><div className="directory-controls-bar"><div className="search-box-wrapper"><Search size={18} className="search-icon" /><input type="text" placeholder="Search projects by name, technology, or keywords..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="search-input" />{searchQuery && <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>Clear</button>}</div><div className="filter-tabs-wrapper" role="tablist" aria-label="Project categories">{categories.map((category) => <button key={category} type="button" role="tab" aria-selected={activeCategory === category} className={`filter-tab-btn ${activeCategory === category ? 'active' : ''}`} onClick={() => handleCategoryChange(category)}>{category}</button>)}</div></div></section>
        <section className="section directory-grid-section">{filteredProjects.length === 0 ? <div className="empty-results-box"><Sparkles size={32} className="text-cyan" /><h3>No matching projects found</h3><p>Try searching for a different keyword or select “All” categories.</p><button type="button" className="btn secondary" onClick={() => { setSearchQuery(''); setActiveCategory('All') }}>Reset Filters</button></div> : <div className="project-grid">{filteredProjects.map((project) => <article className="project-card" key={project.slug}><div className="card-top-bar"><span className="card-category-tag">{project.category}</span><div className="card-actions-quick">{project.github && <a href={project.github} target="_blank" rel="noreferrer" className="icon-action-btn" title="View Source Code" aria-label="View Source Code"><Github size={16} /></a>}<Link to={`/projects/${project.slug}`} className="icon-action-btn" title="Open Interactive Demo" aria-label="Open Interactive Demo"><Eye size={16} /></Link></div></div><h3 className="card-title"><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3><p className="card-desc">{project.description}</p>{project.tags && <div className="card-tags-list">{project.tags.map((tag) => <span className="card-tag-pill" key={tag}>{tag}</span>)}</div>}<div className="card-footer"><Link to={`/projects/${project.slug}`} className="card-view-link"><span>Launch Interactive Demo</span><ArrowRight size={14} /></Link></div></article>)}</div>}</section>
      </main><Footer />
    </div>
  )
}

export default Project