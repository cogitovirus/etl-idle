'use client'
import { Typography } from "@mui/material";
import React from "react";
import { Toolbar, Box } from "@mui/material";
import NavDrawer from "@components/nav-drawer/NavDrawer";
import NavAppBar from "@/app/components/nav-app-bar/NavAppBar";
import TestGameComponent from "./components/test-game-component/TestGameComponent";

export default function Home() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <NavAppBar handleDrawerToggle={handleDrawerToggle} />

      <NavDrawer open={open} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4, ml: 8 }}>
        <TestGameComponent />
      </Box>
    </Box>
  );
}
