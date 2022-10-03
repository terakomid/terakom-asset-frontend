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

import http from "../../component/api/Api";
import Loading from "../../component/Loading";
import ModalDelete from "../../component/Delete";

import { useSnackbar } from "notistack";
import { useRecoilValue } from "recoil";
import { authentication } from "../../store/Authentication";
import { Permission } from "../../component/Permission";
import { Capitalize } from "../../component/Format";
import { exportTableToExcel } from "../../help/ExportToExcel";

export default function AssetLocation() {
   const { user } = useRecoilValue(authentication);
   const { enqueueSnackbar } = useSnackbar();

   const [rows, setRows] = useState();
   const [data, setData] = useState({
      code: "",
      location: "",
   });
   const [error, setError] = useState("");
   const [params, setParams] = useState({
      search: "",
      parent_id: "",
   });

   const getData = async () => {
      http
         .get(`location`, {
            params: params,
         })
         .then((res) => {
            // console.log(res.data.data);
            setRows(res.data.data);
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   const [listParent, setListParent] = useState([]);
   const getListParent = async () => {
      http
         .get(`location`, {
            params: {
               parent: 1,
            },
         })
         .then((res) => {
            // console.log(res.data.data);
            setListParent(res.data.data);
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   const [parent, setParent] = useState(null);
   const getParent = async (code) => {
      http
         .get(`location/${code}`)
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
   }, [params]);
   useEffect(() => {
      getListParent();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const [method, setMethod] = useState("add");
   const [loading, setLoading] = useState(false);
   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);
      if (method === "add") {
         let formData = new FormData();
         formData.append("code", data.code);
         formData.append("location", data.location);
         formData.append("parent_id", parent !== null ? parent.id : "");
         // console.log(Object.fromEntries(formData));
         http
            .post(`location`, formData)
            .then((res) => {
               // console.log(res.data.data);
               setParent(null);
               handleClear();
               getData();
               enqueueSnackbar(Capitalize(res.data.meta.message), { variant: "success" });
            })
            .catch((xhr) => {
               // console.log(xhr.response.data);
               xhr.response && setError(xhr.response.data.errors);
            })
            .finally(() => {
               setLoading(false);
            });
      } else {
         let formData = new FormData();
         formData.append("_method", "PUT");
         formData.append("code", data.code);
         formData.append("location", data.location);
         formData.append("parent_id", parent !== null ? parent.id : "");
         http
            .post(`location/${data.id}`, formData)
            .then((res) => {
               // console.log(res.data.data);
               setMethod("add");
               setParent(null);
               handleClear();
               getData();
               enqueueSnackbar(Capitalize(res.data.meta.message), { variant: "success" });
            })
            .catch((xhr) => {
               // console.log(xhr.response.data);
               xhr.response && setError(xhr.response.data.errors);
            })
            .finally(() => {
               setLoading(false);
            });
      }
   };

   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleClear = (e) => {
      setMethod("add");
      setParent(null);
      setError("");
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

   const handleSearch = (e) => {
      setPage(0);
      setParams({
         ...params,
         page: 1,
         [e.target.name]: e.target.value,
      });
   };

   const handleEdit = () => {
      setMethod("edit");
      setData(staging);
      setError("");
      handleMenu();
      staging.parent !== null ? setParent(staging.parent) : setParent(null);
   };

   const handleExport = async () => {
      exportTableToExcel("#table-export", "Asset-Location");
   };

   const [openModal, setOpenModal] = useState(false);
   const handleModal = (e) => {
      setOpenModal(!openModal);
   };

   const onDelete = async () => {
      http
         .delete(`location/${staging.id}`)
         .then((res) => {
            getData();
            handleMenu();
            handleModal();
         })
         .catch((err) => {
            // console.log(err.response.data);
            setLoading(false);
         });
   };

   const [staging, setStaging] = useState();
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event, value) => {
      setAnchorEl(event.currentTarget);
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
                  {rows !== undefined &&
                     rows.length > 0 &&
                     <Stack direction="row" spacing={1}>
                        <Button variant="contained" startIcon={<FileUpload />} onClick={handleExport}>
                           Export
                        </Button>
                     </Stack>
                  }
               </div>
               <div className="row">
                  <div
                     className={`${
                        Permission(user.permission, "create location") || Permission(user.permission, "update location") ? "col-xl-8" : ""
                     } col-12 mt-3`}
                  >
                     <Card>
                        <CardContent>
                           <Grid container spacing={2} sx={{ mb: 2 }}>
                              <Grid item xs={4}>
                                 <TextField
                                    name="parent_id"
                                    variant="outlined"
                                    label="Parent"
                                    value={params.parent_id}
                                    onChange={handleSearch}
                                    defaultValue=""
                                    select
                                    fullWidth
                                 >
                                    <MenuItem value={""}>{"All Parent"}</MenuItem>
                                    {listParent.map((v) => (
                                       <MenuItem key={v.id} value={v.id}>
                                          {v.location}
                                       </MenuItem>
                                    ))}
                                 </TextField>
                              </Grid>
                              <Grid item xs>
                                 <TextField
                                    name="search"
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
                                       endAdornment: params.search !== "" && (
                                          <InputAdornment position="end">
                                             <IconButton onClick={() => setParams({ ...params, search: "" })}>
                                                <CloseRounded />
                                             </IconButton>
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
                                       {Permission(user.permission, "update location") || Permission(user.permission, "delete location") ? (
                                          <TableCell align="center">Action</TableCell>
                                       ) : null}
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {rows !== undefined ? (
                                       rows.length > 0 ? (
                                          rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, key) => (
                                             <TableRow key={key}>
                                                <TableCell component="th" scope="row" align="center">
                                                   {page * rowsPerPage + key + 1}.
                                                </TableCell>
                                                <TableCell>{value.code}</TableCell>
                                                <TableCell>{value.location}</TableCell>
                                                <TableCell>{value.parent !== null && value.parent.location}</TableCell>
                                                {Permission(user.permission, "update location") || Permission(user.permission, "delete location") ? (
                                                   <TableCell align="center">
                                                      <IconButton onClick={(e) => handleClick(e, value)}>
                                                         <MoreVert />
                                                      </IconButton>
                                                   </TableCell>
                                                ) : null}
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
                                 showFirstButton
                                 showLastButton
                              />
                           )}
                        </CardContent>
                     </Card>
                     {rows !== undefined && rows.length > 0 && (
                        <table border={1} id="table-export" style={{ display: "none" }}>
                           <thead>
                              <tr>
                                 <td>Id</td>
                                 <td>Code</td>
                                 <td>Location</td>
                                 <td>Parent</td>
                              </tr>
                           </thead>
                           <tbody>
                              {rows.map((value, key) => {
                                 return (
                                    <tr key={key}>
                                       <td>{value.id}</td>
                                       <td>{value.code}</td>
                                       <td>{value.location}</td>
                                       <td>{value.parent !== null && value.parent.location}</td>
                                    </tr>
                                 );
                              })}
                           </tbody>
                        </table>
                     )}
                  </div>
                  <div
                     className={`${
                        Permission(user.permission, "create location") || Permission(user.permission, "update location") ? "col-xl-4 col-12 mt-3" : "d-none"
                     } `}
                  >
                     <Card>
                        <CardContent>
                           <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                              {method === "add" ? "Add" : "Edit"} Asset Location
                           </Typography>
                           <Box component="form" noValidate={true} onSubmit={handleSubmit}>
                              <TextField
                                 name="code"
                                 label="Code"
                                 margin="normal"
                                 variant="outlined"
                                 value={data.code}
                                 onChange={handleChange}
                                 error={!!error.code}
                                 helperText={error.code !== undefined && error.code[0]}
                                 fullWidth
                                 required
                              />
                              <TextField
                                 name="location"
                                 label="Location"
                                 margin="normal"
                                 variant="outlined"
                                 value={data.location}
                                 onChange={handleChange}
                                 error={!!error.location}
                                 helperText={error.location !== undefined && error.location[0]}
                                 fullWidth
                                 required
                              />
                              <TextField
                                 name="parent_id"
                                 label="Parent"
                                 margin="normal"
                                 variant="outlined"
                                 value={parent !== null ? parent.location : ""}
                                 fullWidth
                                 disabled
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
                     <ModalDelete open={openModal} delete={onDelete} handleClose={handleModal} />

                     {/* menu */}
                     {Permission(user.permission, "update location") || Permission(user.permission, "delete location") ? (
                        <Menu
                           anchorEl={anchorEl}
                           open={open}
                           onClose={handleMenu}
                           transformOrigin={{ horizontal: "right", vertical: "top" }}
                           anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                           {Permission(user.permission, "update location") && (
                              <MenuItem onClick={handleEdit}>
                                 <ListItemIcon>
                                    <Edit />
                                 </ListItemIcon>
                                 Edit
                              </MenuItem>
                           )}
                           {Permission(user.permission, "delete location") && (
                              <MenuItem onClick={handleModal}>
                                 <ListItemIcon>
                                    <Delete />
                                 </ListItemIcon>
                                 Delete
                              </MenuItem>
                           )}
                        </Menu>
                     ) : null}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
