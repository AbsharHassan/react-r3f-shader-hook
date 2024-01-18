import { useEffect, useMemo } from 'react'
import {
  Scene,
  OrthographicCamera,
  BufferGeometry,
  BufferAttribute,
  Vector2,
  WebGLRenderTarget,
  RGBAFormat,
  RawShaderMaterial,
  Mesh,
  LinearFilter,
  FloatType,
} from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { UseShaderPassParameters } from './use-shader-pass.types'
import applyFXAA from '../../helpers/FXAA/applyFXAA'

const useShaderPass = ({
  vertexShader = `
    precision highp float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 1.0, 1.0);
    }
  `,
  fragmentShader = `
    precision highp float;
    uniform sampler2D uScene;
    uniform vec2 uResolution;
    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      vec4 color = texture2D(uScene, uv).rgba;
      gl_FragColor = color;
    }
  `,
  uniforms,
}: UseShaderPassParameters): RawShaderMaterial => {
  const { gl, scene, camera, viewport } = useThree()

  //TODO: name this more appropriately
  const extraScene = useMemo<Scene>(() => new Scene(), [])

  const dummyCamera = useMemo<OrthographicCamera>(
    () => new OrthographicCamera(),
    []
  )

  const resolution = useMemo<Vector2>(() => {
    let res = new Vector2(window.innerWidth, window.innerHeight)
    gl.getDrawingBufferSize(res)
    return res
  }, [gl])

  const target = useMemo<WebGLRenderTarget>(
    () =>
      new WebGLRenderTarget(resolution.x, resolution.y, {
        format: RGBAFormat,
        minFilter: LinearFilter,
        magFilter: LinearFilter,
        stencilBuffer: false,
        depthBuffer: true,
        type: FloatType,
      }),
    []
  )

  const material = useMemo<RawShaderMaterial>(() => {
    const fxaaFragmentShader = `${applyFXAA} ${fragmentShader}`.replace(
      'texture2D(uScene, uv)',
      'applyFXAA(uScene, gl_FragCoord.xy, uResolution)'
    )

    return new RawShaderMaterial({
      vertexShader,
      fragmentShader: fxaaFragmentShader,
      uniforms: {
        uScene: { value: target.texture },
        uResolution: { value: resolution },
        ...uniforms,
      },
    })
  }, [vertexShader, fragmentShader, uniforms])

  const updateRenderTargetSize = (): void => {
    gl.getDrawingBufferSize(resolution)

    target.setSize(resolution.x, resolution.y)

    material.uniforms.uResolution.value = resolution

    const aspect = resolution.x / resolution.y
    dummyCamera.left = -aspect
    dummyCamera.right = aspect
    dummyCamera.updateProjectionMatrix()
  }

  // Main useEffect
  useEffect(() => {
    const geometry = new BufferGeometry()

    const vertices = new Float32Array([
      -1.0, -1.0, 0.0, 3.0, -1.0, 0.0, -1.0, 3.0, 0.0,
    ])

    geometry.setAttribute('position', new BufferAttribute(vertices, 3, false))

    geometry.boundingSphere?.center.setZ(0)

    gl.getDrawingBufferSize(resolution)

    material.uniforms.uResolution.value = resolution

    material.uniforms.uScene.value = target.texture

    const triangle = new Mesh(geometry, material)
    triangle.frustumCulled = false

    extraScene.add(triangle)

    return () => {
      extraScene.clear()
      geometry.dispose()
      material.dispose()
    }
  }, [gl, material])

  useEffect(() => {
    window.addEventListener('resize', updateRenderTargetSize)

    return () => {
      window.removeEventListener('resize', updateRenderTargetSize)
    }
  }, [])

  useFrame(() => {
    gl.setRenderTarget(target)
    gl.render(scene, camera)
    gl.setRenderTarget(null)
    gl.render(extraScene, dummyCamera)
  }, 1)

  return material
}

export default useShaderPass
