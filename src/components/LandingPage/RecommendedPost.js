import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const RecommendedPost = () => {
  const navigate = useNavigate();
  const [recPost, setRecPost] = useState([]);
  useEffect(() => {
    const blog = JSON.parse(localStorage.getItem("blogs"));
    const sortedBlogs = blog.slice().sort((a, b) => b.postLike - a.postLike || b.views - a.views);
    const top6LikedBlogs = sortedBlogs.slice(0, 6);
    console.log(top6LikedBlogs, "this is the top 6");
    setRecPost(top6LikedBlogs);
    
  }, []);

  return (
    <div className="post">
      <div className="post-container">
        <div className="post-top">
          <svg
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
            class="jh ah"
          >
            <path fill="#fff" d="M0 .8h28v28H0z"></path>
            <g opacity="0.8" clip-path="url(#trending_svg__clip0)">
              <path fill="#fff" d="M4 4.8h20v20H4z"></path>
              <circle cx="14" cy="14.79" r="9.5" stroke="#000"></circle>
              <path
                d="M5.46 18.36l4.47-4.48M9.97 13.87l3.67 3.66M13.67 17.53l5.1-5.09M16.62 11.6h3M19.62 11.6v3"
                stroke="#000"
                stroke-linecap="round"
              ></path>
            </g>
            <defs>
              <clipPath id="trending_svg__clip0">
                <path
                  fill="#fff"
                  transform="translate(4 4.8)"
                  d="M0 0h20v20H0z"
                ></path>
              </clipPath>
            </defs>
          </svg>
          <span>TRENDING ON MEDIUM</span>
        </div>
        <div className="rcm-post-wrapper">
          <div className="rcm-post-container">
            <div className="rcm-posts">
              {recPost &&
                recPost.map((data, index) => {
                  return (
                    <div className="rcm-post" key={index} onClick={() => navigate(`/post/${data.id}`)}>
                      <div className="rcm-post-left">
                        <span>0{index + 1}</span>
                      </div>
                      <div className="rcm-post-right">
                        <div className="rcm-post-content">
                          <div className="top">
                            <img
                              src="https://miro.medium.com/v2/resize:fill:110:110/1*tgBvi4CuxtFvd_c4SUhcug.jpeg"
                              alt="logo"
                            />
                            <span>{data.author} Blog</span>
                          </div>
                          <div
                            className="content"
                            dangerouslySetInnerHTML={{ __html: data.title }}
                          ></div>
                          {/* <div className="content">{data.title}</div> */}
                          <div className="footer">
                            <span>
                              {moment(`${data.published_at}`).format("MMM D")} ·
                              {data.minToRead} min read{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {/* </React.Fragment> */}
              {/* </Link>
                
              ))
              } */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedPost;
