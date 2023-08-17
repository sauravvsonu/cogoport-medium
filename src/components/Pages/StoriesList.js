import React from "react";
import StoriesCard from "./StoriesCard";

const StoriesList = (props) => {
  return (
    <div>
      {props.blogList.map((blog) => {
        if(blog.isDeleted){
          return null;
        }
        return <StoriesCard value={blog} />;
      })}
    </div>
  );
};

export default StoriesList;
