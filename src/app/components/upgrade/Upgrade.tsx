import React, { useContext } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { GameStateContext } from '../../contexts/GameStateContext';

interface UpgradeProps {
  id: string;
  name: string;
  cost: number;
}

export function Upgrade({ id, name, cost }: UpgradeProps){
  const context = useContext(GameStateContext);

  if (!context) {
    throw new Error('Upgrade must be used within a GameStateProvider');
  }

  const gameState = context;

  const handlePurchase = () => {
    gameState.buyUpgrade(id);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2">Cost: {cost}</Typography>
        <Button onClick={handlePurchase}>Buy</Button>
      </CardContent>
    </Card>
  );
};

export default Upgrade;
