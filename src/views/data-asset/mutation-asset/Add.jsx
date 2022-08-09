import React, { useEffect, useState } from "react";
import {
   Box,
   Card,
   CardContent,
   TextField,
   Stack,
   Grid,
   Typography,
   MenuItem,
   Button,
   TableContainer,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   IconButton,
   InputAdornment,
   Tooltip,
} from "@mui/material";
import { Close, Delete, Edit, FileUploadOutlined, InsertDriveFile } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";

export default function AddMutationAsset() {
   const navigate = useNavigate();

   const [rows, setRows] = useState([]);
   const [data, setData] = useState();

   const [user, setUser] = useState();
   const getUser = async () => {
      http
         .get(`user`)
         .then((res) => {
            // console.log(res.data.data);
            setUser(res.data.data);
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   const [location, setLocation] = useState();
   const getLocation = async () => {
      http
         .get(`location`)
         .then((res) => {
            // console.log(res.data.data);
            setLocation(res.data.data);
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
            setData({
               ...data,
               pic: employee,
               pic_dept: employee.dept.dept,
               master_asset: res.data.data.data,
               from_branch: employee.location.id,
            });
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   useEffect(() => {
      window.scrollTo(0, 0);
      getUser();
      getLocation();
      handleReset();
   }, []);

   const handleReset = (e) => {
      setData({
         pic: "",
         pic_dept: "",
         receive: "",
         receive_dept: "",
         reason: "",
         asset: "",
         master_asset: [],
         from_branch: "",
         from_room: "",
         to_branch: "",
         to_room: "",
         document: null,
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
      if (e.target.type === "file") {
         if (e.target.files[0] !== undefined) {
            setData({
               ...data,
               [e.target.name]: e.target.files[0],
            });
            e.target.value = null;
         }
      } else {
         if (e.target.name === "pic") {
            getAsset(e.target.value);
         } else if (e.target.name === "receive") {
            setData({
               ...data,
               [e.target.name]: e.target.value,
               receive_dept: e.target.value.dept.dept,
               to_branch: e.target.value.location.id,
            });
         } else {
            setData({
               ...data,
               [e.target.name]: e.target.value,
            });
         }
      }
   };

   const [loading, setLoading] = useState(false);
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      let formData = new FormData();
      rows.map((value, index) => {
         formData.append(`asset_mutation[${index}][pic_id]`, value.pic.id);
         formData.append(`asset_mutation[${index}][receive_id]`, value.receive.id);
         formData.append(`asset_mutation[${index}][reason]`, value.reason);
         formData.append(`asset_mutation[${index}][asset_id]`, value.asset.id);
         formData.append(`asset_mutation[${index}][quantity]`, 1);
         formData.append(`asset_mutation[${index}][from_branch_id]`, value.from_branch);
         formData.append(`asset_mutation[${index}][from_room]`, value.from_room);
         formData.append(`asset_mutation[${index}][to_branch_id]`, value.to_branch);
         formData.append(`asset_mutation[${index}][to_room]`, value.to_room);
         formData.append(`asset_mutation[${index}][document]`, value.document);
      });
      // console.log(Object.fromEntries(formData));
      http
         .post(`asset_mutation`, formData)
         .then((res) => {
            // console.log(res.data.data);
            navigate("/history-asset/mutation-asset");
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
                  <h3 className="fw-bold mb-0">Add Mutation Asset</h3>
               </div>
               {data !== undefined && user !== undefined && location !== undefined ? (
                  <>
                     <Card sx={{ mb: 3 }}>
                        <CardContent>
                           <Box component="form" onSubmit={handleStaging}>
                              <Grid container spacing={2}>
                                 <Grid item xs={12}>
                                    <Typography color="primary" pb={2}>
                                       To:
                                    </Typography>
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <TextField
                                       name="pic"
                                       label="PIC Asset"
                                       variant="outlined"
                                       value={data.pic}
                                       onChange={handleChange}
                                       defaultValue=""
                                       select
                                       fullWidth
                                       required
                                    >
                                       {user.data.map((value, index) => (
                                          <MenuItem value={value} key={index}>
                                             {value.code} - {value.name}
                                          </MenuItem>
                                       ))}
                                    </TextField>
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <TextField label="Department" variant="outlined" value={data.pic_dept} fullWidth disabled />
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <TextField
                                       name="receive"
                                       label="Receive Name"
                                       variant="outlined"
                                       value={data.receive}
                                       onChange={handleChange}
                                       defaultValue=""
                                       select
                                       fullWidth
                                       required
                                    >
                                       {user.data.map((value, index) => (
                                          <MenuItem value={value} key={index} disabled={data.pic.id === value.id}>
                                             {value.code} - {value.name}
                                          </MenuItem>
                                       ))}
                                    </TextField>
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <TextField label="Department" variant="outlined" value={data.receive_dept} fullWidth disabled />
                                 </Grid>
                                 <Grid item xs={12}>
                                    <TextField
                                       name="reason"
                                       label="Reason"
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
                                    <TextField
                                       name="asset"
                                       label="Choose Asset"
                                       variant="outlined"
                                       value={data.asset}
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
                                                value={value}
                                                key={index}
                                                disabled={rows.find(function (row) {
                                                   return row.asset.asset_code === value.asset_code;
                                                })}
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
                                    <TextField
                                       name="from_branch"
                                       label="From Branch"
                                       variant="outlined"
                                       value={data.from_branch}
                                       onChange={handleChange}
                                       defaultValue=""
                                       select
                                       fullWidth
                                       required
                                    >
                                       {location.map((value, index) => (
                                          <MenuItem value={value.id} key={index}>
                                             {value.code} - {value.location}
                                          </MenuItem>
                                       ))}
                                    </TextField>
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <TextField
                                       name="from_room"
                                       label="From Room"
                                       variant="outlined"
                                       value={data.from_room}
                                       onChange={handleChange}
                                       fullWidth
                                       required
                                    />
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <TextField
                                       name="to_branch"
                                       label="To Branch"
                                       variant="outlined"
                                       value={data.to_branch}
                                       onChange={handleChange}
                                       defaultValue=""
                                       select
                                       fullWidth
                                       required
                                    >
                                       {location.map((value, index) => (
                                          <MenuItem value={value.id} key={index}>
                                             {value.code} - {value.location}
                                          </MenuItem>
                                       ))}
                                    </TextField>
                                 </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <TextField
                                       name="to_room"
                                       label="To Room"
                                       variant="outlined"
                                       value={data.to_room}
                                       onChange={handleChange}
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
                                          <input name="document" type="file" onChange={handleChange} hidden required />
                                       </Button>
                                    )}
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
                                       <TableCell>PIC Asset</TableCell>
                                       <TableCell>Receive Name</TableCell>
                                       <TableCell>Asset Code</TableCell>
                                       <TableCell>Asset Name</TableCell>
                                       <TableCell>From Branch</TableCell>
                                       <TableCell>From Room</TableCell>
                                       <TableCell>To Branch</TableCell>
                                       <TableCell>To Room</TableCell>
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
                                             <TableCell>{value.pic.name}</TableCell>
                                             <TableCell>{value.receive.name}</TableCell>
                                             <TableCell>{value.asset.asset_code}</TableCell>
                                             <TableCell>{value.asset.asset_name}</TableCell>
                                             <TableCell>
                                                {location.map(function (row) {
                                                   if (row.id == value.from_branch) {
                                                      return `${row.code} - ${row.location}`;
                                                   }
                                                })}
                                             </TableCell>
                                             <TableCell>{value.from_room}</TableCell>
                                             <TableCell>
                                                {location.map(function (row) {
                                                   if (row.id == value.to_branch) {
                                                      return `${row.code} - ${row.location}`;
                                                   }
                                                })}
                                             </TableCell>
                                             <TableCell>{value.to_room}</TableCell>
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
                        <LoadingButton variant="outlined" component={RouterLink} to="/history-asset/mutation-asset">
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
