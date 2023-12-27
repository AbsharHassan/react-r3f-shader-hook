import React from 'react'
import { RequiredShaderMaterialParameters } from '../hooks/use-shader-pass/use-shader-pass.types'
import { useShaderPass } from '../hooks'
import { Box } from '@react-three/drei'

type Props = {}

const DummyComponentForHookTest = (props: Props) => {
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
        void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        vec4 color = texture2D(uScene, uv).rgba;
        gl_FragColor = color;
        }
    `

  const initialProps: RequiredShaderMaterialParameters = {
    vertexShader,
    fragmentShader,
  }

  //   const shaderPass = useShaderPass(initialProps)

  return (
    <mesh>
      <sphereGeometry />
      <meshBasicMaterial />
    </mesh>
  )
}

export default DummyComponentForHookTest
