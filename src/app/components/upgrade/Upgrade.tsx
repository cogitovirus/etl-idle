import React, { useContext } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

interface UpgradeProps {
  id: string;
  name: string;
  cost: number;
}

export function Upgrade({ id, name, cost }: UpgradeProps){

  const handlePurchase = () => {
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
