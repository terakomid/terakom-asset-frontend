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
   Chip,
} from "@mui/material";
import { AddRounded, Check, Close, CloseRounded, Delete, Edit, FilterListRounded, InfoOutlined, MoreVert, Search } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";
import ModalDelete from "../../../component/Delete";
import moment from "moment";

import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { Permission } from "../../../component/Permission";

export default function AcceptanceAsset() {
   const { user } = useRecoilValue(authentication);

   const [params, setParams] = useState({
      search: "",
      paginate: 1,
      limit: 10,
      page: 1,
   });

   const [data, setData] = useState();
   const getData = async () => {
      await http
         .get(`asset_acceptance`, {
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
      window.scrollTo(0, 0);
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

   const [openModal, setOpenModal] = useState(false);
   const handleModal = (e) => {
      setOpenModal(!openModal);
   };

   const onDelete = async () => {
      await http
         .delete(`asset_acceptance/${staging.id}`)
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
   const handleAction = (event, value) => {
      setAnchorEl(event.currentTarget);
      setStaging(value);
   };
   const handleMenu = () => {
      setAnchorEl(null);
   };

   const handleUpdateStatus = async (status) => {
      try {
         const res = await http.patch(`asset_acceptance/${staging.id}/update_status?status=${status}`, {});
         getData();
         handleMenu();
      } catch (error) {
         // console.log(error.response);
      }
   };

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="d-flex align-items-center justify-content-between mt-2 mb-4">
                  <h3 className="fw-bold mb-0">Acceptance Asset</h3>
                  {Permission(user.permission, "create asset acceptance") && (
                     <Stack direction="row" spacing={1}>
                        <Button variant="contained" startIcon={<AddRounded />} component={RouterLink} to="./add">
                           Add Acceptance Asset
                        </Button>
                     </Stack>
                  )}
               </div>
               <Card>
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
                     <TableContainer>
                        <Table sx={{ minWidth: 650, mt: 2 }} aria-label="simple table">
                           <TableHead>
                              <TableRow
                                 sx={{
                                    "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                                    "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                                 }}
                              >
                                 <TableCell align="center">No.</TableCell>
                                 <TableCell>Asset Code</TableCell>
                                 <TableCell>Asset Name</TableCell>
                                 <TableCell>PIC</TableCell>
                                 <TableCell>Department</TableCell>
                                 <TableCell>Location</TableCell>
                                 <TableCell>Date</TableCell>
                                 <TableCell>Status</TableCell>
                                 {Permission(user.permission, "update status asset acceptance") ||
                                 Permission(user.permission, "update asset acceptance") ||
                                 Permission(user.permission, "delete asset acceptance") ? (
                                    <TableCell align="center">Action</TableCell>
                                 ) : null}
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
                                          <TableCell>{value.asset.asset_code}</TableCell>
                                          <TableCell>{value.asset.asset_name}</TableCell>
                                          <TableCell>
                                             {value.asset.employee.code} - {value.asset.employee.name}
                                          </TableCell>
                                          <TableCell>{value.asset.dept}</TableCell>
                                          <TableCell>{value.asset.location}</TableCell>
                                          <TableCell>{moment(value.date).format("LL")}</TableCell>
                                          <TableCell>
                                             <Chip
                                                size="small"
                                                variant="outlined"
                                                color={value.status === "received" ? "success" : "warning"}
                                                label={value.status === "received" ? "Received" : "Not Received"}
                                             />
                                          </TableCell>
                                          {Permission(user.permission, "update status asset acceptance") ||
                                          Permission(user.permission, "update asset acceptance") ||
                                          Permission(user.permission, "delete asset acceptance") ? (
                                             <TableCell align="center">
                                                <IconButton onClick={(e) => handleAction(e, value)}>
                                                   <MoreVert />
                                                </IconButton>
                                             </TableCell>
                                          ) : null}
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
               <ModalDelete open={openModal} delete={onDelete} handleClose={handleModal} />
               {Permission(user.permission, "update status asset acceptance") ||
               Permission(user.permission, "update asset acceptance") ||
               Permission(user.permission, "delete asset acceptance") ? (
                  <Menu
                     anchorEl={anchorEl}
                     open={open}
                     onClose={handleMenu}
                     transformOrigin={{ horizontal: "right", vertical: "top" }}
                     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                     <MenuItem component={RouterLink} to={`/acceptance-asset/detail/${staging?.id}`}>
                        <ListItemIcon>
                           <InfoOutlined />
                        </ListItemIcon>
                        Detail
                     </MenuItem>
                     {staging?.status === "not_received" && Permission(user.permission, "update asset acceptance") && (
                        <MenuItem component={RouterLink} to={`/acceptance-asset/edit/${staging?.id}`}>
                           <ListItemIcon>
                              <Edit />
                           </ListItemIcon>
                           Edit
                        </MenuItem>
                     )}
                     {staging?.status === "not_received" && Permission(user.permission, "delete asset acceptance") && (
                        <MenuItem onClick={handleModal}>
                           <ListItemIcon>
                              <Delete />
                           </ListItemIcon>
                           Delete
                        </MenuItem>
                     )}
                     {staging?.status === "not_received" && Permission(user.permission, "update status asset acceptance") && (
                        <MenuItem onClick={() => handleUpdateStatus("received")}>
                           <ListItemIcon>
                              <Check />
                           </ListItemIcon>
                           Receive
                        </MenuItem>
                     )}
                  </Menu>
               ) : null}
            </div>
         </div>
      </div>
   );
}
