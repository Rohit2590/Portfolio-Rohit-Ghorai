import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { animate } from 'animejs'
import {
  Sparkles,
  Box,
  Waves,
  Flame,
  Rocket,
  Terminal,
  Dna,
  Gem,
  Palette,
  Check,
  CircleDot,
  Globe,
  Sun,
  Infinity,
  Cpu,
  Disc,
  Compass,
  Network,
  Shapes,
  Shield,
} from 'lucide-react'

export const THEME_MODES = [
  { id: 'galaxy', name: 'Galaxy', icon: Sparkles, color: '#38bdf8', desc: 'Cosmic Stardust Spiral' },
  { id: 'cyber', name: 'Cyber Core', icon: Box, color: '#a855f7', desc: 'Geometric Gimbal Crystal' },
  { id: 'waves', name: 'Wave Matrix', icon: Waves, color: '#34d399', desc: 'Undulating Cyber Ocean' },
  { id: 'vortex', name: 'Black Hole', icon: Flame, color: '#fb923c', desc: 'Gravitational Accretion Disk' },
  { id: 'hyperspace', name: 'Hyperspace', icon: Rocket, color: '#38bdf8', desc: 'Light-speed Warp Travel' },
  { id: 'matrix', name: 'Cyber Rain', icon: Terminal, color: '#10b981', desc: 'Digital Cascade & Hypercube' },
  { id: 'quantum', name: 'Quantum DNA', icon: Dna, color: '#f43f5e', desc: 'Double Helix & Electron Orbits' },
  { id: 'crystals', name: 'Crystal Field', icon: Gem, color: '#c084fc', desc: 'Floating Polyhedral Prisms' },
  // 10 NEW THREE.JS & ANIME.JS THEMES
  { id: 'tunnel', name: 'Cyber Tunnel', icon: CircleDot, color: '#06b6d4', desc: 'Hexagonal Warp Corridor' },
  { id: 'globe', name: 'Holo Globe', icon: Globe, color: '#3b82f6', desc: 'Digital Earth & Satellites' },
  { id: 'supernova', name: 'Supernova', icon: Sun, color: '#f59e0b', desc: 'Stellar Shockwave & Starburst' },
  { id: 'torus', name: 'Neon Mobius', icon: Infinity, color: '#ec4899', desc: 'Infinite Torus Knot' },
  { id: 'monoliths', name: 'Cyber Skyline', icon: Cpu, color: '#8b5cf6', desc: 'Digital Monoliths & Beacons' },
  { id: 'saturn', name: 'Celestial Rings', icon: Disc, color: '#fbbf24', desc: 'Keplerian Particle Disc' },
  { id: 'biolum', name: 'Deep Sea Glow', icon: Compass, color: '#10b981', desc: 'Floating Bioluminescent Spores' },
  { id: 'neural', name: 'Neural Synapse', icon: Network, color: '#38bdf8', desc: 'AI Plexus Brain Graph' },
  { id: 'kaleidoscope', name: 'Sacred Geometry', icon: Shapes, color: '#a855f7', desc: 'Harmonic Platonic Solids' },
  { id: 'shield', name: 'Plasma Shield', icon: Shield, color: '#06b6d4', desc: 'Geodesic Forcefield Dome' },
]

