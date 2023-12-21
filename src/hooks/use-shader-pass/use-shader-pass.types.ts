import { ShaderMaterialParameters } from 'three'

export interface RequiredShaderMaterialParameters
  extends ShaderMaterialParameters {
  vertexShader: string
  fragmentShader: string
}
