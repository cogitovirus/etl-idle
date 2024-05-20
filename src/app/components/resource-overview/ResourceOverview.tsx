import React, { useContext, useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { CoreStateContext } from '@/app/contexts/GameStateContext';
import { CoreState } from '@/engine/core/CoreState';
import { animate } from 'framer-motion';

function useResourceOverview(coreState: CoreState) {
  const [funds, setFunds] = useState(coreState.getFunds());
  const [data, setData] = useState(coreState.getData());
  const [processingSpeed, setProcessingSpeed] = useState(coreState.getProcessingSpeed());
  const [dataWarehouseCapacity, setDataWarehouseCapacity] = useState(coreState.getDataWarehouseCapacity());
  const [innovationCredits, setInnovationCredits] = useState(coreState.getInnovationCredits());

  useEffect(() => {
    const handleStateChange = () => {
      // Using setTimeout with a zero delay defers the state updates,
      // ensuring they don't interfere with the rendering phase of another component.
      setTimeout(() => {
        setFunds(coreState.getFunds());
        setData(coreState.getData());
        setProcessingSpeed(coreState.getProcessingSpeed());
        setDataWarehouseCapacity(coreState.getDataWarehouseCapacity());
        setInnovationCredits(coreState.getInnovationCredits());
      }, 0);
    };

    coreState.subscribeToStateChanges(handleStateChange);

    return () => {
      coreState.unsubscribeFromStateChanges(handleStateChange);
    };
  }, [coreState]);

  return { funds, data, processingSpeed, dataWarehouseCapacity, innovationCredits };
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
  const coreState = useContext(CoreStateContext);
  const { funds, data, processingSpeed, dataWarehouseCapacity, innovationCredits } = useResourceOverview(coreState);

  return (
    <Box>
      <Typography variant="h6">Funds: $<AnimatedNumber value={funds} roundModifier={1} /></Typography>
      <Typography variant="h6">Data Warehouse Usage: <AnimatedNumber value={data} roundModifier={1} />/<AnimatedNumber value={dataWarehouseCapacity} roundModifier={1} /> Mb</Typography>
      <Typography variant="h6">Base Processing Speed: <AnimatedNumber value={processingSpeed} roundModifier={100} /> Mb/s</Typography>
      <Typography variant="h6">Innovation Credits: (λ)<AnimatedNumber value={innovationCredits} roundModifier={1} /></Typography>
    </Box>
  );
}
