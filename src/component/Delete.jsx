import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function ModalDelete(props) {
   return (
      <Dialog
         fullWidth
         maxWidth="xs"
         open={props.open}
         onClose={props.handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle>Delete</DialogTitle>
         <DialogContent>
            <DialogContentText>Are you sure want to delete this item?</DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button variant="text" onClick={props.handleClose}>
               Cancel
            </Button>
            <Button variant="text" color="error" onClick={props.delete} autoFocus>
               Delete
            </Button>
         </DialogActions>
      </Dialog>
   );
}
