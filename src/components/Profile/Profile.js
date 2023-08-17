import React, { useState , useEffect} from "react";
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
import BlogNav from "../BlogPage/BlogNav";
import ProfileData from "./ProfileData";
import StoriesList from "../Pages/StoriesList";
import ListActiveData from "./ListActiveData";
import excludeVariablesFromRoot from "@mui/material/styles/excludeVariablesFromRoot";

const ProfilePage = () => {
//   var userData = JSON.parse(localStorage.getItem("currentUser")) || {};

  const [tabValue, setTabValue] = useState(0);
  const [blogData, setBlogData] = useState(JSON.parse(localStorage.getItem("blogs")))
  const [draftData, setDraftData] = useState(JSON.parse(localStorage.getItem("drafts")))
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("currentUser")))
  const [listActive, setListActive] = useState(false)
const [visibleBlog, setVisibleBlog] = useState([])
  const handleTabChange = (event, newValue) => {
    // Handle tab change logic here
    setTabValue(newValue);
    setVisibleBlog([])
};
useEffect(() => {
    // console.log(tabValue, "tabValue")
    setBlogData(JSON.parse(localStorage.getItem("blogs")))
    setUserData(JSON.parse(localStorage.getItem("currentUser")))
    
    setListActive(false)
    if (tabValue === 0) {
      // short where blogData.userId == userData.id
      setVisibleBlog(blogData.filter((blog) => blog.user_id === userData.id))
    }
    else if (tabValue === 1) {
        setVisibleBlog(userData.savedPost && blogData.filter((blog) => userData.savedPost.includes(blog.id)))
    }
    else if (tabValue === 2) {
        setVisibleBlog(userData.likedPost && blogData.filter((blog) => userData.likedPost.includes(blog.id)))
    }
    else if (tabValue === 3) {
        setVisibleBlog(draftData.filter((blog) => blog.user_id === userData.id))
    }
    else if (tabValue === 4) {
        setListActive(true)
    }
  
    
  }, [tabValue, visibleBlog])
 const handleListView =(e) =>{
  // var ids = [...new Set(e)];
  // console.log(e, "this is e");
  setVisibleBlog( blogData.filter((blog) => e.includes(blog.id)))
 }

  return (
    <>
      <BlogNav />
      <Container maxWidth="md" sx={{ marginTop: "5rem" }}>
        <ProfileData />
        <Box mt={4} sx={{ justifyContent: "center" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Your Posts" />
            <Tab label="Saved Posts" />
            <Tab label="Liked Posts" />
            <Tab label="Post Drafts" />
            <Tab label="Lists" />
          </Tabs>
          {/* Content for each tab */}
          {/* Render your post, saved post, liked post, and draft components here */}
        </Box>
        <Box mt={4} sx={{ justifyContent: "center" }}>
          {listActive && <ListActiveData visiblePost={(e) => handleListView(e) }/>}
        {visibleBlog && 
              <StoriesList blogList={visibleBlog} value={tabValue}  />
            }
        </Box>
      </Container>
    </>
  );
};

export default ProfilePage;
