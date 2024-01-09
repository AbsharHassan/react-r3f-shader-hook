import React from 'react'
import { expect } from '@jest/globals'
import { create } from '@react-three/test-renderer'
import { useShaderPass } from '../hooks'
import { RawShaderMaterial } from 'three'

const vertexShader = `
  precision highp float;

  attribute vec2 position;

  void main() {
  gl_Position = vec4(position, 1.0, 1.0);
  }
`

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

const hasKey = <K extends string>(
  obj: object,
  key: K
): obj is { [P in K]: unknown } => {
  return key in obj
}

describe('Implementing', () => {
  let material: any

  const TestComponent = () => {
    material = useShaderPass({ vertexShader, fragmentShader })
    return (
      <mesh>
        <boxGeometry args={[2, 2]} />
        <meshBasicMaterial />
      </mesh>
    )
  }

  const setupTest = async () => {
    await create(<TestComponent />)
  }

  beforeEach(async () => {
    await setupTest()
  })

  test("hook's return type should be RawShaderMaterial", () => {
    expect(material instanceof RawShaderMaterial).toBeTruthy()
  })

  test('material should have the provided VERTEX shader', () => {
    expect(material.vertexShader).toBe(vertexShader)
  })

  test('material should have the provided FRAGMENT shader', () => {
    expect(material.fragmentShader).toBe(fragmentShader)
  })

  test('material should have the necessary uScene uniform', () => {
    expect(hasKey(material.uniforms, 'uScene')).toBeTruthy()
  })

  test('material should have the necessary uResolution uniform', () => {
    expect(hasKey(material.uniforms, 'uResolution')).toBeTruthy()
  })

  test('material should ONLY have the above uniforms IF none are provided', () => {
    expect(Object.keys(material.uniforms).length).toBe(2)
  })

  test('uniforms should have the provided uniform', async () => {
    let material: any
    const uTest = { value: 1 }
    const Component = () => {
      material = useShaderPass({
        vertexShader,
        fragmentShader,
        uniforms: { uTest },
      })
      return (
        <mesh>
          <boxGeometry args={[2, 2]} />
          <meshBasicMaterial />
        </mesh>
      )
    }
    await create(<Component />)
    expect(hasKey(material.uniforms, 'uTest')).toBeTruthy()
  })
})
