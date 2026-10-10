import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, useProgress, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const MOON_TEXTURE = new URL('../moon_textures/nasa_moon_albedo.jpg', import.meta.url).href

function Satellite() {
  const group = useRef<THREE.Group>(null)
  const drag = useRef({ active: false, x: 0, y: 0 })
  const scrollBoost = useRef(0)
  const scrollTarget = useRef(0)
  const lastScrollAt = useRef(0)
  const sourceTexture = useTexture(MOON_TEXTURE)
  const lunarTexture = useMemo(() => {
    sourceTexture.colorSpace = THREE.SRGBColorSpace
    sourceTexture.anisotropy = 8
    sourceTexture.needsUpdate = true
    return sourceTexture
  }, [sourceTexture])

  useEffect(() => {
    let previousY = window.scrollY
    let previousTime = performance.now()
    const handleScroll = () => {
      const now = performance.now()
      const elapsed = Math.max(now - previousTime, 16)
      const distance = window.scrollY - previousY
      scrollTarget.current = distance > 0
        ? THREE.MathUtils.clamp((distance / elapsed) * 0.08, 0, 0.32)
        : 0
      lastScrollAt.current = now
      previousY = window.scrollY
      previousTime = now
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    if (performance.now() - lastScrollAt.current > 120) scrollTarget.current = 0
    scrollBoost.current = THREE.MathUtils.damp(scrollBoost.current, scrollTarget.current, 5, delta)
    if (!drag.current.active) group.current.rotation.y += delta * (0.075 + scrollBoost.current)
  })

  return (
    <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.25}>
      <group ref={group} rotation={[0.25, 0.3, -0.15]}>
        <mesh
          onPointerDown={(event) => {
            event.stopPropagation()
            drag.current.active = true
            drag.current.x = event.clientX
            drag.current.y = event.clientY
            const target = event.target as (EventTarget & { setPointerCapture?: (pointerId: number) => void }) | null
            target?.setPointerCapture?.(event.pointerId)
          }}
          onPointerMove={(event) => {
            if (!drag.current.active || !group.current) return
            event.stopPropagation()
            const dx = event.clientX - drag.current.x
            const dy = event.clientY - drag.current.y
            drag.current.x = event.clientX
            drag.current.y = event.clientY
            group.current.rotation.y += dx * 0.006
            group.current.rotation.x = THREE.MathUtils.clamp(group.current.rotation.x + dy * 0.006, -Math.PI * 0.48, Math.PI * 0.48)
          }}
          onPointerUp={(event) => {
            drag.current.active = false
            const target = event.target as (EventTarget & { hasPointerCapture?: (pointerId: number) => boolean; releasePointerCapture?: (pointerId: number) => void }) | null
            if (target?.hasPointerCapture?.(event.pointerId)) target.releasePointerCapture?.(event.pointerId)
          }}
          onPointerCancel={() => { drag.current.active = false }}
        >
          <sphereGeometry args={[1.05, 128, 128]} />
          <meshStandardMaterial color="#ffffff" map={lunarTexture} metalness={0} roughness={1} />
        </mesh>
      </group>
    </Float>
  )
}

export default function HeroScene() {
  const [ready, setReady] = useState(false)
  const { active } = useProgress()
  return (
    <div className="hero-canvas" aria-hidden="true">
      <div className={`scene-loading${ready && !active ? ' is-ready' : ''}`}><span className="loading-indicator" /> LOADING MOON MAP</div>
      <Canvas camera={{ position: [0, 0, 6.8], fov: 38 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} fallback={<div className="scene-unavailable">3D scene unavailable</div>} onCreated={() => setReady(true)}>
        <ambientLight intensity={0.32} />
        <pointLight position={[-4, 3, 4]} intensity={7} color="#fff1d6" />
        <pointLight position={[4, -2, 2]} intensity={0.8} color="#94a3b8" />
        <Stars radius={60} depth={35} count={1500} factor={2.1} saturation={0} fade speed={0.22} />
        <Suspense fallback={null}><Satellite /></Suspense>
      </Canvas>
    </div>
  )
}
