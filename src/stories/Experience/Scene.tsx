import React from 'react'
import { Box, OrbitControls } from '@react-three/drei'
import MovingSpot from './MovingSpot'
import { useShaderPass } from '../../hooks'

const Scene = () => {
  // const hello = useShaderPass({vertexShader: 2, fragmentShader: false, uniforms: false})

  return (
    <>
      <MovingSpot
        color="#0c8cbf"
        position={[3, 3, 2]}
      />

      <Box
        position={[0, 0, 0.2]}
        castShadow
      >
        <meshPhysicalMaterial />
      </Box>

      <mesh
        receiveShadow
        position={[0, -0.5, 0]}
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial />
      </mesh>
    </>
  )
}

export default Scene
