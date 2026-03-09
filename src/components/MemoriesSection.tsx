import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface MemoriesSectionProps {
  scrollProgress: number
}

// Floating geometric shapes
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null)
  
  const shapes = [
    { geometry: 'octahedron', position: [-2, 1, -2] as [number, number, number], speed: 0.5 },
    { geometry: 'tetrahedron', position: [2, -1, -1] as [number, number, number], speed: 0.7 },
    { geometry: 'dodecahedron', position: [0, 2, -3] as [number, number, number], speed: 0.3 },
    { geometry: 'icosahedron', position: [-1.5, -2, -2] as [number, number, number], speed: 0.6 },
    { geometry: 'torus', position: [1.5, 1.5, -2.5] as [number, number, number], speed: 0.4 },
  ]

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const shape = shapes[i]
        child.rotation.x = state.clock.elapsedTime * shape.speed
        child.rotation.y = state.clock.elapsedTime * shape.speed * 0.5
        child.position.y = shape.position[1] + Math.sin(state.clock.elapsedTime + i) * 0.3
      })
    }
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position}>
          {shape.geometry === 'octahedron' && <octahedronGeometry args={[0.3]} />}
          {shape.geometry === 'tetrahedron' && <tetrahedronGeometry args={[0.3]} />}
          {shape.geometry === 'dodecahedron' && <dodecahedronGeometry args={[0.3]} />}
          {shape.geometry === 'icosahedron' && <icosahedronGeometry args={[0.3]} />}
          {shape.geometry === 'torus' && <torusGeometry args={[0.2, 0.08, 16, 32]} />}
          <meshStandardMaterial 
            color="#c44569"
            emissive="#ff6b9d"
            emissiveIntensity={0.3}
            wireframe
          />
        </mesh>
      ))}
    </group>
  )
}

// Particle field
function ParticleField() {
  const points = useRef<THREE.Points>(null)
  
  const count = 500
  const positions = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 8
    positions[i3 + 1] = (Math.random() - 0.5) * 8
    positions[i3 + 2] = (Math.random() - 0.5) * 8
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ffd93d"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function MemoriesSection({ scrollProgress }: MemoriesSectionProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Show between scroll 0.35 and 0.55
  let opacity = 0
  if (scrollProgress > 0.35 && scrollProgress < 0.55) {
    const progress = (scrollProgress - 0.35) / 0.2
    opacity = Math.sin(progress * Math.PI)
  } else if (scrollProgress >= 0.55) {
    opacity = Math.max(0, 1 - (scrollProgress - 0.55) * 5)
  }
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 0.5
    }
  })

  return (
    <group ref={groupRef} scale={opacity}>
      <FloatingShapes />
      <ParticleField />
    </group>
  )
}
