import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import {
  Sparkles,
  Box,
  Waves,
  Flame,
  Rocket,
  Terminal,
  Dna,
  Orbit,
  Gem,
  Grid,
  Palette,
  Check,
} from 'lucide-react'

export const THEME_MODES = [
  { id: 'galaxy', name: 'Galaxy', icon: Sparkles, color: '#38bdf8', desc: 'Cosmic Stardust Spiral' },
  { id: 'cyber', name: 'Cyber Core', icon: Box, color: '#a855f7', desc: 'Geometric Gimbal Crystal' },
  { id: 'waves', name: 'Wave Matrix', icon: Waves, color: '#34d399', desc: 'Undulating Cyber Ocean' },
  { id: 'vortex', name: 'Black Hole', icon: Flame, color: '#fb923c', desc: 'Gravitational Accretion Disk' },
  { id: 'hyperspace', name: 'Hyperspace', icon: Rocket, color: '#38bdf8', desc: 'Light-speed Warp Travel' },
  { id: 'matrix', name: 'Cyber Rain', icon: Terminal, color: '#10b981', desc: 'Digital Cascade & Hypercube' },
  { id: 'quantum', name: 'Quantum DNA', icon: Dna, color: '#f43f5e', desc: 'Double Helix & Electron Orbits' },
  { id: 'aurora', name: 'Aurora', icon: Orbit, color: '#06b6d4', desc: 'Celestial Polar Light Curtains' },
  { id: 'crystals', name: 'Crystal Field', icon: Gem, color: '#c084fc', desc: 'Floating Polyhedral Prisms' },
  { id: 'synthwave', name: 'Synthwave', icon: Grid, color: '#ec4899', desc: 'Retro 80s Horizon & Neon Grid' },
]

