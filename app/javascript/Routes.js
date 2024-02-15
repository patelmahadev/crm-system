// app/javascript/routes.js
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Posts from './bundles/posts/index';
import PostDetails from './bundles/posts/PostDetails';
import CreatePost from './bundles/posts/CreatePost';
import UpdatePost from './bundles/posts/UpdatePost';
import User from './bundles/User/User';
import Profile from './bundles/User/Profile'; 

export default () => {
  return (
      <Routes>
        <Route path="/" element={<Posts />}/>
        <Route path="/posts/new" element={<CreatePost />}/>
        <Route path="/posts/:id" element={<PostDetails />}/>
        <Route path="/posts/:id/edit" element={<UpdatePost />}/>
        {/* Nested router */}
        {/* <Route path="user" element={<User />}>
          <Route path="/user/profile" element={<Profile />}/>
        </Route> */}

        {/* <Route path="/user" element={<User />}>
          <Route path="/profile" element={<Profile />} />
        </Route> */}

      </Routes>
  );
}