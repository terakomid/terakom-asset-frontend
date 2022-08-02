import React, { useEffect, useState } from "react";
import {
   Button,
   Box,
   Card,
   CardContent,
   Grid,
   IconButton,
   InputAdornment,
   MenuItem,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   Typography,
   Stack,
   Menu,
   ListItemIcon,
   FormControl,
   TablePagination,
} from "@mui/material";
import { CloseRounded, Delete, Edit, FileDownload, FileUpload, MoreVert, Search } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import axios from "axios";
import { apiUrl } from "../../../variable/Url";
import Loading from "../../../component/Loading";
import ModalDelete from "../../../component/Delete";
import { param } from "jquery";

export default function AssetLocation() {
   const token = localStorage.getItem("token");

   const [allData, setAllData] = useState([]);
   const [rows, setRows] = useState();
   const [data, setData] = useState({
      code: "",
      location: "",
   });
   const [params, setParams] = useState({
      search: "",
      parent_id: "",
   });

   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };
   const [parentData, setParentData] = useState([]);
   const getData = async () => {
      await axios
         .get(`${apiUrl}/location`, {
            params: params,
            headers: {
               Authorization: "Bearer " + token,
            },
         })
         .then((res) => {
            // console.log(res.data.data);
            let parent = res.data.data.filter((v) => v.parent == null);
            setParentData([...parent]);
            setRows(res.data.data);
            setAllData(res.data.data);
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   const [parent, setParent] = useState(null);
   const getParent = async (code) => {
      await axios
         .get(`${apiUrl}/location/${code}`, {
            headers: {
               Authorization: "Bearer " + token,
            },
         })
         .then((res) => {
            // console.log(res.data.data);
            setParent(res.data.data);
         })
         .catch((err) => {
            // console.log(err.response);
            setParent(null);
         });
   };

   useEffect(() => {
      setRows(undefined);
      let timer = setTimeout(() => {
         if (params) getData();
      }, 500);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const [method, setMethod] = useState("create");
   const [loading, setLoading] = useState(false);
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      if (method === "create") {
         let formData = new FormData();
         formData.append("code", data.code);
         formData.append("location", data.location);
         formData.append("parent_id", parent !== null ? parent.id : "");
         // console.log(Object.fromEntries(formData));
         await axios
            .post(`${apiUrl}/location`, formData, {
               headers: {
                  Authorization: "Bearer " + token,
               },
            })
            .then((res) => {
               console.log(res.data.data);
               setParent(null);
               setLoading(false);
               handleClear();
               getData();
            })
            .catch((err) => {
               console.log(err.response.data);
               setLoading(false);
            });
      } else {
         let formData = new FormData();
         formData.append("_method", "PUT");
         formData.append("code", data.code);
         formData.append("location", data.location);
         formData.append("parent_id", parent !== null ? parent.id : "");
         await axios
            .post(`${apiUrl}/location/${data.id}`, formData, {
               headers: {
                  Authorization: "Bearer " + token,
               },
            })
            .then((res) => {
               console.log(res.data.data);
               setMethod("create");
               setParent(null);
               setLoading(false);
               handleClear();
               getData();
            })
            .catch((err) => {
               console.log(err.response.data);
               setLoading(false);
            });
      }
   };

   const handleClear = (e) => {
      setMethod("create");
      setParent(null);
      setData({
         code: "",
         location: "",
      });
   };

   const handleChange = (e) => {
      if (e.target.name === "code") {
         let last = e.target.value.substring(0, e.target.value.length - 1);
         getParent(last);
      }
      setData({
         ...data,
         [e.target.name]: e.target.value,
      });
   };

   const [parentValue, setParentValue] = useState("");
   const handleParent = (e) => {
      setParentValue(e.target.value);
      const val = e.target.value;
      const temp = allData.filter((v) => v.code.toLowerCase().includes(val.toLowerCase()) || v.location.toLowerCase().includes(val.toLowerCase()));
      setRows([...temp]);
   };

   const handleSearch = (e) => {
      setPage(0);
      setParams({
         ...params,
         page: 1,
         [e.target.name]: e.target.value,
      });
      const val = e.target.value;
      const temp = allData.filter((v) => v.code.toLowerCase().includes(val.toLowerCase()) || v.location.toLowerCase().includes(val.toLowerCase()));
      setRows([...temp]);
   };

   const handleEdit = () => {
      setData(staging);
      handleMenu();
      staging.parent !== null ? setParent(staging.parent) : setParent(null);
   };

   const [openModal, setOpenModal] = useState(false);
   const handleModal = (e) => {
      setOpenModal(!openModal);
   };

   const onDelete = async () => {
      await axios
         .delete(`${apiUrl}/location/${staging.id}`, {
            headers: {
               Authorization: "Bearer " + token,
            },
         })
         .then((res) => {
            getData();
            handleMenu();
            handleModal();
         })
         .catch((err) => {
            console.log(err.response.data);
            setLoading(false);
         });
   };

   const [staging, setStaging] = useState();
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event, value) => {
      setAnchorEl(event.currentTarget);
      setMethod("edit");
      setStaging(value);
   };
   const handleMenu = () => {
      setAnchorEl(null);
   };

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="d-flex align-items-center justify-content-between my-2">
                  <h3 className="fw-bold mb-0">Master Asset Location</h3>
                  <Stack direction="row" spacing={1}>
                     <Button variant="contained" startIcon={<FileDownload />}>
                        Import
                     </Button>
                     <Button variant="contained" startIcon={<FileUpload />}>
                        Export
                     </Button>
                  </Stack>
               </div>
               <div className="row">
                  <div className="col-xl-8 col-12 mt-3">
                     <Card>
                        <CardContent>
                           <Grid container spacing={2} sx={{ mb: 2 }}>
                              <Grid item xs={4}>
                                 <TextField variant="outlined" label="Parent" value={params.parent_id} onChange={handleParent} defaultValue="" select fullWidth>
                                    {parentData.map((v) => (
                                       <MenuItem key={v.id} value={v.location}>
                                          {v.location}
                                       </MenuItem>
                                    ))}
                                 </TextField>
                              </Grid>
                              <Grid item xs>
                                 <TextField
                                    name="search"
                                    type="search"
                                    variant="outlined"
                                    label="Search"
                                    autoComplete="off"
                                    onChange={handleSearch}
                                    value={params.search}
                                    InputProps={{
                                       startAdornment: (
                                          <InputAdornment position="start">
                                             <Search fontSize="small" />
                                          </InputAdornment>
                                       ),
                                    }}
                                    fullWidth
                                 />
                              </Grid>
                           </Grid>
                           <TableContainer>
                              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                 <TableHead>
                                    <TableRow
                                       sx={{
                                          "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                                          "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                                       }}
                                    >
                                       <TableCell align="center">No.</TableCell>
                                       <TableCell>Code</TableCell>
                                       <TableCell>Location</TableCell>
                                       <TableCell>Parent</TableCell>
                                       <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {rows !== undefined ? (
                                       rows.length > 0 ? (
                                          rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, key) => (
                                             <TableRow key={key}>
                                                <TableCell component="th" scope="row" align="center">
                                                   {key + 1}.
                                                </TableCell>
                                                <TableCell>{value.code}</TableCell>
                                                <TableCell>{value.location}</TableCell>
                                                <TableCell>{value.parent !== null && value.parent.location}</TableCell>
                                                <TableCell align="center">
                                                   <IconButton onClick={(e) => handleClick(e, value)}>
                                                      <MoreVert />
                                                   </IconButton>
                                                </TableCell>
                                             </TableRow>
                                          ))
                                       ) : (
                                          <TableRow>
                                             <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 10 }} colSpan={10}>
                                                No result found
                                                {params.search !== "" && (
                                                   <div style={{ display: "inline-block" }}>
                                                      &nbsp;for "<b>{params.search}</b>"
                                                   </div>
                                                )}
                                                .
                                             </TableCell>
                                          </TableRow>
                                       )
                                    ) : (
                                       <TableRow>
                                          <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 5 }} colSpan={10}>
                                             <Loading />
                                          </TableCell>
                                       </TableRow>
                                    )}
                                 </TableBody>
                              </Table>
                           </TableContainer>
                           {rows !== undefined && rows.length > 0 && (
                              <TablePagination
                                 rowsPerPageOptions={[5, 10, 25]}
                                 component="div"
                                 count={rows.length}
                                 page={page}
                                 rowsPerPage={rowsPerPage}
                                 onPageChange={handleChangePage}
                                 onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                           )}
                        </CardContent>
                     </Card>
                  </div>
                  <div className="col-xl-4 col-12 mt-3">
                     <Card>
                        <CardContent>
                           <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                              Form Asset Location
                           </Typography>
                           <Box component="form" onSubmit={handleSubmit}>
                              <TextField
                                 name="code"
                                 label="Code"
                                 margin="normal"
                                 variant="outlined"
                                 value={data.code}
                                 onChange={handleChange}
                                 fullWidth
                                 required
                                 // error={this.state.errorCode}
                                 // helperText={this.state.errorTextUniqueCode}
                              />
                              <TextField
                                 name="location"
                                 label="Location"
                                 margin="normal"
                                 variant="outlined"
                                 value={data.location}
                                 onChange={handleChange}
                                 fullWidth
                                 required
                                 // error={this.state.errorCode}
                                 // helperText={this.state.errorTextUniqueCode}
                              />
                              <TextField
                                 name="parent_id"
                                 label="Parent"
                                 margin="normal"
                                 variant="outlined"
                                 value={parent !== null ? parent.location : ""}
                                 fullWidth
                                 disabled
                                 // error={this.state.errorCode}
                                 // helperText={this.state.errorTextUniqueCode}
                              />
                              <FormControl margin="normal">
                                 <Stack direction="row" spacing={1}>
                                    <LoadingButton type="submit" loading={loading} variant="contained">
                                       Save
                                    </LoadingButton>
                                    <Button type="reset" onClick={handleClear} variant="outlined">
                                       Reset
                                    </Button>
                                 </Stack>
                              </FormControl>
                           </Box>
                        </CardContent>
                     </Card>

                     {/* utils */}
                     <ModalDelete open={openModal} message="CEMAS KAU DEK?" title="Are You Sure?" delete={onDelete} handleClose={handleModal} />

                     {/* menu */}
                     <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenu}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                     >
                        <MenuItem onClick={handleEdit}>
                           <ListItemIcon>
                              <Edit />
                           </ListItemIcon>
                           Edit
                        </MenuItem>
                        <MenuItem onClick={handleModal}>
                           <ListItemIcon>
                              <Delete />
                           </ListItemIcon>
                           Delete
                        </MenuItem>
                     </Menu>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
