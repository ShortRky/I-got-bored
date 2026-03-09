import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useConfig } from '../context/ConfigContext'

interface HeroSectionProps {
  scrollProgress: number
}

function Particles({ count = 2000 }) {
  const { config } = useConfig()
  const points = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const color = new THREE.Color(config.colors.primary)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10
      
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }
    
    return { positions, colors }
  }, [count, config.colors.primary])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05
      points.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  // Use points primitive
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
      <PointMaterial
        transparent
        color={config.colors.primary}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function HeroSection({ scrollProgress }: HeroSectionProps) {
  const { config } = useConfig()
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(scrollProgress * Math.PI * 2) * 0.2
      groupRef.current.position.z = Math.sin(scrollProgress * Math.PI) * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <Particles count={config.timing.particleCount} />
      <mesh position={[0, 0, 0]}>
        <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />
        <meshStandardMaterial 
          color={config.colors.primary} 
          emissive={config.colors.secondary}
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
    </group>
  )
}
