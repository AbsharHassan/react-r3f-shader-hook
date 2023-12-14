import React from 'react'
import { SpotLight } from '@react-three/drei'

type VolumetricSpotLightProps = React.ComponentPropsWithoutRef<typeof SpotLight>

const VolumetricSpotLight = ({ ...props }: VolumetricSpotLightProps) => {
  return (
    <SpotLight
      castShadow
      penumbra={1}
      distance={10}
      angle={0.35}
      attenuation={5}
      anglePower={4}
      intensity={30}
      {...props}
    />
  )
}

export default VolumetricSpotLight
