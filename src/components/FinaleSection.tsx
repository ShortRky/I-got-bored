import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FinaleSectionProps {
  scrollProgress: number
}

// Radiating rings
function RadiatingRings() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((ring, i) => {
        ring.rotation.z = state.clock.elapsedTime * 0.2 * (i + 1) * 0.5
        ring.scale.setScalar(1 + Math.sin(state.clock.elapsedTime + i) * 0.05)
      })
    }
  })

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1 + i * 0.3, 0.02, 16, 100]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? '#ff6b9d' : '#ffd93d'}
            emissive={i % 2 === 0 ? '#c44569' : '#ff6b9d'}
            emissiveIntensity={0.5}
            transparent
            opacity={1 - i * 0.15}
          />
        </mesh>
      ))}
    </group>
  )
}

// Sparkle particles
function Sparkles({ count = 500 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const theta = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 3
      
      positions[i3] = radius * Math.cos(theta)
      positions[i3 + 1] = (Math.random() - 0.5) * 4
      positions[i3 + 2] = radius * Math.sin(theta) - 2
    }
    
    return positions
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffd93d"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Central crystal
function CentralCrystal() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial 
        color="#ff6b9d"
        emissive="#c44569"
        emissiveIntensity={0.8}
        transparent
        opacity={0.9}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

export default function FinaleSection({ scrollProgress }: FinaleSectionProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Show between scroll 0.75 and 1.0
  let opacity = 0
  if (scrollProgress > 0.75 && scrollProgress < 1.0) {
    const progress = (scrollProgress - 0.75) / 0.25
    opacity = Math.sin(progress * Math.PI)
  } else if (scrollProgress >= 1.0) {
    opacity = 1
  }
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2
    }
  })

  return (
    <group ref={groupRef} scale={opacity}>
      <RadiatingRings />
      <Sparkles />
      <CentralCrystal />
      <pointLight color="#ff6b9d" intensity={2} distance={20} />
      <pointLight color="#ffd93d" intensity={1} distance={15} position={[2, 0, 0]} />
    </group>
  )
}
