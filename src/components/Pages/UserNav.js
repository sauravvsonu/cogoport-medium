import React, {useState} from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
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
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

export default function UserNav() {
  const navigate = useNavigate();
  const trigger = useScrollTrigger();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogOut = async () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    axios
      .delete("http://localhost:3000/logout", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        }
      })
      .then((response) => {
        console.log(response["data"]);

        localStorage.removeItem("currentUser");
        localStorage.removeItem("Authorization");
        navigate("/getting-started");
      })
      .catch((error) => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("Authorization");
        navigate("/getting-started");
        // console.log("error");

        console.log(error);
      });
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ top: "2.5rem" }}
    >
      <MenuItem onClick={()=> {navigate('/profile')}}>Profile</MenuItem>
      <MenuItem onClick={()=> {navigate('/profile?tab=stories')}}>Stories</MenuItem>
      <MenuItem onClick={()=> {navigate('/profile?tab=draft')}}>Draft</MenuItem>
      <MenuItem onClick={()=> {navigate('/profile?tab=lists')}}>List</MenuItem>
      <Divider />
      
      <MenuItem onClick={()=> {navigate('/payment')}}>Become a member</MenuItem>
      <Divider />
      <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ top: "2.5rem" }}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={2} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <NoteAltOutlinedIcon />
        </IconButton>
        <p>Write</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar
            alt="Remy Sharp"
            src="https://lh3.googleusercontent.com/ogw/AGvuzYa-K4hwbt0dCtx1nkQmPzHK1__HTIkDHfGLwleL=s32-c-mo"
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

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
      console.log("Enter key pressed", searchQuery);
      // Perform search when Enter key is pressed
      // You can call your search function here
      // For example: handleSearch()
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Slide in={!trigger}>
        <AppBar position="relative" color="primary" elevation={0}>
          <Toolbar variant="dense">
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
        </IconButton> */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              onClick={() => {navigate("/getting-started")}}
            >
              Sparkle
            </Typography>
            {/* <Search sx={{ borderRadius: "30px" }} >
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
            </Search> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
              <MenuItem  onClick= {()=> {navigate("/write")}}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <NoteAltOutlinedIcon />
                </IconButton>
                <p>Write</p>
              </MenuItem>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {/* <AccountCircle /> */}
                <Avatar
                  alt="Remy Sharp"
                  src="https://lh3.googleusercontent.com/ogw/AGvuzYa-K4hwbt0dCtx1nkQmPzHK1__HTIkDHfGLwleL=s32-c-mo"
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
