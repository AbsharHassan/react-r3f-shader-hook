import React from 'react'
import { useDepthBuffer } from '@react-three/drei'

type Props = {}

const Scene = (props: Props) => {
  const depthBuffer = useDepthBuffer({ frames: 1 })

  return <div>Scene</div>
}

export default Scene