export default function ThreeCanvas({ currentTheme = 'dark', onThemeSelect }) {
  const mountRef = useRef(null)
  const worldGroupRef = useRef(null)
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('portfolio-3d-theme')
    if (saved === 'aurora' || saved === 'synthwave') return 'galaxy'
    return saved || 'galaxy'
  })
  const [hudExpanded, setHudExpanded] = useState(false)
  const hudRef = useRef(null)

  useEffect(() => {
    if (!hudExpanded) return
    const handleClickOutside = (e) => {
      if (hudRef.current && !hudRef.current.contains(e.target)) {
        setHudExpanded(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setHudExpanded(false)
    }
    document.addEventListener('pointerdown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [hudExpanded])

  const handleSelectMode = (newMode) => {
    setMode(newMode)
    localStorage.setItem('portfolio-3d-theme', newMode)
    document.documentElement.setAttribute('data-canvas-theme', newMode)
    if (onThemeSelect) onThemeSelect(newMode)

    // Anime.js kinetic spring transition for 3D world group
    if (worldGroupRef.current) {
      animate(worldGroupRef.current.scale, {
        x: [0.86, 1],
        y: [0.86, 1],
        z: [0.86, 1],
        duration: 750,
        ease: 'outBack(1.4)',
      })
      animate(worldGroupRef.current.rotation, {
        y: worldGroupRef.current.rotation.y + Math.PI * 0.35,
        duration: 850,
        ease: 'outCubic',
      })
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-canvas-theme', mode)
  }, [mode])

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 0, 42)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Point lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x38bdf8, 4, 120)
    pointLight1.position.set(25, 25, 30)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xa855f7, 4, 120)
    pointLight2.position.set(-25, -20, 25)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0xf59e0b, 3, 100)
    pointLight3.position.set(0, 30, -25)
    scene.add(pointLight3)

    // Master Group for mouse parallax & scroll flight
    const worldGroup = new THREE.Group()
    scene.add(worldGroup)
    worldGroupRef.current = worldGroup

    // Helper: particle texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const ctx = canvas.getContext('2d')
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.95)')
      grad.addColorStop(0.55, 'rgba(168, 85, 247, 0.4)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 64, 64)
      return new THREE.CanvasTexture(canvas)
    }
    const particleTexture = createCircleTexture()

    // Common Colors
    const cCyan = new THREE.Color(0x38bdf8)
    const cIndigo = new THREE.Color(0x818cf8)
    const cViolet = new THREE.Color(0xc084fc)
    const cEmerald = new THREE.Color(0x34d399)
    const cAmber = new THREE.Color(0xfbbf24)
    const cPink = new THREE.Color(0xec4899)
    const cRose = new THREE.Color(0xf43f5e)

    // =========================================================================
    // 1. GALAXY
    // =========================================================================
    const galaxyGroup = new THREE.Group()
    const galaxyCount = 2800
    const galaxyGeo = new THREE.BufferGeometry()
    const galaxyPos = new Float32Array(galaxyCount * 3)
    const galaxyColors = new Float32Array(galaxyCount * 3)
    const galaxyOrigY = new Float32Array(galaxyCount)

    for (let i = 0; i < galaxyCount; i++) {
      const radius = Math.pow(Math.random(), 0.5) * 58 + 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const x = radius * Math.sin(phi) * Math.cos(theta) * 1.6
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.95
      const z = radius * Math.cos(phi) * 1.2 - 10

      galaxyPos[i * 3] = x
      galaxyPos[i * 3 + 1] = y
      galaxyPos[i * 3 + 2] = z
      galaxyOrigY[i] = y

      const rand = Math.random()
      const col = rand < 0.45 ? cCyan.clone().lerp(cIndigo, Math.random()) : cIndigo.clone().lerp(cViolet, Math.random())
      galaxyColors[i * 3] = col.r
      galaxyColors[i * 3 + 1] = col.g
      galaxyColors[i * 3 + 2] = col.b
    }

    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galaxyPos, 3))
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(galaxyColors, 3))
    const galaxyMat = new THREE.PointsMaterial({ size: 1.15, map: particleTexture, transparent: true, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false })
    const galaxyPoints = new THREE.Points(galaxyGeo, galaxyMat)
    galaxyGroup.add(galaxyPoints)

    const galaxyRing = new THREE.Mesh(new THREE.TorusGeometry(22, 0.25, 16, 100), new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.35 }))
    galaxyRing.rotation.x = Math.PI / 2.8
    galaxyGroup.add(galaxyRing)
    worldGroup.add(galaxyGroup)

    // =========================================================================
    // 2. CYBER CORE
    // =========================================================================
    const cyberGroup = new THREE.Group()
    const icoGeo = new THREE.IcosahedronGeometry(16, 1)
    const icoWire = new THREE.WireframeGeometry(icoGeo)
    const icoMesh = new THREE.LineSegments(icoWire, new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 1.5, transparent: true, opacity: 0.7 }))
    cyberGroup.add(icoMesh)
    cyberGroup.add(new THREE.Points(icoGeo, new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.9, map: particleTexture, transparent: true, blending: THREE.AdditiveBlending })))

    const innerOctaGeo = new THREE.OctahedronGeometry(9, 0)
    cyberGroup.add(new THREE.Mesh(innerOctaGeo, new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.2, metalness: 0.9, emissive: 0x4f46e5, emissiveIntensity: 0.6, transparent: true, opacity: 0.85 })))
    cyberGroup.add(new THREE.LineSegments(new THREE.WireframeGeometry(innerOctaGeo), new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.8 })))

    const gimbal1 = new THREE.Mesh(new THREE.RingGeometry(20, 20.3, 64), new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.45 }))
    cyberGroup.add(gimbal1)
    const gimbal2 = new THREE.Mesh(new THREE.RingGeometry(23, 23.3, 64), new THREE.MeshBasicMaterial({ color: 0xa855f7, side: THREE.DoubleSide, transparent: true, opacity: 0.4 }))
    gimbal2.rotation.x = Math.PI / 2
    cyberGroup.add(gimbal2)
    worldGroup.add(cyberGroup)

    // =========================================================================
    // 3. WAVES MATRIX
    // =========================================================================
    const waveGroup = new THREE.Group()
    const waveCols = 60
    const waveRows = 60
    const waveCount = waveCols * waveRows
    const waveGeo = new THREE.BufferGeometry()
    const wavePos = new Float32Array(waveCount * 3)
    const waveColors = new Float32Array(waveCount * 3)

    for (let iz = 0; iz < waveRows; iz++) {
      for (let ix = 0; ix < waveCols; ix++) {
        const idx = iz * waveCols + ix
        wavePos[idx * 3] = ix * 1.4 - (waveCols * 1.4) / 2
        wavePos[idx * 3 + 1] = 0
        wavePos[idx * 3 + 2] = iz * 1.4 - (waveRows * 1.4) / 2

        const dist = Math.sqrt(wavePos[idx * 3] ** 2 + wavePos[idx * 3 + 2] ** 2)
        const col = cCyan.clone().lerp(cEmerald, Math.min(dist / 42, 1))
        waveColors[idx * 3] = col.r
        waveColors[idx * 3 + 1] = col.g
        waveColors[idx * 3 + 2] = col.b
      }
    }

    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePos, 3))
    waveGeo.setAttribute('color', new THREE.BufferAttribute(waveColors, 3))
    const waveMat = new THREE.PointsMaterial({
      size: 0.95,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const wavePoints = new THREE.Points(waveGeo, waveMat)
    waveGroup.position.set(0, -10, -5)
    waveGroup.rotation.x = Math.PI / 3.8
    waveGroup.add(wavePoints)
    worldGroup.add(waveGroup)

    // =========================================================================
    // 4. VORTEX / BLACK HOLE
    // =========================================================================
    const vortexGroup = new THREE.Group()
    const vortexCount = 2400
    const vortexGeo = new THREE.BufferGeometry()
    const vortexPos = new Float32Array(vortexCount * 3)
    const vortexColors = new Float32Array(vortexCount * 3)
    const vortexData = []

    const cOrange = new THREE.Color(0xf97316)
    const cCrimson = new THREE.Color(0xef4444)

    for (let i = 0; i < vortexCount; i++) {
      const r = Math.pow(Math.random(), 0.65) * 36 + 4.5
      const angle = Math.random() * Math.PI * 2
      const speed = (0.9 / Math.sqrt(r)) * (0.8 + Math.random() * 0.4)
      const yOffset = (Math.random() - 0.5) * (r * 0.2)
      vortexData.push({ r, angle, speed, yOffset })

      vortexPos[i * 3] = Math.cos(angle) * r
      vortexPos[i * 3 + 1] = yOffset
      vortexPos[i * 3 + 2] = Math.sin(angle) * r

      const normR = (r - 4.5) / 36
      const col = normR < 0.25 ? cAmber.clone().lerp(cOrange, normR * 4) : cOrange.clone().lerp(cCrimson, (normR - 0.25) / 0.75)
      vortexColors[i * 3] = col.r
      vortexColors[i * 3 + 1] = col.g
      vortexColors[i * 3 + 2] = col.b
    }

    vortexGeo.setAttribute('position', new THREE.BufferAttribute(vortexPos, 3))
    vortexGeo.setAttribute('color', new THREE.BufferAttribute(vortexColors, 3))
    vortexGroup.add(new THREE.Points(vortexGeo, new THREE.PointsMaterial({ size: 1.1, map: particleTexture, transparent: true, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false })))
    vortexGroup.add(new THREE.Mesh(new THREE.SphereGeometry(4.2, 32, 32), new THREE.MeshBasicMaterial({ color: 0x000000 })))

    const photonRing = new THREE.Mesh(new THREE.RingGeometry(4.3, 4.7, 64), new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }))
    photonRing.rotation.x = Math.PI / 2.3
    vortexGroup.add(photonRing)
    vortexGroup.rotation.x = Math.PI / 3
    worldGroup.add(vortexGroup)

    // =========================================================================
    // 5. HYPERSPACE WARP
    // =========================================================================
    const hyperspaceGroup = new THREE.Group()
    const hyperCount = 1800
    const hyperGeo = new THREE.BufferGeometry()
    const hyperPos = new Float32Array(hyperCount * 3)
    const hyperColors = new Float32Array(hyperCount * 3)
    const hyperSpeed = new Float32Array(hyperCount)
    const cWhite = new THREE.Color(0xffffff)

    for (let i = 0; i < hyperCount; i++) {
      hyperPos[i * 3] = (Math.random() - 0.5) * 85
      hyperPos[i * 3 + 1] = (Math.random() - 0.5) * 55
      hyperPos[i * 3 + 2] = Math.random() * -140
      hyperSpeed[i] = Math.random() * 1.8 + 1.2

      const col = Math.random() < 0.6 ? cWhite : Math.random() < 0.85 ? cCyan : cAmber
      hyperColors[i * 3] = col.r
      hyperColors[i * 3 + 1] = col.g
      hyperColors[i * 3 + 2] = col.b
    }

    hyperGeo.setAttribute('position', new THREE.BufferAttribute(hyperPos, 3))
    hyperGeo.setAttribute('color', new THREE.BufferAttribute(hyperColors, 3))
    hyperspaceGroup.add(new THREE.Points(hyperGeo, new THREE.PointsMaterial({ size: 1.3, map: particleTexture, transparent: true, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false })))

    const warpRingGeo = new THREE.TorusGeometry(18, 0.15, 16, 64)
    const warpRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.35 })
    const warpRings = [
      new THREE.Mesh(warpRingGeo, warpRingMat),
      new THREE.Mesh(warpRingGeo, warpRingMat),
      new THREE.Mesh(warpRingGeo, warpRingMat),
    ]
    warpRings.forEach((r, idx) => {
      r.position.z = -idx * 40
      hyperspaceGroup.add(r)
    })
    worldGroup.add(hyperspaceGroup)

    // =========================================================================
    // 6. CYBER MATRIX / RAIN
    // =========================================================================
    const matrixGroup = new THREE.Group()
    const matrixCount = 2200
    const matrixGeo = new THREE.BufferGeometry()
    const matrixPos = new Float32Array(matrixCount * 3)
    const matrixColors = new Float32Array(matrixCount * 3)
    const matrixSpeeds = new Float32Array(matrixCount)
    const cNeonGreen = new THREE.Color(0x10b981)
    const cLime = new THREE.Color(0xa3e635)

    for (let i = 0; i < matrixCount; i++) {
      matrixPos[i * 3] = (Math.random() - 0.5) * 85
      matrixPos[i * 3 + 1] = (Math.random() - 0.5) * 70
      matrixPos[i * 3 + 2] = (Math.random() - 0.5) * 60
      matrixSpeeds[i] = Math.random() * 0.7 + 0.4

      const col = Math.random() < 0.7 ? cNeonGreen : cLime
      matrixColors[i * 3] = col.r
      matrixColors[i * 3 + 1] = col.g
      matrixColors[i * 3 + 2] = col.b
    }

    matrixGeo.setAttribute('position', new THREE.BufferAttribute(matrixPos, 3))
    matrixGeo.setAttribute('color', new THREE.BufferAttribute(matrixColors, 3))
    matrixGroup.add(new THREE.Points(matrixGeo, new THREE.PointsMaterial({ size: 1.0, map: particleTexture, transparent: true, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false })))

    const cubeOuterWire = new THREE.WireframeGeometry(new THREE.BoxGeometry(14, 14, 14))
    const cubeOuterMesh = new THREE.LineSegments(cubeOuterWire, new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.65 }))
    matrixGroup.add(cubeOuterMesh)

    const cubeInnerWire = new THREE.WireframeGeometry(new THREE.BoxGeometry(7, 7, 7))
    const cubeInnerMesh = new THREE.LineSegments(cubeInnerWire, new THREE.LineBasicMaterial({ color: 0xa3e635, transparent: true, opacity: 0.85 }))
    matrixGroup.add(cubeInnerMesh)
    worldGroup.add(matrixGroup)

    // =========================================================================
    // 7. QUANTUM DNA (Double Helix & Electron Orbitals)
    // =========================================================================
    const quantumGroup = new THREE.Group()
    const dnaSegments = 140
    const dnaRadius = 9
    const dnaHeight = 56
    const dnaPositions = new Float32Array(dnaSegments * 2 * 3)
    const dnaColors = new Float32Array(dnaSegments * 2 * 3)

    // Rung lines between strands
    const rungsPos = []
    for (let i = 0; i < dnaSegments; i++) {
      const theta = i * 0.14
      const y = (i / dnaSegments - 0.5) * dnaHeight

      // Strand 1
      const x1 = Math.cos(theta) * dnaRadius
      const z1 = Math.sin(theta) * dnaRadius
      dnaPositions[i * 6] = x1
      dnaPositions[i * 6 + 1] = y
      dnaPositions[i * 6 + 2] = z1
      dnaColors[i * 6] = cRose.r
      dnaColors[i * 6 + 1] = cRose.g
      dnaColors[i * 6 + 2] = cRose.b

      // Strand 2
      const x2 = Math.cos(theta + Math.PI) * dnaRadius
      const z2 = Math.sin(theta + Math.PI) * dnaRadius
      dnaPositions[i * 6 + 3] = x2
      dnaPositions[i * 6 + 4] = y
      dnaPositions[i * 6 + 5] = z2
      dnaColors[i * 6 + 3] = cViolet.r
      dnaColors[i * 6 + 4] = cViolet.g
      dnaColors[i * 6 + 5] = cViolet.b

      // Connecting rungs every 4 steps
      if (i % 3 === 0) {
        rungsPos.push(x1, y, z1, x2, y, z2)
      }
    }

    const dnaGeo = new THREE.BufferGeometry()
    dnaGeo.setAttribute('position', new THREE.BufferAttribute(dnaPositions, 3))
    dnaGeo.setAttribute('color', new THREE.BufferAttribute(dnaColors, 3))
    const dnaPoints = new THREE.Points(dnaGeo, new THREE.PointsMaterial({ size: 1.25, map: particleTexture, transparent: true, vertexColors: true, blending: THREE.AdditiveBlending }))
    quantumGroup.add(dnaPoints)

    const rungsGeo = new THREE.BufferGeometry()
    rungsGeo.setAttribute('position', new THREE.Float32BufferAttribute(rungsPos, 3))
    const rungsMesh = new THREE.LineSegments(rungsGeo, new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.45 }))
    quantumGroup.add(rungsMesh)

    // Orbital electron rings
    const qRing1 = new THREE.Mesh(new THREE.TorusGeometry(18, 0.2, 16, 64), new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true, transparent: true, opacity: 0.4 }))
    const qRing2 = new THREE.Mesh(new THREE.TorusGeometry(21, 0.2, 16, 64), new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.4 }))
    qRing2.rotation.x = Math.PI / 2.5
    quantumGroup.add(qRing1)
    quantumGroup.add(qRing2)
    worldGroup.add(quantumGroup)

    // =========================================================================
    // 8. CRYSTALS (Floating Polyhedral Prism Field)
    // =========================================================================
    const crystalGroup = new THREE.Group()
    const crystalObjects = []
    const crystalGeos = [
      new THREE.OctahedronGeometry(3.5, 0),
      new THREE.IcosahedronGeometry(3.2, 0),
      new THREE.DodecahedronGeometry(3, 0),
      new THREE.TetrahedronGeometry(3.8, 0),
    ]

    for (let i = 0; i < 14; i++) {
      const geo = crystalGeos[i % crystalGeos.length]
      const gemMat = new THREE.MeshStandardMaterial({
        color: 0x1e1b4b,
        metalness: 0.85,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
      })
      const gemMesh = new THREE.Mesh(geo, gemMat)
      const wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(geo),
        new THREE.LineBasicMaterial({
          color: i % 3 === 0 ? 0xf43f5e : i % 3 === 1 ? 0xc084fc : 0x38bdf8,
          transparent: true,
          opacity: 0.75,
        })
      )
      gemMesh.add(wire)

      const baseX = (Math.random() - 0.5) * 70
      const baseY = (Math.random() - 0.5) * 45
      const baseZ = (Math.random() - 0.5) * 40 - 5
      gemMesh.position.set(baseX, baseY, baseZ)

      gemMesh.userData = {
        baseY,
        speed: Math.random() * 0.8 + 0.5,
        offset: Math.random() * Math.PI * 2,
        rotX: (Math.random() - 0.5) * 0.02,
        rotY: (Math.random() - 0.5) * 0.02,
      }

      crystalGroup.add(gemMesh)
      crystalObjects.push(gemMesh)
    }
    worldGroup.add(crystalGroup)

    // =========================================================================
    // 9. NEON CYBER TUNNEL
    // =========================================================================
    const tunnelGroup = new THREE.Group()
    const tunnelRings = []
    const tunnelRingCount = 22
    for (let i = 0; i < tunnelRingCount; i++) {
      const ringGeo = new THREE.RingGeometry(13, 13.8, 6)
      const ringColor = i % 3 === 0 ? cCyan : i % 3 === 1 ? cViolet : cPink
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColor,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      })
      const ringMesh = new THREE.Mesh(ringGeo, ringMat)
      ringMesh.position.set(0, 0, 20 - i * 6.5)
      tunnelGroup.add(ringMesh)
      tunnelRings.push(ringMesh)
    }

    const streakCount = 800
    const streakGeo = new THREE.BufferGeometry()
    const streakPos = new Float32Array(streakCount * 3)
    const streakSpeed = new Float32Array(streakCount)
    for (let i = 0; i < streakCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const rad = 11 + Math.random() * 5
      streakPos[i * 3] = Math.cos(angle) * rad
      streakPos[i * 3 + 1] = Math.sin(angle) * rad
      streakPos[i * 3 + 2] = (Math.random() - 0.5) * 140
      streakSpeed[i] = Math.random() * 1.5 + 1.2
    }
    streakGeo.setAttribute('position', new THREE.BufferAttribute(streakPos, 3))
    const streakPoints = new THREE.Points(
      streakGeo,
      new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.95,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })
    )
    tunnelGroup.add(streakPoints)
    worldGroup.add(tunnelGroup)

    // =========================================================================
    // 10. HOLOGRAM GLOBE (Digital Earth & Satellites)
    // =========================================================================
    const globeGroup = new THREE.Group()
    const globeCount = 1400
    const globeGeo = new THREE.BufferGeometry()
    const globePos = new Float32Array(globeCount * 3)
    const globeColors = new Float32Array(globeCount * 3)
    const globeRadius = 18

    for (let i = 0; i < globeCount; i++) {
      const y = 1 - (i / (globeCount - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = i * 2.3999632

      const x = Math.cos(theta) * radiusAtY * globeRadius
      const z = Math.sin(theta) * radiusAtY * globeRadius
      globePos[i * 3] = x
      globePos[i * 3 + 1] = y * globeRadius
      globePos[i * 3 + 2] = z

      const col = Math.abs(y) < 0.25 ? cCyan : Math.abs(y) < 0.65 ? cIndigo : cViolet
      globeColors[i * 3] = col.r
      globeColors[i * 3 + 1] = col.g
      globeColors[i * 3 + 2] = col.b
    }
    globeGeo.setAttribute('position', new THREE.BufferAttribute(globePos, 3))
    globeGeo.setAttribute('color', new THREE.BufferAttribute(globeColors, 3))
    const globePoints = new THREE.Points(
      globeGeo,
      new THREE.PointsMaterial({
        size: 1.15,
        map: particleTexture,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      })
    )
    globeGroup.add(globePoints)

    const eqRing = new THREE.Mesh(
      new THREE.TorusGeometry(18.2, 0.15, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 })
    )
    eqRing.rotation.x = Math.PI / 2
    globeGroup.add(eqRing)

    const meridianRing = new THREE.Mesh(
      new THREE.TorusGeometry(18.2, 0.15, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.35 })
    )
    globeGroup.add(meridianRing)

    const satellites = []
    for (let s = 0; s < 3; s++) {
      const satMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.2, 1.2),
        new THREE.MeshBasicMaterial({ color: s === 0 ? 0x34d399 : s === 1 ? 0xfbbf24 : 0xf43f5e })
      )
      globeGroup.add(satMesh)
      satellites.push({
        mesh: satMesh,
        dist: 22 + s * 3.5,
        speed: 0.6 + s * 0.25,
        inclination: (s * Math.PI) / 3,
      })
    }
    worldGroup.add(globeGroup)

    // =========================================================================
    // 11. STELLAR SUPERNOVA (Radial Shockwave & Starburst)
    // =========================================================================
    const supernovaGroup = new THREE.Group()
    const novaCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(4.5, 2),
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xfbbf24,
        emissiveIntensity: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      })
    )
    supernovaGroup.add(novaCore)

    const novaRings = []
    for (let r = 0; r < 4; r++) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(8, 9, 48),
        new THREE.MeshBasicMaterial({
          color: r % 2 === 0 ? 0xf97316 : 0xfbbf24,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.65,
        })
      )
      ring.rotation.x = Math.PI / 3.5
      ring.rotation.y = (r * Math.PI) / 4
      supernovaGroup.add(ring)
      novaRings.push(ring)
    }

    const blastCount = 1800
    const blastGeo = new THREE.BufferGeometry()
    const blastPos = new Float32Array(blastCount * 3)
    const blastVel = []
    for (let i = 0; i < blastCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      )
      const dist = Math.random() * 40 + 2
      blastPos[i * 3] = dir.x * dist
      blastPos[i * 3 + 1] = dir.y * dist
      blastPos[i * 3 + 2] = dir.z * dist
      blastVel.push({ dir, speed: Math.random() * 0.5 + 0.3, maxDist: Math.random() * 30 + 35 })
    }
    blastGeo.setAttribute('position', new THREE.BufferAttribute(blastPos, 3))
    const blastPoints = new THREE.Points(
      blastGeo,
      new THREE.PointsMaterial({
        color: 0xfbbf24,
        size: 1.1,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })
    )
    supernovaGroup.add(blastPoints)
    worldGroup.add(supernovaGroup)

    // =========================================================================
    // 12. NEON MOBIUS (Infinite Torus Knot)
    // =========================================================================
    const torusGroup = new THREE.Group()
    const tkGeo = new THREE.TorusKnotGeometry(12, 2.5, 120, 24, 2, 3)
    const tkMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 0.8,
    })
    const tkMesh = new THREE.Mesh(tkGeo, tkMat)
    const tkWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(tkGeo),
      new THREE.LineBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.7 })
    )
    tkMesh.add(tkWire)
    torusGroup.add(tkMesh)

    const tkSparkCount = 700
    const tkSparkGeo = new THREE.BufferGeometry()
    const tkSparkPos = new Float32Array(tkSparkCount * 3)
    for (let i = 0; i < tkSparkCount; i++) {
      const u = (i / tkSparkCount) * Math.PI * 2 * 3
      const p = 2, q = 3, r = 12
      const x = (r + 3.2 * Math.cos(q * u)) * Math.cos(p * u) + (Math.random() - 0.5) * 3
      const y = (r + 3.2 * Math.cos(q * u)) * Math.sin(p * u) + (Math.random() - 0.5) * 3
      const z = 3.2 * Math.sin(q * u) + (Math.random() - 0.5) * 3
      tkSparkPos[i * 3] = x
      tkSparkPos[i * 3 + 1] = y
      tkSparkPos[i * 3 + 2] = z
    }
    tkSparkGeo.setAttribute('position', new THREE.BufferAttribute(tkSparkPos, 3))
    const tkSparks = new THREE.Points(
      tkSparkGeo,
      new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 1.0,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })
    )
    torusGroup.add(tkSparks)
    worldGroup.add(torusGroup)

    // =========================================================================
    // 13. CYBER SKYLINE (Digital Monoliths & Beacons)
    // =========================================================================
    const monolithGroup = new THREE.Group()
    const monolithList = []
    const monoSpacing = 13

    for (let gx = -2; gx <= 2; gx++) {
      for (let gz = -2; gz <= 2; gz++) {
        const height = Math.random() * 26 + 12
        const mGeo = new THREE.BoxGeometry(4, height, 4)
        const mMesh = new THREE.Mesh(
          mGeo,
          new THREE.MeshStandardMaterial({
            color: 0x0f172a,
            roughness: 0.4,
            metalness: 0.8,
            transparent: true,
            opacity: 0.85,
          })
        )
        const mWire = new THREE.LineSegments(
          new THREE.WireframeGeometry(mGeo),
          new THREE.LineBasicMaterial({
            color: (gx + gz) % 2 === 0 ? 0x8b5cf6 : 0x38bdf8,
            transparent: true,
            opacity: 0.65,
          })
        )
        mMesh.add(mWire)

        const beacon = new THREE.Mesh(
          new THREE.SphereGeometry(0.7, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0x34d399 })
        )
        beacon.position.y = height / 2 + 0.8
        mMesh.add(beacon)

        const posX = gx * monoSpacing + (Math.random() - 0.5) * 3
        const posZ = gz * monoSpacing + (Math.random() - 0.5) * 3 - 8
        const baseY = -14 + height / 2
        mMesh.position.set(posX, baseY, posZ)
        monolithGroup.add(mMesh)
        monolithList.push({ mesh: mMesh, baseY, speed: Math.random() * 0.5 + 0.5 })
      }
    }

    const streamCount = 500
    const streamGeo = new THREE.BufferGeometry()
    const streamPos = new Float32Array(streamCount * 3)
    const streamSpeed = new Float32Array(streamCount)
    for (let i = 0; i < streamCount; i++) {
      streamPos[i * 3] = (Math.random() - 0.5) * 65
      streamPos[i * 3 + 1] = (Math.random() - 0.5) * 45
      streamPos[i * 3 + 2] = (Math.random() - 0.5) * 65 - 8
      streamSpeed[i] = Math.random() * 0.6 + 0.3
    }
    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPos, 3))
    const streamPoints = new THREE.Points(
      streamGeo,
      new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.9,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })
    )
    monolithGroup.add(streamPoints)
    worldGroup.add(monolithGroup)

    // =========================================================================
    // 14. CELESTIAL RINGS (Keplerian Particle Disc & Planet)
    // =========================================================================
    const saturnGroup = new THREE.Group()
    saturnGroup.rotation.x = 0.42
    saturnGroup.rotation.z = -0.22

    const planetMesh = new THREE.Mesh(
      new THREE.SphereGeometry(9, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.5,
        roughness: 0.5,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      })
    )
    saturnGroup.add(planetMesh)

    const ringParticleCount = 2200
    const ringGeo = new THREE.BufferGeometry()
    const ringPos = new Float32Array(ringParticleCount * 3)
    const ringColors = new Float32Array(ringParticleCount * 3)
    const ringData = []

    for (let i = 0; i < ringParticleCount; i++) {
      let rad = 13 + Math.random() * 19
      if (rad > 21.5 && rad < 23) {
        rad += 2
      }
      const angle = Math.random() * Math.PI * 2
      const x = Math.cos(angle) * rad
      const z = Math.sin(angle) * rad
      const y = (Math.random() - 0.5) * 0.6

      ringPos[i * 3] = x
      ringPos[i * 3 + 1] = y
      ringPos[i * 3 + 2] = z

      const col = rad < 21.5 ? cAmber : cCyan
      ringColors[i * 3] = col.r
      ringColors[i * 3 + 1] = col.g
      ringColors[i * 3 + 2] = col.b

      ringData.push({ rad, angle, speed: (1 / Math.sqrt(rad)) * 0.45 })
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3))
    ringGeo.setAttribute('color', new THREE.BufferAttribute(ringColors, 3))
    const ringPoints = new THREE.Points(
      ringGeo,
      new THREE.PointsMaterial({
        size: 0.88,
        map: particleTexture,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      })
    )
    saturnGroup.add(ringPoints)
    worldGroup.add(saturnGroup)

    // =========================================================================
    // 15. DEEP SEA GLOW (Bioluminescent Spores & Jellyfish)
    // =========================================================================
    const biolumGroup = new THREE.Group()
    const medusaList = []
    for (let j = 0; j < 4; j++) {
      const mDomeGeo = new THREE.SphereGeometry(4.5, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5)
      const mDome = new THREE.Mesh(
        mDomeGeo,
        new THREE.MeshBasicMaterial({
          color: j % 2 === 0 ? 0x34d399 : 0x06b6d4,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        })
      )
      const jGroup = new THREE.Group()
      jGroup.add(mDome)

      for (let t = 0; t < 6; t++) {
        const tentAngle = (t / 6) * Math.PI * 2
        const tentPoints = []
        for (let p = 0; p < 7; p++) {
          tentPoints.push(
            new THREE.Vector3(
              Math.cos(tentAngle) * 3.8 + Math.sin(p * 0.8) * 0.6,
              -p * 2.2,
              Math.sin(tentAngle) * 3.8 + Math.cos(p * 0.8) * 0.6
            )
          )
        }
        const tentGeo = new THREE.BufferGeometry().setFromPoints(tentPoints)
        const tentLine = new THREE.Line(
          tentGeo,
          new THREE.LineBasicMaterial({
            color: j % 2 === 0 ? 0x10b981 : 0x22d3ee,
            transparent: true,
            opacity: 0.45,
          })
        )
        jGroup.add(tentLine)
      }

      const baseX = (j - 1.5) * 22 + (Math.random() - 0.5) * 6
      const baseY = (Math.random() - 0.5) * 16
      const baseZ = (Math.random() - 0.5) * 24
      jGroup.position.set(baseX, baseY, baseZ)
      biolumGroup.add(jGroup)
      medusaList.push({ group: jGroup, baseX, baseY, speed: 0.5 + j * 0.2, phase: j * 1.5 })
    }

    const sporeCount = 900
    const sporeGeo = new THREE.BufferGeometry()
    const sporePos = new Float32Array(sporeCount * 3)
    const sporeColors = new Float32Array(sporeCount * 3)
    for (let i = 0; i < sporeCount; i++) {
      sporePos[i * 3] = (Math.random() - 0.5) * 75
      sporePos[i * 3 + 1] = (Math.random() - 0.5) * 55
      sporePos[i * 3 + 2] = (Math.random() - 0.5) * 45

      const col = Math.random() > 0.5 ? cEmerald : cCyan
      sporeColors[i * 3] = col.r
      sporeColors[i * 3 + 1] = col.g
      sporeColors[i * 3 + 2] = col.b
    }
    sporeGeo.setAttribute('position', new THREE.BufferAttribute(sporePos, 3))
    sporeGeo.setAttribute('color', new THREE.BufferAttribute(sporeColors, 3))
    const sporePoints = new THREE.Points(
      sporeGeo,
      new THREE.PointsMaterial({
        size: 1.15,
        map: particleTexture,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
      })
    )
    biolumGroup.add(sporePoints)
    worldGroup.add(biolumGroup)

    // =========================================================================
    // 16. NEURAL SYNAPSE (AI Plexus Graph)
    // =========================================================================
    const neuralGroup = new THREE.Group()
    const nodeCount = 65
    const nodePositions = []
    const nodeVelocities = []
    const nodeGeo = new THREE.BufferGeometry()
    const nodePosArray = new Float32Array(nodeCount * 3)

    for (let i = 0; i < nodeCount; i++) {
      const p = new THREE.Vector3(
        (Math.random() - 0.5) * 46,
        (Math.random() - 0.5) * 34,
        (Math.random() - 0.5) * 34
      )
      nodePositions.push(p)
      nodeVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08
        )
      )
      nodePosArray[i * 3] = p.x
      nodePosArray[i * 3 + 1] = p.y
      nodePosArray[i * 3 + 2] = p.z
    }
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePosArray, 3))
    const nodePoints = new THREE.Points(
      nodeGeo,
      new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 1.4,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })
    )
    neuralGroup.add(nodePoints)

    const maxConnections = 240
    const linesPosArray = new Float32Array(maxConnections * 2 * 3)
    const linesGeo = new THREE.BufferGeometry()
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linesPosArray, 3))
    const linesMesh = new THREE.LineSegments(
      linesGeo,
      new THREE.LineBasicMaterial({
        color: 0x818cf8,
        transparent: true,
        opacity: 0.45,
      })
    )
    neuralGroup.add(linesMesh)
    worldGroup.add(neuralGroup)

    // =========================================================================
    // 17. SACRED GEOMETRY (Harmonic Platonic Solids)
    // =========================================================================
    const kaleidoGroup = new THREE.Group()
    const kIcoGeo = new THREE.IcosahedronGeometry(17, 0)
    const kIco = new THREE.LineSegments(
      new THREE.WireframeGeometry(kIcoGeo),
      new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.65 })
    )
    kaleidoGroup.add(kIco)

    const kDodecGeo = new THREE.DodecahedronGeometry(12, 0)
    const kDodec = new THREE.LineSegments(
      new THREE.WireframeGeometry(kDodecGeo),
      new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 })
    )
    kaleidoGroup.add(kDodec)

    const kOctaGeo = new THREE.OctahedronGeometry(7.5, 0)
    const kOcta = new THREE.LineSegments(
      new THREE.WireframeGeometry(kOctaGeo),
      new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.75 })
    )
    kaleidoGroup.add(kOcta)

    const kTetraGeo = new THREE.TetrahedronGeometry(4, 0)
    const kTetra = new THREE.LineSegments(
      new THREE.WireframeGeometry(kTetraGeo),
      new THREE.LineBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.85 })
    )
    kaleidoGroup.add(kTetra)

    const kRing = new THREE.Mesh(
      new THREE.RingGeometry(21, 21.4, 64),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.35 })
    )
    kaleidoGroup.add(kRing)
    worldGroup.add(kaleidoGroup)

    // =========================================================================
    // 18. PLASMA FORCEFIELD
    // =========================================================================
    const shieldGroup = new THREE.Group()
    const shieldGeo = new THREE.IcosahedronGeometry(20, 2)
    const shieldOrigPos = shieldGeo.attributes.position.clone()
    const shieldMesh = new THREE.Mesh(
      shieldGeo,
      new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      })
    )
    shieldGroup.add(shieldMesh)

    const plasmaOrb = new THREE.Mesh(
      new THREE.SphereGeometry(6, 24, 24),
      new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.8,
        transparent: true,
        opacity: 0.8,
      })
    )
    shieldGroup.add(plasmaOrb)

    const sRing1 = new THREE.Mesh(
      new THREE.TorusGeometry(20.4, 0.2, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55 })
    )
    const sRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(20.4, 0.2, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.55 })
    )
    sRing2.rotation.x = Math.PI / 2
    const sRing3 = new THREE.Mesh(
      new THREE.TorusGeometry(20.4, 0.2, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.55 })
    )
    sRing3.rotation.y = Math.PI / 2
    shieldGroup.add(sRing1)
    shieldGroup.add(sRing2)
    shieldGroup.add(sRing3)

    const arcCount = 650
    const arcGeo = new THREE.BufferGeometry()
    const arcPos = new Float32Array(arcCount * 3)
    for (let i = 0; i < arcCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = 20.2 + (Math.random() - 0.5) * 1.5
      arcPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r
      arcPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r
      arcPos[i * 3 + 2] = Math.cos(phi) * r
    }
    arcGeo.setAttribute('position', new THREE.BufferAttribute(arcPos, 3))
    const arcPoints = new THREE.Points(
      arcGeo,
      new THREE.PointsMaterial({
        color: 0x67e8f9,
        size: 0.95,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
      })
    )
    shieldGroup.add(arcPoints)
    worldGroup.add(shieldGroup)

    // =========================================================================
    // VISIBILITY MANAGER FOR ALL 18 THEMES
    // =========================================================================
    const updateVisibility = (currentMode) => {
      galaxyGroup.visible = currentMode === 'galaxy'
      cyberGroup.visible = currentMode === 'cyber'
      waveGroup.visible = currentMode === 'waves'
      vortexGroup.visible = currentMode === 'vortex'
      hyperspaceGroup.visible = currentMode === 'hyperspace'
      matrixGroup.visible = currentMode === 'matrix'
      quantumGroup.visible = currentMode === 'quantum'
      crystalGroup.visible = currentMode === 'crystals'
      // 10 New Themes
      tunnelGroup.visible = currentMode === 'tunnel'
      globeGroup.visible = currentMode === 'globe'
      supernovaGroup.visible = currentMode === 'supernova'
      torusGroup.visible = currentMode === 'torus'
      monolithGroup.visible = currentMode === 'monoliths'
      saturnGroup.visible = currentMode === 'saturn'
      biolumGroup.visible = currentMode === 'biolum'
      neuralGroup.visible = currentMode === 'neural'
      kaleidoGroup.visible = currentMode === 'kaleidoscope'
      shieldGroup.visible = currentMode === 'shield'
    }

    updateVisibility(mode)

    // =========================================================================
    // INTERACTION & ANIMATION LOOP
    // =========================================================================
    let targetMouseX = 0
    let targetMouseY = 0
    let mouseX = 0
    let mouseY = 0
    let scrollY = window.scrollY
    let targetScrollY = window.scrollY

    const onMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2.5
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2.5
    }

    const onScroll = () => {
      targetScrollY = window.scrollY
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05
      scrollY += (targetScrollY - scrollY) * 0.06

      // Scroll depth flight
      camera.position.y = -scrollY * 0.012 + mouseY * 1.5
      camera.position.x = mouseX * 2.5
      camera.position.z = 42 + Math.sin((scrollY / 1800) * Math.PI) * 6

      // Master World Parallax
      worldGroup.rotation.y = elapsed * 0.04 + mouseX * 0.35
      worldGroup.rotation.x = mouseY * 0.25

      // 1. Galaxy
      if (galaxyGroup.visible) {
        galaxyPoints.rotation.y = elapsed * 0.05
        galaxyRing.rotation.z = elapsed * 0.08
        const pos = galaxyGeo.attributes.position.array
        for (let i = 0; i < galaxyCount; i++) {
          pos[i * 3 + 1] = galaxyOrigY[i] + Math.sin(elapsed * 1.2 + pos[i * 3] * 0.08) * 0.9
        }
        galaxyGeo.attributes.position.needsUpdate = true
      }

      // 2. Cyber Core
      if (cyberGroup.visible) {
        icoMesh.rotation.x = elapsed * 0.28
        icoMesh.rotation.y = elapsed * 0.38
        gimbal1.rotation.z = elapsed * 0.35
        gimbal2.rotation.y = -elapsed * 0.3
      }

      // 3. Waves Grid
      if (waveGroup.visible) {
        const pos = waveGeo.attributes.position.array
        for (let iz = 0; iz < waveRows; iz++) {
          for (let ix = 0; ix < waveCols; ix++) {
            const idx = (iz * waveCols + ix) * 3
            pos[idx + 1] = Math.sin(ix * 0.25 + elapsed * 1.8) * 2.2 + Math.cos(iz * 0.25 + elapsed * 1.4) * 2.2
          }
        }
        waveGeo.attributes.position.needsUpdate = true
      }

      // 4. Vortex / Black Hole
      if (vortexGroup.visible) {
        const pos = vortexGeo.attributes.position.array
        for (let i = 0; i < vortexCount; i++) {
          const item = vortexData[i]
          item.angle += item.speed * 0.03
          pos[i * 3] = Math.cos(item.angle) * item.r
          pos[i * 3 + 1] = item.yOffset + Math.sin(elapsed * 2 + item.r) * 0.4
          pos[i * 3 + 2] = Math.sin(item.angle) * item.r
        }
        vortexGeo.attributes.position.needsUpdate = true
        photonRing.rotation.z = elapsed * 0.6
      }

      // 5. Hyperspace Warp
      if (hyperspaceGroup.visible) {
        const pos = hyperGeo.attributes.position.array
        for (let i = 0; i < hyperCount; i++) {
          pos[i * 3 + 2] += hyperSpeed[i]
          if (pos[i * 3 + 2] > 40) {
            pos[i * 3 + 2] = -140
            pos[i * 3] = (Math.random() - 0.5) * 85
            pos[i * 3 + 1] = (Math.random() - 0.5) * 55
          }
        }
        hyperGeo.attributes.position.needsUpdate = true
        warpRings.forEach((r) => {
          r.position.z += 0.8
          if (r.position.z > 40) r.position.z = -80
          r.rotation.z = elapsed * 0.5
        })
      }

      // 6. Cyber Rain
      if (matrixGroup.visible) {
        const pos = matrixGeo.attributes.position.array
        for (let i = 0; i < matrixCount; i++) {
          pos[i * 3 + 1] -= matrixSpeeds[i]
          if (pos[i * 3 + 1] < -35) {
            pos[i * 3 + 1] = 35
            pos[i * 3] = (Math.random() - 0.5) * 85
          }
        }
        matrixGeo.attributes.position.needsUpdate = true
        cubeOuterMesh.rotation.x = elapsed * 0.4
        cubeOuterMesh.rotation.y = elapsed * 0.5
      }

      // 7. Quantum DNA
      if (quantumGroup.visible) {
        quantumGroup.rotation.y = elapsed * 0.45
        qRing1.rotation.x = elapsed * 0.6
        qRing1.rotation.y = elapsed * 0.4
        qRing2.rotation.z = -elapsed * 0.5
      }

      // 8. Crystals Field
      if (crystalGroup.visible) {
        crystalObjects.forEach((gem) => {
          gem.position.y = gem.userData.baseY + Math.sin(elapsed * gem.userData.speed + gem.userData.offset) * 2.4
          gem.rotation.x += gem.userData.rotX
          gem.rotation.y += gem.userData.rotY
        })
      }

      // 9. Cyber Tunnel
      if (tunnelGroup.visible) {
        tunnelRings.forEach((ring, idx) => {
          ring.rotation.z = elapsed * 0.18 + idx * 0.12
          ring.position.z += 0.55
          if (ring.position.z > 25) {
            ring.position.z = 20 - (tunnelRingCount - 1) * 6.5
          }
        })
        const pos = streakGeo.attributes.position.array
        for (let i = 0; i < streakCount; i++) {
          pos[i * 3 + 2] += streakSpeed[i]
          if (pos[i * 3 + 2] > 35) {
            pos[i * 3 + 2] = -110
          }
        }
        streakGeo.attributes.position.needsUpdate = true
      }

      // 10. Hologram Globe
      if (globeGroup.visible) {
        globePoints.rotation.y = elapsed * 0.15
        eqRing.rotation.z = elapsed * 0.1
        meridianRing.rotation.y = elapsed * 0.12
        satellites.forEach((sat, i) => {
          const angle = elapsed * sat.speed + i * 2.1
          sat.mesh.position.x = Math.cos(angle) * sat.dist
          sat.mesh.position.y = Math.sin(angle) * Math.sin(sat.inclination) * sat.dist
          sat.mesh.position.z = Math.sin(angle) * Math.cos(sat.inclination) * sat.dist
          sat.mesh.rotation.x += 0.03
          sat.mesh.rotation.y += 0.04
        })
      }

      // 11. Stellar Supernova
      if (supernovaGroup.visible) {
        const coreScale = 1 + Math.sin(elapsed * 4) * 0.18
        novaCore.scale.set(coreScale, coreScale, coreScale)
        novaCore.rotation.y = elapsed * 0.4
        novaCore.rotation.z = elapsed * 0.3

        novaRings.forEach((ring, idx) => {
          const ringScale = ((elapsed * 0.8 + idx * 0.4) % 1.6) + 0.3
          ring.scale.set(ringScale * 2.2, ringScale * 2.2, 1)
          ring.material.opacity = Math.max(0, 0.7 - ringScale * 0.4)
        })

        const pos = blastGeo.attributes.position.array
        for (let i = 0; i < blastCount; i++) {
          const v = blastVel[i]
          pos[i * 3] += v.dir.x * v.speed
          pos[i * 3 + 1] += v.dir.y * v.speed
          pos[i * 3 + 2] += v.dir.z * v.speed
          const curDist = Math.sqrt(pos[i * 3] ** 2 + pos[i * 3 + 1] ** 2 + pos[i * 3 + 2] ** 2)
          if (curDist > v.maxDist) {
            pos[i * 3] = v.dir.x * 3
            pos[i * 3 + 1] = v.dir.y * 3
            pos[i * 3 + 2] = v.dir.z * 3
          }
        }
        blastGeo.attributes.position.needsUpdate = true
      }

      // 12. Neon Mobius
      if (torusGroup.visible) {
        tkMesh.rotation.x = elapsed * 0.28
        tkMesh.rotation.y = elapsed * 0.38
        tkSparks.rotation.x = -elapsed * 0.2
        tkSparks.rotation.y = -elapsed * 0.3
      }

      // 13. Cyber Skyline
      if (monolithGroup.visible) {
        monolithList.forEach((mono, idx) => {
          mono.mesh.position.y = mono.baseY + Math.sin(elapsed * mono.speed + idx) * 0.8
        })
        const pos = streamGeo.attributes.position.array
        for (let i = 0; i < streamCount; i++) {
          pos[i * 3 + 1] += streamSpeed[i]
          if (pos[i * 3 + 1] > 26) {
            pos[i * 3 + 1] = -22
          }
        }
        streamGeo.attributes.position.needsUpdate = true
      }

      // 14. Celestial Rings
      if (saturnGroup.visible) {
        planetMesh.rotation.y = elapsed * 0.08
        const pos = ringGeo.attributes.position.array
        for (let i = 0; i < ringParticleCount; i++) {
          const item = ringData[i]
          item.angle += item.speed * 0.03
          pos[i * 3] = Math.cos(item.angle) * item.rad
          pos[i * 3 + 2] = Math.sin(item.angle) * item.rad
        }
        ringGeo.attributes.position.needsUpdate = true
      }

      // 15. Deep Sea Glow
      if (biolumGroup.visible) {
        medusaList.forEach((item) => {
          const pulse = 1 + Math.sin(elapsed * 2.2 + item.phase) * 0.15
          item.group.scale.set(pulse, 1 / pulse, pulse)
          item.group.position.y = item.baseY + Math.sin(elapsed * item.speed + item.phase) * 4.5
          item.group.rotation.y = elapsed * 0.2
        })
        const pos = sporeGeo.attributes.position.array
        for (let i = 0; i < sporeCount; i++) {
          pos[i * 3 + 1] += Math.sin(elapsed * 0.8 + i) * 0.04
          pos[i * 3] += Math.cos(elapsed * 0.6 + i) * 0.03
        }
        sporeGeo.attributes.position.needsUpdate = true
      }

      // 16. Neural Synapse
      if (neuralGroup.visible) {
        const nPos = nodeGeo.attributes.position.array
        for (let i = 0; i < nodeCount; i++) {
          const p = nodePositions[i]
          const v = nodeVelocities[i]
          p.add(v)
          if (Math.abs(p.x) > 23) v.x *= -1
          if (Math.abs(p.y) > 17) v.y *= -1
          if (Math.abs(p.z) > 17) v.z *= -1
          nPos[i * 3] = p.x
          nPos[i * 3 + 1] = p.y
          nPos[i * 3 + 2] = p.z
        }
        nodeGeo.attributes.position.needsUpdate = true

        const lPos = linesGeo.attributes.position.array
        let lineIdx = 0
        const threshold = 11.5
        for (let i = 0; i < nodeCount; i++) {
          for (let j = i + 1; j < nodeCount; j++) {
            if (lineIdx >= maxConnections * 6) break
            const p1 = nodePositions[i]
            const p2 = nodePositions[j]
            const dist = p1.distanceTo(p2)
            if (dist < threshold) {
              lPos[lineIdx++] = p1.x
              lPos[lineIdx++] = p1.y
              lPos[lineIdx++] = p1.z
              lPos[lineIdx++] = p2.x
              lPos[lineIdx++] = p2.y
              lPos[lineIdx++] = p2.z
            }
          }
        }
        for (let k = lineIdx; k < maxConnections * 6; k++) {
          lPos[k] = 0
        }
        linesGeo.attributes.position.needsUpdate = true
        neuralGroup.rotation.y = elapsed * 0.06
      }

      // 17. Sacred Geometry
      if (kaleidoGroup.visible) {
        kIco.rotation.x = elapsed * 0.14
        kIco.rotation.y = elapsed * 0.2
        kDodec.rotation.y = -elapsed * 0.25
        kDodec.rotation.z = elapsed * 0.18
        kOcta.rotation.x = -elapsed * 0.32
        kOcta.rotation.z = -elapsed * 0.28
        kTetra.rotation.y = elapsed * 0.45
        kTetra.rotation.x = elapsed * 0.35
        kRing.rotation.z = elapsed * 0.1
      }

      // 18. Plasma Forcefield
      if (shieldGroup.visible) {
        const pos = shieldGeo.attributes.position.array
        const orig = shieldOrigPos.array
        for (let i = 0; i < pos.length; i += 3) {
          const wave = Math.sin(orig[i] * 0.35 + orig[i + 1] * 0.35 + elapsed * 3.5) * 0.7
          pos[i] = orig[i] + wave * 0.04
          pos[i + 1] = orig[i + 1] + wave * 0.04
          pos[i + 2] = orig[i + 2] + wave * 0.04
        }
        shieldGeo.attributes.position.needsUpdate = true

        plasmaOrb.rotation.y = elapsed * 0.3
        plasmaOrb.rotation.x = elapsed * 0.2
        const orbScale = 1 + Math.sin(elapsed * 2.5) * 0.1
        plasmaOrb.scale.set(orbScale, orbScale, orbScale)

        sRing1.rotation.z = elapsed * 0.4
        sRing2.rotation.y = elapsed * 0.35
        sRing3.rotation.x = -elapsed * 0.38
        arcPoints.rotation.y = -elapsed * 0.15
      }

      // Point light orbits
      pointLight1.position.x = Math.sin(elapsed * 0.7) * 28
      pointLight1.position.y = Math.cos(elapsed * 0.7) * 28
      pointLight2.position.x = -Math.sin(elapsed * 0.6) * 28
      pointLight2.position.z = Math.cos(elapsed * 0.6) * 22

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)

      // Universal safe disposal of all 3D scene objects
      scene.traverse((obj) => {
        if (obj.geometry) {
          obj.geometry.dispose()
        }
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((mat) => mat.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })

      if (particleTexture) particleTexture.dispose()

      renderer.dispose()
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [mode])

  return (
    <>
      {/* Full-Screen WebGL Canvas */}
      <div
        ref={mountRef}
        className="fullscreen-three-canvas"
        aria-hidden="true"
      />

      {/* Floating 3D Theme HUD Bar */}
      <div ref={hudRef} className={`three-hud-container ${hudExpanded ? 'expanded' : ''}`}>
        {/* Expanded 3D Theme Selection Drawer */}
        <div className="three-hud-menu" role="menu" aria-label="3D visual themes">
          <div className="three-hud-header">
            <span className="hud-title">Select 3D Universe Theme ({THEME_MODES.length})</span>
            <button
              type="button"
              className="hud-close-btn"
              onClick={() => setHudExpanded(false)}
              title="Close menu"
            >
              ×
            </button>
          </div>

          <div className="three-hud-grid">
            {THEME_MODES.map((thm) => {
              const IconComp = thm.icon
              const isSelected = mode === thm.id
              return (
                <button
                  key={thm.id}
                  type="button"
                  role="menuitem"
                  className={`three-theme-card ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    handleSelectMode(thm.id)
                    setHudExpanded(false)
                  }}
                >
                  <div className="theme-card-icon" style={{ color: thm.color }}>
                    <IconComp size={18} />
                  </div>
                  <div className="theme-card-info">
                    <span className="theme-name">{thm.name}</span>
                    <span className="theme-desc">{thm.desc}</span>
                  </div>
                  {isSelected && <Check size={16} className="theme-check-icon" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Quick Horizontal Mini Bar (desktop only) */}
        {!hudExpanded && (
          <div className="three-quick-bar" role="group" aria-label="Quick 3D themes">
            {THEME_MODES.slice(0, 6).map((thm) => {
              const IconComp = thm.icon
              return (
                <button
                  key={thm.id}
                  type="button"
                  className={`quick-theme-pill ${mode === thm.id ? 'active' : ''}`}
                  onClick={() => handleSelectMode(thm.id)}
                  title={thm.desc}
                >
                  <IconComp size={13} style={{ color: thm.color }} />
                  <span>{thm.name}</span>
                </button>
              )
            })}
            <button
              type="button"
              className="quick-theme-pill more"
              onClick={() => setHudExpanded(true)}
              title={`View all ${THEME_MODES.length} themes`}
            >
              <span>+{THEME_MODES.length - 6} More</span>
            </button>
          </div>
        )}

        {/* Toggle Trigger Button */}
        <button
          type="button"
          className="three-hud-toggle-btn"
          onClick={() => setHudExpanded(!hudExpanded)}
          title="Toggle 3D Themes Menu"
          aria-expanded={hudExpanded}
        >
          <Palette size={16} className="text-cyan" />
          <span className="current-theme-name">
            3D: {THEME_MODES.find((t) => t.id === mode)?.name}
          </span>
          <span className="hud-badge-count">{THEME_MODES.length} Themes</span>
        </button>
      </div>
    </>
  )
}
