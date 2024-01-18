import { ShaderMaterialParameters } from 'three'

export interface UseShaderPassParameters extends ShaderMaterialParameters {
  vertexShader: string
  fragmentShader: string
}
