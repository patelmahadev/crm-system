import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./signing.scss";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/Slice/authSlice";

const Signing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const response = dispatch(loginUser(values));

        localStorage.setItem("token", response.token);
        navigate("/home");
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
              <form onSubmit={formik.handleSubmit}>
                <Box className="form-group">
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{ width: 1 }}
                  />
                </Box>
                <Box className="form-group">
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    sx={{ width: 1 }}
                  />
                </Box>
                <Button
                  variant="contained"
                  className="theme-btn"
                  type="submit"
                  fullWidth
                >
                  Submit
                </Button>
                <h4 className="forgot-text">
                  Don't have an account?
                  <Link to="/signup">Register Here</Link>
                </h4>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Signing;
