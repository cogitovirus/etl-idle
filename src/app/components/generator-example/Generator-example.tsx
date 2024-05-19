import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useGameState } from '../../contexts/GameStateContext';

interface GeneratorProps {
  id: string;
  name: string;
  rate: number;
  cost: number;
}

export function Generator({ id, name, rate, cost }: GeneratorProps) {
  const { coreState: coreState } = useGameState();

  const handlePurchase = () => {
    coreState.addDataCollection({
      id,
      name,
      dataSize: rate,
      processed: 0,
      cost,
    });
    coreState.deductFunds(cost);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2">Rate: {rate} Mb/s</Typography>
        <Typography variant="body2">Cost: ${cost}</Typography>
        <Button onClick={handlePurchase}>Buy</Button>
      </CardContent>
    </Card>
  );
};

export default Generator;
