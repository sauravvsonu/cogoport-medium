import React, { useEffect, useState } from 'react'
import BlogNav from './BlogNav'
import PostViewPage from './PostViewPage'
import { useParams } from 'react-router'

const PostDetails = () => {
    const {postId} = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        var postData = localStorage.getItem('blogs')
        postData = JSON.parse(postData)
        setPost(postData[postId -1])
    },[])
  return (
    <div>
        <BlogNav />
        <PostViewPage post={post} postId ={postId}/>
    </div>
  )
}

export default PostDetails