import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DeclarationSectionProps {
  scrollProgress: number
}

// Explosion of particles
function ParticleExplosion({ scrollProgress }: { scrollProgress: number }) {
  const points = useRef<THREE.Points>(null)
  
  const count = 3000
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 0.5 + Math.random() * 0.5
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
      
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        colors[i3] = 1; colors[i3 + 1] = 0.42; colors[i3 + 2] = 0.62 // primary
      } else if (colorChoice < 0.66) {
        colors[i3] = 0.77; colors[i3 + 1] = 0.27; colors[i3 + 2] = 0.41 // secondary
      } else {
        colors[i3] = 1; colors[i3 + 1] = 0.85; colors[i3 + 2] = 0.24 // accent
      }
    }
    
    return { positions, colors, velocities }
  }, [count])

  useFrame(() => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        positions[i3] += particles.velocities[i3] * (1 + scrollProgress * 2)
        positions[i3 + 1] += particles.velocities[i3 + 1] * (1 + scrollProgress * 2)
        positions[i3 + 2] += particles.velocities[i3 + 2] * (1 + scrollProgress * 2)
        
        // Reset particles that go too far
        const dist = Math.sqrt(
          positions[i3] ** 2 + 
          positions[i3 + 1] ** 2 + 
          positions[i3 + 2] ** 2
        )
        
        if (dist > 5) {
          positions[i3] *= 0.1
          positions[i3 + 1] *= 0.1
          positions[i3 + 2] *= 0.1
        }
      }
      
      points.current.geometry.attributes.position.needsUpdate = true
      points.current.rotation.y += 0.002
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
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Central glowing orb
function GlowingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color="#ff6b9d"
        emissive="#ff6b9d"
        emissiveIntensity={1}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

export default function DeclarationSection({ scrollProgress }: DeclarationSectionProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      groupRef.current.scale.setScalar(pulse + scrollProgress * 0.5)
    }
  })

  return (
    <group ref={groupRef}>
      <ParticleExplosion scrollProgress={scrollProgress} />
      <GlowingOrb />
      <pointLight color="#ff6b9d" intensity={3} distance={15} />
    </group>
  )
}
