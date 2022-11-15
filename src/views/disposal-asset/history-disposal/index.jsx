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
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { exportTableToExcel } from "../../../help/ExportToExcel";

const TableExport = (props) => {
   return (
      <table id="table-export" style={{ display: "none" }}>
         <thead>
            <tr>
               <th>No</th>
               <th>Asset Type</th>
               <th>Asset Code</th>
               <th>Category</th>
               <th>Sub Category</th>
               <th>Asset Name</th>
               <th>Asset Spesification</th>
               <th>Useful Life</th>
               <th>Capitalized On</th>
               <th>SAP Code</th>
               <th>Employee Name</th>
               <th>Location</th>
               <th>Department</th>
               <th>Asset Condition</th>
               <th>Latitude</th>
               <th>Longitude</th>
               <th>Cons Center Name</th>
               <th>Acquisition Value</th>
               <th>Depreciation</th>
               <th>Vendor Name</th>
               <th>Book Value</th>
               <th>Device</th>
               <th>Type</th>
               <th>Brand</th>
               <th>Monitor INC</th>
               <th>Model Brand</th>
               <th>Mac Address</th>
               <th>Warranty Expiry</th>
               <th>Computer Name</th>
               <th>DLP</th>
               <th>SOC</th>
               <th>SN NB and PC</th>
               <th>Processor</th>
               <th>OS</th>
               <th>SN Windows</th>
               <th>MS Office</th>
               <th>SN Office</th>
               <th>Antivirus</th>
               <th>Notes</th>
               <th>Attachment</th>
            </tr>
         </thead>
         <tbody>
            {props.data.map((val, i) => {
               return (
                  <tr key={i}>
                     <td>{i + 1}</td>
                     <td>{val.asset_type}</td>
                     <td>{val.asset_code}</td>
                     <td>{val.category.category}</td>
                     <td>{val.sub_category.sub_category}</td>
                     <td>{val.asset_name}</td>
                     <td>{val.specification}</td>
                     <td>{val.useful_life}</td>
                     <td>{val.capitalized}</td>
                     <td>{val.sap_code}</td>
                     <td>{`${val.employee.code} - ${val.employee.name}`}</td>
                     <td>{`${val.location.code} - ${val.location.location}`}</td>
                     <td>{val.department.dept}</td>
                     <td>{val.condition.condition}</td>
                     <td>{val.latitude}</td>
                     <td>{val.longitude}</td>
                     <td>{`${val.cost.code} ${val.cost.name}`}</td>
                     <td>{val.acquisition_value}</td>
                     <td>{val.depreciation == 1 ? "yes" : "no"}</td>
                     <td>{`${val.vendor.code} - ${val.vendor.name}`}</td>
                     <td>{val.book_value}</td>
                     <td>{val.device ? val.device.sub_type : ""}</td>
                     <td>{val.type}</td>
                     <td>{val.brand ? val.brand.sub_type : ""}</td>
                     <td>{val.monitor_inch}</td>
                     <td>{val.model_brand}</td>
                     <td>{val.mac_address}</td>
                     <td>{val.warranty}</td>
                     <td>{val.computer_name}</td>
                     <td>{val.dlp}</td>
                     <td>{val.soc}</td>
                     <td>{val.snnbpc}</td>
                     <td>{val.processor ? val.processor.sub_type : ""}</td>
                     <td>{val.os ? val.os.sub_type : ""}</td>
                     <td>{val.sn_windows}</td>
                     <td>{val.office ? val.office.sub_type : ""}</td>
                     <td>{val.sn_office}</td>
                     <td>{val.antivirus ? val.antivirus.sub_type : ""}</td>
                     <td>{val.notes}</td>
                     <td>
                        {val.evidence.length > 0 &&
                           val.evidence.map((v, i) => (
                              <a key={i} href={v.file}>
                                 {v.file.split("/").pop()} <br />
                              </a>
                           ))}
                     </td>
                  </tr>
               );
            })}
         </tbody>
      </table>
   );
};

