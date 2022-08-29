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
   Stack,
   Menu,
   ListItemIcon,
   TablePagination,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,
   Chip,
   Collapse,
   Box,
   Typography,
} from "@mui/material";
import { Add, CloseRounded, Delete, DownloadOutlined, Edit, FilterListRounded, MoreVert, Search, DoneOutline, Close, Details, InfoOutlined, KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";
import ModalDelete from "../../../component/Delete";
import moment from "moment";

import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { Permission } from "../../../component/Permission";
import { NumberFormat } from "../../../component/Format";

const ModalFilter = (props) => {
   const [roleOptions, setRoleOptions] = useState([]);
   const [departmentOptions, setDepartmentOptions] = useState([]);
   const [filter, setFilter] = useState({
      role: "",
      department_id: "",
   });
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
         maxWidth="xs"
         open={props.open}
         onClose={props.handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle>Filter</DialogTitle>
         <DialogContent>
            <DialogContentText>Filter</DialogContentText>
            {isComplete && (
               <Grid container>
                  <Grid item xs={12} md={6}>
                     <TextField select multiple size="small" name="role" label="role" value={filter.role} fullWidth>
                        {roleOptions.length > 0 &&
                           roleOptions.map((v) => (
                              <MenuItem key={v.id} value={v.name}>
                                 {v.name}
                              </MenuItem>
                           ))}
                        {roleOptions.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                     </TextField>
                  </Grid>
               </Grid>
            )}
         </DialogContent>
         <DialogActions>
            <Button variant="text" onClick={props.handleClose}>
               Cancel
            </Button>
            <Button variant="text" color="error" onClick={() => console.log("filter")} autoFocus>
               Delete
            </Button>
         </DialogActions>
      </Dialog>
   );
};

const ModalTable = (props) => {
   const [roleOptions, setRoleOptions] = useState([]);
   const [departmentOptions, setDepartmentOptions] = useState([]);
   const [filter, setFilter] = useState({
      role: "",
      department_id: "",
   });
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
         maxWidth="xs"
         open={props.open}
         onClose={props.handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle>Filter</DialogTitle>
         <DialogContent>
            <DialogContentText>Filter</DialogContentText>
            {isComplete && (
               <Grid container>
                  <Grid item xs={12} md={6}>
                     <TextField select multiple size="small" name="role" label="role" value={filter.role} fullWidth>
                        {roleOptions.length > 0 &&
                           roleOptions.map((v) => (
                              <MenuItem key={v.id} value={v.name}>
                                 {v.name}
                              </MenuItem>
                           ))}
                        {roleOptions.length == 0 && <MenuItem disabled>Kosong</MenuItem>}
                     </TextField>
                  </Grid>
               </Grid>
            )}
         </DialogContent>
         <DialogActions>
            <Button variant="text" onClick={props.handleClose}>
               Cancel
            </Button>
            <Button variant="text" color="error" onClick={() => console.log("filter")} autoFocus>
               Delete
            </Button>
         </DialogActions>
      </Dialog>
   );
};

const RowComponent = (props) => {
   const [open, setOpen] = React.useState(false);
   
   return (
      <React.Fragment>
         <TableRow>
               {props.data.evidence.length > 0 ?
               <TableCell component="th" scope="row" align="center">
                     <Stack direction="row" alignItems={"center"} justifyContent={"center"}>  
                        <IconButton
                           aria-label="expand row"
                           size="small"
                           onClick={() => setOpen(!open)}
                        >
                           {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                        {props.from + props.i}.

                     </Stack>
               </TableCell>
               :
               <TableCell>
                  {props.from + props.i}.
               </TableCell>
               }
               <TableCell>{props.data.asset_code}</TableCell>
               <TableCell>{props.data.asset_name}</TableCell>
               <TableCell>{props.data.employee.name}</TableCell>
               <TableCell>{props.data.category.category}</TableCell>
               <TableCell>{moment(props.data.capitalized).format("ll")}</TableCell>
               <TableCell>{props.data.sub_category.useful_life}</TableCell>
               {props.user.role !== 'Employee' &&
               <>
               <TableCell>{NumberFormat(props.data.acquisition_value, "Rp")}</TableCell>
               <TableCell>{NumberFormat(props.data.book_value, "Rp")}</TableCell>
               </>
               }
               <TableCell align="center">
                  <IconButton onClick={(e) => props.handleClick(e, props.data)}>
                     <MoreVert />
                  </IconButton>
               </TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                  <Typography>Image & Evidence</Typography>
                  <Table size="small" aria-label="purchases">
                     <TableBody>
                        {props.data.evidence.map((val, i) => (
                        <TableRow key={val.id}>
                           <TableCell component="th" scope="row">
                              {i + 1}
                           </TableCell>
                           <TableCell>{val.file.split('/').pop()}</TableCell>
                           <TableCell align="right"><Chip label="Download" component="a" href={val.file} target="_blank" /></TableCell>
                        </TableRow>
                        ))}
                     </TableBody>
                  </Table>
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>
      </React.Fragment>
   );
}

const Index = () => {
   const { user } = useRecoilValue(authentication);
   const navigate = useNavigate();

   const [tableData, setTableData] = useState();
   const [rows, setRows] = useState();
   const [data, setData] = useState({
      code: "",
      location: "",
   });
   const [params, setParams] = useState({
      only_disposal: 1,
      paginate: 1,
      search: '',
      page: 1,
      limit: 5,
   });
   const [loading, setLoading] = useState(false);

   const getData = async () => {
      http
         .get(`/asset`, {
            params: params,
         })
         .then((res) => {
            setRows(res.data.data);
         })
         .catch((err) => {
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

   const handleEdit = () => {
      setData(staging);
      handleMenu();
      navigate(`/disposal-asset-edit/${staging.id}`);
   };

   const handleDownload = async () => {
      exportTableToExcel("#table", "template");
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
         .delete(`/asset_disposal/${staging.id}`, {})
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
   const handleClick = async (event, value) => {
      setAnchorEl(event.currentTarget);
      setStaging(value);
      setTableData(undefined);
      const res = await http.get(`/asset_disposal/${value.id}`);
      setTableData(res.data.data);
   };
   const handleMenu = () => {
      setAnchorEl(null);
   };
   const handleReject = async () => {
      const res = await http.patch(`/asset_disposal/${staging.id}/update_status?status=rejected`);
      getData();
      handleMenu();
   };
   const handleAccept = async () => {
      const res = await http.patch(`/asset_disposal/${staging.id}/update_status?status=accepted`);
      getData();
      handleMenu();
   };

   const handleDetail = () => {
      navigate(`/detail-disposal-asset/${staging.id}`)
   }

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="my-2">
                  <Stack direction="row" justifyContent={"space-between"}>
                     <h3 className="fw-bold mb-2">History Disposal Asset</h3>
                  </Stack>
               </div>
               <div className="row">
                  <div className="col-xl-12 col-12 mt-3">
                     <Card>
                        <CardContent>
                           <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
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
                              {/* <Grid item xs={2}>
                                 <Button variant="link" startIcon={<FilterListRounded />}></Button>
                              </Grid> */}
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
                                          <TableCell>Code Asset</TableCell>
                                          <TableCell>Asset Name</TableCell>
                                          <TableCell>PIC Name</TableCell>
                                          <TableCell>Category Asset</TableCell>
                                          <TableCell>Capitalized On</TableCell>
                                          <TableCell>Useful Life</TableCell>
                                          {user.role !== 'Employee' && 
                                          <>
                                          <TableCell>Acquisition Value</TableCell>
                                          <TableCell>Book Value</TableCell>
                                          </>
                                          }
                                          <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows !== undefined ? (
                                        rows.data.length > 0 ? (
                                            rows.data.map((value, key) => (
                                             <>
                                                <RowComponent i={key} key={key} data={value} user={user} from={rows.meta.from} handleClick={handleClick} />
                                             </>
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
                  <div className="col-xl-12 col-12 mt-3">
                     <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenu}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                     >
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
         </div>
      </div>
   );
};
export default Index;
