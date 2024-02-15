import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup/Popup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteContact, fetchData } from "../redux/Slice/contactSlice";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ContactListing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleDelete = async (row) => {
    try {
      const result = await Popup({
        title: "Delete Item",
        text: "Are you sure you want to delete this item?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });
      if (result.isConfirmed) {
        dispatch(deleteContact(row?._id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Popup({
        title: "Error",
        text: "An error occurred while deleting the item.",
        icon: "error",
      });
    }
  };
  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: 3 }}>
        <Grid item xs={6} textAlign="left">
          <Typography variant="h5">
            <strong>Contacts</strong>
          </Typography>
          <Typography variant="body2">Manage your contacts</Typography>
        </Grid>
        <Grid item xs={6} textAlign="Right">
          <Button
            variant="contained"
            guttrBottom
            onClick={() => navigate("/contact/form")}
          >
            Create Contact
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Phone</TableCell>
              <TableCell>Adderss 1</TableCell>
              <TableCell>Address 2</TableCell>
              <TableCell>Zip Code</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.address1}</TableCell>
                <TableCell>{row.address1}</TableCell>
                <TableCell>{row.zipCode}</TableCell>
                <TableCell>{row.country}</TableCell>

                <TableCell>
                  <IconButton>
                    <DeleteIcon
                      onClick={() => {
                        handleDelete(row);
                      }}
                    />
                  </IconButton>
                  <IconButton>
                    <EditIcon
                      onClick={() => {
                        navigate(`/contact/form/1`);
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
