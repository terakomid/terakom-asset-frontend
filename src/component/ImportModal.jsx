import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { Close, FileUploadOutlined, InsertDriveFile } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import http from "../component/api/Api";

import { useSnackbar } from "notistack";

export const ImportModal = (props) => {
   const { enqueueSnackbar } = useSnackbar();
   const [document, setDocument] = useState({
      file: "",
      file_url: "",
   });
   const [loading, setLoading] = useState(false);

   const submitData = async () => {
      const formData = new FormData();
      formData.append("file", document.file);
      const res = await http.post(props.url, formData);
   };

   const onSubmit = () => {
      setLoading(true);
      submitData()
         .then((res) => {
            props.getData();
            props.handleClose();
            setDocument({
               file: "",
               file_url: "",
            });
            enqueueSnackbar("Success Import Data", { variant: "success" });
         })
         .catch((err) => {
            err.response && console.log(err.response);
         })
         .finally(() => {
            setLoading(false);
         });
   };

   return (
      <Dialog
         fullWidth
         maxWidth="xs"
         open={props.open}
         onClose={props.handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle>Import</DialogTitle>
         <DialogContent>
            {document.file_url !== "" ? (
               <TextField
                  sx={{ mt: 1 }}
                  variant="outlined"
                  label="Document *"
                  value={document.file_url}
                  disabled
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <InsertDriveFile />
                        </InputAdornment>
                     ),
                     endAdornment: (
                        <InputAdornment position="end">
                           <Tooltip title="Delete">
                              <IconButton
                                 onClick={() =>
                                    setDocument({
                                       file: "",
                                       file_url: "",
                                    })
                                 }
                              >
                                 <Close />
                              </IconButton>
                           </Tooltip>
                        </InputAdornment>
                     ),
                  }}
                  fullWidth
               />
            ) : (
               <Button size="large" variant="outlined" component="label" fullWidth startIcon={<FileUploadOutlined />}>
                  {props.buttonTitle}
                  <input
                     name="document"
                     type="file"
                     onChange={(e) => {
                        let file = e.target.files[0];
                        let file_url = file.name;
                        setDocument({
                           file,
                           file_url,
                        });
                     }}
                     hidden
                     required
                  />
               </Button>
            )}
         </DialogContent>
         <DialogActions>
            <Button variant="text" onClick={props.handleClose}>
               Cancel
            </Button>
            <LoadingButton loading={loading} variant="text" color="success" onClick={onSubmit} autoFocus>
               Submit
            </LoadingButton>
         </DialogActions>
      </Dialog>
   );
};

ImportModal.propTypes = {
   url: PropTypes.string,
   getData: PropTypes.func,
   handleClose: PropTypes.func,
   open: PropTypes.bool,
   buttonTitle: PropTypes.string,
};
