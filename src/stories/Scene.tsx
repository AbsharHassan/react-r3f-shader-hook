import React from 'react'
import { Canvas } from '@react-three/fiber'

type Props = {}

const Scene = (props: Props) => {
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
