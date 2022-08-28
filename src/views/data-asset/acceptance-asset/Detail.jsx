import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, TextField, Grid, MenuItem, InputAdornment, Link, Tooltip, IconButton } from "@mui/material";
import { InsertDriveFile, OpenInNew } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";

import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { Permission } from "../../../component/Permission";

export default function DetailAcceptanceAsset() {
   const { user } = useRecoilValue(authentication);
   const { id } = useParams();
   const navigate = useNavigate();

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

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="d-flex align-items-center justify-content-between my-2 mb-4" style={{ height: "36px" }}>
                  <h3 className="fw-bold mb-0">Detail Acceptance Asset</h3>
               </div>
               {data !== undefined ? (
                  <>
                     <Card sx={{ mb: 3 }}>
                        <CardContent>
                           <Box component="form">
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
                                    <TextField name="po_number" label="PO Number" variant="outlined" value={data.po_number} fullWidth disabled />
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
                                          renderInput={(params) => <TextField fullWidth {...params} />}
                                          disabled
                                       />
                                    </LocalizationProvider>
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <TextField name="type" label="Purchase/Rent" variant="outlined" value={data.type} defaultValue="" select fullWidth disabled>
                                       <MenuItem value="purchase">Purchase</MenuItem>
                                       <MenuItem value="rent">Rent</MenuItem>
                                    </TextField>
                                 </Grid>
                                 <Grid item xs={12}>
                                    <TextField name="remark" label="Remark" variant="outlined" value={data.remark} fullWidth disabled />
                                 </Grid>
                                 <Grid item xs={12}>
                                    <TextField name="status" label="Status" variant="outlined" value={data.status} defaultValue="" select fullWidth disabled>
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
                                             label="Supporting Document"
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
                                                      <Tooltip title="View Document">
                                                         <IconButton component={Link} href={value.file} target="_blank">
                                                            <OpenInNew />
                                                         </IconButton>
                                                      </Tooltip>
                                                   </InputAdornment>
                                                ),
                                             }}
                                             fullWidth
                                             disabled
                                          />
                                       ))}
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
