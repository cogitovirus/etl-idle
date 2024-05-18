import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import DataCollectionItem from './DataCollectionItem';
import { DataCollection } from '@/engine/entities/DataCollection';
import { Box } from '@mui/material';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Components/DataCollectionItem',
  component: DataCollectionItem,
  tags: ['autodocs'],
  argTypes: {
    onComplete: { action: 'complete' },
  },
} satisfies Meta<typeof DataCollectionItem>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultDataCollection: DataCollection = {
  id: '1',
  name: 'Sample Data Collection',
  dataSize: 10,
};

export const Default: Story = {
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <DataCollectionItem {...args} />
    </Box>
  ),
  args: {
    dataCollection: defaultDataCollection,
    processingSpeed: 1,
    isProcessing: true,
    onComplete: action('onComplete'),
  },
};

export const NotProcessing: Story = {
  render: (args) => (
    <Box sx={{ maxWidth: 600 }}>
      <DataCollectionItem {...args} />
    </Box>
  ),
  args: {
    dataCollection: { ...defaultDataCollection, id: '2', name: 'Idle Data Collection' },
    processingSpeed: 1,
    isProcessing: false,
    onComplete: action('onComplete'),
  },
};
