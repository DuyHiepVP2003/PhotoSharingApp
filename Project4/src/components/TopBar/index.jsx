import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import "./styles.css";
import { useNavigate } from "react-router-dom";


function TopBar() {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  const handleLogout = function () {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate('/signin')
  }
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user ? `Hi ${user.first_name}` : "Please Login"}
        </Typography>
        <Button onClick={()=>{
          navigate("/addNewPhoto")
        }} color="inherit">
          {user ? "Add new photo" : ""}
        </Button>
        <Button onClick={handleLogout} color="inherit">
          {user ? "Logout" : ""}
        </Button>
      </Toolbar>
      
    </AppBar>
  );
}

export default TopBar;
