// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ContactListing from "./contacts/ContactListing";
// import Signup from "./auth/Signup";

// import Signing from "./auth/Signin";
// import CustomerListing from "./customer/CustomerListing";
// import CustomerForm from "./customer/CustomerForm";
// import ContactForm from "./contacts/ContactForm";

// const Routing = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Signing />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/list" element={<ContactListing />} />
//       <Route path="/customerlist" element={<CustomerListing />} />
//       <Route path="/customer/form/:id" element={<CustomerForm />} />
//      <Route
//         path="/contact/form"
//         element={<ContactForm/>}
//       />
//             <Route
//         path="/contact/form/:id"
//         element={<ProtectedRoutes Components={ContactForm} />}
//       />
//     </Routes>
    
//     //  <Route
//     //     path="/home"
//     //     element={<ProtectedRoutes Components={Homes} />}
//     //   /> 

//     //   <Route
//     //     path="/contact/form"
//     //     element={<ProtectedRoutes Components={ContactForm} />}
//     //   />
//     //   <Route
//     //     path="/customer/form"
//     //     element={<ProtectedRoutes Components={CustomerForm} />}
//     //   />
//       // <Route
//       //   path="/contact/form/:id"
//       //   element={<ProtectedRoutes Components={ContactForm} />}
//       // />
     
//     //   <Route path="*" element={<PageNotFound />} />

//   );
// };

// export default Routing;



import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactListing from "./contacts/ContactListing";
import Signup from "./auth/Signup";

import Signing from "./auth/Signin";
import CustomerListing from "./customer/CustomerListing";
import CustomerForm from "./customer/CustomerForm";
import ContactForm from "./contacts/ContactForm";
import ProtectedRoutes from "./PrivateRoutes";
import Layout from "./components/Layout";
import Homes from "./components/Home/Home";

const Routing = () => {
  return (

  <Layout>
    <Routes>
      <Route path="/" element={<Signing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/list" element={<ProtectedRoutes Components={ContactListing} />} />
      <Route path="/contact/form" element={<ProtectedRoutes Components={ContactForm} />} />
      <Route path="/customerlist" element={<ProtectedRoutes Components={CustomerListing} />}  />
      <Route path="/customer/form/:id" element={<ProtectedRoutes Components={CustomerForm} />}  />
      <Route path="/home" element={<ProtectedRoutes Components={Homes} />}  />
      
      {/* <Route path="/contact/form/:id" element={<ContactForm />} /> */}
       <Route
        path="/contact/form/:id"
        element={<ProtectedRoutes Components={ContactForm} />}
      />
    </Routes>
  </Layout>


  );
};

export default Routing;
