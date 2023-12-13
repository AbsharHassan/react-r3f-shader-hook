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
} from 'three'
import { useFrame, useThree } from '@react-three/fiber'

const useShaderPass = (
  vertexShader: string,
  fragmentShader: string,
  uniforms: { [uniform: string]: IUniform }
): void => {
  uniforms
}
