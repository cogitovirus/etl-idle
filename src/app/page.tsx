'use client'
import Batch from "@/app/components/batch/Batch";
import NavAppBar from "@/app/components/nav-app-bar/NavAppBar";
import { CoreState } from '@engine/core/CoreState';
import { Box } from "@mui/material";
import { useState } from "react";
import { CoreStateContext } from './contexts/GameStateContext';

const coreState = new CoreState();

export default function Main() {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

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
