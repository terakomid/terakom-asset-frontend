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
   Dialog,
   DialogTitle,
   DialogContent,
   FormControl,
   InputLabel,
   Select,
   OutlinedInput,
   Checkbox,
   ListItemText,
   Box,
   DialogActions,
} from "@mui/material";
import { AddRounded, Check, Close, CloseRounded, Delete, Edit, FilterListRounded, InfoOutlined, MoreVert, Search } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";
import ModalDelete from "../../../component/Delete";

import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { Permission } from "../../../component/Permission";
import { LoadingButton } from "@mui/lab";
import { Capitalize } from "../../../component/Format";

const role = ["Employee", "Admin Department"]
export default function AcceptanceAsset() {
   const { user } = useRecoilValue(authentication);

   const [data, setData] = useState();
   const [rows, setRows] = useState();
   const [params, setParams] = useState({
      search: "",
      paginate: 1,
      limit: 10,
      page: 1,
      department_id: [],
      location_id: [],
      vendor_id: [],
      condition_id: [],
      type: [],
      from_date: null,
      to_date: null,
   });

   const getDepartment = async () => {
      const res = await http.get(`dept`);
      return res.data.data;
   };
   const getLocation = async () => {
      const res = await http.get(`location`);
      return res.data.data;
   };
   const getVendor = async () => {
      const res = await http.get(`vendor`);
      return res.data.data;
   };
   const getCondition = async () => {
      const res = await http.get(`condition`);
      return res.data.data;
   };
   const getType = async () => {
      const res = ["purchase", "rent"];
      return res;
   };
   const getData = async () => {
      await http
         .get(`asset_acceptance`, {
            params: params,
         })
         .then((res) => {
            // console.log(res.data.data);
            setData(res.data.data);
            setLoading(false);
            setDialog(false);
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

   const getAll = async (e) => {
      let mounted = true;
      if (mounted) {
         Promise.all([getDepartment(), getLocation(), getVendor(), getCondition(), getType()]).then((res) => {
            handleComplete();
            setRows({
               ...rows,
               department: res[0],
               location: res[1],
               vendor: res[2],
               condition: res[3],
               type: res[4],
            });
         });
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      handleLoading();
      setParams({
         ...params,
         department_id: filter.department_id,
         location_id: filter.location_id,
         vendor_id: filter.vendor_id,
         condition_id: filter.condition_id,
         type: filter.type,
         from_date: filter.from_date,
         to_date: filter.to_date,
      });
   };

   const handleReset = async (e) => {
      e.preventDefault();
      handleDialog();
      setParams({
         ...params,
         department_id: [],
         location_id: [],
         vendor_id: [],
         condition_id: [],
         type: [],
         from_date: null,
         to_date: null,
      });
      setFilter({
         department_id: [],
         location_id: [],
         vendor_id: [],
         condition_id: [],
         type: [],
         from_date: null,
         to_date: null,
      });
   };

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

   const [complete, setComplete] = useState(false);
   const handleComplete = () => {
      setComplete(!complete);
   };
   const [dialog, setDialog] = useState(false);
   const handleDialog = () => {
      complete === false && getAll();
      setDialog(!dialog);
   };
   const [loading, setLoading] = useState(false);
   const handleLoading = () => {
      setLoading(!loading);
   };
   const [filter, setFilter] = useState({
      department_id: [],
      location_id: [],
      vendor_id: [],
      condition_id: [],
      type: [],
      from_date: null,
      to_date: null,
   });
   const handleChange = async (e) => {
      const {
         target: { value },
      } = e;
      setFilter({
         ...filter,
         [e.target.name]: typeof value === "string" ? value.split(",") : value,
      });
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
                           <Button variant="link" startIcon={<FilterListRounded />} onClick={handleDialog}>
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
                                 <TableCell>PIC Name</TableCell>
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
                     {staging?.status === "not_received" && !role.includes(user.role) &&  Permission(user.permission, "update asset acceptance") && (
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
               <Dialog open={dialog} onClose={handleDialog} maxWidth="md" fullWidth>
                  <DialogTitle>Filter</DialogTitle>
                  {complete ? (
                     <DialogContent dividers>
                        <Grid container spacing={2}>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Department</InputLabel>
                                 <Select
                                    multiple
                                    name="department_id"
                                    value={filter.department_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Department" />}
                                    renderValue={(selected) => {
                                       return rows.department
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.dept} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {rows.department.length > 0 &&
                                       rows.department.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={filter.department_id.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.dept} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Location</InputLabel>
                                 <Select
                                    multiple
                                    name="location_id"
                                    value={filter.location_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Location" />}
                                    renderValue={(selected) => {
                                       return rows.location
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={`${v.code} - ${v.location}`} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {rows.location.length > 0 &&
                                       rows.location.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={filter.location_id.indexOf(v.id) > -1} />
                                                <ListItemText primary={`${v.code} - ${v.location}`} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Vendor</InputLabel>
                                 <Select
                                    multiple
                                    name="vendor_id"
                                    value={filter.vendor_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Vendor" />}
                                    renderValue={(selected) => {
                                       return rows.vendor
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={`${v.code} - ${v.name}`} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {rows.vendor.length > 0 &&
                                       rows.vendor.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={filter.vendor_id.indexOf(v.id) > -1} />
                                                <ListItemText primary={`${v.code} - ${v.name}`} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Condition</InputLabel>
                                 <Select
                                    multiple
                                    name="condition_id"
                                    value={filter.condition_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Condition" />}
                                    renderValue={(selected) => {
                                       return rows.condition
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={v.condition} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {rows.condition.length > 0 &&
                                       rows.condition.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={filter.condition_id.indexOf(v.id) > -1} />
                                                <ListItemText primary={v.condition} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>Type</InputLabel>
                                 <Select
                                    multiple
                                    name="type"
                                    value={filter.type}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Type" />}
                                    renderValue={(selected) => {
                                       return rows.type
                                          .filter((v) => selected.includes(v))
                                          .map((v, i) => {
                                             return <Chip key={i} label={Capitalize(v)} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {rows.type.length > 0 &&
                                       rows.type.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v}>
                                                <Checkbox checked={filter.type.indexOf(v) > -1} />
                                                <ListItemText primary={Capitalize(v)} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} />
                           <Grid item xs={12} md={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.from_date}
                                       name="from_date"
                                       label="From Date"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             from_date: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.to_date}
                                       name="to_date"
                                       label="Until Date"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             to_date: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                        </Grid>
                     </DialogContent>
                  ) : (
                     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
                        <Loading />
                     </Box>
                  )}
                  {complete && (
                     <DialogActions sx={{ py: 2, px: 3 }}>
                        <LoadingButton variant="outlined" onClick={handleReset}>
                           Reset
                        </LoadingButton>
                        <LoadingButton loading={loading} variant="contained" onClick={handleSubmit}>
                           Apply
                        </LoadingButton>
                     </DialogActions>
                  )}
               </Dialog>
            </div>
         </div>
      </div>
   );
}
