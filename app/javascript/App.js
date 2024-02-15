// app/javascript/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Routes from './Routes';
import Routings from './src/Routing'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      {/* <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <hr />
      </div> */}
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer /> */}
      <Routings />
      {/* // <Routes /> */}
    </Router>
  );
}
export default App;