'use client'
import Batch from "@/app/components/batch/Batch";
import NavAppBar from "@/app/components/nav-app-bar/NavAppBar";
import { Box } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { CoreStateContext } from './contexts/GameStateContext';
import { CoreState } from '@engine/core/CoreState';

const coreState = new CoreState();

export default function Main() {
  // const coreStateContext = useContext(CoreStateContext);
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // TODO: verify if this is really needed
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | undefined>(undefined);

  const updateGame = (timestamp: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = timestamp - previousTimeRef.current;
      // Update only every 200ms
      if (deltaTime > 200) {
        coreState.updateGameState(deltaTime);
        previousTimeRef.current = timestamp;
      }
    } else {
      previousTimeRef.current = timestamp; // Initialize on the first frame
    }

    requestRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }); // Empty array means the effect runs only once on mount
  // TODO: verify if this is really needed

  return (
    <CoreStateContext.Provider value={coreState} >
      <Box sx={{ display: 'flex' }}>
        <NavAppBar handleDrawerToggle={handleDrawerToggle} />
        {/* <NavDrawer open={open} /> */}
        <Batch />
      </Box>
    </CoreStateContext.Provider>
  );
}
