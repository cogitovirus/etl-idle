import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import DataCollectionStack from './DataCollectionStack';
import { GameStateProvider, useGameState } from '../../../contexts/GameStateContext';
import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Components/DataCollectionStack',
  component: DataCollectionStack,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <GameStateProvider>
        <Story />
      </GameStateProvider>
    ),
  ],
} satisfies Meta<typeof DataCollectionStack>;

export default meta;

const mockUseGameState = () => ({
  getProcessingSpeed: () => 1,
  addToWarehouse: action('addToWarehouse'),
});

export const Default: StoryObj<typeof meta> = {
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <DataCollectionStack {...args} />
    </Box>
  ),
  args: {},
};
