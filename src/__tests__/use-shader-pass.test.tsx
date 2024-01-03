import React from 'react'
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

describe('Implementing', () => {
  test("hook's return type should be RawShaderMaterial", async () => {
    let material: any

    const Component = () => {
      material = useShaderPass({ vertexShader, fragmentShader })

      return (
        <mesh>
          <boxGeometry args={[2, 2]} />
          <meshBasicMaterial />
        </mesh>
      )
    }

    await create(<Component />)

    expect(material instanceof RawShaderMaterial).toBeTruthy()
  })

  test('material should have the provided VERTEX shader', async () => {
    let material: any

    const Component = () => {
      material = useShaderPass({ vertexShader, fragmentShader })

      return (
        <mesh>
          <boxGeometry args={[2, 2]} />
          <meshBasicMaterial />
        </mesh>
      )
    }

    await create(<Component />)

    expect(material.vertexShader).toBe(vertexShader)
  })

  test('material should have the provided FRAGMENT shader', async () => {
    let material: any

    const Component = () => {
      material = useShaderPass({ vertexShader, fragmentShader })

      return (
        <mesh>
          <boxGeometry args={[2, 2]} />
          <meshBasicMaterial />
        </mesh>
      )
    }

    await create(<Component />)

    expect(material.fragmentShader).toBe(fragmentShader)
  })

  test('material should have the necessary uScene uniform', async () => {
    let material: any

    const Component = () => {
      material = useShaderPass({ vertexShader, fragmentShader })

      return (
        <mesh>
          <boxGeometry args={[2, 2]} />
          <meshBasicMaterial />
        </mesh>
      )
    }

    await create(<Component />)

    const keyToCheck = 'uScene'

    expect(keyToCheck in material.uniforms).toBeTruthy()
  })

  test('material should have the necessary uResolution uniform', async () => {
    let material: any

    const Component = () => {
      material = useShaderPass({ vertexShader, fragmentShader })

      return (
        <mesh>
          <boxGeometry args={[2, 2]} />
          <meshBasicMaterial />
        </mesh>
      )
    }

    await create(<Component />)

    const keyToCheck = 'uResolution'

    expect(keyToCheck in material.uniforms).toBeTruthy()
  })

  test('material should ONLY have the above uniforms IF none are provided', async () => {
    let material: any

    const Component = () => {
      material = useShaderPass({ vertexShader, fragmentShader })

      return (
        <mesh>
          <boxGeometry args={[2, 2]} />
          <meshBasicMaterial />
        </mesh>
      )
    }

    await create(<Component />)

    expect(Object.keys(material.uniforms).length).toBe(2)
  })
})
