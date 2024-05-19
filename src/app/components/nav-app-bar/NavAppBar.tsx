import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from "@mui/material";
import {  MenuIcon } from "lucide-react";


type NavAppBarProps = {
  handleDrawerToggle: () => void;
};

export default function NavAppBar({ handleDrawerToggle }: NavAppBarProps) {
  return (
    <AppBar position="fixed">
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        sx={{
          marginRight: 5,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        ETL Idle v0.1.2
      </Typography>
    </Toolbar>
  </AppBar>
  );
}