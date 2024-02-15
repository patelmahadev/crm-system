import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData;

  const formik = useFormik({
    initialValues: {
      name: rowData?.name || "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      console.log(5656, values)
      try {
      const token = localStorage.getItem("token");
        const response = await axios.patch(
          `http://localhost:3000/customers/id`,
          {
            name:values.name
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(response.status === 200) {
          navigate("/customerlist");
        }
        console.log("Response:", response);
        // navigate("/list");
      } catch (error) {
        console.error("Update failed:", error);
        setStatus("An error occurred while updating customer");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (id && rowData) {
      formik.setValues({
        name: rowData.name || "",
      });
    }
  }, [id, rowData]);

  return (
    <Container>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={6} textAlign="left">
          <Typography variant="h5">
            <strong>Customer</strong>
          </Typography>
          <Typography variant="body2">Edit some Customer</Typography>
        </Grid>
      </Grid>

      <Paper className="form-card-ui">
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4} md={4}>
              <TextField
                fullWidth
                type="text"
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              textAlign="right"
              sx={{ marginBottom: 1 }}
            >
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CustomerForm;
