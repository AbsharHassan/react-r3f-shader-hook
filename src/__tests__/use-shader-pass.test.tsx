import React from 'react'
import ReactThreeTestRenderer from '@react-three/test-renderer'
import { Canvas } from '@react-three/fiber'
import DummyComponentForHookTest from '../helpers/DummyComponentForHookTest'

describe('Implementing', () => {
  it('should successfully call the hook in component', async () => {
    const renderer = await ReactThreeTestRenderer.create(
      <DummyComponentForHookTest />
    )

    console.log(renderer.scene.children)

    expect(true).toBeTruthy()
  })
})
