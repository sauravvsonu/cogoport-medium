import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
// import { useSelector, useDispatch } from "react-redux";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
//   const comments = useSelector(state => state.comments[postId] || []);
//   const dispatch = useDispatch();
const [comments, setComments] = useState([])

  const handleCommentSubmit = () => {
    if (!comment) return;
    // dispatch(addComment(postId, comment));
    const userData = JSON.parse(localStorage["currentUser"])
    console.log(userData, "userData");
    const blogData = JSON.parse(localStorage["blogs"])
      blogData[postId -1].postComment.push({
        userId: userData.id, 
        comment: comment,
        userName: userData.name
      })
      localStorage.setItem("blogs", JSON.stringify(blogData))
      setComments(blogData[postId -1].postComment.reverse())
    setComment("");
  };
  useEffect(() => {
    var postData = JSON.parse(localStorage.getItem('blogs'))
    //   console.log(postData, "postId");
      setComments(postData[postId -1].postComment.reverse())
  }, [])
  

  return (
    <div>
      {/* <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      /> */}
      <TextField
        id="outlined-multiline-flexible"
        label="Comment"
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        sx={{ width: '100%' }}
        
      />
      {/* <button onClick={handleCommentSubmit}>Submit Comment</button> */}
      <Button variant="outlined" color="primary" onClick={handleCommentSubmit}>
        Submit Comment
      </Button>
      <div>
       
        {comments && comments.map((comment, index) => (

        <List sx={{ width: '100%', bgcolor: 'background.paper' }} key={index}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
        //   primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               {comment.userName}
              </Typography>
              {` — ${comment.comment}…`}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
        //   <div key={index}>{comment.comment}</div>

        ))}
      </div>
    </div>
  );
};

export default CommentSection;
