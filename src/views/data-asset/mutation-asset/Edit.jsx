import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, TextField, Stack, Grid, Typography, MenuItem, Button, IconButton, InputAdornment, Tooltip } from "@mui/material";
import { Close, FileUploadOutlined, InsertDriveFile } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";

import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { Permission } from "../../../component/Permission";

export default function EditMutationAsset() {
   const { user } = useRecoilValue(authentication);
   const navigate = useNavigate();
   const { id } = useParams();

   const [users, setUsers] = useState();
   const getUsers = async () => {
      http
         .get(`user`)
         .then((res) => {
            // console.log(res.data.data);
            setUsers(res.data.data);
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

   const [data, setData] = useState();
   const getMutation = async () => {
      http
         .get(`asset_mutation/${id}`)
         .then((res) => {
            // console.log(res.data.data);
            let value = res.data.data;
            setData({
               pic: value.pic.id,
               pic_dept: value.pic.department,
               receive: value.receive.id,
               receive_dept: value.receive.department,
               reason: value.reason,
               asset: value.asset.id,
               from_branch: value.from_branch.id,
               from_room: value.from_room,
               to_branch: value.to_branch.id,
               to_room: value.to_room,
               document: { name: value.ducument.split("/").pop() },
            });
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   useEffect(() => {
      if (Permission(user.permission, "update asset mutation")) {
         window.scrollTo(0, 0);
         getUsers();
         getLocation();
         getMutation();
      } else {
         navigate("/history-asset/mutation-asset");
      }
   }, []);

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
      formData.append("_method", "PUT");
      // formData.append("pic_id", data.pic);
      // formData.append("receive_id", data.receive);
      formData.append("reason", data.reason);
      // formData.append("asset_id", data.asset);
      formData.append("quantity", 1);
      formData.append("from_branch_id", data.from_branch);
      formData.append("from_room", data.from_room);
      formData.append("to_branch_id", data.to_branch);
      formData.append("to_room", data.to_room);
      data.document.size !== undefined && formData.append("document", data.document);
      // console.log(Object.fromEntries(formData));
      http
         .post(`asset_mutation/${id}`, formData)
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
                  <h3 className="fw-bold mb-0">Edit Mutation Asset</h3>
               </div>
               {data !== undefined && users !== undefined && location !== undefined ? (
                  <Card sx={{ mb: 3 }}>
                     <CardContent>
                        <Box component="form" onSubmit={handleSubmit}>
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
                                    disabled
                                 >
                                    {users.data.map((value, index) => (
                                       <MenuItem value={value.id} key={index}>
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
                                    disabled
                                 >
                                    {users.data.map((value, index) => (
                                       <MenuItem value={value.id} key={index}>
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
                                 <TextField name="to_room" label="To Room" variant="outlined" value={data.to_room} onChange={handleChange} fullWidth required />
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
                                    <LoadingButton type="submit" variant="contained" loading={loading}>
                                       Save
                                    </LoadingButton>
                                 </Stack>
                              </Grid>
                           </Grid>
                        </Box>
                     </CardContent>
                  </Card>
               ) : (
                  <Loading />
               )}
            </div>
         </div>
      </div>
   );
}
