import { Meta, StoryObj } from '@storybook/react'

import Experience from './Experience/Experience'

const meta: Meta<typeof Experience> = {
  component: Experience,
  title: 'Experience',
}

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {},
}
