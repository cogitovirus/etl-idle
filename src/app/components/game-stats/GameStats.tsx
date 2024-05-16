import React from 'react';
import { Typography, Box } from '@mui/material';

interface GameStatsProps {
  funds: number;
  data: number;
  processingSpeed: number;
  dataWarehouseCapacity: number;
}

export function GameStats({ funds, data, processingSpeed, dataWarehouseCapacity }: GameStatsProps) {
  return (
    <Box>
      <Typography variant="h6">Funds: ${funds}</Typography>
      <Typography variant="h6">Data: {data} Mb</Typography>
      <Typography variant="h6">Processing Speed: {processingSpeed} Mb/s</Typography>
      <Typography variant="h6">Data Warehouse Capacity: {dataWarehouseCapacity} Mb</Typography>
    </Box>
  );
}
