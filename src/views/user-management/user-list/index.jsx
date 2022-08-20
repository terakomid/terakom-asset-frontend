import React, { useState, useEffect } from "react";
import {
   Button,
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
   TablePagination,
   Avatar,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,
   Chip,
   FormControl,
   InputLabel,
   OutlinedInput,
   FormHelperText,
   Box,
   Select,
   ListItemText,
   Checkbox,
} from "@mui/material";
import { Add, CloseRounded, Delete, Edit, FileDownload, FileUpload, FilterListRounded, MoreVert, RestartAlt, Search, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";
import ModalDelete from "../../../component/Delete";

import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { Permission } from "../../../component/Permission";
import { LoadingButton } from "@mui/lab";
import { exportTableToExcel } from "../../../help/ExportToExcel";
import { ImportModal } from "../../../component/ImportModal";
import { useSnackbar } from 'notistack'

const ModalFilter = (props) => {
   const [roleOptions, setRoleOptions] = useState([]);
   const [departmentOptions, setDepartmentOptions] = useState([]);
   const [filter, setFilter] = useState({
      role: "",
      department_id: "",
   });
   const [data, setData] = useState({
      department_id: [],
      employee_id: [],
      role_id: [],
   })
   const [isComplete, setIsComplete] = useState(false);

   const getDepartment = async () => {
      const res = await http.get(`dept`);
      setDepartmentOptions([...res.data.data]);
      return 1;
   };

   const getRole = async () => {
      const res = await http.get(`role`);
      setRoleOptions([...res.data.data]);
      return 1;
   };

   const handleChange = (e) => {
      const {
         target: { value },
     } = e;
     setData({
         ...data,
        [e.target.name]: typeof value === 'string' ? value.split(',') : value,
     });
   }

   useEffect(() => {
      let mounted = true;
      if (mounted && props.open) {
         Promise.all([getDepartment(), getRole()]).then((res) => {
            setIsComplete(true);
         });
      }

      return () => (mounted = false);
   }, [props.open]);

   return (
      <Dialog
         fullWidth
         maxWidth="md"
         open={props.open}
         onClose={props.handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle>Filter</DialogTitle>
         <DialogContent>
            {isComplete && (
               <Grid container mt={3} spacing={2}>
                  <Grid item xs={12} md={6}>
                     <FormControl fullWidth>
                        <InputLabel>Department</InputLabel>
                        <Select
                           labelId="demo-multiple-checkbox-label"
                           id="demo-multiple-checkbox"
                           multiple
                           name='department_id'
                           value={data.department_id}
                           onChange={handleChange}
                           input={<OutlinedInput label="Department" />}
                           renderValue={(selected) => {
                                 return departmentOptions.filter(v => selected.includes(v.id)).map(v => {
                                    return (
                                       <Chip 
                                             label={v.dept} 
                                             onDelete={() => 's'}
                                       />
                                    )
                                 })
                           }}
                        >
                           {departmentOptions.length > 0 && departmentOptions.map((v, i) => {
                                 return (
                                 <MenuItem key={v.id} value={v.id}>
                                    <Checkbox 
                                       checked={data.department_id.indexOf(v.id) > -1} 
                                    />
                                    <ListItemText primary={v.dept} />
                                 </MenuItem>
                                 )
                           })}
                        </Select>
                     </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                           labelId="demo-multiple-checkbox-label"
                           id="demo-multiple-checkbox"
                           multiple
                           name='role_id'
                           value={data.role_id}
                           onChange={handleChange}
                           input={<OutlinedInput label="Role" />}
                           renderValue={(selected) => {
                                 return roleOptions.filter(v => selected.includes(v.id)).map(v => {
                                    return (
                                       <Chip 
                                             label={v.name} 
                                             onDelete={() => 's'}
                                       />
                                    )
                                 })
                           }}
                        >
                           {roleOptions.length > 0 && roleOptions.map((v, i) => {
                                 return (
                                 <MenuItem key={v.id} value={v.id}>
                                    <Checkbox 
                                       checked={data.role_id.indexOf(v.id) > -1} 
                                    />
                                    <ListItemText primary={v.name} />
                                 </MenuItem>
                                 )
                           })}
                        </Select>
                     </FormControl>
                  </Grid>
               </Grid>
            )}
         </DialogContent>
         <DialogActions>
            <Button variant="text" onClick={props.handleClose}>
               Cancel
            </Button>
            <Button variant="text" color="primary" onClick={() => console.log("filter")} autoFocus>
               Filter
            </Button>
         </DialogActions>
      </Dialog>
   );
};
const ModalResetPassword = (props) => {
   const [loading, setLoading] = useState(false)
   const [form, setForm] = useState({
      password: '',
      password_confirmation: '',
   })
   const [errors, setErrors] = useState({})

   const [showNew, setShowNew] = useState("password");
   const [showCon, setShowCon] = useState("password");

   const onShowNew = (e) => {
      if (showNew === "password") {
         setShowNew("text");
      } else {
         setShowNew("password");
      }
   };

   const onShowCon = (e) => {
      if (showCon === "password") {
         setShowCon("text");
      } else {
         setShowCon("password");
      }
   };

   const resetPassword = async () => {
      const res = await http.patch(`user/${props.data.id}/change_password_without_confirm`, {}, {
         params: {
            password: form.password, 
            password_confirmation: form.password_confirmation
         }
      })
      props.handleMenu();
      props.handleClose();
      props.getData()

   }

   const onSubmit = (e) => {
      setLoading(true)
      resetPassword()
      .then(res => {
         setForm({
            password: '',
            password_confirmation: ''
         })
         setErrors({})
      })
      .catch(err => {
         if(err.response){
            setErrors(err.response.data.errors)
         }
      }).finally(() => {
         setLoading(false)
      })
   }

   const onChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value,
      });
   };

   return (
      <Dialog
         fullWidth
         maxWidth="xs"
         open={props.open}
         onClose={props.handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle>Reset Password</DialogTitle>
         <DialogContent>
            <Grid mt={2} spacing={2} container>
               {/* New Password */}
               <Grid item xs={12} md={12}>
                  <FormControl error={typeof errors?.password !== "undefined" ? true : false} fullWidth>
                        <InputLabel htmlFor="password">
                           New Password
                        </InputLabel>
                        <OutlinedInput
                           id="password"
                           type={showNew}
                           label={"New Password"}
                           variant="outlined"
                           fullWidth
                           name="password"
                           onChange={onChange}
                           value={form.password}
                           required
                           endAdornment={
                              <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility" onClick={onShowNew}>
                                       {showNew === "text" ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                              </InputAdornment>
                           }
                        />
                        <FormHelperText>
                           {typeof errors?.password !== "undefined" ? <span style={{ color: "red" }}>{errors.password[0]}</span> : ""}
                        </FormHelperText>
                  </FormControl>
               </Grid>

               {/* New Password Confirm */}
               <Grid item xs={12} md={12}>
                  <FormControl error={typeof errors?.password_confirmation !== "undefined" ? true : false} fullWidth>
                        <InputLabel htmlFor="password_confirmation">
                           Repeat New Password
                        </InputLabel>
                        <OutlinedInput
                           id="password_confirmation"
                           type={showCon}
                           label={"Repeat New Password"}
                           variant="outlined"
                           fullWidth
                           name="password_confirmation"
                           onChange={onChange}
                           value={form.password_confirmation}
                           required
                           endAdornment={
                              <InputAdornment position="end">
                                    <IconButton aria-label="toggle password_confirmation visibility" onClick={onShowCon}>
                                       {showCon === "text" ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                              </InputAdornment>
                           }
                        />
                        <FormHelperText>
                           {typeof errors?.password_confirmation !== "undefined" ? (
                              <span style={{ color: "red" }}>{errors.password_confirmation[0]}</span>
                           ) : (
                              ""
                           )}
                        </FormHelperText>
                  </FormControl>
               </Grid>

            </Grid>
         </DialogContent>
         <DialogActions>
            <Box component="form">
               <Button variant="text" onClick={props.handleClose}>
                  Cancel
               </Button>
               <LoadingButton onClick={onSubmit} loading={loading} variant="text" color="success" autoFocus>
                  Submit
               </LoadingButton>
            </Box>
         </DialogActions>
      </Dialog>
   );
};

const TableExport = (props) => {
   return (
      <table border={1} id="table-export" style={{ display: 'none' }}>
         <thead>
            <tr>
               <td>Name</td>
               <td>Code</td>
               <td>Phone Number</td>
               <td>Department</td>
               <td>Role</td>
               <td>Status</td>
            </tr>
         </thead>
         <tbody>
            {props.data &&
               props.data.length > 0 && props.data.map(v => {
                  return (
                     <tr key={v.id}>
                        <td>{v.name}</td>
                        <td>{v.code}</td>
                        <td>`{v.phone_number}</td>
                        <td>{v.dept.dept}</td>
                        <td>{v.role}</td>
                        <td>{v.status === 1 ? "Active" : "Not Active"}</td>
                     </tr>
                  )
               })
            }
         </tbody>
      </table>
   )
}

const Index = () => {
   const { user } = useRecoilValue(authentication);

   const { enqueueSnackbar } = useSnackbar()
   const navigate = useNavigate();
   const [allData, setAllData] = useState([])
   const [rows, setRows] = useState();
   const [data, setData] = useState({
      code: "",
      location: "",
   });
   const [params, setParams] = useState({
      search: "",
      department_id: "",
      page: 1,
      role: "",
      limit: 5,
      paginate: 1,
   });
   const [loading, setLoading] = useState(false);

   const getData = async () => {
      const res = await http.get(`user`, {
         params: params,
      })
      setRows(res.data.data);
      return 1
   };

   const getAllData = async () => {
      http
         .get(`user`, {
            params: {
               ...params,
               paginate: 0,
            },
         })
         .then((res) => {
            setAllData(res.data.data.data)
         })
         .catch((err) => {
            //  console.log(err.response);
         });
   }

   useEffect(() => {
      setRows(undefined);
      let timer = setTimeout(() => {
         if (params) {
            getAllData()
            getData()
         }
      }, 500);
      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [params]);

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

   const handleSearch = (e) => {
      setParams({
         ...params,
         page: 1,
         [e.target.name]: e.target.value,
      });
   };

   const handleEdit = () => {
      setData(staging);
      handleMenu();
      navigate(`/user-list-edit/${staging.id}`);
   };

   const [openModal, setOpenModal] = useState(false);
   const handleModal = (e) => {
      setOpenModal(!openModal);
   };

   const [modalFilter, setModalFilter] = useState(false);
   const handleModalFilter = () => {
      setModalFilter(!modalFilter);
   };

   const onDelete = async () => {
      http
         .delete(`/user/${staging.id}`, {})
         .then((res) => {
            getData();
            handleMenu();
            handleModal();
            enqueueSnackbar("Delete User Successfuly", { variant: 'success' })
         })
         .catch((err) => {
            setLoading(false);
         });
   };

   const [openResetPassword, setOpenResetPassword] = useState(false)
   const handleResetPassword = () => {
      setOpenResetPassword(!openResetPassword)
   }

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

   const handleExport = async () => {
      exportTableToExcel("#table-export", "User-List")
   }

   const [openModalImport, setOpenModalImport] = useState(false)
   const handleModalImport = () => {
      setOpenModalImport(!openModalImport)
   }

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="d-flex align-items-center justify-content-between my-2">
                  <h3 className="fw-bold mb-0">User List</h3>
                  <Stack direction="row" spacing={1}>
                     <Button onClick={handleModalImport} variant="contained" startIcon={<FileDownload />}>
                        Import
                     </Button>
                     <Button disabled={allData.length === 0 ? true : false} variant="contained" startIcon={<FileUpload />} onClick={handleExport}>
                        Export
                     </Button>
                     {Permission(user.permission, "create user") && (
                        <Button onClick={() => navigate("/user-list-add")} variant="contained" startIcon={<Add />}>
                           Add User
                        </Button>
                     )}
                  </Stack>
               </div>
               <div className="row">
                  <div className="col-xl-12 col-12 mt-3">
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
                              <Grid item xs={2}>
                                 <Button onClick={handleModalFilter} variant="link" startIcon={<FilterListRounded />}>
                                    Filter
                                 </Button>
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
                                       <TableCell>Name</TableCell>
                                       <TableCell>Code</TableCell>
                                       <TableCell>Phone Number</TableCell>
                                       <TableCell>Department</TableCell>
                                       <TableCell>Role</TableCell>
                                       <TableCell>Status</TableCell>
                                       {Permission(user.permission, "update user") || Permission(user.permission, "delete user") ? (
                                          <TableCell align="center">Action</TableCell>
                                       ) : null}
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {rows !== undefined ? (
                                       rows.data.length > 0 ? (
                                          rows.data.map((value, key) => (
                                             <TableRow key={key}>
                                                <TableCell component="th" scope="row" align="center">
                                                   {rows.meta.from + key}.
                                                </TableCell>
                                                <TableCell>
                                                   <Stack direction="row" width="250px">
                                                      <Avatar src={value.photo_url} sx={{ height: "5vh", width: "5vh" }} />
                                                      <Typography sx={{ ml: 1 }}>{value.name}</Typography>
                                                   </Stack>
                                                </TableCell>
                                                <TableCell>{value.code}</TableCell>
                                                <TableCell>{value.phone_number}</TableCell>
                                                <TableCell>{value.dept.dept}</TableCell>
                                                <TableCell>{value.role}</TableCell>
                                                <TableCell>
                                                   {value.status == 1 ? <Chip label="Active" color="success" /> : <Chip label="Not Active" color="error" />}
                                                </TableCell>
                                                {Permission(user.permission, "update user") || Permission(user.permission, "delete user") ? (
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
                           {rows !== undefined && rows.data.length > 0 && (
                              <TablePagination
                                 component="div"
                                 count={rows.meta.total}
                                 page={params.page - 1}
                                 rowsPerPage={params.limit}
                                 onPageChange={handleChangePage}
                                 onRowsPerPageChange={handleChangeRowsPerPage}
                                 rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                 showFirstButton
                                 showLastButton
                              />
                           )}
                        </CardContent>
                     </Card>
                  </div>
                  <div className="col-xl-4 col-12 mt-3">
                     {/* utils */}
                     <ModalDelete open={openModal} delete={onDelete} handleClose={handleModal} />
                     <ModalFilter open={modalFilter} setParams={setParams} handleClose={handleModalFilter} />
                     <ModalResetPassword 
                        open={openResetPassword} 
                        handleMenu={handleMenu}
                        getData={getData}
                        data={staging}
                        handleClose={handleResetPassword} 
                     />

                     {/* menu */}
                     {Permission(user.permission, "update user") || Permission(user.permission, "delete user") ? (
                        <Menu
                           anchorEl={anchorEl}
                           open={open}
                           onClose={handleMenu}
                           transformOrigin={{ horizontal: "right", vertical: "top" }}
                           anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                           {Permission(user.permission, "update user") && (
                              <MenuItem onClick={handleEdit}>
                                 <ListItemIcon>
                                    <Edit />
                                 </ListItemIcon>
                                 Edit
                              </MenuItem>
                           )}
                           {Permission(user.permission, "delete user") && (
                              <MenuItem onClick={handleModal}>
                                 <ListItemIcon>
                                    <Delete />
                                 </ListItemIcon>
                                 Delete
                              </MenuItem>
                           )}
                           {Permission(user.permission, "delete user") && (
                              <MenuItem onClick={handleResetPassword}>
                                 <ListItemIcon>
                                    <RestartAlt />
                                 </ListItemIcon>
                                 Reset Password
                              </MenuItem>
                           )}
                        </Menu>
                     ) : null}

                     <TableExport data={allData} />
                     <ImportModal 
                        buttonTitle={"Import Data User (.xlsx)"} 
                        handleClose={handleModalImport} 
                        url={'user/import_excel'} open={openModalImport} 
                        getData={getData} 
                     />

                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Index;
