import {
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFormik } from "formik/dist";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      phone: "",
      address: "",
      address2: "",
      zipcode: "",
      country: "",
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string().required("Phone is required"),
      address: Yup.string().required("Address1 is required"),
      address2: Yup.string().required("Address2 is required"),
      zipcode: Yup.string().required("ZipCode is required"),
      country: Yup.string().required("country is required"),
    }),

    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const token = localStorage.getItem("token");
        let response;
        if (id) {
          const response = await axios.put(
            `http://localhost:3000/contacts/id`,
            {
              id:id,
              address: values?.address,
              address2: values?.address2,
              phone: values?.phone,
              country: values?.country,
              zipcode: values?.zipcode
          },
            { headers: {
              Authorization: `Bearer ${token}`,
            },}
            );
          
          if (response.status === 200) {
            navigate("/list");
          }
        } else {

            const response = await axios.post(
              `http://localhost:3000/contacts`,
              {
                address: values?.address,
                address2: values?.address2,
                phone: values?.phone,
                country: values?.country,
                zipcode: values?.zipcode
            },{
                headers:{
                  Authorization:`Bearer ${token}`
                }
              }
            );

          if (response.status === 201) {
            navigate("/list");
          }
        }
      } catch (error) {
        console.error("Login failed:", error);
        setStatus("An error occurred while logging in");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/contacts/${id}`,

          { headers: {
            Authorization: `Bearer ${token}`,
          },}
          );
          console.log(666666,response.data);
        const contact = response.data;
        formik.setValues({
          phone: contact.phone || "",
          address: contact.address || "",
          address2: contact.address2 || "",
          zipcode: contact.zipcode || "",
          country: contact.country || "",
        });
      } catch (error) {
        console.error("Failed to fetch contact details:", error);
      }
    };

    if (id) {
      fetchContactDetails();
    }
  }, [ ]);

  return (
    <Container>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={6} textAlign="left">
          <Typography variant="h5">
            <strong>Add Contact</strong>
          </Typography>
          <Typography variant="body2">Add some contacts</Typography>
        </Grid>
      </Grid>
      <Paper className="form-card-ui">
        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                type="text"
                label="Phone"
                name="phone"
                required
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>

            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                type="text"
                label="Address"
                name="address"
                required
                value={formik.values.address}
                onChange={formik.handleChange}
                error={
                  formik.touched.address && Boolean(formik.errors.address)
                }
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>

            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                type="text"
                label="Address2"
                name="address2"
                value={formik.values.address2}
                onChange={formik.handleChange}
                error={
                  formik.touched.address2 && Boolean(formik.errors.address2)
                }
                helperText={formik.touched.address2 && formik.errors.address2}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                type="textarea"
                label="ZipCode"
                name="zipcode"
                value={formik.values.zipcode}
                onChange={formik.handleChange}
                error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                helperText={formik.touched.zipcode && formik.errors.zipcode}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                type="textarea"
                label="country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
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
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ContactForm;
