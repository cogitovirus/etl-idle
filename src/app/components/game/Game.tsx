import React from 'react';
import { useGameState } from '@app/contexts/GameStateContext';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Generator from '@app/components/generator-example/Generator-example';
import Upgrade from '@app/components/upgrade/Upgrade';
import DataCollectionStack from "@app/components/data-collection-stack/DataCollectionStack";
import { ResourceOverview } from '../resource-overview/ResourceOverview';
import { ControlPanel } from '../control/control-panel/ControlPanel';


export function Game() {
  const gameState = useGameState();

  return (
    <Grid
      container
      columnSpacing={{ xs: 1, sm: 4, md: 3 }}
      padding={2}
      ml={8}
      mt={4}
      justifyContent="center"
      rowSpacing={1}
    // alignItems="center"
    >
      {/* Left Column */}
      <Grid item xs={12} md={6} direction="column">
        <Paper elevation={2} sx={{ marginTop: 2, padding: 2, flexGrow: 1 }}>
          {/* Place for console */}
        </Paper>

        <Paper elevation={0} sx={{ marginTop: 2, height: 300, padding: 2 }}>
          {/* dataCollection stack */}
          <DataCollectionStack
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </Paper>
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Paper elevation={2} sx={{ marginTop: 2, padding: 2, flexGrow: 1 }}>
          <ControlPanel />

          {/* <Generator id="1" name="Basic Generator" rate={1} cost={100} /> */}
        </Paper>
      </Grid>

      <Grid item xs={12} md={6} />
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ marginTop: 0, padding: 2 }}>
          <ResourceOverview />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Game;
