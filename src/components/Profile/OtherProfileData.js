import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
} from "@mui/material";
// import BlogNav from "../BlogPage/BlogNav";

const OtherProfileData = (props) => {
  var userData = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [followed, setFollowed] = useState("Follow");

  const handleFollowClick = () => {
    setFollowed(followed === "Follow" ? "Followed" : "Follow");
    if (followed === "Follow") {
        // save userId of this user in follwed array in currentUser localstorage
        var currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
        currentUser.followed = currentUser.followed || [];
        // change str to int
        currentUser.followed.push(parseInt(props.userId));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

    //   localStorage.setItem("followed", JSON.stringify(props.author));
    }
    else{
        // remove userId of this user from follwed array in currentUser localstorage
         currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
        
        currentUser.followed = currentUser.followed.filter((followedUser) => followedUser !== parseInt(props.userId));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  };

  useEffect(() => {
    var currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    currentUser.followed = currentUser.followed || [];
    if (currentUser.followed.includes(parseInt(props.userId))) {
      setFollowed("Followed");
    }
  
    
  }, [])
  

  return (
    <>
      <Box
        mt={4}
        mb={4}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ justifyContent: "center" }}>
          <Avatar
            alt={userData.name}
            src="https://lh3.googleusercontent.com/a/AAcHTtf7SqgmfTFk1O48-_lUcNCID_gyYLf83PjaREaQBOpLtw=s360-c-no"
            sx={{ width: "8rem", height: "8rem" }}
          />
          <Button
            variant={followed === "Follow" ? "outlined" : "contained"}
            color="primary"
            sx={{ margin: "1rem" }}
            onClick={handleFollowClick}
          >
            {followed}
          </Button>
        </Box>
        <Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box sx={{ margin: "0.8rem" }}>
              <TextField
                label="Name"
                value={props.author}
                // onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="No. of Posts"
                value={props.noPost}
                // onChange={(e) => setInterest(e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OtherProfileData;
