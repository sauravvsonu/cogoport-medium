import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  InputLabel,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: "inherit",
}));

const FilteredPostList = ({ posts, filteredData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchDate, setSearchDate] = useState(null);
  const [sortBy, setSortBy] = useState("most-like"); // Default sort by most view
  const [topicName, setTopicName] = useState(""); // Default sort by most view

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterAndSortPosts(query, sortBy, topicName, searchDate);
  };
  const handleDateChange = (newDate) => {
    setSearchDate(newDate);
    filterAndSortPosts(searchQuery, sortBy, topicName, newDate);
  };
  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    setSortBy(sortValue);
    filterAndSortPosts(searchQuery, sortValue, topicName, searchDate);
  };
  const handleTopicChange = (event) => {
    const topicValue = event.target.value;
    setTopicName(topicValue);
    filterAndSortPosts(searchQuery, sortBy, topicValue, searchDate);
  };

  const filterAndSortPosts = (query, sortValue, topic, date) => {
    let filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.desc.toLowerCase().includes(query.toLowerCase()) ||
        post.author.toLowerCase().includes(query.toLowerCase()) ||
        post.topic.toLowerCase().includes(query.toLowerCase())
    );

    
    // console.log(topic)
    switch (topic) {
      case "technology":
        // console.log("working");
        filtered = filtered.filter((a) => a.topic === "technology");
        break;
      case "lifestyle":
        filtered = filtered.filter((a) => a.topic === "lifestyle");
        break;
        case "travel":
            filtered = filtered.filter((a) => a.topic === "travel");
            break;
            default:
                break;
    }
    switch (sortValue) {
      case "most-view":
        filtered = filtered.sort((a, b) => b.views - a.views);
        break;
      case "most-like":
        filtered = filtered.sort((a, b) => b.postLike - a.postLike);
        break;
      case "most-comment":
        filtered = filtered.sort(
          (a, b) => b.postComment.length - a.postComment.length
        );
        break;
      case "most-resent":
        filtered = filtered.sort((a, b) => b.published_at - a.published_at);
        break;
      default:
        break;
    }
    if (date) {
      filtered = filtered.filter((post) => {
        const postDate = new Date(post.published_at);
        const dates = new Date(date);
        return (
          postDate.getDate() === dates.getDate() &&
          postDate.getMonth() === dates.getMonth() 
        );
      });
    }
    console.log(filtered , "this is filter data");
    filteredData(filtered);
    setFilteredPosts(filtered);
  };

  return (
      <Container maxWidth="lg" sx={{ display: "flex", marginTop: "1rem" }}>
      <Search sx={{ borderRadius: "30px" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search by author"
          inputProps={{
            "aria-label": "search",
            value: searchQuery,
            onChange: handleSearchChange,
          }}
        />
      </Search>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Search by Date"
        value={searchDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />} />
    </LocalizationProvider>
      {/* <DatePicker
        label="Search by Date"
        value={searchDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      /> */}
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} onChange={handleSortChange}>
          <MenuItem value="most-like">Most Like</MenuItem>
          <MenuItem value="most-view">Most View</MenuItem>
          <MenuItem value="most-comment">Most Comment</MenuItem>
          <MenuItem value="most-resent">Most Resent</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Topic</InputLabel>
        <Select value={topicName} onChange={handleTopicChange}>
          <MenuItem value="technology">Technology</MenuItem>
          <MenuItem value="lifestyle">Life Style</MenuItem>
          <MenuItem value="travel">Travel</MenuItem>
        </Select>
      </FormControl>
      {/* Display filtered and sorted posts */}
      {
        //   filteredPosts.map((post) => (
        //     <Box key={post.id}>
        //       <Typography variant="h4">{post.title}</Typography>
        //       <Typography variant="body1">{post.desc}</Typography>
        //       {/* Display other post details */}
        //     </Box>
        //   ))
      }
    </Container>
  );
};

export default FilteredPostList;
