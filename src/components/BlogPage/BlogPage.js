import React from "react";
import Box from "@mui/material/Box";
import BlogNav from "./BlogNav";
import WriterPage from "./WriterPage";

const BlogPage = () => {
  return (
    <Box className="blog-page">
      <BlogNav />
      <WriterPage />
    </Box>
  );
};

export default BlogPage;
