import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useGameState } from '@/app/contexts/GameStateContext';
import { GameState } from '@/engine/core/GameState';
import { animate, motion, useAnimation } from 'framer-motion';


function useResourceOverview(gameState: GameState) {
  const [funds, setFunds] = useState(gameState.getFunds());
  const [data, setData] = useState(gameState.getData());
  const [processingSpeed, setProcessingSpeed] = useState(gameState.getProcessingSpeed());
  const [dataWarehouseCapacity, setDataWarehouseCapacity] = useState(gameState.getDataWarehouseCapacity());

  useEffect(() => {
    const handleStateChange = () => {
      setFunds(gameState.getFunds());
      setData(gameState.getData());
      setProcessingSpeed(gameState.getProcessingSpeed());
      setDataWarehouseCapacity(gameState.getDataWarehouseCapacity());
    };

    gameState.subscribe(handleStateChange);

    return () => {
      gameState.unsubscribe(handleStateChange);
    };
  }, [gameState]);

  return { funds, data, processingSpeed, dataWarehouseCapacity };
}

function AnimatedNumber({ value }: { value: number }) {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    const controls = animate(currentValue, value, {
      duration: 0.5,
      onUpdate: (latest) => setCurrentValue(latest)
    });
    return controls.stop; // Clean up the animation on unmount
  }, [value]);

  return <span>{Math.round(currentValue)}</span>;
}

export function ResourceOverview() {
  const gameState = useGameState();
  const { funds, data, processingSpeed, dataWarehouseCapacity } = useResourceOverview(gameState);

  return (
    <Box>
      <Typography variant="h6">Funds: $<AnimatedNumber value={funds} /></Typography>
      <Typography variant="h6">Data Warehouse Usage: <AnimatedNumber value={data} />/<AnimatedNumber value={dataWarehouseCapacity} /> Mb</Typography>
      <Typography variant="h6">Processing Speed: <AnimatedNumber value={processingSpeed} /> Mb/s</Typography>
    </Box>
  );
}
