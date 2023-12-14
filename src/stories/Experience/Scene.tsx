import React from 'react'
import { Box } from '@react-three/drei'
import VolumetricSpotLight from './VolumetricSpotLight'
import { useShaderPass } from '../../hooks'
import { useFrame } from '@react-three/fiber'

const Scene = () => {
  const vertexShader = `
    precision highp float;

    attribute vec2 position;

    void main() {
      gl_Position = vec4(position, 1.0, 1.0);
    }`

  const fragmentShader = `
    precision highp float;

    uniform sampler2D uScene;
    uniform vec2 uResolution;
    uniform float uTime;

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      vec3 color = vec3(uv, 1.0);
      color = texture2D(uScene, uv).rgb;
      color.r += sin(uv.x * 50.0 * cos(uTime));
      gl_FragColor = vec4(color, 1.0);
    }`

  const uniforms = { uTime: { value: 0 } }

  const effectMaterial = useShaderPass({
    vertexShader,
    fragmentShader,
    uniforms,
  })

  useFrame((state) => {
    if (effectMaterial) {
      effectMaterial.uniforms.uTime.value = state.clock.getElapsedTime()
    }
  })

  return (
    <>
      <VolumetricSpotLight
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
