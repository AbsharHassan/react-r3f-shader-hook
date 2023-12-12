import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Box, OrbitControls } from '@react-three/drei'
import Scene from './Scene'

const Experience = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [-2, 2, 6], fov: 50, near: 1, far: 20 }}
      style={{ width: '100%', height: '100vh', backgroundColor: 'black' }}
    >
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={0.015} />

      <Scene />
    </Canvas>
  )
}

export default Experience
