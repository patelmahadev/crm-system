// app/javascript/bundles/posts/CreatePost.js
import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const CreatePost = (props) => {
  const navigate = useNavigate()
  const [post, setPost] = useState({
    title: '',
    description: '',
    is_published: true
  })

  const handleInputChange = (event) => {
    setPost({ [event.target.name]: event.target.value });
  }

  const createPostRequest = (event) => {
    fetch('/api/v1/posts', {
      method: 'post',
      body: JSON.stringify(post),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      alert('Post created successfully');
      navigate('/')
    });
  }

  return(
    <div>
      <h3>New Post</h3>
      <div>
        <label>Title: </label>
        <input
          type='text'
          name='title'
          value={post?.title}
          onChange={handleInputChange}
          />
      </div>
      <div>
        <label>Description: </label>
        <input
          type='text'
          name='description'
          value={post?.description}
          onChange={handleInputChange}
          />
      </div>
      <div>
        <label>Is Published: </label>
        <input
          type='text'
          name='is_published'
          value={post?.is_published}
          onChange={handleInputChange}
          />
      </div>
      <button onClick={createPostRequest}>Create</button>
    </div>
  )
}
export default CreatePost;