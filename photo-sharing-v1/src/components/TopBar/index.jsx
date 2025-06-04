import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken, getUserLoggedInInfo, removeToken } from "../../utils/token";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar(props) {
  const navigate = useNavigate()
  
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        {getAccessToken() && (
          <>
            <Typography variant="h5" color="inherit">
              {"Hi " + getUserLoggedInInfo()?.first_name}
            </Typography>
            <Button onClick={() => {
              navigate("/new-photo")
            }} style={{ textDecoration: "none", color: "white", fontSize: "18" }}>Add Photo</Button>
            <Button style={{ textDecoration: "none", color: "white", fontSize: "18" }} onClick={() => {
              removeToken()
              window.location.href= "/login"
            }}>Logout</Button>
            <Box sx={{ flexGrow: 1 }} />
          </>
        )}

        {props.context ? (
          <Typography variant="h5" color="inherit">
            {props.context}
          </Typography>
        ) : (
          (!getAccessToken() && (<Button onClick={() => {
            navigate("/login")
          }} style={{ textDecoration: "none", color: "white", fontSize: "18" }}>Please login</Button>))
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
