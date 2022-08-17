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

import { useParams } from "react-router-dom";
import http from "../../component/api/Api";
import Loading from "../../component/Loading";
import ModalDelete from "../../component/Delete";

import { useRecoilValue } from "recoil";
import { authentication } from "../../store/Authentication";
import { Permission } from "../../component/Permission";

export default function ItSubType() {
   const { user } = useRecoilValue(authentication);
   const { id } = useParams();

   const [rows, setRows] = useState();
   const [data, setData] = useState({
      sub_type: "",
   });
   const [params, setParams] = useState({
      master_it_id: id,
      search: "",
   });

   const getData = async () => {
      http
         .get(`sub_master_it`, {
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

   useEffect(() => {
      setRows(undefined);
      let timer = setTimeout(() => {
         if (params) getData();
      }, 500);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [params]);

   const [method, setMethod] = useState("add");
   const [loading, setLoading] = useState(false);
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      if (method === "add") {
         let formData = new FormData();
         formData.append("master_it_id", id);
         formData.append("sub_type", data.sub_type);
         // console.log(Object.fromEntries(formData));
         http
            .post(`sub_master_it`, formData, {})
            .then((res) => {
               // console.log(res.data.data);
               setLoading(false);
               handleClear();
               getData();
            })
            .catch((err) => {
               // console.log(err.response.data);
               setLoading(false);
            });
      } else {
         let formData = new FormData();
         formData.append("_method", "PUT");
         formData.append("master_it_id", id);
         formData.append("sub_type", data.sub_type);
         http
            .post(`sub_master_it/${data.id}`, formData, {})
            .then((res) => {
               // console.log(res.data.data);
               setMethod("add");
               setLoading(false);
               handleClear();
               getData();
            })
            .catch((err) => {
               // console.log(err.response.data);
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
      setData({
         sub_type: "",
      });
   };

   const handleChange = (e) => {
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
      handleMenu();
   };

   const [openModal, setOpenModal] = useState(false);
   const handleModal = (e) => {
      setOpenModal(!openModal);
   };

   const onDelete = async () => {
      http
         .delete(`sub_master_it/${staging.id}`, {})
         .then((res) => {
            getData();
            handleMenu();
            handleModal();
         })
         .catch((err) => {
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
                  <h3 className="fw-bold mb-0">Sub Master IT</h3>
                  <Stack direction="row" spacing={1}>
                     <Button variant="contained" startIcon={<FileUpload />}>
                        Export
                     </Button>
                  </Stack>
               </div>
               <div className="row">
                  <div
                     className={`${
                        Permission(user.permission, "create sub master it") || Permission(user.permission, "update sub master it") ? "col-xl-8" : ""
                     } col-12 mt-3`}
                  >
                     <Card>
                        <CardContent>
                           <Grid container spacing={2} sx={{ mb: 2 }}>
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
                                       <TableCell>Sub Type</TableCell>
                                       {Permission(user.permission, "update sub master it") || Permission(user.permission, "delete sub master it") ? (
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
                                                <TableCell>{value.sub_type}</TableCell>
                                                {Permission(user.permission, "update sub master it") || Permission(user.permission, "delete sub master it") ? (
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
                              />
                           )}
                        </CardContent>
                     </Card>
                  </div>
                  <div
                     className={`${
                        Permission(user.permission, "create sub master it") || Permission(user.permission, "update sub master it")
                           ? "col-xl-4 col-12 mt-3"
                           : "d-none"
                     } `}
                  >
                     <Card>
                        <CardContent>
                           <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                              {method === "add" ? "Add" : "Edit"} Sub Master IT
                           </Typography>
                           <Box component="form" onSubmit={handleSubmit}>
                              <TextField
                                 name="sub_type"
                                 label="Sub Type"
                                 margin="normal"
                                 variant="outlined"
                                 value={data.sub_type}
                                 onChange={handleChange}
                                 fullWidth
                                 required
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
                     {Permission(user.permission, "update sub master it") || Permission(user.permission, "delete sub master it") ? (
                        <Menu
                           anchorEl={anchorEl}
                           open={open}
                           onClose={handleMenu}
                           transformOrigin={{ horizontal: "right", vertical: "top" }}
                           anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                           {Permission(user.permission, "update sub master it") && (
                              <MenuItem onClick={handleEdit}>
                                 <ListItemIcon>
                                    <Edit />
                                 </ListItemIcon>
                                 Edit
                              </MenuItem>
                           )}
                           {Permission(user.permission, "delete sub master it") && (
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
