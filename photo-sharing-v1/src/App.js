import './App.css';

import React, { useState } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from './components/LoginRegister/LoginRegister'
import Protected from './components/Protected/Protected';
import { getAccessToken, getAuthInfo } from './utils/token';
import NewPhoto from './components/NewPhoto/NewPhoto';
const App = () => {
  const [context, setContext] = useState()
  // const location = useLocation()

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar context={context} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {getAccessToken() && (
                 <UserList />
              )}
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path='login'
                  element={<LoginRegister />}
                />
                <Route element={<Protected />}>

                  <Route
                    path="/users/:userId"
                    element={<UserDetail fn={(context) => {
                      setContext(context)
                    }} />}
                  />
                  <Route path="/new-photo" element={<NewPhoto/>}/>
                  <Route
                    path="/photos/:userId"
                    element={<UserPhotos fn={(context) => {
                      setContext(context)
                    }} />}
                  />
                  <Route path="/users" element={<UserList fn={(context) => {
                    setContext(context)
                  }} />} />
                </Route>
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
