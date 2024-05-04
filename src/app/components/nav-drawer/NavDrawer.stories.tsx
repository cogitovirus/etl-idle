import NavDrawer from './NavDrawer';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/NavDrawer',
  component: NavDrawer,
  tags: ['autodocs'],
} satisfies Meta<typeof NavDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Opened: Story = {
  render: (args) => <NavDrawer {...args} />,
  args: {
    open: true,
    sx: {}
  },
};

export const Closed: Story = {
  render: (args) => <NavDrawer {...args} />,
  args: {
    open: false,
    sx: {}
  },
};