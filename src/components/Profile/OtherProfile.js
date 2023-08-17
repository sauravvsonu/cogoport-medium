import React, { useState, useEffect } from "react";
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
import OtherProfileData from "./OtherProfileData";
import StoriesList from "../Pages/StoriesList";
import { useParams } from "react-router";

const OtherProfilePage = () => {
  //   var userData = JSON.parse(localStorage.getItem("currentUser")) || {};
  const { userId } = useParams();

  const [tabValue, setTabValue] = useState(0);
  const [blogData, setBlogData] = useState(
    JSON.parse(localStorage.getItem("blogs"))
  );
  const [draftData, setDraftData] = useState(
    JSON.parse(localStorage.getItem("draft"))
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [visibleBlog, setVisibleBlog] = useState([]);
  const handleTabChange = (event, newValue) => {
    // Handle tab change logic here
    setTabValue(newValue);
    setVisibleBlog([]);
  };
  useEffect(() => {
    // console.log(tabValue, "tabValue")
    setBlogData(JSON.parse(localStorage.getItem("blogs")));
    setUserData(JSON.parse(localStorage.getItem("currentUser")));
    console.log(userData, "userData", userId);

    setVisibleBlog(blogData.filter((blog) => blog.user_id == userId));
  }, []);

  return (
    <>
      <BlogNav />
      {console.log(visibleBlog)}
      <Container maxWidth="md" sx={{ marginTop: "5rem" }}>
        <OtherProfileData
          userId={userId}
          value= {visibleBlog}
          author={visibleBlog.length && visibleBlog[0].author}
          noPost={ visibleBlog.length}
        />
        <Box mt={4} sx={{ justifyContent: "center" }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="User Posts" />
            {/* <Tab label="Saved Posts" />
            <Tab label="Liked Posts" />
            <Tab label="Post Drafts" />
            <Tab label="Lists" /> */}
          </Tabs>
          {/* Content for each tab */}
          {/* Render your post, saved post, liked post, and draft components here */}
        </Box>
        <Box mt={4} sx={{ justifyContent: "center" }}>
          {visibleBlog && (
            <StoriesList blogList={visibleBlog} value={tabValue} />
          )}
        </Box>
      </Container>
    </>
  );
};

export default OtherProfilePage;
