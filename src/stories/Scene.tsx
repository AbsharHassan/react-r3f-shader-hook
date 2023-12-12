import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Box, OrbitControls } from '@react-three/drei'

type Props = {}

const Scene = (props: Props) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [-2, 2, 6], fov: 50, near: 1, far: 20 }}
      style={{ width: '100%', height: '100vh' }}
    >
      <OrbitControls />
      <color
        attach="background"
        args={['#202020']}
      />
      <fog
        attach="fog"
        args={['#202020', 5, 20]}
      />
      <ambientLight intensity={0.015} />

      <mesh receiveShadow>
        <planeGeometry args={[50, 10]} />
        <meshBasicMaterial
          color="#f00"
          transparent
          opacity={1}
        />
      </mesh>
      <Box></Box>
    </Canvas>
  )
}

export default Scene
