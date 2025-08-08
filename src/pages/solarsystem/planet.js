// src/components/Planet.js
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Planet({
  name,
  radius,
  distance,
  color,
  speed,
  onClick,
  setHovered
}) {
  const orbitRef = useRef()
  const planetRef = useRef()

  useFrame(() => {
    if (orbitRef.current) orbitRef.current.rotation.y += speed
    if (planetRef.current) planetRef.current.rotation.y += 0.01
  })

  return (
    <group ref={orbitRef}>
      <mesh
        ref={planetRef}
        position={[distance, 0, 0]}
        onClick={() => onClick(name)}
        onPointerOver={() => setHovered(name)}
        onPointerOut={() => setHovered(null)}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  )
}
