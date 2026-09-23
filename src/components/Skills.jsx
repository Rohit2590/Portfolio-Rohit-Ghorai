import {
  Code,
  Layers,
  Box,
  Palette,
  Terminal,
  Server,
  Zap,
  Cpu,
  GitBranch,
  Sparkles,
} from 'lucide-react'

const skillCategories = [
  {
    title: 'Frontend Engineering',
    icon: <Code size={20} className="text-cyan" />,
    skills: [
      { name: 'React 19', level: 'Advanced', desc: 'Hooks, Suspense, State & Component Architecture' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', desc: 'Async/Await, Closures, DOM, Modules' },
      { name: 'HTML5 & Semantic Web', level: 'Advanced', desc: 'SEO, Accessibility (a11y), Modern Tags' },
      { name: 'Modern CSS & Flex/Grid', level: 'Advanced', desc: 'Glassmorphism, Variables, Dark Mode' },
    ],
  },
  {
    title: '3D, Motion & Creative Web',
    icon: <Box size={20} className="text-violet" />,
    skills: [
      { name: 'Three.js (WebGL)', level: 'Skilled', desc: 'Cameras, Geometries, Particles, Shaders & Lights' },
      { name: 'Anime.js', level: 'Advanced', desc: 'Keyframe physics, Staggered reveals, Timelines' },
      { name: 'CSS Keyframe Motion', level: 'Advanced', desc: 'Hardware-accelerated micro-interactions' },
      { name: 'Canvas 2D / Graphics', level: 'Proficient', desc: 'Particle clouds, Dynamic visualizers' },
    ],
  },
  {
    title: 'Backend & Data APIs',
    icon: <Server size={20} className="text-emerald" />,
    skills: [
      { name: 'Node.js', level: 'Intermediate', desc: 'REST endpoints, JSON services, NPM ecosystem' },
      { name: 'REST APIs & Fetch', level: 'Advanced', desc: 'HTTP methods, JSON parsing, Error handling' },
      { name: 'Browser Storage', level: 'Advanced', desc: 'LocalStorage, SessionStorage, Client state' },
      { name: 'Data Structures', level: 'Proficient', desc: 'Filtering, Mapping, Sorting algorithms' },
    ],
  },
  {
    title: 'Tooling & Workflow',
    icon: <Terminal size={20} className="text-amber" />,
    skills: [
      { name: 'Vite & Modern Bundlers', level: 'Advanced', desc: 'Lightning HMR, Build optimization' },
      { name: 'Git & GitHub', level: 'Proficient', desc: 'Version control, Branching, Pull requests' },
      { name: 'Figma & UI Prototyping', level: 'Proficient', desc: 'Wireframing, Design systems, Tokens' },
      { name: 'VS Code & DevTools', level: 'Advanced', desc: 'Performance profiling, Debugging' },
    ],
  },
]

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="section-header">
        <span className="section-badge">
          <Sparkles size={14} />
          <span>Technical Arsenal</span>
        </span>
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-subtitle">
          The core tools, libraries, and frameworks I leverage to build fluid, high-performance web applications.
        </p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category) => (
          <div className="skill-category-card" key={category.title}>
            <div className="category-card-header">
              <div className="category-icon-box">{category.icon}</div>
              <h3>{category.title}</h3>
            </div>

            <div className="skill-items-list">
              {category.skills.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <div className="skill-item-header">
                    <span className="skill-item-name">{skill.name}</span>
                    <span className="skill-item-level">{skill.level}</span>
                  </div>
                  <p className="skill-item-desc">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

