import React, { useEffect, useState } from "react";
import {
   Button,
   Box,
   Card,
   CardContent,
   IconButton,
   InputAdornment,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   Typography,
   Stack,
   TablePagination,
   Link,
   Grid,
} from "@mui/material";
import { CloseRounded, FilterListRounded, MoreVert, Search } from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";
// import ModalDelete from "../../../component/Delete";

export default function HistoryAsset() {
   const [rows, setRows] = useState();
   const [data, setData] = useState({
      code: "",
      category: "",
   });
   const [params, setParams] = useState({
      search: "",
   });

   const getData = async () => {
      http
         .get(`category`, {
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

   const [method, setMethod] = useState("create");
   const [loading, setLoading] = useState(false);
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      if (method === "create") {
         let formData = new FormData();
         formData.append("code", data.code);
         formData.append("category", data.category);
         // console.log(Object.fromEntries(formData));
         http
            .post(`/category`, formData, {})
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
         formData.append("code", data.code);
         formData.append("category", data.category);
         http
            .post(`/category/${data.id}`, formData, {})
            .then((res) => {
               // console.log(res.data.data);
               setMethod("create");
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
      setMethod("create");
      setData({
         code: "",
         category: "",
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
      setData(staging);
      handleMenu();
   };

   const [openModal, setOpenModal] = useState(false);
   const handleModal = (e) => {
      setOpenModal(!openModal);
   };

   const onDelete = async () => {
      http
         .delete(`/category/${staging.id}`, {})
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
               <div className="d-flex align-items-center justify-content-between my-2" style={{ height: "36px" }}>
                  <h3 className="fw-bold mb-0">History Asset</h3>
               </div>
               <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6} md={4}>
                     <Card>
                        <CardContent>
                           <Typography variant="subtitle1" fontWeight="bold" mb={6}>
                              Mutation Asset
                           </Typography>
                           <Button variant="contained" component={RouterLink} to="./mutation-asset">
                              Mutation Asset
                           </Button>
                        </CardContent>
                     </Card>
                  </Grid>
                  <Grid item xs={6} md={4}>
                     <Card>
                        <CardContent>
                           <Typography variant="subtitle1" fontWeight="bold" mb={6}>
                              Maintenance Asset
                           </Typography>
                           <Button variant="contained" component={RouterLink} to="./maintenance-asset">
                              Maintenance Asset
                           </Button>
                        </CardContent>
                     </Card>
                  </Grid>
                  <Grid item xs={6} md={4}>
                     <Card>
                        <CardContent>
                           <Typography variant="subtitle1" fontWeight="bold" mb={6}>
                              Stock Opname
                           </Typography>
                           <Button variant="contained" component={RouterLink} to="./stock-opname">
                              Stock Opname
                           </Button>
                        </CardContent>
                     </Card>
                  </Grid>
               </Grid>
               <Card sx={{ mt: 4 }}>
                  <CardContent>
                     <Grid container spacing={2} alignItems="center">
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
                        <Grid item>
                           <Button variant="link" startIcon={<FilterListRounded />}>
                              Filter
                           </Button>
                        </Grid>
                     </Grid>
                     <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                        <Stack direction="row" spacing={1}>
                           <Button size="small" variant="contained">
                              Add To Queue
                           </Button>
                           <Button size="small" variant="contained">
                              Show Detail
                           </Button>
                        </Stack>
                     </Box>
                     <TableContainer>
                        <Table sx={{ minWidth: 650, mt: 3 }} aria-label="simple table">
                           <TableHead>
                              <TableRow
                                 sx={{
                                    "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                                    "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                                 }}
                              >
                                 <TableCell align="center">No.</TableCell>
                                 <TableCell>Code</TableCell>
                                 <TableCell>Code Asset</TableCell>
                                 <TableCell>SAP Code</TableCell>
                                 <TableCell>Asset Name</TableCell>
                                 <TableCell>Category Asset</TableCell>
                                 <TableCell>Capitalized On</TableCell>
                                 <TableCell>Useful Life</TableCell>
                                 <TableCell>Usage Limit</TableCell>
                                 <TableCell>Usage Period</TableCell>
                                 <TableCell>Asset Acquistion Value</TableCell>
                                 <TableCell>Deprecation</TableCell>
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
                                          <TableCell>
                                             <Link component={RouterLink} to={`/asset-subcategory/${value.id}`}>
                                                {value.code}
                                             </Link>
                                          </TableCell>
                                          <TableCell>{value.category}</TableCell>
                                          <TableCell>{value.category}</TableCell>
                                          <TableCell>{value.category}</TableCell>
                                          <TableCell>{value.category}</TableCell>
                                          <TableCell>{value.category}</TableCell>
                                          <TableCell>{value.category}</TableCell>
                                          <TableCell>{value.category}</TableCell>
                                          <TableCell>{value.category}</TableCell>
                                          <TableCell>{value.category}</TableCell>
                                          <TableCell>{value.category}</TableCell>
                                          <TableCell align="center">
                                             <IconButton onClick={(e) => handleClick(e, value)}>
                                                <MoreVert />
                                             </IconButton>
                                          </TableCell>
                                       </TableRow>
                                    ))
                                 ) : (
                                    <TableRow>
                                       <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 10 }} colSpan={100}>
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
                                    <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 5 }} colSpan={100}>
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
         </div>
      </div>
   );
}
