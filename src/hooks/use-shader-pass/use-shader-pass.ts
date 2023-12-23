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
import { RequiredShaderMaterialParameters } from './use-shader-pass.types'

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
}: RequiredShaderMaterialParameters): RawShaderMaterial => {
  const { gl, scene, camera, viewport } = useThree()

  console.log(viewport)

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
    console.log('change')

    return new RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uScene: { value: target.texture },
        uResolution: { value: resolution },
        ...uniforms,
      },
    })
  }, [vertexShader, fragmentShader, uniforms])

  const updateRenderTargetSize = (): void => {
    // Get the new size of the renderer's drawing buffer
    gl.getDrawingBufferSize(resolution)

    // Update the size of the render target
    target.setSize(resolution.x, resolution.y)

    // Update any uniforms or properties that depend on the resolution
    material.uniforms.uResolution.value = resolution

    // Update the camera aspect ratio if needed
    const aspect = resolution.x / resolution.y
    dummyCamera.left = -aspect
    dummyCamera.right = aspect
    dummyCamera.updateProjectionMatrix()
  }

  // Main useEffect
  useEffect(() => {
    const geometry = new BufferGeometry()

    // Triangle expressed in clip space coordinates
    const vertices = new Float32Array([-1.0, -1.0, 3.0, -1.0, -1.0, 3.0])

    geometry.setAttribute('position', new BufferAttribute(vertices, 2, false))

    gl.getDrawingBufferSize(resolution)

    material.uniforms.uResolution.value = resolution

    material.uniforms.uScene.value = target.texture

    const triangle = new Mesh(geometry, material)
    triangle.frustumCulled = false

    extraScene.add(triangle)
  }, [gl, material])

  useEffect(() => {
    window.addEventListener('resize', updateRenderTargetSize)

    return () => {
      material.dispose()
      window.removeEventListener('resize', updateRenderTargetSize)
      // other clean ups
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
