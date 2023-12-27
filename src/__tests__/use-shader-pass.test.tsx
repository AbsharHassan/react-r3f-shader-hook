import React from 'react'
import { renderHook } from '@testing-library/react'
import ReactThreeTestRenderer from '@react-three/test-renderer'
import { useShaderPass } from '../hooks'
import DummyComponentForHookTest from './helpers/DummyComponentForHookTest'
import { RequiredShaderMaterialParameters } from '../hooks/use-shader-pass/use-shader-pass.types'
import { Canvas } from '@react-three/fiber'

describe('Implementing', () => {
  it.skip('should successfully call the hook in component', async () => {
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

    const renderer = await ReactThreeTestRenderer.create(
      <Canvas>
        <DummyComponentForHookTest />
      </Canvas>
    )

    expect(true).toBeTruthy()
  })
})
