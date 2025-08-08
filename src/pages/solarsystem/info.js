// src/components/InfoPanel.js
import React from 'react'

const planetInfo = {
  Sun: `The center of our solar system. A massive, glowing ball of hot plasma that provides light and heat to the planets.
- Diameter: ~1,391,000 km
- Surface Temperature: ~5,500 °C
- Composition: Mostly hydrogen and helium
- Age: ~4.6 billion years
- Produces energy through nuclear fusion`,

  Mercury: `Closest planet to the sun, very hot and rocky.
- Diameter: 4,879 km
- Distance from Sun: ~57.9 million km
- Orbital Period: 88 Earth days
- Surface Temperature: -173 to 427 °C
- No atmosphere, extreme temperature swings`,

  Venus: `Thick, toxic atmosphere; similar size to Earth but hotter.
- Diameter: 12,104 km
- Distance from Sun: ~108.2 million km
- Orbital Period: 225 Earth days
- Surface Temperature: ~462 °C (hottest planet)
- Atmosphere mostly carbon dioxide with sulfuric acid clouds`,

  Earth: `Our home planet, supporting life with water and atmosphere.
- Diameter: 12,742 km
- Distance from Sun: ~149.6 million km
- Orbital Period: 365.25 days
- Average Surface Temperature: 14 °C
- Atmosphere rich in nitrogen and oxygen`,

  Mars: `Known as the red planet, potential for future colonization.
- Diameter: 6,779 km
- Distance from Sun: ~227.9 million km
- Orbital Period: 687 Earth days
- Surface Temperature: -125 to 20 °C
- Thin atmosphere mostly carbon dioxide`,

  Jupiter: `Largest gas giant with a famous Great Red Spot storm.
- Diameter: 139,820 km
- Distance from Sun: ~778.5 million km
- Orbital Period: ~12 Earth years
- Composition: Mostly hydrogen and helium
- Has at least 79 moons`,

  Saturn: `Famous for its bright, extensive ring system.
- Diameter: 116,460 km
- Distance from Sun: ~1.43 billion km
- Orbital Period: ~29 Earth years
- Composition: Mostly hydrogen and helium
- Rings made of ice and rock particles`,

  Uranus: `An ice giant with a unique tilted rotation axis.
- Diameter: 50,724 km
- Distance from Sun: ~2.87 billion km
- Orbital Period: ~84 Earth years
- Composition: Mostly water, methane, and ammonia ices
- Appears blue-green due to methane in atmosphere`,

  Neptune: `Furthest planet from the Sun, very cold and windy.
- Diameter: 49,244 km
- Distance from Sun: ~4.5 billion km
- Orbital Period: ~165 Earth years
- Surface Temperature: -214 °C
- Known for supersonic strong winds and storms`
}


export default function InfoPanel({ hovered }) {
  if (!hovered) return null
  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      background: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      fontFamily: 'sans-serif',
      maxWidth: 250
    }}>
      <strong>{hovered}</strong>
      <p style={{ margin: 0 }}>{planetInfo[hovered]}</p>
    </div>
  )
}
