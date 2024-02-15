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
import { addContact, editContact } from "../redux/Slice/contactSlice";
import { useDispatch } from "react-redux";

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const formik = useFormik({
    initialValues: {
      phone: "",
      address1: "",
      address2: "",
      zipCode: "",
      country: "",
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string().required("Phone is required"),
      address1: Yup.string().required("Address1 is required"),
      address2: Yup.string().required("Address2 is required"),
      zipCode: Yup.string().required("ZipCode is required"),
      country: Yup.string().required("country is required"),
    }),

    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        let response;
        if (id) {
          const response = dispatch(addContact(values));

          navigate("/list");
        } else {
          const response = dispatch(editContact(values));
          navigate("/list");
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
        const response = await axios.get(
          `http://localhost:8000/api/user/${id}`
        );
        const contact = response.data;
        formik.setValues({
          phone: contact.phone || "",
          address1: contact.address1 || "",
          address2: contact.address2 || "",
          zipCode: contact.zipCode || "",
          country: contact.country || "",
        });
      } catch (error) {
        console.error("Failed to fetch contact details:", error);
      }
    };

    if (id) {
      fetchContactDetails();
    }
  }, [id, formik]);

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
                label="Address1"
                name="address1"
                required
                value={formik.values.address1}
                onChange={formik.handleChange}
                error={
                  formik.touched.address1 && Boolean(formik.errors.address1)
                }
                helperText={formik.touched.address1 && formik.errors.address1}
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
                name="zipCode"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
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
