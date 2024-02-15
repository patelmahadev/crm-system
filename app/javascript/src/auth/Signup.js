import { Alert, Box, Button, Container, Grid, TextField } from "@mui/material";
import { useFormik } from "formik/dist";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signing.scss";
import * as Yup from "yup";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [loginClicked,setLoginClicked]=React.useState(false)
  const [errorSingup,setErrorSingup]=React.useState("")

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = await axios.post(
          `http://localhost:3000/customers?name=${values?.name}&user_name=${values?.name}&email=${values?.email}&password=${values?.password}&password_confirmation=${values?.confirmPassword}`,
        );
        // debugger
        // localStorage.setItem("token", response?.data?.token);
        if(response?.status===201){
          setLoginClicked("success");
          // toast.success('login success');
          setTimeout(()=>{
            navigate("/home");
          },2000)        }
      } catch (error) {
        setLoginClicked("error");
        setErrorSingup(error?.response?.data?.errors[0]);
        console.log("Login failed:", error?.response?.data?.errors[0]);
        if (error.response.status === 422) {
          // toast.error('login error');
          setTimeout(()=>{
          // setLoginClicked(false);

            // navigate("/");
          },2000)
        }
        setStatus("An error occurred while logging in");
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="form-wrapper">
      {loginClicked==="success" && (<Alert variant="filled" severity="success">Login sucess...</Alert>)}
      {loginClicked==="error" && (<Alert variant="filled" severity="error">{errorSingup}</Alert>)}
      <Container>
        <Grid container spacing={2} direction="row" justifyContent="center">
          <Grid item md={5} xl={6}>
            <Box className="form-ui">
              <Box className="title-box">
                <h2 className="form-title">Sign Up</h2>
              </Box>
              <form onSubmit={formik.handleSubmit} noValidate>
                <Box className="form-group">
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Box>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <Box className="form-group">
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Box>
                <Box className="form-group">
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                </Box>
                <Button
                  variant="contained"
                  className="theme-btn"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
                <h4 className="forgot-text">
                  Already a user?
                  <Link to="/">Sign In</Link>
                </h4>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Signup;
