import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import "./Page.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import StoriesCard from "./StoriesCard";
import StoriesList from "./StoriesList";
// import React, {useState} from "react";
import { alpha } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import Divider from "@mui/material/Divider";
// import useScrollTrigger from "@mui/material/useScrollTrigger";
// import Slide from "@mui/material/Slide";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FilteredPostList from "./FilterData";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const pages = [
  "For you",
  "Following",
  "Travel",
  "Technology",
  "Lifestyle",
  "Your Stories",
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StoriesData = () => {
  const [tabValue, setTabValue] = React.useState("For you");
  const [blogData, setBlogData] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,

    threshold: 0,
  });

  useEffect(() => {
    setBlogData([]);
    var user = JSON.parse(localStorage.currentUser);
    var data = localStorage.blogs;
    data = data && JSON.parse(data);
    data = data && data.reverse();
    // console.log(data, user);
    if (tabValue === "For you") {
      setBlogData(data);
    }
    if (tabValue === "Following") {
      setBlogData(
        user.followed &&
          data.filter((blog) => user.followed.includes(blog.user_id))
      );
    }
    if (tabValue === "Travel") {
      setBlogData(data.filter((blog) => blog.topic === "travel"));
    }
    if (tabValue === "Technology") {
      setBlogData(data.filter((blog) => blog.topic === "technology"));
    }
    if (tabValue === "Lifestyle") {
      setBlogData(data.filter((blog) => blog.topic === "lifestyle"));
    }
    if (tabValue === "Your Stories") {
      setBlogData(data.filter((blog) => blog.user_id === user.id));
    }
  }, [tabValue]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState();

  const handleSearchChange = (event) => {
    const query = event.target.value;

    setSearchQuery(query);

    // Filter posts based on the search query
    // const filtered = posts.filter(
    //   (post) =>
    //     post.title.toLowerCase().includes(query.toLowerCase()) ||
    //     post.desc.toLowerCase().includes(query.toLowerCase())
    // );

    // setFilteredPosts(filtered);
  };
  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
    var user = JSON.parse(localStorage.currentUser);
    var data = localStorage.blogs;
    data = data && JSON.parse(data);
    const filtered = data.filter(
      (post) =>
       post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.author.toLowerCase().includes(searchQuery.toLowerCase()) || 
       post.topic.toLowerCase().includes(searchQuery.toLowerCase())
    
    
    )
    setBlogData(filtered);
    // data = data.reverse();
      
    }
  };
  const handleFilterData = (e) => {
    // console.log(e);
    setBlogData(e)
  }
  return (
    <Box className="stories-data">
      <Container sx={{ flexGrow: 1 }}>
        <Search sx={{ borderRadius: "30px", backgroundColor:"lightgrey", marginTop:"1rem" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search your sparkle…"
            inputProps={{
              "aria-label": "search",
              value: searchQuery,
              onChange: handleSearchChange,
              onKeyDown: handleSearchKeyPress,
            }}
            // value={searchQuery}
            // onChange={handleSearchChange}
          />
        </Search>
        <FilteredPostList posts={blogData} filteredData={handleFilterData} />
        <AppBar
          position="sticky"
          sx={{ backgroundColor: "white", color: "black" }}
          elevation={0}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Tabs items"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": { fontSize: { xs: "0.8rem", sm: "1rem" } },
            }}
          >
            {/* <Tab aria-label="addButton" icon={<AddOutlinedIcon />}>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <AddOutlinedIcon />
              </IconButton>
            </Tab> */}
            {pages.map((page) => (
              <Tab value={page} label={page}></Tab>
            ))}
          </Tabs>
        </AppBar>
        <Grid container>
          <Grid item xs={12}>
            {tabValue && blogData && (
              <StoriesList blogList={blogData} value={tabValue} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StoriesData;
