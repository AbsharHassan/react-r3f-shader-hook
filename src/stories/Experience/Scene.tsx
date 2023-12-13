import React from 'react'
import { Box, OrbitControls } from '@react-three/drei'
import MovingSpot from './MovingSpot'
import { useShaderPass } from '../../hooks'

const Scene = () => {
  const vertexShader = `precision highp float;
  attribute vec2 position;
  void main() {
    // Look ma! no projection matrix multiplication,
    // because we pass the values directly in clip space coordinates.
    gl_Position = vec4(position, 1.0, 1.0);
  }`

  const fragmentShader = `precision highp float;
  uniform sampler2D uScene;
  uniform vec2 uResolution;
  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec3 color = vec3(uv, 1.0);
    color = texture2D(uScene, uv).rgb;
    // Do your cool postprocessing here
    color.r += sin(uv.x * 50.0);
    gl_FragColor = vec4(color, 1.0);
  }`

  const effectMaterial = useShaderPass({})

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
