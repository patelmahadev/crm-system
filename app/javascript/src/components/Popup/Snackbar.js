import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { SnackbarOrigin } from '@mui/material/Snackbar';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorSnackbar = ({ errorMessage, position }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const getPosition = () => {
    if (position === 'top-left') {
      return { vertical: 'top', horizontal: 'left' };
    } else if (position === 'top-right') {
      return { vertical: 'top', horizontal: 'right' };
    } else if (position === 'bottom-left') {
      return { vertical: 'bottom', horizontal: 'left' };
    } else {
      // default to bottom-right
      return { vertical: 'bottom', horizontal: 'right' };
    }
  };

  const snackbarPosition = getPosition();
  console.log(1111111)
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={snackbarPosition}
    >
      <Alert onClose={handleClose} severity="error">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
