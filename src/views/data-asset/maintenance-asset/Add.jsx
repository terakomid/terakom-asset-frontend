import React, { useEffect, useState } from "react";
import {
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
   InputAdornment,
   Button,
   Autocomplete,
} from "@mui/material";
import { Close, Delete, Edit, FileUploadOutlined, InsertDriveFile } from "@mui/icons-material";
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
import { NumberFormat } from "../../../component/Format";
import { useSnackbar } from "notistack";

export default function AddMaintenanceAsset() {
   const { user } = useRecoilValue(authentication);
   const navigate = useNavigate();
   const { enqueueSnackbar } = useSnackbar();

   const [rows, setRows] = useState([]);
   const [data, setData] = useState();
   const [params, setParams] = useState({
      users: {
         search: "",
         order_by_name: 0,
         limit: 5,
         page: 1,
         paginate: 1,
      },
   });

   const [users, setUsers] = useState();
   const getUsers = async () => {
      http
         .get(`user`, {
            params: params.users,
         })
         .then((res) => {
            // console.log(res.data.data);
            setUsers(res.data.data.data);
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   const getAsset = async (employee) => {
      http
         .get(`asset?employee_id=${employee.id}`)
         .then((res) => {
            // console.log(res.data.data.data);
            const obj = users.find((value) => value.id == employee.id);
            setData({
               ...data,
               pic_id: employee.id,
               pic_dept: obj.dept.dept,
               master_asset: res.data.data.data,
            });
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   useEffect(() => {
      if (Permission(user.permission, "create asset maintenance")) {
         window.scrollTo(0, 0);
         getUsers();
         handleReset();
      } else {
         navigate("/history-asset/maintenance-asset");
      }
   }, []);

   useEffect(() => {
      setUsers([]);
      let timer = setTimeout(() => {
         if (params) getUsers();
      }, 500);
      return () => clearTimeout(timer);
   }, [params]);

   const handleReset = (e) => {
      setData({
         pic_id: "",
         pic_dept: "",
         applicant_date: null,
         request_date_repair: null,
         request_time_finish: null,
         testing_date: null,
         testing_finish_date: null,
         testing_result: "",
         person_testing: "",
         final_cost: "",
         returning_date: null,
         repair_record: "",
         master_asset: [],
         asset_id: "",
         asset_dept: "",
         reason: "",
         document: null,
      });
   };

   const handleResetStaging = (e) => {
      setData({
         ...data,
         asset_id: "",
         asset_dept: "",
         reason: "",
      });
   };

   const handleStaging = (e) => {
      e.preventDefault();
      if (data.document === null) {
         enqueueSnackbar("Fill Supporting Document", { variant: "error" });
      } else {
         const obj = data.master_asset.find((value) => value.id == data.asset_id);
         let staging = {
            asset_id: data.asset_id,
            asset_dept: obj.department.dept,
            master_asset: obj,
            reason: data.reason,
         };
         let newState = rows.concat(staging);
         setRows(newState);
         handleResetStaging();
      }
   };

   const handleEdit = (value, key) => {
      setRows([...rows.slice(0, key), ...rows.slice(key + 1, rows.length)]);
      setData({
         ...data,
         asset_id: value.asset_id,
         asset_dept: value.asset_dept,
         reason: value.reason,
      });
   };

   const handleDelete = (key) => {
      setRows([...rows.slice(0, key), ...rows.slice(key + 1, rows.length)]);
   };

   const handleChange = (e) => {
      if (e.target.name === "asset_id") {
         const obj = data.master_asset.find((value) => value.id == e.target.value);
         setData({
            ...data,
            asset_id: e.target.value,
            asset_dept: obj.department.dept,
         });
      } else if (e.target.type === "file") {
         if (e.target.files[0] !== undefined) {
            setData({
               ...data,
               [e.target.name]: e.target.files[0],
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

   const [loading, setLoading] = useState(false);
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      let formData = new FormData();
      formData.append("pic_id", data.pic_id);
      formData.append("applicant_date", moment(data.applicant_date).format("yyyy/MM/DD"));
      formData.append("request_date_repair", moment(data.request_date_repair).format("yyyy/MM/DD"));
      formData.append("request_time_finish", moment(data.request_time_finish).format("yyyy/MM/DD"));
      formData.append("testing_date", moment(data.testing_date).format("yyyy/MM/DD"));
      formData.append("testing_finish_date", moment(data.testing_finish_date).format("yyyy/MM/DD"));
      formData.append("testing_result", data.testing_result);
      formData.append("person_testing", data.person_testing);
      formData.append("final_cost", data.final_cost.replaceAll("IDR ", "").replaceAll(".", ""));
      formData.append("returning_date", moment(data.returning_date).format("yyyy/MM/DD"));
      formData.append("repair_record", data.repair_record);
      formData.append("document", data.document);
      rows.map((value, index) => {
         formData.append(`asset_data[${index}][asset_id]`, value.asset_id);
         formData.append(`asset_data[${index}][reason]`, value.reason);
      });
      // console.log(Object.fromEntries(formData));
      http
         .post(`asset_maintenance`, formData)
         .then((res) => {
            // console.log(res.data.data);
            navigate("/history-asset/maintenance-asset");
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
                  <h3 className="fw-bold mb-0">Add Maintenance Asset</h3>
               </div>
               {data !== undefined && users !== undefined ? (
                  <>
                     <Card sx={{ mb: 3 }}>
                        <CardContent>
                           <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                 <Autocomplete
                                    freeSolo
                                    fullWidth
                                    disableClearable
                                    options={users}
                                    getOptionLabel={(option) => {
                                       return `${option.code} - ${option.name}`;
                                    }}
                                    inputValue={params.users.search}
                                    onInputChange={(event, newInputValue, reason) => {
                                       setParams({
                                          ...params,
                                          users: {
                                             ...params.users,
                                             search: newInputValue,
                                          },
                                       });
                                    }}
                                    onChange={(e, value) => {
                                       getAsset(value);
                                    }}
                                    renderInput={(params) => (
                                       <TextField
                                          {...params}
                                          label="PIC Asset *"
                                          InputProps={{
                                             ...params.InputProps,
                                             type: "search",
                                          }}
                                       />
                                    )}
                                 />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                 <TextField label="Department" variant="outlined" value={data.pic_dept} fullWidth disabled />
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={data.applicant_date}
                                       name="applicant_date"
                                       label="Applicant Date"
                                       inputFormat="yyyy/MM/dd"
                                       mask="____/__/__"
                                       onChange={(newValue) => {
                                          setData({
                                             ...data,
                                             applicant_date: newValue,
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={data.request_date_repair}
                                       name="request_date_repair"
                                       label="Request Date Repair"
                                       inputFormat="yyyy/MM/dd"
                                       mask="____/__/__"
                                       onChange={(newValue) => {
                                          setData({
                                             ...data,
                                             request_date_repair: newValue,
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={data.request_time_finish}
                                       name="request_time_finish"
                                       label="Request Time Finish"
                                       inputFormat="yyyy/MM/dd"
                                       mask="____/__/__"
                                       onChange={(newValue) => {
                                          setData({
                                             ...data,
                                             request_time_finish: newValue,
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </Grid>
                           </Grid>
                        </CardContent>
                     </Card>
                     <Card sx={{ mb: 3 }}>
                        <CardContent>
                           <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={data.testing_date}
                                       name="testing_date"
                                       label="Testing Date"
                                       inputFormat="yyyy/MM/dd"
                                       mask="____/__/__"
                                       onChange={(newValue) => {
                                          setData({
                                             ...data,
                                             testing_date: newValue,
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={data.testing_finish_date}
                                       name="testing_finish_date"
                                       label="Testing Finish Date"
                                       inputFormat="yyyy/MM/dd"
                                       mask="____/__/__"
                                       onChange={(newValue) => {
                                          setData({
                                             ...data,
                                             testing_finish_date: newValue,
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </Grid>
                              <Grid item xs={12}>
                                 <TextField
                                    name="testing_result"
                                    label="Testing Result"
                                    variant="outlined"
                                    onBlur={handleChange}
                                    rows={4}
                                    multiline
                                    fullWidth
                                    required
                                 />
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                 <TextField name="person_testing" label="Person Testing" variant="outlined" onBlur={handleChange} fullWidth required />
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                 <TextField
                                    name="final_cost"
                                    label="Final Cost"
                                    variant="outlined"
                                    value={NumberFormat(data.final_cost, "Rp")}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                 />
                              </Grid>
                              <Grid item xs={12} sm={6} md={4}>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={data.returning_date}
                                       name="returning_date"
                                       label="Returning Date"
                                       inputFormat="yyyy/MM/dd"
                                       mask="____/__/__"
                                       onChange={(newValue) => {
                                          setData({
                                             ...data,
                                             returning_date: newValue,
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </Grid>
                              <Grid item xs={12}>
                                 <TextField
                                    name="repair_record"
                                    label="Repair Record"
                                    variant="outlined"
                                    onBlur={handleChange}
                                    rows={4}
                                    multiline
                                    fullWidth
                                    required
                                 />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                 {data.document !== null ? (
                                    <TextField
                                       variant="outlined"
                                       label="Supporting Document *"
                                       value={data.document.name}
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
                                                   <IconButton onClick={() => setData({ ...data, document: null })}>
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
                                       Supporting Document *
                                       <input name="document" type="file" onChange={handleChange} hidden />
                                    </Button>
                                 )}
                              </Grid>
                           </Grid>
                        </CardContent>
                     </Card>

                     <Card sx={{ mb: 3 }}>
                        <CardContent>
                           <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                 <TextField
                                    name="asset_id"
                                    label="Choose Asset"
                                    variant="outlined"
                                    value={data.asset_id}
                                    onChange={handleChange}
                                    defaultValue=""
                                    select
                                    fullWidth
                                    required
                                    disabled={data.master_asset.length < 1}
                                 >
                                    {data.master_asset.length > 0 ? (
                                       data.master_asset.map((value, index) => (
                                          <MenuItem
                                             value={value.id}
                                             key={index}
                                             disabled={
                                                rows.length > 0 &&
                                                rows.find(function (row) {
                                                   return row.asset_id === value.id;
                                                })
                                             }
                                          >
                                             {value.asset_code} - {value.asset_name}
                                          </MenuItem>
                                       ))
                                    ) : (
                                       <MenuItem value="">Pilih</MenuItem>
                                    )}
                                 </TextField>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                 <TextField label="Department" variant="outlined" value={data.asset_dept} fullWidth disabled />
                              </Grid>
                              <Grid item xs={12}>
                                 <TextField
                                    name="reason"
                                    label="Reason For Repair"
                                    variant="outlined"
                                    value={data.reason}
                                    onChange={handleChange}
                                    rows={4}
                                    multiline
                                    fullWidth
                                    required
                                 />
                              </Grid>
                              <Grid item xs={12}>
                                 <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ my: 2 }}>
                                    <LoadingButton onClick={handleStaging} variant="contained">
                                       Add
                                    </LoadingButton>
                                 </Stack>
                              </Grid>
                           </Grid>
                           <TableContainer>
                              <Table sx={{ mt: 3 }}>
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
                                       <TableCell>Department</TableCell>
                                       <TableCell>Reason For Repair</TableCell>
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
                                             <TableCell>{value.master_asset.department.dept}</TableCell>
                                             <TableCell>{value.reason}</TableCell>
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
                        <LoadingButton variant="outlined" component={RouterLink} to="/history-asset/maintenance-asset">
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
