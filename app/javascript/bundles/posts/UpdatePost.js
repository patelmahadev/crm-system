// app/javascript/bundles/posts/UpdatePost.js
import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function UpdatePost(){
  const {id} = useParams()
  const navigate = useNavigate()
  const [userPost, setUserPost] = useState({
    title: '',
    description: '',
    is_published: true
  })

  useEffect(()=>{
    getPost()
  },[])

  const getPost = () => {
    fetch(`/api/v1/posts/${id}`).
      then((response) => response.json()).
      then((post) => setUserPost({ ...post }));
  }

  const handleInputChange = (event) => {
    setUserPost({
      ...userPost,
      [event.target.name]: event.target.value
    });
  }

  const updatePostRequest = (event) => {
    fetch(`/api/v1/posts/${id}`, {
      method: 'put',
      body: JSON.stringify(userPost),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      alert('Post updated successfully');
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
          value={userPost?.title}
          onChange={handleInputChange}
          />
      </div>
      <div>
        <label>Description: </label>
        <input
          type='text'
          name='description'
          value={userPost?.description}
          onChange={handleInputChange}
          />
      </div>
      <div>
        <label>Is Published: </label>
        <input
          type='text'
          name='is_published'
          value={userPost?.is_published}
          onChange={handleInputChange}
          />
      </div>
      <button onClick={updatePostRequest}>Update</button>
    </div>
  )
}

export default UpdatePost;