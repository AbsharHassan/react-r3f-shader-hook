import { Meta, StoryObj } from '@storybook/react'

import Scene from './Scene'

const meta: Meta<typeof Scene> = {
  component: Scene,
  title: 'Scene',
}

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {},
}
