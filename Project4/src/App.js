import './App.css';

import React from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail"
import UserList from "./components/UserList"
import UserPhotos from "./components/UserPhotos"
import SignUp from "./components/LoginRegister/SignUp"
import SignIn from "./components/LoginRegister/SignIn"
import AddPhoto from './components/AddPhoto/AddPhoto';
const App = (props) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const handleLogin = (newToken) => {
    setToken(newToken)
  }
  const handleLogout = () =>{
    setToken(null)
  }
  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar/>
          </Grid>
          <div className="main-topbar-buffer" />
          {token &&
                <Grid item sm={3}>
                    <Paper className="main-grid-item">
                        <UserList />
                    </Paper>
                </Grid>
            }
            <Grid item sm={token ? 9 : 12}>
                <Routes>
                    <Route
                        path="/signin"
                        element={<SignIn onLogin={handleLogin} onLogout={handleLogout}/>}
                    />
                    <Route
                        path="/signup"
                        element={<SignUp />}
                    />
                    <Route
                        path="/addNewPhoto"
                        element={token ? <AddPhoto /> : <Navigate to="/signin" />}
                    />
                    <Route
                        path="/users/:userId"
                        element={token ? <UserDetail /> : <Navigate to="/signin" />}
                    />
                    <Route
                        path="/photos/:userId"
                        element={token ? <UserPhotos /> : <Navigate to="/signin" />}
                    />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/" element={token ? <UserList /> : <Navigate to="/signin" />} />
                </Routes>
            </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
