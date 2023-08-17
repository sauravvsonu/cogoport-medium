/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import HomeHeader from "./HomeHeader";
import "./css/index.css";
import HomeMain from "./HomeMain";
import RecommendedPost from "./RecommendedPost";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const index = () => {
  const navigate = useNavigate();
  const [recommendedPost, setRecommendedPost] = useState({}); 
  useEffect(() => {
    console.log("useEffect is running fine");
    // var currentUser = "";
    axios
      .get(`http://localhost:3000/current_user`, {
        headers:{
          "Authorization":localStorage.Authorization
        }
      })
      .then((res) => {
        console.log(res["data"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <HomeHeader />
      <HomeMain />
      <RecommendedPost />
    </div>
  );
};

export default index;