const RowComponent = (props) => {
   const [open, setOpen] = React.useState(false);
   return (
      <React.Fragment>
         <TableRow>
            {props.user.role !== "Admin Department" && props.user.role !== "Employee" && props.data.evidence.length > 0 ? (
               <TableCell component="th" scope="row" align="center">
                  <Stack direction="row" alignItems={"center"} justifyContent={"center"}>
                     <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                     </IconButton>
                     {props.from + props.i}.
                  </Stack>
               </TableCell>
            ) : (
               <TableCell>{props.from + props.i}.</TableCell>
            )}
            <TableCell>{props.data.asset_code}</TableCell>
            <TableCell>{props.data.asset_name}</TableCell>
            <TableCell>{props.data.employee.name}</TableCell>
            <TableCell>{props.data.department.dept}</TableCell>
            <TableCell>{`${props.data.location.code} - ${props.data.location.location}`}</TableCell>
            <TableCell>{props.data.category.category}</TableCell>
            <TableCell>{moment(props.data.capitalized).format("ll")}</TableCell>
            <TableCell>{props.data.sub_category.useful_life}</TableCell>
            {props.user.role !== "Employee" && (
               <>
                  <TableCell>{NumberFormat(props.data.acquisition_value, "Rp")}</TableCell>
                  <TableCell>{NumberFormat(props.data.book_value, "Rp")}</TableCell>
               </>
            )}
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
                                 <TableCell>{val.file.split("/").pop()}</TableCell>
                                 <TableCell align="right">
                                    <Chip label="Download" component="a" href={val.file} target="_blank" />
                                 </TableCell>
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
};

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
      capitalized_from: moment(Date.now()).format('yyyy-MM-DD'), 
      capitalized_until: moment().add(12, 'M').format('yyyy-MM-DD'),
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
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                       <DatePicker
                                          value={params.capitalized_from}
                                          name="capitalized_from"
                                          label="From Date"
                                          inputFormat="yyyy-MM-dd"
                                          mask="____-__-__"
                                          onChange={(newValue) => {
                                                setParams({
                                                   ...params,
                                                   capitalized_from: moment(newValue).format('yyyy-MM-DD')
                                                })
                                          }}
                                          renderInput={(params) => (
                                                <TextField
                                                   fullWidth
                                                   {...params}
                                                   required
                                                />
                                          )}
                                       />
                                    </LocalizationProvider>
                              </Grid>
                              <Grid item>
                                    <Typography>To</Typography>
                              </Grid>
                              <Grid item xs>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                       <DatePicker
                                          value={params.capitalized_until}
                                          name="capitalized_until"
                                          label="Until Date"
                                          inputFormat="yyyy-MM-dd"
                                          mask="____-__-__"
                                          onChange={(newValue) => {
                                                setParams({
                                                   ...params,
                                                   capitalized_until: moment(newValue).format('yyyy-MM-DD')
                                                })
                                          }}
                                          renderInput={(params) => (
                                                <TextField
                                                   fullWidth
                                                   {...params}
                                                   required
                                                />
                                          )}
                                       />
                                    </LocalizationProvider>
                              </Grid>
                              <Grid item xs={2}>
                                    <Button disabled={rows !== undefined && rows.data.length > 0 ? false : true} variant="contained" onClick={() => exportTableToExcel("#table-export", "Report_Disposal_Asset")} startIcon={<DownloadOutlined />}>
                                       Export
                                    </Button>
                              </Grid>
                           </Grid>
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
                                          <TableCell>Department</TableCell>
                                          <TableCell>Location</TableCell>
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
                                                <RowComponent i={key} key={key} data={value} user={user} from={rows.meta.from} handleClick={handleClick} />

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
                     {rows !== undefined && rows.data.length > 0 && 
                     <TableExport data={rows.data} />
                     }
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
