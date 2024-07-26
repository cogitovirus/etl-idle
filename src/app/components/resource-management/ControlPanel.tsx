import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Paper, Divider } from "@mui/material";
import { UpgradeList } from "./control-tabs/upgrade-list/UpgradeList";
import { TaskList } from "./control-tabs/task-list/TaskList";
import { GeneratorList } from "./control-tabs/generator-list/GeneratorList";
import { ActionList } from "./control-tabs/action-list/Action-list";

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
    <Paper elevation={2} sx={{ marginTop: 0, padding: 2, minWidth: 440 }}>
      <Box sx={{ width: '100%' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="control panel tabs">
          <Tab label={<Typography variant="h6">Actions/Tasks</Typography>} />
          <Tab label={<Typography variant="h6">Upgrades</Typography>} />
          <Tab label={<Typography variant="h6">Skills</Typography>} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Typography variant="h6" sx={{ mb: 2 }}>Actions</Typography>
          <ActionList />
          <Divider sx={{ my: 3, width: '100%' }} />
          <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>Tasks</Typography>
          <TaskList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UpgradeList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <GeneratorList />
        </TabPanel>
      </Box>
    </Paper>
  );
}

export default ControlPanel;