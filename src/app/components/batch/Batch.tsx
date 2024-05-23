import DataCollectionStack from "./activity/data-collection-stack/DataCollectionStack";
import { Grid, Paper } from '@mui/material';
// TODO: Control panel and resource overview should live outside of batch
import { ControlPanel } from '../control/control-panel/ControlPanel';
import { ResourceOverview } from '../resource-overview/ResourceOverview';
// TODO: feels like narrative should be independent of batch as well
import { NarrativeConsole } from '../narrative/NarrativeConsole';


export function Batch() {
  return (
    <Grid
      container
      columnSpacing={{ xs: 1, sm: 4, md: 3 }}
      padding={2}
      ml={8}
      mt={4}
      justifyContent="center"
      rowSpacing={1}>
      {/* Left Column */}
      <Grid item xs={12} md={6} direction="column">
        <Paper elevation={2} sx={{ marginTop: 2, padding: 2, flexGrow: 1 }}>
          <NarrativeConsole />
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

export default Batch;
