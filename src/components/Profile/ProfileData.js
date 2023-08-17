import React, { useState } from "react";
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

const ProfileData = () => {
    var userData = JSON.parse(localStorage.getItem("currentUser")) || {};
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [bio, setBio] = useState(userData.bio);
  const [interest, setInterest] = useState(userData.interest);
  const [followed, setFollowed] = useState("Follow")
  const [currentUser, setCurrentUser] = useState(false)

  const handleSave = () => {
    // Save user data to local storage
    userData.name = name;
    userData.email = email;
    userData.bio = bio;
    userData.interest = interest;
    userData.likedPost =[]
    userData.savedPost =[]
    userData.draft =[]
    userData.yourPost = []
    userData.lists = {
      pink: [],
      lightblue: [],
      lightgreen: [],
    }
    userData.viewLeft = 10
    userData.follower = 0



    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

const handleFollowClick = () => {
  setFollowed(followed === "Follow" ? "Followed" : "Follow")
}


  return (
    <>
        <Box
          mt={4}
          mb={4}
          sx={{ display: "flex" ,alignItems:"center", width:"100%", justifyContent:"space-around"}}
        >
          <Box sx={{justifyContent: "center"}}>
            <Avatar
              alt={userData.name}
              src="https://lh3.googleusercontent.com/a/AAcHTtf7SqgmfTFk1O48-_lUcNCID_gyYLf83PjaREaQBOpLtw=s360-c-no"
              sx={{ width: "8rem", height: "8rem"}}
            />
            {/* <Button variant={followed === "Follow" ? 'outlined' : 'contained'} color="primary" sx={{margin:"1rem"}} onClick={handleFollowClick}>
              {followed}
            </Button> */}
          </Box>
          <Box >
            {/* <Box>
              <Typography variant="h5">{userData.name}</Typography>
              <Typography variant="subtitle1">{userData.email}</Typography>
            </Box> */}
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box sx={{margin: "0.8rem"}}>

              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
              <TextField
                label="Email"
                value={email}
                // disabled
                />
                </Box>
                <Box>

              <TextField
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <TextField
                label="Interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
                </Box>
              <Button sx={{margin:"0.8rem"}} variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Typography variant="body1" color="initial">Post View Left = {userData.viewLeft ? userData.viewLeft : 10} </Typography>
            </Box>
          </Box>
        </Box>
        
    </>
  );
};

export default ProfileData;
