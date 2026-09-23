import { useEffect, useRef } from 'react'
import { Sparkles, Code2, Cpu, Globe, Rocket, CheckCircle2 } from 'lucide-react'
import { animateCounter } from '../utils/animations'

export default function About() {
  const statsRef = useRef(null)
  const animatedOnce = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedOnce.current) {
            animatedOnce.current = true
            const numElements = document.querySelectorAll('.stat-number-val')
            numElements.forEach((el) => {
              const target = el.getAttribute('data-target')
              animateCounter(el, target, 1500)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="section about-section" id="about">
      <div className="section-header">
        <span className="section-badge">
          <Sparkles size={14} />
          <span>About Me</span>
        </span>
        <h2 className="section-title">Bridging Code, Creativity & 3D Interactivity</h2>
        <p className="section-subtitle">
          I craft clean, fast, and responsive digital experiences with modern React, JavaScript, and interactive motion.
        </p>
      </div>

      <div className="about-grid">
        {/* Bio Card */}
        <div className="about-bio-card">
          <div className="about-bio-header">
            <div className="avatar-placeholder">
              <span className="avatar-initials">RG</span>
            </div>
            <div>
              <h3>Rohit Ghorai</h3>
              <p className="role-tag">Frontend & Web Developer</p>
            </div>
          </div>

          <p className="bio-text">
            Hello! I am a passionate web developer focused on building intuitive, aesthetically pleasing, and high-performance applications. I enjoy combining clean engineering architecture with engaging motion graphics — using <strong>Three.js</strong> for immersive 3D visuals and <strong>anime.js</strong> for tactile micro-interactions.
          </p>

          <p className="bio-text">
            Whether architecting component libraries, wiring data-driven dashboards, or crafting interactive landing pages, my objective is always delivering polished, human-centered web software that leaves a lasting impression.
          </p>

          <div className="bio-highlights">
            <div className="highlight-pill">
              <CheckCircle2 size={16} className="text-cyan" />
              <span>Pixel-Perfect Responsiveness</span>
            </div>
            <div className="highlight-pill">
              <CheckCircle2 size={16} className="text-cyan" />
              <span>Modern React 19 & ES6+</span>
            </div>
            <div className="highlight-pill">
              <CheckCircle2 size={16} className="text-cyan" />
              <span>WebGL 3D & CSS Motion</span>
            </div>
            <div className="highlight-pill">
              <CheckCircle2 size={16} className="text-cyan" />
              <span>Clean, Maintainable Architecture</span>
            </div>
          </div>
        </div>

        {/* Core Pillars / Strengths */}
        <div className="about-pillars">
          <div className="pillar-card">
            <div className="pillar-icon-box cyan">
              <Code2 size={24} />
            </div>
            <div>
              <h4>Modern Frontend Stack</h4>
              <p>Specialized in React, modular component systems, clean state management, and Vite builds.</p>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box violet">
              <Cpu size={24} />
            </div>
            <div>
              <h4>3D & Fluid Animations</h4>
              <p>Integrating Three.js WebGL canvases, particle clouds, and anime.js kinetic timing for delightful UX.</p>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box emerald">
              <Globe size={24} />
            </div>
            <div>
              <h4>Responsive & Accessible</h4>
              <p>Ensuring fluid typography, touch-friendly navigation, contrast standards, and instant load speeds.</p>
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box amber">
              <Rocket size={24} />
            </div>
            <div>
              <h4>Continuous Innovation</h4>
              <p>Constantly exploring progressive web technologies, shader aesthetics, and design trends.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Bar */}
      <div className="stats-bar" ref={statsRef}>
        <div className="stat-item">
          <span className="stat-number">
            <span className="stat-number-val" data-target="12">
              0
            </span>
            <span className="stat-plus">+</span>
          </span>
          <span className="stat-label">Featured Projects</span>
        </div>

        <div className="stat-item">
          <span className="stat-number">
            <span className="stat-number-val" data-target="100">
              0
            </span>
            <span className="stat-plus">%</span>
          </span>
          <span className="stat-label">Responsive Layouts</span>
        </div>

        <div className="stat-item">
          <span className="stat-number">
            <span className="stat-number-val" data-target="60">
              0
            </span>
            <span className="stat-plus"> FPS</span>
          </span>
          <span className="stat-label">3D Canvas Motion</span>
        </div>

        <div className="stat-item">
          <span className="stat-number">
            <span className="stat-number-val" data-target="15">
              0
            </span>
            <span className="stat-plus">+</span>
          </span>
          <span className="stat-label">Modern Web Tools</span>
        </div>
      </div>
    </section>
  )
}

