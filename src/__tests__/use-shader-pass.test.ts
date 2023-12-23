import { renderHook } from '@testing-library/react'
import { useShaderPass } from '../hooks'
import { RequiredShaderMaterialParameters } from '../hooks/use-shader-pass/use-shader-pass.types'

describe('testing hook', () => {
  it('should do nothing rn', () => {
    const { result } = renderHook(() => {
      // useShaderPass()
    })

    console.log(result.current)

    expect(true).toBeTruthy()
  })
})
