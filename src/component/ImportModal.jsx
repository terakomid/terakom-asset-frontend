import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { Close, FileUploadOutlined, InsertDriveFile } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import http from "../component/api/Api";

import { useSnackbar } from "notistack";

const ErrorModal = (props) => {
   return (
      <Dialog
         fullWidth
         maxWidth="md"
         open={props.open}
         onClose={props.handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle>Error Import Excel Data Asset</DialogTitle>
         <DialogContent>
            <Stack>
               {props.data?.map((v, i) => {
                  return (
                     <Typography py={2} fontStyle="italic">{`${i +1}. ${v}`}</Typography>
                  )
               })}
            </Stack>
         </DialogContent>
         <DialogActions>
            <Button variant="text" onClick={props.handleClose}>
               Ok
            </Button>
         </DialogActions>
      </Dialog>
   )
}

export const ImportModal = (props) => {
   const { enqueueSnackbar } = useSnackbar();
   const [document, setDocument] = useState({
      file: "",
      file_url: "",
   });
   const [loading, setLoading] = useState(false);
   const [openModalError, setOpenModalError] = useState(false);
   const [dataError, setDataError] = useState([])

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
            if(err.response){
               if(err.response.status == 422 && props.url == 'asset/import_excel'){
                  setDocument({
                     file: "",
                     file_url: "",
                  });
                  setOpenModalError(true)
                  setDataError([...err.response.data.errors])
               }else{
                  setDocument({
                     file: "",
                     file_url: "",
                  });
                  enqueueSnackbar("Failed Import Data", { variant: 'error' })
                  props.getData();
                  props.handleClose();              
               }
            }
         })
         .finally(() => {
            setLoading(false);
         });
   };

   const handleErrorModalClose = () => {
      setOpenModalError(!openModalError)
   }
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
            <ErrorModal data={dataError} open={openModalError} handleClose={handleErrorModalClose} />
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
