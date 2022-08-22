import React, { useEffect, useState } from "react";
import {
   Box,
   Card,
   CardContent,
   TextField,
   Stack,
   Grid,
   MenuItem,
   TableContainer,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   IconButton,
   Tooltip,
   Autocomplete,
   Divider,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";

import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { Permission } from "../../../component/Permission";

export default function AddAcceptanceAsset() {
   const { user } = useRecoilValue(authentication);
   const navigate = useNavigate();

   const [data, setData] = useState();
   const [rows, setRows] = useState([]);
   const [params, setParams] = useState({
      search: "",
      order_by_name: 0,
      limit: 10,
      page: 1,
      paginate: 1,
   });

   const [asset, setAsset] = useState([]);
   const getAsset = async () => {
      http
         .get(`asset`, {
            params: params,
         })
         .then((res) => {
            // console.log(res.data.data.data);
            setAsset(res.data.data.data);
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   useEffect(() => {
      if (Permission(user.permission, "create asset acceptance")) {
         window.scrollTo(0, 0);
         getAsset();
         handleReset();
      } else {
         navigate("/acceptance-asset");
      }
   }, []);

   const handleReset = (e) => {
      setData({
         asset_id: "",
         asset_name: "",
         master_asset: "",
         location: "",
         department: "",
         vendor: "",
         po_number: "",
         date: null,
         type: "",
         remark: "",
      });
   };

   const handleStaging = (e) => {
      e.preventDefault();
      let newState = rows.concat(data);
      setRows(newState);
      handleReset();
   };

   const handleEdit = (value, key) => {
      setRows([...rows.slice(0, key), ...rows.slice(key + 1, rows.length)]);
      setData(value);
   };

   const handleDelete = (key) => {
      setRows([...rows.slice(0, key), ...rows.slice(key + 1, rows.length)]);
   };

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
      rows.map((value, index) => {
         formData.append(`asset_acceptance[${index}][asset_id]`, value.asset_id);
         formData.append(`asset_acceptance[${index}][po_number]`, value.po_number);
         formData.append(`asset_acceptance[${index}][date]`, moment(value.date).format("yyyy/MM/DD"));
         formData.append(`asset_acceptance[${index}][type]`, value.type);
         formData.append(`asset_acceptance[${index}][remark]`, value.remark);
      });
      // console.log(Object.fromEntries(formData));
      http
         .post(`asset_acceptance`, formData)
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
                  <h3 className="fw-bold mb-0">Add Acceptance Asset</h3>
               </div>
               {data !== undefined && asset !== undefined ? (
                  <>
                     <Card sx={{ mb: 3 }}>
                        <CardContent>
                           <Box component="form" onSubmit={handleStaging}>
                              <Grid container spacing={2}>
                                 <Grid item xs={12}>
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
                                          let exist = rows.find((v) => v.asset_id == value.id);
                                          exist === undefined
                                             ? setData({
                                                  ...data,
                                                  asset_id: value.id,
                                                  asset_name: `${value.asset_code} - ${value.asset_name}`,
                                                  master_asset: value,
                                                  location: `${value.location.code} - ${value.location.location}`,
                                                  department: value.department.dept,
                                                  vendor: `${value.vendor.code} - ${value.vendor.name}`,
                                               })
                                             : handleReset();
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
                                 </Grid>
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
                                    <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                       <LoadingButton type="submit" variant="contained">
                                          Add
                                       </LoadingButton>
                                    </Stack>
                                 </Grid>
                              </Grid>
                           </Box>
                        </CardContent>
                     </Card>
                     <Card>
                        <CardContent>
                           <TableContainer>
                              <Table>
                                 <TableHead>
                                    <TableRow
                                       sx={{
                                          "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                                          "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                                       }}
                                    >
                                       <TableCell align="center">No.</TableCell>
                                       <TableCell>Asset Name</TableCell>
                                       <TableCell>Asset Code</TableCell>
                                       <TableCell>Spesification</TableCell>
                                       <TableCell>Condition</TableCell>
                                       <TableCell>Purchase/Rent</TableCell>
                                       <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {rows.length > 0 ? (
                                       rows.map((value, key) => (
                                          <TableRow key={key}>
                                             <TableCell component="th" scope="row" align="center">
                                                {key + 1}.
                                             </TableCell>
                                             <TableCell>{value.master_asset.asset_name}</TableCell>
                                             <TableCell>{value.master_asset.asset_code}</TableCell>
                                             <TableCell>{value.master_asset.specification}</TableCell>
                                             <TableCell>{value.master_asset.condition.condition}</TableCell>
                                             <TableCell>{value.type === "purchase" ? "Purchase" : "Rent"}</TableCell>
                                             <TableCell align="center">
                                                <Stack direction="row">
                                                   <Tooltip title="Edit">
                                                      <IconButton onClick={() => handleEdit(value, key)}>
                                                         <Edit />
                                                      </IconButton>
                                                   </Tooltip>
                                                   <Tooltip title="Delete">
                                                      <IconButton onClick={() => handleDelete(key)}>
                                                         <Delete />
                                                      </IconButton>
                                                   </Tooltip>
                                                </Stack>
                                             </TableCell>
                                          </TableRow>
                                       ))
                                    ) : (
                                       <TableRow>
                                          <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 10 }} colSpan={100}>
                                             No data added.
                                          </TableCell>
                                       </TableRow>
                                    )}
                                 </TableBody>
                              </Table>
                           </TableContainer>
                        </CardContent>
                     </Card>
                     <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                        <LoadingButton type="submit" disabled={rows.length < 1} loading={loading} onClick={handleSubmit} variant="contained">
                           Save
                        </LoadingButton>
                        <LoadingButton variant="outlined" component={RouterLink} to="/acceptance-asset">
                           Back
                        </LoadingButton>
                     </Stack>
                  </>
               ) : (
                  <Loading />
               )}
            </div>
         </div>
      </div>
   );
}
