import {
  Link,
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { useAuth } from "../hooks/useAuth";
import { Fragment, useState } from "react";
import {
  AccountCircle,
  Celebration,
  Login,
  Logout,
  Money,
  PersonAdd,
  Recycling,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PaidIcon from "@mui/icons-material/Paid";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const isSmall = window.innerWidth < 600;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    navigate("/");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <PublicIcon sx={{ mr: 2 }} />
        <Link
          href="/"
          color="inherit"
          underline="none"
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          EcoESCOM
        </Link>
        {user && (
          <Fragment>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={() => handleClose()}
            >
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "block",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Recycling fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Inicio</ListItemText>
                </MenuItem>
              </Link>
              <Link
                href="/perfil"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "block",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Mi perfil</ListItemText>
                </MenuItem>
              </Link>
              <Link
                href="/creditos"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "block",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Money fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Mis créditos</ListItemText>
                </MenuItem>
              </Link>
              <Link
                href="/transacciones"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "block",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PaidIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Mis transacciones</ListItemText>
                </MenuItem>
              </Link>
              {user.role === "SELLER" && (
                <Link
                  href="/promociones"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    display: "block",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Celebration fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Mis promociones</ListItemText>
                  </MenuItem>
                </Link>
              )}
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cerrar sesión</ListItemText>
              </MenuItem>
            </Menu>
          </Fragment>
        )}
        {!user &&
          (!isSmall ? (
            <Fragment>
              <Button
                startIcon={<Celebration />}
                color="inherit"
                href="/registro"
              >
                regístrate
              </Button>
              <Button
                startIcon={<Login />}
                color="inherit"
                href="/iniciar-sesion"
              >
                inicia sesión
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                href="/registro"
              >
                <PersonAdd />
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                href="/iniciar-sesion"
              >
                <Login />
              </IconButton>
            </Fragment>
          ))}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
