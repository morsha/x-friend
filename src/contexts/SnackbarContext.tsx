'use client'
import React, { useEffect, createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SnackbarContext = createContext({
  openSnackbar: (message?: string) => {},
});

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export const SnackbarProvider = ({ children }: any) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
  });

  const openSnackbar = (message?: string) => {
    setSnackbarState({ open: true, message: message || 'Action completed' });
  };

  const closeSnackbar = () => {
    setSnackbarState({ open: false, message: '' });
  };

  useEffect(() => {
    if (snackbarState.open) {
      const timeoutId = setTimeout(() => closeSnackbar(), 3000);

      return () => {
        clearTimeout(timeoutId);
      }
    }
  }, [snackbarState.open]);

  const value = { openSnackbar, closeSnackbar };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={snackbarState.message}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </SnackbarContext.Provider>
  );
};
