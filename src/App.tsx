import { Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import HeroSection from './components/HeroSection'
import HeartSection from './components/HeartSection'
import MemoriesSection from './components/MemoriesSection'
import DeclarationSection from './components/DeclarationSection'
import FinaleSection from './components/FinaleSection'
import MusicPlayer from './components/MusicPlayer'
import { ConfigProvider, useConfig } from './context/ConfigContext'
import defaultConfig from './config/defaultConfig.json'

function ScrollTracker({ onScroll }: { onScroll: (scrollY: number) => void }) {
  useFrame(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0
    onScroll(scrollPercent)
  })
  return null
}

function Scene() {
  const { config } = useConfig()
  const [sectionIndex, setSectionIndex] = useState(0)
  
  const handleScroll = (scrollY: number) => {
    const newIndex = Math.min(4, Math.floor(scrollY * 5))
    setSectionIndex(newIndex)
  }

  return (
    <>
      <ScrollTracker onScroll={handleScroll} />
      <color attach="background" args={[config.colors.background]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <group scale={sectionIndex === 0 ? 1 : 0}>
        <HeroSection scrollProgress={0} />
      </group>
      <group scale={sectionIndex === 1 ? 1 : 0}>
        <HeartSection scrollProgress={0.2} />
      </group>
      <group scale={sectionIndex === 2 ? 1 : 0}>
        <MemoriesSection scrollProgress={0.4} />
      </group>
      <group scale={sectionIndex === 3 ? 1 : 0}>
        <DeclarationSection scrollProgress={0.6} />
      </group>
      <group scale={sectionIndex === 4 ? 1 : 0}>
        <FinaleSection scrollProgress={0.8} />
      </group>

      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.6} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  )
}

function HTMLContent() {
  const { config } = useConfig()
  
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: config.colors.text, fontFamily: config.fonts.heading }}>
        <h1 style={{ fontSize: '4rem', margin: 0 }}>{config.names.partnerName}</h1>
        <p style={{ fontSize: '1.5rem', opacity: 0.8 }}>With love, from {config.names.yourName}</p>
        <p style={{ marginTop: '2rem', opacity: 0.5 }}>↓ Scroll down ↓</p>
      </div>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: config.colors.primary, fontSize: '3rem' }}>You hold my heart</h2>
      </div>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: config.colors.secondary, fontSize: '3rem' }}>Every moment with you</h2>
      </div>
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: config.colors.accent, fontSize: '3rem' }}>I love you more than words</h2>
      </div>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '4rem', color: config.colors.primary }}>Forever yours</h2>
        <p style={{ fontSize: '1.5rem', opacity: 0.8, color: config.colors.text }}>{config.names.yourName} ❤️ {config.names.partnerName}</p>
      </div>
    </div>
  )
}

function Loading() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="white" wireframe />
    </mesh>
  )
}

function AppContent() {
  const { config } = useConfig()
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setWebglSupported(false)
    } catch (e) {
      setWebglSupported(false)
    }
  }, [])

  if (!webglSupported) {
    return (
      <div style={{ background: config.colors.background, color: config.colors.text, minHeight: '500vh', padding: '2rem' }}>
        <h1>{config.names.partnerName}</h1>
        <p>With love, from {config.names.yourName}</p>
      </div>
    )
  }

  return (
    <div style={{ background: config.colors.background, minHeight: '500vh' }}>
      {/* Fixed canvas - pointer-events: none allows scrolling through it */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        <Canvas style={{ pointerEvents: 'none' }} camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
          <Suspense fallback={<Loading />}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      {/* Scrollable content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <HTMLContent />
      </div>
      <MusicPlayer />
    </div>
  )
}

function App() {
  return (
    <ConfigProvider defaultConfig={defaultConfig}>
      <AppContent />
    </ConfigProvider>
  )
}

export default App
