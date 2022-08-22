import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, TextField, Stack, Grid, MenuItem, Autocomplete, Divider } from "@mui/material";
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

export default function EditAcceptanceAsset() {
   const { user } = useRecoilValue(authentication);
   const navigate = useNavigate();
   const { id } = useParams();

   const [params, setParams] = useState({
      search: "",
      order_by_name: 0,
      limit: 10,
      page: 1,
      paginate: 1,
   });

   // const [asset, setAsset] = useState([]);
   // const getAsset = async () => {
   //    http
   //       .get(`asset`, {
   //          params: params,
   //       })
   //       .then((res) => {
   //          // console.log(res.data.data.data);
   //          setAsset(res.data.data.data);
   //       })
   //       .catch((err) => {
   //          // console.log(err.response);
   //       });
   // };

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
               location: value.asset.location,
               department: value.asset.dept,
               vendor: value.asset.veendor,
               po_number: value.po_number,
               date: value.date,
               type: value.type,
               remark: value.remark,
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
      setData({
         ...data,
         [e.target.name]: e.target.value,
      });
   };

   const [loading, setLoading] = useState(false);
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      let formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("asset_id", data.asset_id);
      formData.append("po_number", data.po_number);
      formData.append("date", moment(data.date).format("yyyy/MM/DD"));
      formData.append("type", data.type);
      formData.append("remark", data.remark);
      formData.append("status", data.status);
      // console.log(Object.fromEntries(formData));
      http
         .post(`asset_acceptance/${id}`, formData)
         .then((res) => {
            // console.log(res.data.data);
            navigate("/acceptance-asset");
         })
         .catch((err) => {
            // console.log(err.response.data);
            setLoading(false);
         });
   };

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="d-flex align-items-center justify-content-between my-2 mb-4" style={{ height: "36px" }}>
                  <h3 className="fw-bold mb-0">Edit Acceptance Asset</h3>
               </div>
               {data !== undefined && asset !== undefined ? (
                  <>
                     <Card sx={{ mb: 3 }}>
                        <CardContent>
                           <Box component="form" onSubmit={handleSubmit}>
                              <Grid container spacing={2}>
                                 {/* <Grid item xs={12}>
                                    <Autocomplete
                                       freeSolo
                                       fullWidth
                                       disableClearable
                                       options={asset}
                                       getOptionLabel={(option) => option.asset_name}
                                       inputValue={params.search}
                                       onInputChange={(event, newInputValue, reason) => {
                                          setParams({
                                             ...params,
                                             search: reason === "reset" ? "" : newInputValue,
                                          });
                                       }}
                                       onChange={(e, value) => {
                                          let exist = data.asset_id == value.id;
                                          exist === false &&
                                             setData({
                                                ...data,
                                                asset_id: value.id,
                                                asset_name: value.asset_name,
                                                location: value.location.location,
                                                department: value.department.dept,
                                                vendor: value.vendor.name,
                                             });
                                       }}
                                       renderInput={(params) => (
                                          <TextField
                                             {...params}
                                             label="Choose Asset *"
                                             InputProps={{
                                                ...params.InputProps,
                                                type: "search",
                                             }}
                                          />
                                       )}
                                    />
                                    <Divider sx={{ mt: 3, mb: 1 }} />
                                 </Grid> */}
                                 <Grid item xs={12}>
                                    <TextField label="Asset" variant="outlined" value={data.asset_name} fullWidth disabled />
                                 </Grid>
                                 <Grid item xs={12} sm={6} md={4}>
                                    <TextField label="Location" variant="outlined" value={data.location} fullWidth disabled />
                                 </Grid>
                                 <Grid item xs={12} sm={6} md={4}>
                                    <TextField label="Department" variant="outlined" value={data.department} fullWidth disabled />
                                 </Grid>
                                 <Grid item xs={12} sm={6} md={4}>
                                    <TextField label="Vendor Name" variant="outlined" value={data.vendor} fullWidth disabled />
                                 </Grid>
                                 <Grid item xs={12}>
                                    <TextField
                                       name="po_number"
                                       label="PO Number"
                                       variant="outlined"
                                       value={data.po_number}
                                       onChange={handleChange}
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
                                          renderInput={(params) => <TextField fullWidth {...params} />}
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
                                    <TextField name="remark" label="Remark" variant="outlined" value={data.remark} onChange={handleChange} fullWidth required />
                                 </Grid>
                                 <Grid item xs={12}>
                                    <TextField
                                       name="status"
                                       label="Status"
                                       variant="outlined"
                                       value={data.status}
                                       onChange={handleChange}
                                       defaultValue=""
                                       select
                                       fullWidth
                                       required
                                    >
                                       <MenuItem value="not_received">Not Received</MenuItem>
                                       <MenuItem value="received">Received</MenuItem>
                                    </TextField>
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
