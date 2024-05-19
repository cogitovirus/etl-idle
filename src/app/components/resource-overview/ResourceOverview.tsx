import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useGameState } from '@/app/contexts/GameStateContext';
import { GameState } from '@/engine/core/GameState';
import { animate } from 'framer-motion';

function useResourceOverview(gameState: GameState) {
  const [funds, setFunds] = useState(gameState.getFunds());
  const [data, setData] = useState(gameState.getData());
  const [processingSpeed, setProcessingSpeed] = useState(gameState.getProcessingSpeed());
  const [dataWarehouseCapacity, setDataWarehouseCapacity] = useState(gameState.getDataWarehouseCapacity());

  useEffect(() => {
    const handleStateChange = () => {
      // Using setTimeout with a zero delay defers the state updates,
      // ensuring they don't interfere with the rendering phase of another component.
      setTimeout(() => {
        setFunds(gameState.getFunds());
        setData(gameState.getData());
        setProcessingSpeed(gameState.getProcessingSpeed());
        setDataWarehouseCapacity(gameState.getDataWarehouseCapacity());
      }, 0);
    };

    gameState.subscribe(handleStateChange);

    return () => {
      gameState.unsubscribe(handleStateChange);
    };
  }, [gameState]);

  return { funds, data, processingSpeed, dataWarehouseCapacity };
}

function AnimatedNumber({ value, roundModifier }: { value: number, roundModifier: number}) {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    const controls = animate(currentValue, value, {
      duration: 0.5,
      onUpdate: (latest) => setCurrentValue(latest)
    });
    return () => controls.stop(); // Clean up the animation on unmount
  }, [value, currentValue]);

  return <span>{Math.round(currentValue * roundModifier) / roundModifier}</span>;
}

export function ResourceOverview() {
  const { gameState } = useGameState();
  const { funds, data, processingSpeed, dataWarehouseCapacity } = useResourceOverview(gameState);

  return (
    <Box>
      <Typography variant="h6">Funds: $<AnimatedNumber value={funds} roundModifier={1} /></Typography>
      <Typography variant="h6">Data Warehouse Usage: <AnimatedNumber value={data} roundModifier={1} />/<AnimatedNumber value={dataWarehouseCapacity} roundModifier={1} /> Mb</Typography>
      <Typography variant="h6">Processing Speed: <AnimatedNumber value={processingSpeed} roundModifier={100} /> Mb/s</Typography>
    </Box>
  );
}
