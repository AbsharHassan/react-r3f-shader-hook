import { renderHook } from '@testing-library/react'
import { useShaderPass } from '../hooks'
import { RequiredShaderMaterialParameters } from '../hooks/use-shader-pass/use-shader-pass.types'

describe('testing hook', () => {
  it.skip('should do nothing rn', () => {
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

    const { result } = renderHook(useShaderPass, { initialProps })

    console.log(result.current)

    expect(true).toBeTruthy()
  })
})