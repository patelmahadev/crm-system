import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useFormik } from "formik/dist";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./signing.scss";
import * as Yup from "yup";
import axios from "axios";
import { signupUser } from "../redux/Slice/authSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();

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
        const response = dispatch(signupUser(values));

        localStorage.setItem("token", response.token);
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
        setStatus("An error occurred while logging in");
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="form-wrapper">
      <Container>
        <Grid container spacing={2} direction="row" justifyContent="center">
          <Grid item md={5} xl={6}>
            <Box className="form-ui">
              <Box className="title-box">
                <h2 className="form-title">Login</h2>
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
                    id="password"
                    name="password"
                    label="Password"
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
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Signup;
