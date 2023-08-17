import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  InputLabel,
  Button,
  Modal,
} from "@mui/material";
import Editor from "react-medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/beagle.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
const ImageInput = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));
const WriterPage = () => {
  const navigate = useNavigate();
  // const { draftId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const draftParam = searchParams.get("draft");
  const postParam = searchParams.get("post");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value);
  };
  // const removePTags = (content) => {
  //   const div = document.createElement("div");
  //   div.innerHTML = content;
  //   return div.innerText;
  // };

  const handleSaveDraft = () => {
    var user = localStorage.getItem("currentUser");
    user = JSON.parse(user);
    const draftData = {
      title,
      desc,
      selectedImage:
        (imageUrl && imageUrl) ||
        (selectedImage && URL.createObjectURL(selectedImage)),
      topic: selectedTopic,
      published_at: new Date().toISOString(),
      user_id: user["id"],
      type: "draft",
      author: user["name"] ? user["name"] : "Johnny Hammer",
      id:
        (localStorage.getItem("drafts")
          ? JSON.parse(localStorage.getItem("drafts")).length
          : 0) + 1,
    };
    // Save draft to local storage
    const drafts = JSON.parse(localStorage.getItem("drafts")) || [];
    drafts.push(draftData);
    localStorage.setItem("drafts", JSON.stringify(drafts));
    setDesc("");
    setTitle("");
    setSelectedImage(null);
    setSelectedTopic("");
    navigate("/");
  };

  const handleSubmit = () => {
    if (!title || !desc || !selectedImage || !selectedTopic) {
      navigate("/");
    }
    var user = localStorage.getItem("currentUser");
    user = JSON.parse(user);

    const blogData = {
      title,
      desc,
      selectedImage:
        (imageUrl && imageUrl) ||
        (selectedImage && URL.createObjectURL(selectedImage)),
      topic: selectedTopic,
      published_at: new Date().toISOString(),
      user_id: user["id"],
      author: user["name"] ? user["name"] : "Johnny Hammer",
      postLike: 0,
      postComment: [],
      views: 0,
      minToRead: Math.floor(desc.length / 50),
      id:
        (localStorage.getItem("blogs")
          ? JSON.parse(localStorage.getItem("blogs")).length
          : 0) + 1,
    };

    // Save draft to local storage
    if (postParam) {
      const posts = JSON.parse(localStorage.getItem("blogs")) || [];
      // const postFile = posts.find((pot) => pot.id === parseInt(postParam));
      posts[parseInt(postParam) - 1] = blogData;
      localStorage.setItem("blogs", JSON.stringify(posts));
    } else if (draftParam) {
      const drafts = JSON.parse(localStorage.getItem("drafts")) || [];
      drafts.splice(draftParam - 1, 1);
      localStorage.setItem("drafts", JSON.stringify(drafts));

      const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      blogs.push(blogData);
      localStorage.setItem("blogs", JSON.stringify(blogs));
    } else {
      const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      blogs.push(blogData);
      localStorage.setItem("blogs", JSON.stringify(blogs));
    }
    setDesc("");
    setTitle("");
    setSelectedImage(null);
    setSelectedTopic("");
    navigate("/");
  };
  const [imageUrl, setImageUrl] = useState("");
  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  useEffect(() => {
    if (draftParam) {
      const drafts = JSON.parse(localStorage.getItem("drafts")) || [];
      const draftFile = drafts.find(
        (draft) => draft.id === parseInt(draftParam)
      );
      setTitle(draftFile.title);
      setDesc(draftFile.desc);
      setImageUrl(draftFile.selectedImage);
      setSelectedTopic(draftFile.topic);
    } else if (postParam) {
      const posts = JSON.parse(localStorage.getItem("blogs")) || [];
      const draftFile = posts.find((draft) => draft.id === parseInt(postParam));
      setTitle(draftFile.title);
      setDesc(draftFile.desc);
      setImageUrl(draftFile.selectedImage);
      setSelectedTopic(draftFile.topic);
    }
    localStorage.removeItem("draftHistory");
  }, []);

  const [draftHistory, setDraftHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const clearDraftHistory = () => {
    localStorage.removeItem("draftHistory");
    setDraftHistory([]);
    setShowHistory(false);
  };
  const handleRestoreDraft = (element, index) => {
    // localStorage.removeItem("draftHistory");
    // setDraftHistory([]);
    setTitle(element.title)
    setDesc(element.desc)
    setSelectedImage(element.selectedImage)
    setSelectedTopic(element.selectedTopic)
    setShowHistory(false);
  };
  const handleShowHistory = () => {
    const storedHistory = localStorage.getItem("draftHistory");
    if (storedHistory) {
      setDraftHistory(JSON.parse(storedHistory));
    }
    setShowHistory(true);
  };
  const saveDraftHistory = () => {
    var draftHis = {
      title,
      desc,
      selectedImage:
        (imageUrl && imageUrl) ||
        (selectedImage && URL.createObjectURL(selectedImage)),
      topic: selectedTopic,
      published_at: new Date().toISOString(),
      // user_id: user["id"],
      type: "saveDraft",
      // author: user["name"] ? user["name"] : "Johnny Hammer",
      id:
        (localStorage.getItem("draftHistory")
          ? JSON.parse(localStorage.getItem("draftHistory")).length
          : 0) + 1,
    }
    const draftHist = JSON.parse(localStorage.getItem("draftHistory")) || [];
    draftHist.push(draftHis);
    localStorage.setItem("draftHistory", JSON.stringify(draftHist));
  };
  useEffect(() => {
    // Save draft history every 5 seconds
    const intervalId = setInterval(saveDraftHistory, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [title, desc]);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          marginTop: "6rem",
          border: "2px solid lightgrey",
        }}
      >
        {/* Title Editor */}
        <Editor
          tag="div"
          text={title}
          onChange={(text) => setTitle(text)}
          // onBlur = {(text) => setDraftData({ ...draftData, title: text })}
          options={{
            toolbar: {
              buttons: [
                "bold",
                "italic",
                "underline",
                "anchor",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "quote",
                "outdent",
                "indent",
                "code",
                "image",
              ],
            },
            placeholder: {
              text: "Title of your blog...",
            },
            // ...other options
          }}
          // ...other attributes
        />
      </Box>
      <ImageInput
        label="Image URL"
        variant="outlined"
        fullWidth
        value={imageUrl}
        onChange={handleImageUrlChange}
      />
      {/* Image Upload */}
      <input accept="image/*" type="file" onChange={handleImageUpload} />

      {/* Topic Selection */}
      <select value={selectedTopic} onChange={handleTopicChange}>
        <option value="">Select a topic</option>
        <option value="technology">Technology</option>
        <option value="lifestyle">Lifestyle</option>
        <option value="travel">Travel</option>
        {/* Add more topic options as needed */}
      </select>
      <Box
        sx={{
          marginTop: "1rem",
         
        }}
      >
        {/* Description Editor */}
        <Editor
          tag="div"
          text={desc}
          onChange={(text) => setDesc(text)}
          // onBlur = {(text) => setDraftData({ ...draftData, desc: text })}
          // options={
          //   {
          //     // ...toolbar and other options
          //   }
          // }
          // ...other attributes
          style={{
            padding: "1rem",
            border: "2px solid lightgrey",
            minHeight: "70vh",
          }}
        />
      </Box>

      {/* Save Draft and Submit Buttons */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleShowHistory} // Show history on button click
        // disabled={draftParam || postParam}
      >
        Show History
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveDraft}
        disabled={draftParam || postParam}
      >
        Save Draft
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Modal
        open={showHistory}
        onClose={() => setShowHistory(false)}
        aria-labelledby="draft-history-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: "80%",
            maxHeight: "80%",
            overflowY: "scroll",
          }}
        >
          <Typography variant="h6" id="draft-history-modal">
            Draft History
          </Typography>
          {draftHistory.map((draft, index) => (
            <Box key={index}>
              <Typography>{`Draft ${index + 1}`}</Typography>
              <Typography>{` ${draft.title}`}</Typography>
              <Typography>{` ${draft.desc}`}</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleRestoreDraft(draft, index)}
              >
                Restore
              </Button>
            </Box>
          ))}
          <Button
            variant="outlined"
            color="secondary"
            onClick={clearDraftHistory} // Clear draft history
          >
            Clear Draft History
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default WriterPage;
