import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { useState } from "react";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import { useAuth } from "src/context/AuthContext";
import { logout } from "src/service";

const drawerWidth = 240;

const settings = ["Account", "Logout"];

// Mixin when the drawer is open
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  [theme.breakpoints.down("sm")]: {
    display: "block", // Hide drawer completely on smaller screens
  },
});

// Mixin when the drawer is closed
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`, // This is generally a small icon-width drawer
  [theme.breakpoints.down("sm")]: {
    width: 0, // Hide the drawer completely by setting width to 0 on smaller screens
    display: "none", // Ensure it's not just invisible but also not taking up any space
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  height: 55,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  color: theme.palette.text.primary,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  height: 56,
  [theme.breakpoints.up("sm")]: {
    width: `calc(100% - ${56}px)`,
  },
  "&.MuiAppBar-root": {
    boxShadow: "none",
    backgroundColor: "#fff",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  "& .MuiToolbar-root": {
    minHeight: 56,
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ComplexAppBar() {
  const { user } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const onMenuClick = (setting: string | null) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      logout();
      // Refresh the page to reflect the logout
      window.location.reload();
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              [theme.breakpoints.up("sm")]: {
                display: "none", // Hides the menu icon on larger screens
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flex: 1 }} variant="h6" noWrap component="div">
            Feed
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user && (
                  <Avatar
                    src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${user.username}`}
                    alt={`Avatar for ${user.firstName}`}
                    sx={{
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",

                "& .MuiMenu-paper": {
                  width: "125px",
                  padding: ".5rem",
                },
                "& .MuiList-root": {
                  p: 0,
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  px: ".5rem",
                  py: ".25rem",
                }}
              >
                My Account
              </Typography>
              <Divider />
              {settings.map((setting) => (
                <MenuItem
                  disableGutters
                  key={setting}
                  onClick={() => onMenuClick(setting)}
                  sx={{
                    px: ".5rem",
                    borderRadius: "5px",
                    my: ".25rem",
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                  <Divider />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        variant="permanent"
        open={open}
        onClose={toggleDrawer}
      >
        <DrawerHeader>
          <IconButton
            sx={{
              [theme.breakpoints.up("sm")]: {
                display: "none",
              },
            }}
            onClick={toggleDrawer}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Profile", "Settings"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#18181B",
                  }}
                >
                  {index % 2 === 0 ? (
                    <AccountBoxOutlinedIcon />
                  ) : (
                    <SettingsOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
