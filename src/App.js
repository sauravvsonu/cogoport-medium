import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/Pages/HomePage";
import BlogPage from "./components/BlogPage/BlogPage";
import LandingPage from "./components/LandingPage/index.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ProfilePage from "./components/Profile/Profile";
import OtherProfilePage from "./components/Profile/OtherProfile";
import PostDetailPage from "./components/BlogPage/PostDetails";
import PaymentPage from "./components/Payment/PaymentPage";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/write/:draftId" element={<BlogPage />} /> */}
        <Route path="/write" element={<BlogPage />} />
        <Route path="/getting-started" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/post/:postId" element={<PostDetailPage /> } />
        <Route path="/profileDetail/:userId" element={<OtherProfilePage /> } />
        <Route path="/payment" element={<PaymentPage /> } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
