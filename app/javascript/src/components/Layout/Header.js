import React, { useState } from "react";
import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import welcome from "../../assets/hello.png";

const settings = ["Users", "Logout"];

const Header = () => {
  const naviagte=useNavigate()
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  const handleLogout = () => {
    localStorage.clear();
    naviagte("/");
  };
  return (
    <AppBar position="static">
      <Container className="container">
        <Grid container alignItems="center">
          <Grid item sm={6}>
            <Typography className="header-title">
              <img alt="welcome" src={welcome} /> Welcome User
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Toolbar disableGutters sx={{ justifyContent: "flex-end" }}>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmIh7V-Sq7K48WnUqtu18enb2Mnm_3fwnDJg&usqp=CAU"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={
                      setting === "Logout" ? handleLogout : handleCloseUserMenu
                    }>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};
export default Header;
