import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useConfig } from '../context/ConfigContext'

interface HeartSectionProps {
  scrollProgress: number
}

// Heart-shaped particle system
function HeartParticles({ count = 1000 }: { count?: number }) {
  const { config } = useConfig()
  const points = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color(config.colors.primary)
    
    // Create heart shape using parametric equations
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
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.scale.setScalar(pulse)
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 2]} />
      <meshStandardMaterial 
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
  const groupRef = useRef<THREE.Group>(null)
  
  // Show between scroll 0.15 and 0.35
  let opacity = 0
  if (scrollProgress > 0.15 && scrollProgress < 0.35) {
    const progress = (scrollProgress - 0.15) / 0.2
    opacity = Math.sin(progress * Math.PI)
  } else if (scrollProgress >= 0.35) {
    opacity = Math.max(0, 1 - (scrollProgress - 0.35) * 5)
  }
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef} scale={opacity}>
      <HeartParticles count={1500} />
      <MorphingHeart />
      <pointLight color={config.colors.primary} intensity={2} distance={10} />
    </group>
  )
}
