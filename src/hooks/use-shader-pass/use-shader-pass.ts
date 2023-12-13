import { useEffect, useMemo, useState } from 'react'
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
  IUniform,
  ShaderMaterialParameters,
} from 'three'
import { useFrame, useThree } from '@react-three/fiber'

const useShaderPass = ({
  vertexShader,
  fragmentShader,
  uniforms,
}: ShaderMaterialParameters): RawShaderMaterial => {
  return new RawShaderMaterial({ vertexShader, fragmentShader, uniforms })
}

export default useShaderPass
