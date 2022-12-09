import { InsertEmoticon } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import React, { useState } from "react";
import {useHistory } from "react-router-dom";
// import theme from "..theme/";
import "./Header.css";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));


const Header = ({ children, hasHiddenAuthButtons }) => {
const history = useHistory();
  const Redirect = () => {
    history.push("/");
  }
  const routeToLogin =()=> {
    history.push("/login")
  }
  const routeToLogout = () => {
    localStorage.clear();
    history.push("/")
    window.location.reload();
  }
  
  const username = localStorage.getItem("username")
  
  const routeToRegister =()=> {
    history.push("/register")
  }
    if(hasHiddenAuthButtons){
      return (
        <Box className="header">
          <Box className="header-title">
              <img src="logo_light.svg" alt="QKart-icon"></img>
          </Box>
          {children}
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={Redirect}
          >
            Back to explore
          </Button>
        </Box>
        
      );
    }else if(username){
      return(
      <Box className="header">
          <Box className="header-title">
              <img src="logo_light.svg" alt="QKart-icon"></img>
          </Box>
          {children}
          <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}>
              <Button
            
            variant="text"
          > 
          <Avatar src="avatar.png"  alt={localStorage.getItem("username")}/><div
            className="text"
            >
          &nbsp;&nbsp;{localStorage.getItem("username")}

          </div>
          </Button>
          <Button
            // className="explore-button"
            variant="text"
            onClick={routeToLogout}
          >
            LOGOUT
          </Button>
            </Stack>
          </Box>
      )
    }else{
      return(
        <Box className="header">
          <Box className="header-title">
              <img src="logo_light.svg" alt="QKart-icon"></img>
          </Box>
          {children}
          <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}>
              <Button
            className="explore-button"
            variant="text"
            onClick={routeToLogin}
          >
            LOGIN
          </Button>
          <Button
            // className="explore-button"
            variant="contained"
            onClick={routeToRegister}
          >
            REGISTER
          </Button>
            </Stack>
          </Box>
      )
    }
    
    
};

export default Header;
