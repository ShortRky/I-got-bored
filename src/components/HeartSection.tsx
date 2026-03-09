import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useConfig } from '../context/ConfigContext'

interface HeartSectionProps {
  scrollProgress: number
}

// Heart-shaped particle system
function HeartParticles({ count = 1000, scrollProgress }: { count?: number, scrollProgress: number }) {
  const { config } = useConfig()
  const points = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color(config.colors.primary)
    
    // Create heart shape
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2
      const x = 16 * Math.pow(Math.sin(t), 3)
      const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)
      
      const i3 = i * 3
      positions[i3] = x * 0.05 + (Math.random() - 0.5) * 0.1
      positions[i3 + 1] = y * 0.05 + (Math.random() - 0.5) * 0.1
      positions[i3 + 2] = (Math.random() - 0.5) * 2
      
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
    
    return { positions, colors }
  }, [count, config.colors.primary])

  useFrame((state) => {
    if (points.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.1
      points.current.scale.set(scale, scale, scale)
      points.current.rotation.z = scrollProgress * Math.PI
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Morphing heart geometry
function MorphingHeart() {
  const { config } = useConfig()
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      meshRef.current.scale.setScalar(pulse)
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshStandardMaterial 
        ref={materialRef}
        color={config.colors.primary}
        emissive={config.colors.secondary}
        emissiveIntensity={0.5}
        wireframe
      />
    </mesh>
  )
}

export default function HeartSection({ scrollProgress }: HeartSectionProps) {
  const { config } = useConfig()
  
  return (
    <group position={[0, 0, 0]}>
      <HeartParticles count={1500} scrollProgress={scrollProgress} />
      <MorphingHeart />
      <pointLight color={config.colors.primary} intensity={2} distance={10} />
    </group>
  )
}
