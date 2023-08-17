import CommentSection from "./CommentSection";
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  InputLabel,
  Button,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";
import Editor from "react-medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/beagle.css";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
// import moment from "moment";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


const PostViewPage = (props) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.post.postLike);
  const [saved, setSaved] = useState(false);
  //   const [comments, setComments] = useState(props.post.postComment.length);
  const [userData, setUserData] = useState({});
  const [list, setList] = React.useState("");
  const [listItems, setItems] = React.useState([]);
  const [userPost, setUserPost] = useState(false);

  const handleChangelist = (event) => {
    const value = event.target.value;
  
    // Update the selected list array in localStorage
    const data = JSON.parse(localStorage["currentUser"]);
    const existingList = data.lists[value] || [];
    if (!existingList.includes(props.post.id)) {
      const updatedLists = {
        ...data.lists,
        [value]: [...existingList, props.post.id],
      };
      localStorage.setItem("currentUser", JSON.stringify({ ...data, lists: updatedLists }));
    }
  
    setList(value);
  };
  const deletePostFromLocalStorage = (postId) => {
    const blogData = JSON.parse(localStorage["blogs"]);
    const updatedBlogData = blogData.map((post) =>
      post.id === props.post.id ? { ...post, isDeleted: true } : post
    );
    localStorage.setItem("blogs", JSON.stringify(updatedBlogData));
  };
  const handleDelete = () => {
    // Delete the post from localStorage blogs
    deletePostFromLocalStorage(props.post.id);
  
    // You can also perform any other cleanup or navigation here
  
    // For example, navigate back to a certain page
    navigate("/"); // You need to import `useNavigate` from 'react-router-dom'
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(!liked ? likes + 1 : likes - 1);
    if (!liked) {
      const data = JSON.parse(localStorage["currentUser"]);
      var likeData = { ...data, likedPost: [...data.likedPost, props.post.id] };
      localStorage.setItem("currentUser", JSON.stringify(likeData));
      const blogData = JSON.parse(localStorage["blogs"]);
      blogData[props.post.id - 1].postLike += 1;
      localStorage.setItem("blogs", JSON.stringify(blogData));
    } else {
      const data = JSON.parse(localStorage["currentUser"]);
      var dislikeData = {
        ...data,
        likedPost: data.likedPost.filter((item) => item !== props.post.id),
      };
      localStorage.setItem("currentUser", JSON.stringify(dislikeData));
      const blogData = JSON.parse(localStorage["blogs"]);
      blogData[props.post.id - 1].postLike -= 1;
      localStorage.setItem("blogs", JSON.stringify(blogData));
    }
  };
  const handleSave = () => {
    setSaved(!saved);
    if (!saved) {
      const data = JSON.parse(localStorage["currentUser"]);
      var saveData = { ...data, savedPost: [...data.savedPost, props.post.id] };
      localStorage.setItem("currentUser", JSON.stringify(saveData));
    } else {
      const data = JSON.parse(localStorage["currentUser"]);
      var unsaveData = {
        ...data,
        savedPost: data.savedPost.filter((item) => item !== props.post.id),
      };
      localStorage.setItem("currentUser", JSON.stringify(unsaveData));
    }
  };
  useEffect(() => {
    const data = JSON.parse(localStorage["currentUser"]);
    var postData = JSON.parse(localStorage["blogs"]);
    if (props.post.user_id) {
      if (data.id === props.post.user_id) {
        setUserPost(true);
      } else {
        postData[props.postId - 1].views += 1;

        localStorage.setItem("blogs", JSON.stringify(postData));
        data.viewLeft -= 1;
        localStorage.setItem("currentUser", JSON.stringify(data));
      }
    }
  }, [props.post.user_id]);
  useEffect(() => {
    const data = JSON.parse(localStorage["currentUser"]);

    if (data.savedPost && data.savedPost.includes(props.post.id)) {
      setSaved(true);
    }
    if (data.likedPost && data.likedPost.includes(props.post.id)) {
      setLiked(true);
    }
  }, [userPost, saved, liked, props.post.id, props.post.user_id]);

  useEffect(() => {
    const data = JSON.parse(localStorage["currentUser"]);
    setUserData(data);
    // setList(data.lists.keys());
    console.log(Object.keys(data.lists), "list");
    setItems(Object.keys(data.lists));
  }, [props.post.id]);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          marginTop: "6rem",
          border: "2px solid lightgrey",
        }}
      >
        <Typography variant="h2" color="initial">
          <div dangerouslySetInnerHTML={{ __html: props.post.title }}></div>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          ~ <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Typography variant="h6" color="initial" sx={{ marginRight: "2rem" }}>
            {props.post.author}
          </Typography>
          {/* <Typography variant="h6" color="initial">{props.post.topic}</Typography> */}
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
            <Typography variant="caption">{props.post.topic}</Typography>
          </Button>
        </Box>
        <Box>
          <Typography variant="caption" color="initial">
            {props.post.minToRead} min read
          </Typography>
          <Typography variant="caption" color="initial">
            {" "}
            -- {moment(props.post.published_at).format("MMM D")}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginBottom: "2rem" }}>
        <Tooltip title="Save Story" placement="bottom">
          <IconButton aria-label="Save Story" onClick={handleSave}>
            {saved ? (
              <BookmarkAddedIcon color="primary" sx={{ fontSize: 30 }} />
            ) : (
              <BookmarkAddOutlinedIcon sx={{ fontSize: 30 }} />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Like" placement="bottom">
          <Badge badgeContent={likes} color="error">
            <IconButton aria-label="Like" onClick={handleLike}>
              {liked ? (
                <ThumbUpIcon color="primary" sx={{ fontSize: 30 }} />
              ) : (
                <ThumbUpOutlinedIcon sx={{ fontSize: 30 }} />
              )}
            </IconButton>
          </Badge>
        </Tooltip>
        <Box sx={{ display: userPost ? "flex" : "none" }}>
          <Button variant="outlined" color="primary" onClick={()=> navigate(`/write?post=${props.post.id}`)}>
            edit
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            delete
          </Button>
          <FormControl sx={{ width: "20%", height: "30px" }}>
            <InputLabel id="list-select">List</InputLabel>
            <Select
              labelId="select-list"
              id="list-select"
              value={list}
              label="List"
              onChange={handleChangelist}
            >
              {/* <MenuItem value={"pink"}>Red</MenuItem> */}
              {/* {console.log(listItems)} */}
              {listItems.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <MenuItem value={"pink"}>Red</MenuItem>
              <MenuItem value={"lightblue"}>Blue</MenuItem>
              <MenuItem value={"lightgreen"}>Green</MenuItem> */}
        </Box>
      </Box>
      <Box>
        {console.log(props.post.selectedImage)}
        <img
          src={props.post.selectedImage}
          alt="img"
          style={{ width: "100%", height: "50%" }}
        />
      </Box>
      <Box
        sx={{
          //   marginTop: "6rem",
          //   border: "2px solid lightgrey",
          padding: "1rem",
        }}
      >
        <Typography variant="Body1" color="initial">
          <div dangerouslySetInnerHTML={{ __html: props.post.desc }}></div>
        </Typography>
      </Box>

      <Box mt={4}>{props.post && <CommentSection postId={props.postId} />}</Box>
    </Container>
  );
};

export default PostViewPage;
