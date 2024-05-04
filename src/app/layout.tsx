'use client'; // fcking ridiculous. figure out how to get rid of this
import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Inter } from "next/font/google";
import theme from '@theme/theme';
import {
  Toolbar,
  Box,
} from "@mui/material";
import NavDrawer from "@components/nav-drawer/NavDrawer";
import NavAppBar from "@/app/components/nav-app-bar/NavAppBar";
import React from "react";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "ETL Idle",
//   description: "Incremental game about data engineering",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
              <NavAppBar handleDrawerToggle={handleDrawerToggle} />

              <NavDrawer open={open} />
              
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}><Toolbar />{children}</Box>
            </Box>

          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
