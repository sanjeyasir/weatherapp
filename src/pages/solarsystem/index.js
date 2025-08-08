// src/SolarSystem.js
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Planet from './planet.js'
import InfoPanel from './info.js'



function Sun({ onClick, setHovered }) {
  return (
    <mesh
      onClick={() => onClick('Sun')}
      onPointerOver={() => setHovered('Sun')}
      onPointerOut={() => setHovered(null)}
    >
      <sphereGeometry args={[4, 64, 64]} />
      <meshBasicMaterial color="yellow" />
    </mesh>
  )
}


export default function SolarSystem() {
  const [hoveredPlanet, setHoveredPlanet] = React.useState(null)
  const [selectedPlanet, setSelectedPlanet] = React.useState(null)

  const handleClick = (name) => {
    setSelectedPlanet(name)
  }

  return (
    <div style={{ height: '100vh', width: '100vw', background: 'black' }}>
      <Canvas camera={{ position: [0, 20, 60], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        <Stars />

        <Sun onClick={handleClick} setHovered={setHoveredPlanet} />

        {/* Planets */}
        <Planet
          name="Mercury"
          radius={0.8}
          distance={8}
          color="gray"
          speed={0.01}
          setHovered={setHoveredPlanet}
          onClick={handleClick}
        />
         {/* Add planets */}
        <Planet name="Mercury" radius={0.8} distance={8} color="gray" speed={0.01} setHovered={setHoveredPlanet} onClick={() => {}} />
        <Planet name="Venus" radius={1.2} distance={11} color="#c2b280" speed={0.009} setHovered={setHoveredPlanet} onClick={() => {}} />
        <Planet name="Earth" radius={1.5} distance={14} color="skyblue" speed={0.008} setHovered={setHoveredPlanet} onClick={() => {}} />
        <Planet name="Mars" radius={1.2} distance={17} color="red" speed={0.007} setHovered={setHoveredPlanet} onClick={() => {}} />
        <Planet name="Jupiter" radius={2.5} distance={22} color="orange" speed={0.005} setHovered={setHoveredPlanet} onClick={() => {}} />
        <Planet name="Saturn" radius={2} distance={28} color="#d2b48c" speed={0.004} setHovered={setHoveredPlanet} onClick={() => {}} />
        <Planet name="Uranus" radius={1.7} distance={33} color="#40e0d0" speed={0.003} setHovered={setHoveredPlanet} onClick={() => {}} />
        <Planet name="Neptune" radius={1.7} distance={38} color="#4169e1" speed={0.002} setHovered={setHoveredPlanet} onClick={() => {}} />

        <OrbitControls />
      </Canvas>

      {/* Show info on hover */}
      <InfoPanel hovered={hoveredPlanet || selectedPlanet} />
    </div>
  )
}



