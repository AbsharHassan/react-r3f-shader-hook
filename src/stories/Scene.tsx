import React from 'react'
import { Canvas } from '@react-three/fiber'

const Scene = () => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial />
      </mesh>
    </Canvas>
  )
}

export default Scene
