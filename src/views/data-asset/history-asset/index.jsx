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
   Grid,
   Menu,
   MenuItem,
   ListItemIcon,
} from "@mui/material";
import { CloseRounded, InfoOutlined, Edit, FilterListRounded, MoreVert, Search } from "@mui/icons-material";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";
import { NumberFormat } from "../../../component/Format";
import moment from "moment";

import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { Permission } from "../../../component/Permission";

export default function HistoryAsset() {
   const { user } = useRecoilValue(authentication);
   const navigate = useNavigate();

   const [params, setParams] = useState({
      search: "",
      order_by_name: 0,
      limit: 10,
      page: 1,
      paginate: 1,
   });

   const [data, setData] = useState();
   const getData = async () => {
      await http
         .get(`asset`, {
            params: params,
         })
         .then((res) => {
            // console.log(res.data.data);
            setData(res.data.data);
         })
         .catch((err) => {
            // console.log(err.response);
         });
   };

   useEffect(() => {
      setData(undefined);
      let timer = setTimeout(() => {
         if (params) getData();
      }, 500);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [params]);

   const handleSearch = (e) => {
      setParams({
         ...params,
         page: 1,
         [e.target.name]: e.target.value,
      });
   };

   const handleChangePage = (event, newPage) => {
      setParams({
         ...params,
         page: newPage + 1,
      });
   };

   const handleChangeRowsPerPage = (event) => {
      setParams({
         ...params,
         page: 1,
         limit: +event.target.value,
      });
   };

   const [staging, setStaging] = useState();
   const handleEdit = () => {
      setData(staging);
      handleMenu();
      if (staging.asset_type === "it") {
         navigate(`/edit-data-asset-it/${staging.id}`);
      } else {
         navigate(`/edit-data-asset-non-it/${staging.id}`);
      }
   };

   const handleDetail = () => {
      setData(staging);
      handleMenu();
      if (staging.asset_type === "it") {
         navigate(`/detail-data-asset-it/${staging.id}`);
      } else {
         navigate(`/detail-data-asset-non-it/${staging.id}`);
      }
   };

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
               <div className="d-flex align-items-center justify-content-between my-2" style={{ height: "36px" }}>
                  <h3 className="fw-bold mb-0">History Asset</h3>
               </div>
               {Permission(user.permission, "get asset mutation") ||
               Permission(user.permission, "get asset maintenance") ||
               Permission(user.permission, "get stock opname") ? (
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                     {Permission(user.permission, "get asset mutation") && (
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
                     )}
                     {Permission(user.permission, "get asset maintenance") && (
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
                     )}
                     {Permission(user.permission, "get stock opname") && (
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
                     )}
                  </Grid>
               ) : null}
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
                        {/* <Grid item>
                           <Button variant="link" startIcon={<FilterListRounded />}>
                              Filter
                           </Button>
                        </Grid> */}
                     </Grid>
                     <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                        <Stack direction="row" spacing={1}>
                           <Button variant="contained" component={RouterLink} to="./print-label">
                              Print Label
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
                                 <TableCell>Code Asset</TableCell>
                                 <TableCell>SAP Code</TableCell>
                                 <TableCell>Asset Name</TableCell>
                                 <TableCell>Category Asset</TableCell>
                                 <TableCell>Capitalized On</TableCell>
                                 <TableCell>Useful Life</TableCell>
                                 <TableCell>Usage Limit</TableCell>
                                 {/* <TableCell>Usage Period</TableCell> */}
                                 <TableCell>Asset Acquistion Value</TableCell>
                                 <TableCell>Book Value</TableCell>
                                 <TableCell align="center">Action</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {data !== undefined ? (
                                 data.data.length > 0 ? (
                                    data.data.map((value, index) => (
                                       <TableRow key={index}>
                                          <TableCell component="th" scope="row" align="center">
                                             {index + 1}.
                                          </TableCell>
                                          <TableCell>{value.asset_code}</TableCell>
                                          <TableCell>{value.sap_code}</TableCell>
                                          <TableCell>{value.asset_name}</TableCell>
                                          <TableCell>
                                             {value.category.code} - {value.category.category}
                                          </TableCell>
                                          <TableCell>{moment(value.capitalized).format("LL")}</TableCell>
                                          <TableCell>{value.useful_life} Month</TableCell>
                                          <TableCell>{value.useful_life / 12} Year</TableCell>
                                          {/* <TableCell>{value.asset_code}</TableCell> */}
                                          <TableCell>{NumberFormat(value.acquisition_value, "Rp")}</TableCell>
                                          <TableCell>{NumberFormat(value.book_value, "Rp")}</TableCell>
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
                     {data !== undefined && data.data.length > 0 && (
                        <TablePagination
                           component="div"
                           count={data.meta.total}
                           page={params.page - 1}
                           rowsPerPage={params.limit}
                           onPageChange={handleChangePage}
                           onRowsPerPageChange={handleChangeRowsPerPage}
                           rowsPerPageOptions={[10, 25, 50]}
                           showFirstButton
                           showLastButton
                        />
                     )}
                  </CardContent>
               </Card>
               <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenu}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
               >
                  {Permission(user.permission, "update asset") && (
                     <MenuItem onClick={handleEdit}>
                        <ListItemIcon>
                           <Edit />
                        </ListItemIcon>
                        Edit
                     </MenuItem>
                  )}
                  <MenuItem onClick={handleDetail}>
                     <ListItemIcon>
                        <InfoOutlined />
                     </ListItemIcon>
                     Detail
                  </MenuItem>
               </Menu>
            </div>
         </div>
      </div>
   );
}
