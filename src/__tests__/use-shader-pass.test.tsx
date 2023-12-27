import React from 'react'
import ReactThreeTestRenderer from '@react-three/test-renderer'
import { Canvas } from '@react-three/fiber'
import DummyComponentForHookTest from './helpers/DummyComponentForHookTest'

describe('Implementing', () => {
  it.skip('should successfully call the hook in component', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <Canvas>
        <DummyComponentForHookTest />
      </Canvas>
    )

    expect(true).toBeTruthy()
  })
})
