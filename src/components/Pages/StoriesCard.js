import React, {useState, useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button, Menu, Badge } from "@mui/material";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import moment from "moment";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
// import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
const bull = (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      mx: "2px",
      transform: "scale(0.8)",
      margin: "0 0.5rem",
    }}
  >
    •
  </Box>
);

// style for this component

const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: "x-small",
  },
});

const StoriesCard = (props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(props.value.postLike)
  const [saved, setSaved] = useState(false)
  const [views, setViews] = useState(props.value.views)
  const [comments, setComments] = useState(props.value.postComment && props.value.postComment.length)
  const [userData, setUserData] = useState({})

  const handleLike= () =>{
    setLiked(!liked)
    setLikes(!liked ? likes+1 : likes-1)
    if (!liked){
      const data = JSON.parse(localStorage["currentUser"])
      // setUserData({...userData, likedPost: [...userData.likedPost, props.value.id]})
      var likeData = {...data, likedPost: [...data.likedPost, props.value.id]}
      // setUserData(likeData)
      localStorage.setItem("currentUser", JSON.stringify(likeData))
      const blogData = JSON.parse(localStorage["blogs"])
      blogData[props.value.id-1].postLike += 1
      localStorage.setItem("blogs", JSON.stringify(blogData))
    }
    else{
      // setUserData({...userData, likedPost: userData.likedPost.filter(item => item !== props.value.id)})
      const data = JSON.parse(localStorage["currentUser"])
      var dislikeData = {...data, likedPost: data.likedPost.filter(item => item !== props.value.id)}
      // setUserData(dislikeData)
      localStorage.setItem("currentUser", JSON.stringify(dislikeData))
      const blogData = JSON.parse(localStorage["blogs"])
      blogData[props.value.id-1].postLike -= 1
      localStorage.setItem("blogs", JSON.stringify(blogData))
    }


  }
  const handleSave = () =>{
    setSaved(!saved)
    if (!saved){
      // setUserData({...userData, savedPost: [...userData.savedPost, props.value.id]})
      const data = JSON.parse(localStorage["currentUser"])
      var saveData = {...data, savedPost: [...data.savedPost, props.value.id]}
      // setUserData(saveData)
      localStorage.setItem("currentUser", JSON.stringify(saveData))
      

    }
    else{
      // setUserData({...userData, savedPost: userData.savedPost.filter(item => item !== props.value.id)})
      const data = JSON.parse(localStorage["currentUser"])
      var unsaveData = {...data, savedPost: data.savedPost.filter(item => item !== props.value.id)}
      // setUserData(unsaveData)
      localStorage.setItem("currentUser", JSON.stringify(unsaveData))
    }
  }

  const handleComment = () =>{
    setComments(comments+1)
  }
  useEffect(() => {
    const data = JSON.parse(localStorage["currentUser"])
   setUserData(data)
   if (data.savedPost && data.savedPost.includes(props.value.id)){
     setSaved(true)
   }
   if (data.likedPost && data.likedPost.includes(props.value.id)){
     setLiked(true)
   }

  }, [])
  
  const handlePostClick = () => {
    if (props.value.type === "draft") {
      navigate(`/write?draft=${props.value.id}`);
    }
    else {
      return navigate(`/post/${props.value.id}`);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Card
        container
        center
        sx={{ width: "80%", minWidth: "300px", margin: "0 2rem" }}
        elevation={0}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent
            sx={{ display: "flex", alignItems: "center", paddingBottom: "0" }}
            onClick={() => navigate(`/profileDetail/${props.value.user_id}`)}
          >
            <Avatar
              aria-label="Creator DP"
              sx={{ marginRight: "0.5em", width: 20, height: 20 }}
              src="https://lh3.googleusercontent.com/ogw/AGvuzYaLmOQ62-_ighBAMWZK2MsBmrWAZxkTLFMeHrWi=s32-c-mo"
            >
              {props.value.author}
            </Avatar>
            <Typography component={"div"} sx={{ display: "flex" }}>
              <Typography variant="h6" color="initial">
                {props.value.author}
              </Typography>
              {/* <Typography variant="h6" color="grey" sx={{ margin: "0 0.4rem" }}>
                in
              </Typography>
              <Typography variant="h6" color="initial">
                In Fitness And In Health
              </Typography> */}
             </Typography>
            <Typography variant="h6" color="grey">
              {bull} {moment(props.value.createAt).format("MMM D")}
            </Typography>
          </CardContent>
          <CardContent sx={{ paddingBottom: "0", paddingTop: "0" }}>
            <CardActionArea sx={{ display: "flex", alignItems: "center", justifyContent:"space-between" }} onClick={handlePostClick}>
              <Box>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "600" }}
                  color="initial"
                >
                  <div  dangerouslySetInnerHTML={{__html: props.value.title}}></div>
                  {/* {props.value.title} */}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "normal",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                  }}
                  color="initial"
                >
                  <div  dangerouslySetInnerHTML={{__html: props.value.desc}}></div>
                  {/* {props.value.desc} */}
                </Typography>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: "20%" }}
                image={props.value.selectedImage}
                alt="Story Image"
              />
            </CardActionArea>
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              onClick={handlePostClick}
            >
              <Button
                variant="outline"
                sx={{
                  background: "lightgrey",
                  borderRadius: "20px",
                  textTransform: "capitalize",
                  minWidth: "50px",
                  // width: "50px",
                  height: "20px",
                }}
              >
                <Typography variant="h6">
                  
                   {props.value.topic}
                  </Typography>
              </Button>
              <Typography
                variant="h6"
                color="grey"
                sx={{ marginLeft: "0.5rem" }}
                
              >
                {props.value.minToRead} min read
              </Typography>
            </Box>
            <Box
              sx={{
                display: (props.value.type === "draft") ? "none": "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              
            >
              
              <Tooltip title="Save Story" placement="top">
                <IconButton aria-label="Save Story" onClick={handleSave}>
                  {saved ? <BookmarkAddedIcon color="secondary" sx={{ fontSize: 20 }}/> : <BookmarkAddOutlinedIcon sx={{ fontSize: 20 }}/>}
                </IconButton>
              </Tooltip>
              <Tooltip title="Like" placement="top">
              <Badge badgeContent={likes} color="error">
                <IconButton aria-label="Like" onClick={handleLike}>
                  {liked ? <ThumbUpIcon  color="secondary" sx={{ fontSize: 20 }}/> : <ThumbUpOutlinedIcon sx={{ fontSize: 20 }}/>}
                </IconButton >
                </Badge>
              </Tooltip>
              <Tooltip title="views" placement="top">
              <Badge badgeContent={views} color="error" >
                <IconButton aria-label="views" onClick={handlePostClick} >
                  <VisibilityOutlinedIcon sx={{ fontSize: 20 }}/>
                </IconButton>
                </Badge>
              </Tooltip>
              <Tooltip title="Comment" placement="top">
              <Badge badgeContent={comments} color="error" >
                <IconButton aria-label="Comment" onClick={handlePostClick}>
                  <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 20 }}/>
                </IconButton>
                </Badge>
              </Tooltip>

             
            </Box>
          </CardContent>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default StoriesCard;
