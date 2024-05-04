import { Meta, StoryObj } from "@storybook/react";
import NavAppBar from "./NavAppBar";

const meta = {
  title: 'Components/NavAppBar',
  component: NavAppBar,
  tags: ['autodocs'],
} satisfies Meta<typeof NavAppBar>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: (args) => <NavAppBar {...args} />,
  args: {
    handleDrawerToggle: () => {},
  },
};

