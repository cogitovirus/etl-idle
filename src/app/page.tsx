'use client'
import Game from "@/app/components/game/Game";
import NavAppBar from "@/app/components/nav-app-bar/NavAppBar";
import { Box } from "@mui/material";
import React from "react";
import { GameStateProvider } from './contexts/GameStateContext';


export default function Home() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <GameStateProvider>
      <Box sx={{ display: 'flex' }}>
        <NavAppBar handleDrawerToggle={handleDrawerToggle} />
        {/* <NavDrawer open={open} /> */}
        <Game />
      </Box>
    </GameStateProvider>
  );
}