export default function ThreeCanvas({ currentTheme = 'dark', onThemeSelect }) {
  const mountRef = useRef(null)
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('portfolio-3d-theme') || 'galaxy'
  })
  const [hudExpanded, setHudExpanded] = useState(false)

  const handleSelectMode = (newMode) => {
    setMode(newMode)
    localStorage.setItem('portfolio-3d-theme', newMode)
    document.documentElement.setAttribute('data-canvas-theme', newMode)
    if (onThemeSelect) onThemeSelect(newMode)
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
    // 8. AURORA BOREALIS (Celestial Polar Light Curtains & Stars)
    // =========================================================================
    const auroraGroup = new THREE.Group()
    const ribbonCurtains = []
    const ribbonMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })

    for (let layer = 0; layer < 3; layer++) {
      const pGeo = new THREE.PlaneGeometry(80, 24, 36, 12)
      const pMesh = new THREE.Mesh(pGeo, ribbonMat.clone())
      pMesh.position.set(0, 5 - layer * 4, -15 - layer * 12)
      pMesh.rotation.x = Math.PI / 4.5
      pMesh.material.color = layer === 0 ? cCyan : layer === 1 ? cEmerald : cViolet
      pMesh.material.opacity = 0.35 + layer * 0.1
      auroraGroup.add(pMesh)
      ribbonCurtains.push({ mesh: pMesh, origPos: pGeo.attributes.position.clone() })
    }

    // Sparkle dust for aurora
    const auroraDustGeo = new THREE.BufferGeometry()
    const auroraDustPos = new Float32Array(900 * 3)
    for (let i = 0; i < 900; i++) {
      auroraDustPos[i * 3] = (Math.random() - 0.5) * 80
      auroraDustPos[i * 3 + 1] = (Math.random() - 0.5) * 50
      auroraDustPos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    auroraDustGeo.setAttribute('position', new THREE.BufferAttribute(auroraDustPos, 3))
    auroraGroup.add(new THREE.Points(auroraDustGeo, new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.8, map: particleTexture, transparent: true, blending: THREE.AdditiveBlending })))
    worldGroup.add(auroraGroup)

    // =========================================================================
    // 9. CRYSTALS (Floating Polyhedral Prism Field)
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
    // 10. SYNTHWAVE (Neon 80s Perspective Grid & Horizon Sun)
    // =========================================================================
    const synthGroup = new THREE.Group()

    // Endless ground grid
    const synthGridGeo = new THREE.PlaneGeometry(120, 100, 24, 24)
    const synthGridMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    })
    const synthGrid = new THREE.Mesh(synthGridGeo, synthGridMat)
    synthGrid.rotation.x = -Math.PI / 2.2
    synthGrid.position.set(0, -18, -10)
    synthGroup.add(synthGrid)

    // Horizon Sunset segmented sun
    const sunRingsGroup = new THREE.Group()
    sunRingsGroup.position.set(0, 5, -55)
    for (let r = 0; r < 7; r++) {
      const radius = 18 - r * 2.2
      const ringMesh = new THREE.Mesh(
        new THREE.RingGeometry(radius, radius + 0.8, 48),
        new THREE.MeshBasicMaterial({
          color: r < 3 ? 0xf97316 : 0xec4899,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8 - r * 0.08,
        })
      )
      sunRingsGroup.add(ringMesh)
    }
    synthGroup.add(sunRingsGroup)

    // Ambient stars in synthwave
    const synthStarsGeo = new THREE.BufferGeometry()
    const synthStarsPos = new Float32Array(600 * 3)
    for (let i = 0; i < 600; i++) {
      synthStarsPos[i * 3] = (Math.random() - 0.5) * 80
      synthStarsPos[i * 3 + 1] = Math.random() * 40
      synthStarsPos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 20
    }
    synthStarsGeo.setAttribute('position', new THREE.BufferAttribute(synthStarsPos, 3))
    synthGroup.add(new THREE.Points(synthStarsGeo, new THREE.PointsMaterial({ color: 0xfbbf24, size: 0.9, map: particleTexture, transparent: true, blending: THREE.AdditiveBlending })))
    worldGroup.add(synthGroup)

    // =========================================================================
    // VISIBILITY MANAGER FOR ALL 10 THEMES
    // =========================================================================
    const updateVisibility = (currentMode) => {
      galaxyGroup.visible = currentMode === 'galaxy'
      cyberGroup.visible = currentMode === 'cyber'
      waveGroup.visible = currentMode === 'waves'
      vortexGroup.visible = currentMode === 'vortex'
      hyperspaceGroup.visible = currentMode === 'hyperspace'
      matrixGroup.visible = currentMode === 'matrix'
      quantumGroup.visible = currentMode === 'quantum'
      auroraGroup.visible = currentMode === 'aurora'
      crystalGroup.visible = currentMode === 'crystals'
      synthGroup.visible = currentMode === 'synthwave'
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

      // 8. Aurora Borealis
      if (auroraGroup.visible) {
        ribbonCurtains.forEach((item, layer) => {
          const pos = item.mesh.geometry.attributes.position.array
          const orig = item.origPos.array
          for (let i = 0; i < pos.length; i += 3) {
            pos[i + 1] = orig[i + 1] + Math.sin(orig[i] * 0.12 + elapsed * 1.6 + layer) * 2.5
            pos[i + 2] = orig[i + 2] + Math.cos(orig[i] * 0.08 + elapsed * 1.2 + layer) * 2.8
          }
          item.mesh.geometry.attributes.position.needsUpdate = true
        })
      }

      // 9. Crystals Field
      if (crystalGroup.visible) {
        crystalObjects.forEach((gem) => {
          gem.position.y = gem.userData.baseY + Math.sin(elapsed * gem.userData.speed + gem.userData.offset) * 2.4
          gem.rotation.x += gem.userData.rotX
          gem.rotation.y += gem.userData.rotY
        })
      }

      // 10. Synthwave Grid
      if (synthGroup.visible) {
        synthGrid.position.z = -10 + ((elapsed * 6) % 5)
        sunRingsGroup.rotation.z = Math.sin(elapsed * 0.3) * 0.1
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
      <div className={`three-hud-container ${hudExpanded ? 'expanded' : ''}`}>
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

        {/* Quick Horizontal Mini Bar */}
        {!hudExpanded && (
          <div className="three-quick-bar" role="group" aria-label="Quick 3D themes">
            {THEME_MODES.slice(0, 5).map((thm) => {
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
              title="View all 10 themes"
            >
              <span>+{THEME_MODES.length - 5} More</span>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
