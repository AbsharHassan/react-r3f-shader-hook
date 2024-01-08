import React, { useEffect, useState } from 'react'
import { RawShaderMaterial } from 'three'
import { Canvas } from '@react-three/fiber'
import { useShaderPass } from '../hooks'

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
  uniform float uTime;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec3 color = vec3(uv, 1.0);
    color = texture2D(uScene, uv).rgb;
    gl_FragColor = vec4(color, 1.0);
  }
`

type ShaderComponentProps = {
  handleMaterial: (mat: RawShaderMaterial) => void
}

describe('Implementation of use-shader-pass hook in a component', () => {
  it('updating the provided uniform should update it in the material as well', () => {
    const ShaderComponent = ({ handleMaterial }: ShaderComponentProps) => {
      const material = useShaderPass({
        vertexShader,
        fragmentShader,
        uniforms: { uTest: { value: false } },
      })

      useEffect(() => {
        material.uniforms.uTest.value = true
        handleMaterial(material)
        console.log(material)
      }, [])

      return (
        <mesh>
          <boxGeometry args={[2, 2]} />
          <meshBasicMaterial />
        </mesh>
      )
    }

    const Parent = () => {
      const [material, setMaterial] = useState<RawShaderMaterial | null>(null)

      const handleMaterial = (mat: RawShaderMaterial) => {
        setMaterial(mat)
      }

      return (
        <>
          <Canvas
            style={{ width: '100%', height: '100vh', backgroundColor: 'black' }}
          >
            <ambientLight />
            <ShaderComponent handleMaterial={handleMaterial} />
          </Canvas>
          <div
            data-cy="material"
            data-material-value={JSON.stringify(material)}
            style={{ display: 'none' }}
          />
        </>
      )
    }

    cy.mount(<Parent />)

    cy.wait(1000)

    cy.get('[data-cy="material"]')
      .invoke('attr', 'data-material-value')
      .then((stateString) => {
        const state = JSON.parse(stateString as string)
        expect(state.uniforms.uTest).to.have.property('value', true)
      })
  })
})
