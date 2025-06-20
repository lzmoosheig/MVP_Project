'use client';

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import NavLink from "@/components/NavLink";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import 'leaflet/dist/leaflet.css';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme({
  palette: {
    primary: {
      light: "#154c79",
      main: "#154c79",
      dark: "#063970",
      contrastText: "#fff",
    },
  },
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [unread, setUnread] = useState(0);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetch('/api/messages/unread')
      .then(res => res.json())
      .then(data => setUnread(data.count))
      .catch(() => setUnread(0));
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: "36px", ...(open && { display: "none" }) }}>
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Tableau de bord
            </Typography>
            <Box sx={{ flexShrink: 0, display: "flex", justifyContent: "center" }}>
              <img src="/logo.png" alt="Logo" style={{ height: 50 }} />
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", px: [1] }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          <List component="nav">
            <NavLink href="/dashboard/home">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </NavLink>

            <NavLink href="/dashboard/profile">
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Mon profil" />
            </NavLink>

            <NavLink href="/dashboard/missions">
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="Mes missions" />
            </NavLink>

            <NavLink href="/dashboard/pendingMission">
              <ListItemIcon><HourglassBottomIcon /></ListItemIcon>
              <ListItemText primary="Missions en attente" />
            </NavLink>

            <NavLink href="/dashboard/messages">
              <ListItemIcon>
                <Badge badgeContent={unread} color="error">
                  <NotificationsIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Mes messages" />
            </NavLink>

            <NavLink href="#" onClick={async (e) => { e.preventDefault(); await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/login"; }}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </NavLink>
          </List>
        </Drawer>

        <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: "100vh", overflow: "auto" }}>
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}