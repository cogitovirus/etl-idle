import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Paper } from "@mui/material";
import { UpgradeList } from "../upgrade-list/UpgradeList";
import { TaskList } from "../task-list/TaskList";
import { GeneratorList } from "../generator-list/GeneratorList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

export function ControlPanel() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="control panel tabs">
      <Tab label={<Typography variant="h6">Tasks</Typography>} />
        <Tab label={<Typography variant="h6">Upgrades</Typography>} />
        <Tab label={<Typography variant="h6">Generators</Typography>} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <TaskList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpgradeList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GeneratorList />
      </TabPanel>
    </Box>
  );
}

export default ControlPanel;
