import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import StoriesData from "./StoriesData";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import useScrollTrigger from "@mui/material/useScrollTrigger";
// import Slide from "@mui/material/Slide";

const HomePage = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const navigate = useNavigate();
  useEffect( () => {
    
    if (localStorage.getItem('currentUser')) {
      setUserLoggedIn(true)
    }
    else {
      navigate('/getting-started')
    }
  }, []);

  //   const trigger = useScrollTrigger();
  return (
    <Box className="home-page">
      {!userLoggedIn ?   <Link to = {`/getting-started`}/>:
      <><UserNav /><Container sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={11} md={11} lg={8}>
              <StoriesData />
            </Grid>
            {/* <Grid item lg={4} md={4} sx={{ display: { xs: 'none', lg: 'block', md: 'block'} }}>
      <span style={{ backgroundColor: "lightgreen" }}>You</span>
    </Grid> */}
          </Grid>
        </Container></>}
    </Box>
  );
};

export default HomePage;
