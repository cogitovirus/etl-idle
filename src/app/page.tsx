'use client'
import React from "react";
import { Box } from "@mui/material";
import Game from "@/app/components/game/Game";
import NavDrawer from "@components/nav-drawer/NavDrawer";
import NavAppBar from "@/app/components/nav-app-bar/NavAppBar";

// temp
import Upgrade from './components/upgrade/Upgrade';
import { GameStateProvider } from './contexts/GameStateContext';

export default function Home() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <NavAppBar handleDrawerToggle={handleDrawerToggle} />
      {/* <NavDrawer open={open} /> */}
      <GameStateProvider>
        <Game />
      </GameStateProvider>
    </Box>
  );
}
