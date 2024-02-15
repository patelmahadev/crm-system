import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactListing from "./contacts/ContactListing";
import ContactForm from "./contacts/ContactForm";
import CustomerForm from "./customer/CustomerForm";
import Signup from "./auth/Signup";
import Layout from "./components/Layout";
import ProtectedRoutes from "./PrivateRoutes";
import Homes from "./components/Home/Home";
import PageNotFound from "./components/NotFound/PageNotFound";
import Signing from "./auth/Signin";
import store from './redux/Slice'

const Routing = () => {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<Signing />} />

          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={<ProtectedRoutes Components={Homes} />}
          />

          <Route
            path="/contact/form"
            element={<ProtectedRoutes Components={ContactForm} />}
          />
          <Route
            path="/customer/form"
            element={<ProtectedRoutes Components={CustomerForm} />}
          />
          <Route
            path="/contact/form/:id"
            element={<ProtectedRoutes Components={ContactForm} />}
          />
          <Route
            path="/list"
            element={<ProtectedRoutes Components={ContactListing} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
      </Provider>
  );
};

export default Routing;
