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

export default function AssetCondition() {
   const { user } = useRecoilValue(authentication);
   const { enqueueSnackbar } = useSnackbar();

   const [rows, setRows] = useState();
   const [data, setData] = useState({
      condition: "",
   });
   const [error, setError] = useState("");
   const [params, setParams] = useState({
      search: "",
   });

   const getData = async () => {
      http
         .get(`condition`, {
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
      setError("");
      if (method === "add") {
         let formData = new FormData();
         formData.append("condition", data.condition);
         // console.log(Object.fromEntries(formData));
         http
            .post(`condition`, formData)
            .then((res) => {
               // console.log(res.data.data);
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
         formData.append("condition", data.condition);
         http
            .post(`condition/${data.id}`, formData)
            .then((res) => {
               // console.log(res.data.data);
               setMethod("add");
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
      setError("");
      setData({
         condition: "",
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
      setError("");
      handleMenu();
   };

   const handleExport = async () => {
      exportTableToExcel("#table-export", "Asset-Condition");
   };

   const [openModal, setOpenModal] = useState(false);
   const handleModal = (e) => {
      setOpenModal(!openModal);
   };

   const onDelete = async () => {
      http
         .delete(`condition/${staging.id}`)
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
                  <h3 className="fw-bold mb-0">Master Asset Condition</h3>
                  <Stack direction="row" spacing={1}>
                     <Button variant="contained" startIcon={<FileUpload />} onClick={handleExport}>
                        Export
                     </Button>
                  </Stack>
               </div>
               <div className="row">
                  <div
                     className={`${
                        Permission(user.permission, "create condition") || Permission(user.permission, "update condition") ? "col-xl-8" : ""
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
                                       <TableCell>Asset Condition</TableCell>
                                       {Permission(user.permission, "update condition") || Permission(user.permission, "delete condition") ? (
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
                                                <TableCell>{value.condition}</TableCell>
                                                {Permission(user.permission, "update condition") || Permission(user.permission, "delete condition") ? (
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
                                 <td>Asset Condition</td>
                              </tr>
                           </thead>
                           <tbody>
                              {rows.map((value, key) => {
                                 return (
                                    <tr key={key}>
                                       <td>{value.id}</td>
                                       <td>{value.condition}</td>
                                    </tr>
                                 );
                              })}
                           </tbody>
                        </table>
                     )}
                  </div>
                  <div
                     className={`${
                        Permission(user.permission, "create condition") || Permission(user.permission, "update condition") ? "col-xl-4 col-12 mt-3" : "d-none"
                     } `}
                  >
                     <Card>
                        <CardContent>
                           <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                              {method === "add" ? "Add" : "Edit"} Asset Condition
                           </Typography>
                           <Box component="form" noValidate={true} onSubmit={handleSubmit}>
                              <TextField
                                 name="condition"
                                 label="Asset Condition"
                                 margin="normal"
                                 variant="outlined"
                                 value={data.condition}
                                 onChange={handleChange}
                                 error={!!error.condition}
                                 helperText={error.condition !== undefined && error.condition[0]}
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
                     {Permission(user.permission, "update condition") || Permission(user.permission, "delete condition") ? (
                        <Menu
                           anchorEl={anchorEl}
                           open={open}
                           onClose={handleMenu}
                           transformOrigin={{ horizontal: "right", vertical: "top" }}
                           anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                           {Permission(user.permission, "update condition") && (
                              <MenuItem onClick={handleEdit}>
                                 <ListItemIcon>
                                    <Edit />
                                 </ListItemIcon>
                                 Edit
                              </MenuItem>
                           )}
                           {Permission(user.permission, "update condition") && (
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
