import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, Stars } from '@react-three/drei'
import * as THREE from 'three'

function Satellite() {
  const group = useRef<THREE.Group>(null)
  const pointer = useRef(new THREE.Vector2())

  useFrame(({ pointer: cursor }, delta) => {
    if (!group.current) return
    pointer.current.lerp(cursor, 0.035)
    group.current.rotation.y += delta * 0.075
    group.current.rotation.x += (pointer.current.y * 0.13 - group.current.rotation.x) * 0.025
    group.current.rotation.z += (pointer.current.x * 0.09 - group.current.rotation.z) * 0.025
  })

  return (
    <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.25}>
      <group ref={group} rotation={[0.25, 0.3, -0.15]}>
        <mesh>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial color="#15171d" metalness={0.82} roughness={0.3} flatShading />
        </mesh>
        <mesh scale={1.012}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshBasicMaterial color="#9ca3af" wireframe transparent opacity={0.22} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshBasicMaterial color="#d4d4d8" />
        </mesh>
        <mesh position={[-1.8, 0, 0]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[1.2, 0.055, 0.42]} />
          <meshStandardMaterial color="#242833" metalness={0.6} roughness={0.45} />
        </mesh>
        <mesh position={[1.8, 0, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[1.2, 0.055, 0.42]} />
          <meshStandardMaterial color="#242833" metalness={0.6} roughness={0.45} />
        </mesh>
        <Line points={[[0, 0, 0], [0, 1.65, 0]]} color="#a1a1aa" lineWidth={0.65} transparent opacity={0.36} />
        <mesh position={[0, 1.72, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#d4d4d8" />
        </mesh>
        <mesh position={[0, -1.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.45, 0.006, 6, 100]} />
          <meshBasicMaterial color="#a1a1aa" transparent opacity={0.25} />
        </mesh>
      </group>
    </Float>
  )
}

export default function HeroScene() {
  const [ready, setReady] = useState(false)
  return (
    <div className="hero-canvas" aria-hidden="true">
      {!ready && <div className="scene-loading"><span className="loading-indicator" /> INITIALIZING SCENE</div>}
      <Canvas camera={{ position: [0, 0, 6.8], fov: 38 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} fallback={<div className="scene-unavailable">3D scene unavailable</div>} onCreated={() => setReady(true)}>
        <ambientLight intensity={1.15} />
        <pointLight position={[4, 3, 4]} intensity={32} color="#d4d4d8" />
        <pointLight position={[-4, -2, 2]} intensity={14} color="#64748b" />
        <Stars radius={60} depth={35} count={1500} factor={2.1} saturation={0} fade speed={0.22} />
        <Satellite />
      </Canvas>
    </div>
  )
}
