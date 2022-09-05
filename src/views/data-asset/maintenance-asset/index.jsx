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
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Chip,
   Select,
   Box,
   FormControl,
   InputLabel,
   OutlinedInput,
   Checkbox,
   ListItemText,
} from "@mui/material";
import { AddRounded, Check, CloseRounded, Delete, Download, Edit, FilterListRounded, InfoOutlined, MoreVert, Search } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

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
import { NumberFormat } from "../../../component/Format";

export default function MaintenanceAsset() {
   const { user } = useRecoilValue(authentication);

   const [data, setData] = useState();
   const [rows, setRows] = useState();
   const [params, setParams] = useState({
      search: "",
      paginate: 1,
      limit: 10,
      page: 1,
      pic_id: [],
      department_id: [],
      applicant_date_from: null,
      applicant_date_until: null,
      request_date_repair_from: null,
      request_date_repair_until: null,
      request_time_finish_from: null,
      request_time_finish_until: null,
      testing_date_from: null,
      testing_date_until: null,
      returning_date_from: null,
      returning_date_until: null,
   });

   const getUsers = async () => {
      const res = await http.get(`user?paginate=0`);
      return res.data.data.data;
   };
   const getDepartment = async () => {
      const res = await http.get(`dept`);
      return res.data.data;
   };
   const getData = async () => {
      await http
         .get(`asset_maintenance`, {
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
         Promise.all([getUsers(), getDepartment()]).then((res) => {
            handleComplete();
            setRows({
               ...rows,
               users: res[0],
               department: res[1],
            });
         });
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      handleLoading();
      setParams({
         ...params,
         pic_id: filter.pic_id,
         department_id: filter.department_id,
         applicant_date_from: filter.applicant_date_from,
         applicant_date_until: filter.applicant_date_until,
         request_date_repair_from: filter.request_date_repair_from,
         request_date_repair_until: filter.request_date_repair_until,
         request_time_finish_from: filter.request_time_finish_from,
         request_time_finish_until: filter.request_time_finish_until,
         testing_date_from: filter.testing_date_from,
         testing_date_until: filter.testing_date_until,
         testing_finish_date_from: filter.testing_finish_date_from,
         testing_finish_date_until: filter.testing_finish_date_until,
         returning_date_from: filter.returning_date_from,
         returning_date_until: filter.returning_date_until,
      });
   };

   const handleReset = async (e) => {
      e.preventDefault();
      handleDialog();
      setParams({
         ...params,
         pic_id: [],
         department_id: [],
         applicant_date_from: null,
         applicant_date_until: null,
         request_date_repair_from: null,
         request_date_repair_until: null,
         request_time_finish_from: null,
         request_time_finish_until: null,
         testing_date_from: null,
         testing_date_until: null,
         testing_finish_date_from: null,
         testing_finish_date_until: null,
         returning_date_from: null,
         returning_date_until: null,
      });
      setFilter({
         pic_id: [],
         department_id: [],
         applicant_date_from: null,
         applicant_date_until: null,
         request_date_repair_from: null,
         request_date_repair_until: null,
         request_time_finish_from: null,
         request_time_finish_until: null,
         testing_date_from: null,
         testing_date_until: null,
         testing_finish_date_from: null,
         testing_finish_date_until: null,
         returning_date_from: null,
         returning_date_until: null,
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

   const handleCheck = async () => {
      await http.patch(`asset_maintenance/${staging.id}/update_status?status=complete`).then((res) => {
         getData();
         handleMenu();
      });
   };

   const [openModal, setOpenModal] = useState(false);
   const handleModal = (e) => {
      setOpenModal(!openModal);
   };

   const onDelete = async () => {
      await http
         .delete(`asset_maintenance/${staging.id}`)
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
   const handleAsset = (event, value) => {
      setStaging(value);
      handleDetail()
   };
   const handleMenu = () => {
      setAnchorEl(null);
   };
   const [detail, setDetail] = useState(false);
   const handleDetail = () => {
      setDetail(!detail);
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
      pic_id: [],
      department_id: [],
      applicant_date_from: null,
      applicant_date_until: null,
      request_date_repair_from: null,
      request_date_repair_until: null,
      request_time_finish_from: null,
      request_time_finish_until: null,
      testing_date_from: null,
      testing_date_until: null,
      testing_finish_date_from: null,
      testing_finish_date_until: null,
      returning_date_from: null,
      returning_date_until: null,
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
                  <h3 className="fw-bold mb-0">Maintenance Asset</h3>
                  {Permission(user.permission, "create asset maintenance") && (
                     <Stack direction="row" spacing={1}>
                        <Button variant="contained" startIcon={<AddRounded />} component={RouterLink} to="./add">
                           Add Maintenance Asset
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
                                 <TableCell>PIC Name</TableCell>
                                 <TableCell>Department</TableCell>
                                 <TableCell>Applicant Date</TableCell>
                                 <TableCell>Final Cost</TableCell>
                                 <TableCell>Request Time To Finish</TableCell>
                                 <TableCell>Detail Asset</TableCell>
                                 <TableCell>Status</TableCell>
                                 {Permission(user.permission, "update asset maintenance") || Permission(user.permission, "delete asset maintenance") ? (
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
                                          <TableCell>
                                             {value.pic.code} - {value.pic.name}
                                          </TableCell>
                                          <TableCell>{value.pic.department}</TableCell>
                                          <TableCell>{moment(value.applicant_date).format("LL")}</TableCell>
                                          <TableCell>{NumberFormat(value.final_cost, "Rp")}</TableCell>
                                          <TableCell>{moment(value.request_time_finish).format("LL")}</TableCell>
                                          <TableCell align="center">
                                             <Button onClick={(e) => handleAsset(e, value)}>Detail</Button>
                                          </TableCell>
                                          <TableCell>
                                             {value.status === "process" && <Chip label="Process" color="warning" />}
                                             {value.status === "complete" && <Chip label="Complete" color="success" />}
                                          </TableCell>
                                          {Permission(user.permission, "update asset maintenance") ||
                                          Permission(user.permission, "delete asset maintenance") ? (
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
               {Permission(user.permission, "update asset maintenance") || Permission(user.permission, "delete asset maintenance") ? (
                  <Menu
                     anchorEl={anchorEl}
                     open={open}
                     onClose={handleMenu}
                     transformOrigin={{ horizontal: "right", vertical: "top" }}
                     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                     {staging !== undefined && staging.document !== null && (
                        <MenuItem component="a" href={staging.document} target="_blank">
                           <ListItemIcon>
                              <Download />
                           </ListItemIcon>
                           Download Support Document
                        </MenuItem>
                     )}
                     {Permission(user.permission, "update asset maintenance") && staging !== undefined && (
                        <MenuItem component={RouterLink} to={`/history-asset/maintenance-asset/edit/${staging?.id}`}>
                           <ListItemIcon>{staging.status === "complete" ? <InfoOutlined /> : <Edit />}</ListItemIcon>
                           {staging.status === "complete" ? "Detail" : "Edit"}
                        </MenuItem>
                     )}
                     {Permission(user.permission, "delete asset maintenance") && staging !== undefined && staging.status !== "complete" && (
                        <MenuItem onClick={handleModal}>
                           <ListItemIcon>
                              <Delete />
                           </ListItemIcon>
                           Delete
                        </MenuItem>
                     )}
                     {staging !== undefined && staging.status !== "complete" && (
                        <MenuItem onClick={handleCheck}>
                           <ListItemIcon>
                              <Check />
                           </ListItemIcon>
                           Complete
                        </MenuItem>
                     )}
                  </Menu>
               ) : null}
               <Dialog fullWidth maxWidth="md" open={detail} onClose={handleDetail}>
                  <DialogTitle>Detail Asset</DialogTitle>
                  <DialogContent>
                     <TableContainer>
                        <Table>
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
                                 <TableCell>Location</TableCell>
                                 <TableCell>Reason For Repair</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {staging?.asset_maintenance_data.map((value, index) => (
                                 <TableRow key={index}>
                                    <TableCell component="th" scope="row" align="center">
                                       {index + 1}.
                                    </TableCell>
                                    <TableCell>{value.asset.asset_code}</TableCell>
                                    <TableCell>{value.asset.asset_name}</TableCell>
                                    <TableCell>
                                       {value.asset.location.code} - {value.asset.location.location}
                                    </TableCell>
                                    <TableCell>{value.reason}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                  </DialogContent>
                  <DialogActions>
                     <Button variant="text" onClick={handleDetail}>
                        Close
                     </Button>
                  </DialogActions>
               </Dialog>
               <Dialog open={dialog} onClose={handleDialog} maxWidth="md" fullWidth>
                  <DialogTitle>Filter</DialogTitle>
                  {complete ? (
                     <DialogContent dividers>
                        <Grid container spacing={2}>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>PIC Name</InputLabel>
                                 <Select
                                    multiple
                                    name="pic_id"
                                    value={filter.pic_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="PIC Name" />}
                                    renderValue={(selected) => {
                                       return rows.users
                                          .filter((v) => selected.includes(v.id))
                                          .map((v, i) => {
                                             return <Chip key={i} label={`${v.code} - ${v.name}`} onDelete={() => "cemas"} sx={{ mr: 0.5 }} />;
                                          });
                                    }}
                                 >
                                    {rows.users.length > 0 &&
                                       rows.users.map((v, i) => {
                                          return (
                                             <MenuItem key={i} value={v.id}>
                                                <Checkbox checked={filter.pic_id.indexOf(v.id) > -1} />
                                                <ListItemText primary={`${v.code} - ${v.name}`} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
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
                           <Grid item xs={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.applicant_date_from}
                                       name="applicant_date_from"
                                       label="Applicant Date From"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             applicant_date_from: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.applicant_date_until}
                                       name="applicant_date_until"
                                       label="Applicant Date Until"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             applicant_date_until: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.request_date_repair_from}
                                       name="request_date_repair_from"
                                       label="Request Date Repair From"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             request_date_repair_from: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.request_date_repair_until}
                                       name="request_date_repair_until"
                                       label="Request Date Repair Until"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             request_date_repair_until: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.request_time_finish_from}
                                       name="request_time_finish_from"
                                       label="Request Time Finish From"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             request_time_finish_from: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.request_time_finish_until}
                                       name="request_time_finish_until"
                                       label="Request Time Finish Until"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             request_time_finish_until: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.testing_date_from}
                                       name="testing_date_from"
                                       label="Testing Date From"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             testing_date_from: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.testing_date_until}
                                       name="testing_date_until"
                                       label="Testing Date Until"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             testing_date_until: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.testing_finish_date_from}
                                       name="testing_finish_date_from"
                                       label="Testing Finish Date From"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             testing_finish_date_from: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.testing_finish_date_until}
                                       name="testing_finish_date_until"
                                       label="Testing Finish Date Until"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             testing_finish_date_until: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.returning_date_from}
                                       name="returning_date_from"
                                       label="Returning Date From"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             returning_date_from: moment(newValue).format("yyyy-MM-DD"),
                                          });
                                       }}
                                       renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                 </LocalizationProvider>
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl fullWidth>
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                       value={filter.returning_date_until}
                                       name="returning_date_until"
                                       label="Returning Date Until"
                                       inputFormat="dd/MM/yyyy"
                                       mask="__/__/____"
                                       onChange={(newValue) => {
                                          setFilter({
                                             ...filter,
                                             returning_date_until: moment(newValue).format("yyyy-MM-DD"),
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
