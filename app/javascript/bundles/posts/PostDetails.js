// app/javascript/bundles/posts/PostDetails.js
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';


const PostDetails = () => {
  const {id} = useParams() //hook
  const [post, setPost] = useState({})

  useEffect(()=>{
    getPost()
  },[])

  const getPost = () => {
    fetch(`/api/v1/posts/${id}`).
      then((response) => response.json()).
      then((result) => {
        setPost(result)
      });
  }

  return (
    <div>
      <div>
        <label style={{fontWeight: 'bold'}}> Title: </label>
        <p> {post.title} </p>
      </div>

      <div>
        <label style={{fontWeight: 'bold'}}> Description: </label>
        <p> {post.description} </p>
      </div>

      <div>
        <label style={{fontWeight: 'bold'}}> Is Published: </label>
        <p> {post.is_published} </p>
      </div>
    </div>
  );
}
export default PostDetails;