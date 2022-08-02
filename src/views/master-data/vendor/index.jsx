import React, { useEffect, useState } from "react";
import {
   Button,
   Card,
   CardContent,
   Grid,
   IconButton,
   InputAdornment,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   Stack,
   TablePagination,
   Menu,
   MenuItem,
   ListItemIcon,
} from "@mui/material";
import { AddRounded, CloseRounded, Delete, Edit, FileDownload, FileUpload, MoreVert, Search } from "@mui/icons-material";

import http from "../../../component/api/Api";
import { Link as RouterLink } from "react-router-dom";
import Loading from "../../../component/Loading";
import ModalDelete from "../../../component/Delete";

export default function Vendor() {
   const [rows, setRows] = useState();
   const [params, setParams] = useState({
      search: "",
   });

   const getData = async () => {
      http
         .get(`/vendor`, {
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

   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleSearch = (e) => {
      setPage(0);
      setParams({
         ...params,
         page: 1,
         [e.target.name]: e.target.value,
      });
   };

   const [openModal, setOpenModal] = useState(false);
   const handleModal = (e) => {
      setOpenModal(!openModal);
   };

   const onDelete = async () => {
      http
         .delete(`/vendor/${staging.id}`, {})
         .then((res) => {
            getData();
            handleMenu();
            handleModal();
         })
         .catch((err) => {
            // console.log(err.response.data);
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
               <div className="d-flex align-items-center justify-content-between mt-2 mb-4">
                  <h3 className="fw-bold mb-0">Master Vendor Name</h3>
                  <Stack direction="row" spacing={1}>
                     <Button variant="contained" startIcon={<FileDownload />}>
                        Import
                     </Button>
                     <Button variant="contained" startIcon={<FileUpload />}>
                        Export
                     </Button>
                     <Button variant="contained" startIcon={<AddRounded />} component={RouterLink} to="./create">
                        Add Vendor
                     </Button>
                  </Stack>
               </div>
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
                                 <TableCell>Code</TableCell>
                                 <TableCell>Vendor Name</TableCell>
                                 <TableCell>Vendor Address</TableCell>
                                 <TableCell>PIC Contact</TableCell>
                                 <TableCell>Contact</TableCell>
                                 <TableCell align="center">Action</TableCell>
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
                                          <TableCell>{value.name}</TableCell>
                                          <TableCell>{value.address}</TableCell>
                                          <TableCell>{value.pic_contact}</TableCell>
                                          <TableCell>{value.contact}</TableCell>
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
               <ModalDelete open={openModal} delete={onDelete} handleClose={handleModal} />
               <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenu}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
               >
                  <MenuItem component={RouterLink} to={`/vendor/edit/${staging?.id}`}>
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
   );
}
