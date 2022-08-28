import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, TextField, Stack, Grid, MenuItem, InputAdornment, Tooltip, IconButton, Button } from "@mui/material";
import { Close, FileUploadOutlined, InsertDriveFile } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";

import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";

import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { Permission } from "../../../component/Permission";
import { useSnackbar } from "notistack";

export default function EditAcceptanceAsset() {
   const { user } = useRecoilValue(authentication);
   const { enqueueSnackbar } = useSnackbar();
   const navigate = useNavigate();
   const { id } = useParams();

   const [error, setError] = useState("");
   const [data, setData] = useState();
   const getData = async () => {
      http
         .get(`asset_acceptance/${id}`)
         .then((res) => {
            // console.log(res.data.data);
            let value = res.data.data;
            setData({
               asset_id: value.asset.id,
               asset_name: `${value.asset.asset_code} - ${value.asset.asset_name}`,
               pic: `${value.asset.employee.code} - ${value.asset.employee.name}`,
               department: value.asset.dept,
               location: value.asset.location,
               vendor: value.asset.veendor,
               po_number: value.po_number,
               date: value.date,
               type: value.type,
               remark: value.remark,
               document_staging: value.document,
               document: [],
               status: value.status,
            });
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   useEffect(() => {
      if (Permission(user.permission, "update asset acceptance")) {
         window.scrollTo(0, 0);
         // getAsset();
         getData();
      } else {
         navigate("/acceptance-asset");
      }
   }, []);

   const handleChange = (e) => {
      if (e.target.type === "file") {
         if (e.target.files[0] !== undefined) {
            let newState = data.document.concat(e.target.files[0]);
            setData({
               ...data,
               document: newState,
            });
            e.target.value = null;
         }
      } else {
         setData({
            ...data,
            [e.target.name]: e.target.value,
         });
      }
   };

   const handleFileDelete = (key, type) => {
      if (type === "staging") {
         let newState = data.document_staging.filter((value, index) => index !== key);
         setData({
            ...data,
            document_staging: newState,
         });
      } else {
         let newState = data.document.filter((value, index) => index !== key);
         setData({
            ...data,
            document: newState,
         });
      }
   };

   const [loading, setLoading] = useState(false);
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (data.document_staging.length > 0 || data.document.length > 0) {
         setError("");
         setLoading(true);
         let formData = new FormData();
         formData.append("_method", "PUT");
         formData.append("asset_id", data.asset_id);
         formData.append("po_number", data.po_number);
         formData.append("date", moment(data.date).format("yyyy/MM/DD"));
         formData.append("type", data.type);
         formData.append("remark", data.remark);
         formData.append("status", data.status);
         data.document_staging.length > 0 &&
            data.document_staging.map((row, key) => {
               formData.append(`document[${key}][id]`, row.id);
            });
         data.document.length > 0 &&
            data.document.map((row, key) => {
               formData.append(`document[${key + data.document_staging.length}][document]`, row);
            });
         // console.log(Object.fromEntries(formData));
         http
            .post(`asset_acceptance/${id}`, formData)
            .then((res) => {
               // console.log(res.data.data);
               navigate("/acceptance-asset");
            })
            .catch((xhr) => {
               // console.log(xhr.response.data);
               xhr.response && setError(xhr.response.data.errors);
               setLoading(false);
            });
      } else {
         enqueueSnackbar("Fill Supporting Document", { variant: "error" });
      }
   };

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="d-flex align-items-center justify-content-between my-2 mb-4" style={{ height: "36px" }}>
                  <h3 className="fw-bold mb-0">Edit Acceptance Asset</h3>
               </div>
               {data !== undefined ? (
                  <>
                     <Card sx={{ mb: 3 }}>
                        <CardContent>
                           <Box component="form" noValidate={true} onSubmit={handleSubmit}>
                              <Grid container spacing={2}>
                                 <Grid item xs={12}>
                                    <TextField label="Asset" variant="outlined" value={data.asset_name} fullWidth disabled />
                                 </Grid>
                                 <Grid item xs={12} sm={6} md={4}>
                                    <TextField label="PIC" variant="outlined" value={data.pic} fullWidth disabled />
                                 </Grid>
                                 <Grid item xs={12} sm={6} md={4}>
                                    <TextField label="Department" variant="outlined" value={data.department} fullWidth disabled />
                                 </Grid>
                                 <Grid item xs={12} sm={6} md={4}>
                                    <TextField label="Location" variant="outlined" value={data.location} fullWidth disabled />
                                 </Grid>
                                 <Grid item xs={12}>
                                    <TextField
                                       name="po_number"
                                       label="PO Number"
                                       variant="outlined"
                                       value={data.po_number}
                                       onChange={handleChange}
                                       error={!!error.po_number}
                                       helperText={error.po_number !== undefined && error.po_number[0]}
                                       fullWidth
                                       required
                                    />
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                       <DatePicker
                                          value={data.date}
                                          name="date"
                                          label="Date"
                                          inputFormat="yyyy/MM/dd"
                                          mask="____/__/__"
                                          onChange={(newValue) => {
                                             setData({
                                                ...data,
                                                date: newValue,
                                             });
                                          }}
                                          renderInput={(params) => (
                                             <TextField fullWidth {...params} error={!!error.date} helperText={error.date !== undefined && error.date[0]} />
                                          )}
                                       />
                                    </LocalizationProvider>
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <TextField
                                       name="type"
                                       label="Purchase/Rent"
                                       variant="outlined"
                                       value={data.type}
                                       onChange={handleChange}
                                       error={!!error.type}
                                       helperText={error.type !== undefined && error.type[0]}
                                       defaultValue=""
                                       select
                                       fullWidth
                                       required
                                    >
                                       <MenuItem value="purchase">Purchase</MenuItem>
                                       <MenuItem value="rent">Rent</MenuItem>
                                    </TextField>
                                 </Grid>
                                 <Grid item xs={12}>
                                    <TextField
                                       name="remark"
                                       label="Remark"
                                       variant="outlined"
                                       value={data.remark}
                                       onChange={handleChange}
                                       error={!!error.remark}
                                       helperText={error.remark !== undefined && error.remark[0]}
                                       fullWidth
                                       required
                                    />
                                 </Grid>
                                 <Grid item xs={12}>
                                    <TextField
                                       name="status"
                                       label="Status"
                                       variant="outlined"
                                       value={data.status}
                                       onChange={handleChange}
                                       error={!!error.status}
                                       helperText={error.status !== undefined && error.status[0]}
                                       defaultValue=""
                                       select
                                       fullWidth
                                       required
                                    >
                                       <MenuItem value="not_received">Not Received</MenuItem>
                                       <MenuItem value="received">Received</MenuItem>
                                    </TextField>
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    {data.document_staging.length > 0 &&
                                       data.document_staging.map((value, index) => (
                                          <TextField
                                             key={index}
                                             variant="outlined"
                                             label="Supporting Document *"
                                             value={value.file.split("/").pop()}
                                             sx={{ mb: 2 }}
                                             InputProps={{
                                                startAdornment: (
                                                   <InputAdornment position="start">
                                                      <InsertDriveFile />
                                                   </InputAdornment>
                                                ),
                                                endAdornment: (
                                                   <InputAdornment position="end">
                                                      <Tooltip title="Delete">
                                                         <IconButton onClick={() => handleFileDelete(index, "staging")}>
                                                            <Close />
                                                         </IconButton>
                                                      </Tooltip>
                                                   </InputAdornment>
                                                ),
                                             }}
                                             fullWidth
                                             disabled
                                          />
                                       ))}
                                    {data.document.length > 0 &&
                                       data.document.map((value, index) => (
                                          <TextField
                                             key={index}
                                             variant="outlined"
                                             label="Supporting Document *"
                                             value={value.name}
                                             sx={{ mb: 2 }}
                                             InputProps={{
                                                startAdornment: (
                                                   <InputAdornment position="start">
                                                      <InsertDriveFile />
                                                   </InputAdornment>
                                                ),
                                                endAdornment: (
                                                   <InputAdornment position="end">
                                                      <Tooltip title="Delete">
                                                         <IconButton onClick={() => handleFileDelete(index, "new")}>
                                                            <Close />
                                                         </IconButton>
                                                      </Tooltip>
                                                   </InputAdornment>
                                                ),
                                             }}
                                             fullWidth
                                             disabled
                                          />
                                       ))}
                                    <Button size="large" variant="outlined" component="label" fullWidth startIcon={<FileUploadOutlined />}>
                                       Add Supporting Document *
                                       <input name="document" type="file" onChange={handleChange} hidden />
                                    </Button>
                                 </Grid>
                                 <Grid item xs={12}>
                                    <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                       <LoadingButton type="submit" loading={loading} variant="contained">
                                          Save
                                       </LoadingButton>
                                    </Stack>
                                 </Grid>
                              </Grid>
                           </Box>
                        </CardContent>
                     </Card>
                  </>
               ) : (
                  <Loading />
               )}
            </div>
         </div>
      </div>
   );
}
