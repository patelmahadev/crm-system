import React, { useRef } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path;
  return (
    <div className="app-sidebar">
      <div className="logo-wrapper">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <List component="nav">
        <ListItemButton
          name="Customer"
          selected={isActive("/home")}
          onClick={() => navigate("/home")}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton
          name="resultForm"
          selected={isActive("/list")}
          onClick={() => navigate("/list")}
        >
          <ListItemIcon>
            <DashboardCustomizeIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItemButton>
        <ListItemButton
          name="resultForm"
          
          selected={isActive("/customer/form")}
          onClick={() => navigate("/customer/form")}
        >
          <ListItemIcon>
            <DashboardCustomizeIcon />
          </ListItemIcon>
          <ListItemText primary="Customer" />
        </ListItemButton>
      </List>
    </div>
  );
};
export default Sidebar;
