import React from 'react';
import { useGameState } from '@app/contexts/GameStateContext';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Generator from '@app/components/generator-example/Generator-example';
import Upgrade from '@app/components/upgrade/Upgrade';
import DataCollectionStack from "@app/components/data-collection-stack/DataCollectionStack";


export function Game() {
  const gameState = useGameState();

  return (
    <Grid container spacing={2} padding={2} ml={8} mt={4}>
      {/* Left Column */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ height: '100%', padding: 2 }}>
          <Paper elevation={2} sx={{ marginTop: 2, padding: 2 }}>
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
            <Box>
              <Typography variant="h6">Funds: ${gameState.getFunds()}</Typography>
              <Typography variant="h6">Data: {gameState.getData()} Mb</Typography>
              <Typography variant="h6">Processing Speed: {gameState.getProcessingSpeed()} Mb/s</Typography>
              <Typography variant="h6">Data Warehouse Capacity: {gameState.getDataWarehouseCapacity()} Mb</Typography>

              <Box>
                <Generator id="1" name="Basic Generator" rate={1} cost={100} />
                {/* Add more Generator components as needed */}
              </Box>

              <Box>
                <Upgrade id="1" name="Speed Upgrade" cost={200} />
                {/* Add more Upgrade components as needed */}
              </Box>
            </Box>
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Game;
