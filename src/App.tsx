import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import HeroSection from './components/HeroSection'
import HeartSection from './components/HeartSection'
import MemoriesSection from './components/MemoriesSection'
import DeclarationSection from './components/DeclarationSection'
import FinaleSection from './components/FinaleSection'
import MusicPlayer from './components/MusicPlayer'
import { ConfigProvider, useConfig } from './context/ConfigContext'
import defaultConfig from './config/defaultConfig.json'

function Scene() {
  const { config } = useConfig()
  const scroll = useScroll()
  const [scrollProgress, setScrollProgress] = useState(0)

  useFrame(() => {
    setScrollProgress(scroll.offset)
  })

  return (
    <>
      <color attach="background" args={[config.colors.background]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <ScrollControls pages={6} damping={0.3}>
        <Scroll>
          <HeroSection scrollProgress={scrollProgress} />
        </Scroll>
        <Scroll>
          <HeartSection scrollProgress={scrollProgress} />
        </Scroll>
        <Scroll>
          <MemoriesSection scrollProgress={scrollProgress} />
        </Scroll>
        <Scroll>
          <DeclarationSection scrollProgress={scrollProgress} />
        </Scroll>
        <Scroll>
          <FinaleSection scrollProgress={scrollProgress} />
        </Scroll>
      </ScrollControls>

      <EffectComposer>
        <Bloom 
          intensity={0.5} 
          luminanceThreshold={0.6} 
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </>
  )
}

function AppContent() {
  const { config } = useConfig()

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      background: config.colors.background,
      fontFamily: config.fonts.body 
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
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
