'use client'
import NavAppBar from "@/app/components/common/nav-app-bar/NavAppBar";
import { CoreState } from '@engine/core/CoreState';
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { CoreStateContext } from './contexts/GameStateContext';
import NavDrawer from "./components/common/nav-drawer/NavDrawer";
import ControlPanel from "./components/resource-management/ControlPanel";
import { ResourceOverview } from "./components/resource-management/resource-overview/ResourceOverview";
import DataCollectionStack from "./components/idle-mechanics/batch/data-collection-stack/DataCollectionStack";
import { NarrativeChat } from "./components/chatbot-narrative/NarrativeChat";

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

        <Grid container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          columnSpacing={{ xs: 1, md: 4 }}
          rowSpacing={2}
          padding={2}
          ml={8} // adjust slightly for the drawer
          mt={4} // adjust slightly for the app bar
        >
          <Grid container item id='idle-mechanics-area'
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
            xs={12} md={8}
          >
            <Grid item xs={12} sx={{ width: '80%' }}>
              <NarrativeChat />
            </Grid>
            <Grid item xs={12} sx={{ width: '80%' }}>
              {/* TODO: Batch hardcoded for now */}
              <DataCollectionStack
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />

            </Grid>

          </Grid>
          <Grid container item id='resource-management-area'
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            xs={12} md={4}
            rowSpacing={2}
          >
            <Grid item xs={12}>
              <ResourceOverview />
            </Grid>
            <Grid item xs={12}>
              <ControlPanel />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </CoreStateContext.Provider>
  );
}
