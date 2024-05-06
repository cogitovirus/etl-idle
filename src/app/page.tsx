'use client'
import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import NavDrawer from "@components/nav-drawer/NavDrawer";
import NavAppBar from "@/app/components/nav-app-bar/NavAppBar";
import TestGameComponent from "./components/test-game-component/TestGameComponent";
import DataCollectionStack from "./components/data-collection-stack/DataCollectionStack";

export default function Home() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <NavAppBar handleDrawerToggle={handleDrawerToggle} />

      <NavDrawer open={open} />

      <Grid container spacing={2} padding={2} ml={8} mt={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%', padding: 2 }}>
            <Paper elevation={2} sx={{ marginTop: 2, padding: 2 }}>
              {/* Temp test game component */}
              <TestGameComponent />
            </Paper>
            <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>DataCollectionStackContainer</Typography>
            <Paper elevation={2} sx={{ marginTop: 2, height: 300, padding: 2 }}>
              {/* dataCollection stack */}
              <DataCollectionStack />
            </Paper>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', padding: 2 }}>
            <Typography variant="h6" component="div">UpgradeCard</Typography>
            <Paper elevation={2} sx={{ marginTop: 2, padding: 2 }}>
              {/* Place content for UpgradeCard here */}
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
