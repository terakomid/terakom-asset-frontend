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
} from "@mui/material";
import { Add, CloseRounded, Delete, DownloadOutlined, Edit, FilterListRounded, MoreVert, Search, DoneOutline, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import http from "../../component/api/Api";
import Loading from "../../component/Loading";
import ModalDelete from "../../component/Delete";
import moment from "moment";

import { useRecoilValue } from "recoil";
import { authentication } from "../../store/Authentication";
import { Permission } from "../../component/Permission";

//css table
import "./Table.css";

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

// const TableExcel = (props) => {
//     return (
//     <table className="tg" style={{ tableLayout: 'fixed', width: '100%' }}>
//         <colgroup>
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '54px' }} />
//             <col style={{ width: '59px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '56px' }} />
//             <col style={{ width: '77px' }} />
//         </colgroup>
//         <thead>
//             <tr>
//                 <th className="tg-amwm" colspan="5" rowspan="4">Appendeix 07<br /><br />PT. Haier Sales Indonesia</th>
//                 <th className="tg-hjji" colspan="12" rowspan="4"><br /><span style={{ fontWeight:'bold' }}>Asset Disposal Request Form</span></th>
//             </tr>
//             <tr>
//             </tr>
//             <tr>
//             </tr>
//             <tr>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td className="tg-baqh" colspan="5"><span style={{ fontWeight:'bold' }}>Nama Pemelihara</span></td>
//                 <td className="tg-baqh" colspan="3"><span style={{ fontWeight:'bold' }}>No Disposal</span></td>
//                 <td className="tg-baqh" colspan="4"><span style={{ fontWeight:'bold' }}>Departmen</span></td>
//                 <td className="tg-baqh" colspan="5"><span style={{ fontWeight:'bold' }}>Tanggal</span></td>
//             </tr>
//             <tr>
//                 <td className="tg-0lax" colspan="5"></td>
//                 <td className="tg-0lax" colspan="3"></td>
//                 <td className="tg-0lax" colspan="4"></td>
//                 <td className="tg-0lax" colspan="5"></td>
//             </tr>
//             <tr>
//                 <td className="tg-baqh" colspan="4"><span style={{ fontWeight:'bold' }}>Asset Code</span></td>
//                 <td className="tg-baqh" colspan="2"><span style={{ fontWeight:'bold' }}>Jumlah</span></td>
//                 <td className="tg-baqh" colspan="3"><span style={{ fontWeight:'bold' }}>Asset Name</span></td>
//                 <td className="tg-baqh" colspan="2"><span style={{ fontWeight:'bold' }}>Years Purchase</span></td>
//                 <td className="tg-baqh" colspan="2"><span style={{ fontWeight:'bold' }}>Condition Asset</span></td>
//                 <td className="tg-baqh" colspan="2"><span style={{ fontWeight:'bold' }}>Location Asset</span></td>
//                 <td className="tg-baqh" colspan="2"><span style={{ fontWeight:'bold' }}>Purchase Price</span></td>
//             </tr>
//             <tr>
//                 <td className="tg-0lax" colspan="4">asst1</td>
//                 <td className="tg-0lax" colspan="2">1</td>
//                 <td className="tg-0lax" colspan="3">test 1</td>
//                 <td className="tg-0lax" colspan="2">2020</td>
//                 <td className="tg-0lax" colspan="2">baik</td>
//                 <td className="tg-0lax" colspan="2">bojong</td>
//                 <td className="tg-0lax" colspan="2">50000</td>
//             </tr>
//             <tr>
//                 <td className="tg-0lax" colspan="4"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td className="tg-0lax" colspan="3"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//             </tr>
//             <tr>
//                 <td className="tg-0lax" colspan="4"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td className="tg-0lax" colspan="3"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//             </tr>
//             <tr>
//                 <td className="tg-0lax" colspan="4"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td className="tg-0lax" colspan="3"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//             </tr>
//             <tr>
//                 <td className="tg-0lax" colspan="4"></td>
//                 <td className="tg-0lax" colspan="2"></td>
//                 <td class="tg-0lax" colspan="3"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//             </tr>
//             <tr>
//                 <td class="tg-0lax" colspan="4"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//                 <td class="tg-0lax" colspan="3"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//             </tr>
//             <tr>
//                 <td class="tg-0lax" colspan="4"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//                 <td class="tg-0lax" colspan="3"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//                 <td class="tg-0lax" colspan="2"></td>
//             </tr>
//             <tr>
//                 <td class="tg-baqh" colspan="15"><span style={{ fontWeight:'bold' }}>Total Harga</span></td>
//                 <td class="tg-0lax" colspan="2">100000</td>
//             </tr>
//             <tr>
//                 <td class="tg-baqh" colspan="17"><span style={{ fontWeight:'bold' }}>Untuk Informasi Lebih Lanjut</span></td>
//             </tr>
//             <tr>
//                 <td class="tg-0lax" colspan="2"><span style={{ fontWeight:'bold' }}>Nama</span></td>
//                 <td class="tg-0lax" colspan="5">udin</td>
//                 <td class="tg-0lax" colspan="2"><span style={{ fontWeight:'bold' }}>Phone</span></td>
//                 <td class="tg-0lax" colspan="8">08212222</td>
//             </tr>
//             <tr>
//                 <td class="tg-baqh" colspan="9"><span style={{ fontWeight:'bold' }}>Custodian</span></td>
//                 <td class="tg-baqh" colspan="2"><span style={{ fontWeight:'bold' }}>Chekcer</span></td>
//                 <td class="tg-baqh" colspan="6"><span style={{ fontWeight:'bold' }}>Approved</span></td>
//             </tr>
//             <tr>
//                 <td class="tg-0lax" colspan="3" rowspan="5"></td>
//                 <td class="tg-0lax" colspan="3" rowspan="5"></td>
//                 <td class="tg-0lax" colspan="3" rowspan="5"></td>
//                 <td class="tg-0lax" colspan="2" rowspan="5"></td>
//                 <td class="tg-0lax" colspan="3" rowspan="5"></td>
//                 <td class="tg-0lax" colspan="3" rowspan="5"></td>
//             </tr>
//             <tr>
//             </tr>
//             <tr>
//             </tr>
//             <tr>
//             </tr>
//             <tr>
//             </tr>
//             <tr>
//                 <td class="tg-baqh" colspan="3"><span style={{ fontWeight:'bold' }}>Name</span></td>
//                 <td class="tg-baqh" colspan="3"><span style={{ fontWeight:'bold' }}>Direct Superior</span></td>
//                 <td class="tg-baqh" colspan="3"><span style={{ fontWeight:'bold' }}>Dept Head</span></td>
//                 <td class="tg-baqh" colspan="2"><span style={{ fontWeight:'bold' }}>General Affair</span></td>
//                 <td class="tg-baqh" colspan="3"><span style={{ fontWeight:'bold' }}>HRGA Head</span></td>
//                 <td class="tg-baqh" colspan="3"><span style={{ fontWeight:'bold' }}>President Director</span></td>
//             </tr>
//         </tbody>
//     </table>
//     )
// }

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
      search: "",
      order_by_name: 0,
      limit: 10,
      page: 1,
      paginate: 1,
   });
   const [loading, setLoading] = useState(false);

   const getData = async () => {
      http
         .get(`/asset_disposal`, {
            params: params,
         })
         .then((res) => {
            //  console.log(res.data.data);
            setRows(res.data.data);
         })
         .catch((err) => {
            //  console.log(err.response);
         });
   };

   function exportTableToExcel(tableID, filename = "") {
      let downloadLink;
      const dataType = "application/vnd.ms-excel";
      const tableSelect = document.querySelector(tableID);
      console.log(tableSelect);
      const tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

      // Specify file name
      filename = filename ? filename + ".xls" : "excel_data.xls";

      // Create download link element
      downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
         var blob = new Blob(["\ufeff", tableHTML], {
            type: dataType,
         });
         navigator.msSaveOrOpenBlob(blob, filename);
      } else {
         // Create a link to the file
         downloadLink.href = "data:" + dataType + ", " + tableHTML;

         // Setting the file name
         downloadLink.download = filename;

         //triggering the function
         downloadLink.click();
      }
   }

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
            console.log(err.response.data);
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
      // console.log(res.data)
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

   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="my-2">
                  <Stack direction="row" justifyContent={"space-between"}>
                     <h3 className="fw-bold mb-2">Disposal Asset</h3>
                     {Permission(user.permission, "create asset disposal") && (
                        <Button onClick={() => navigate("/disposal-asset-add")} variant="contained" startIcon={<Add />}>
                           Add Disposal
                        </Button>
                     )}
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
                              <Grid item xs={2}>
                                 <Button variant="link" startIcon={<FilterListRounded />}></Button>
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
                                       <TableCell>Date Created</TableCell>
                                       <TableCell>SK Number</TableCell>
                                       <TableCell>Description</TableCell>
                                       <TableCell>Supporting Document</TableCell>
                                       <TableCell>Amount Delete</TableCell>
                                       <TableCell>Total Value</TableCell>
                                       <TableCell>Update</TableCell>
                                       <TableCell>Status</TableCell>
                                       {Permission(user.permission, "update asset disposal") || Permission(user.permission, "delete asset disposal") ? (
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
                                                <TableCell>{moment(value.created_at).format("ll")}</TableCell>
                                                <TableCell>{value.sk_number}</TableCell>
                                                <TableCell>{value.description}</TableCell>
                                                <TableCell>
                                                   <Button startIcon={<DownloadOutlined />}>Download</Button>
                                                </TableCell>
                                                <TableCell>{value.amount_delete}</TableCell>
                                                <TableCell>{value.total_value}</TableCell>
                                                <TableCell>{moment(value.updated_at).format("ll")}</TableCell>
                                                <TableCell>
                                                   {value.status === "process" && <Chip label="Process" color="warning" />}
                                                   {value.status === "accepted" && <Chip label="Accepted" color="success" />}
                                                   {value.status === "rejected" && <Chip label="Rejected" color="error" />}
                                                </TableCell>
                                                {Permission(user.permission, "update asset disposal") ||
                                                Permission(user.permission, "delete asset disposal") ? (
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
                                 rowsPerPageOptions={[10, 25, 50, 100]}
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

                     {/* menu */}
                     {Permission(user.permission, "update asset disposal") || Permission(user.permission, "delete asset disposal") ? (
                        <Menu
                           anchorEl={anchorEl}
                           open={open}
                           onClose={handleMenu}
                           transformOrigin={{ horizontal: "right", vertical: "top" }}
                           anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                           {Permission(user.permission, "update asset disposal") && (
                              <MenuItem onClick={handleEdit}>
                                 <ListItemIcon>
                                    <Edit />
                                 </ListItemIcon>
                                 Edit
                              </MenuItem>
                           )}
                           {Permission(user.permission, "delete asset disposal") && staging !== undefined && staging.status === "process" &&  (
                              <MenuItem onClick={handleModal}>
                                 <ListItemIcon>
                                    <Delete />
                                 </ListItemIcon>
                                 Delete
                              </MenuItem>
                           )}
                           <MenuItem onClick={handleDownload}>
                              <ListItemIcon>
                                 <DownloadOutlined />
                              </ListItemIcon>
                              Download Template
                           </MenuItem>
                           {staging !== undefined && staging.status === "process" && (
                              <>
                                 <MenuItem onClick={handleAccept}>
                                    <ListItemIcon>
                                       <DoneOutline />
                                    </ListItemIcon>
                                    Accept
                                 </MenuItem>
                                 <MenuItem onClick={handleReject}>
                                    <ListItemIcon>
                                       <Close />
                                    </ListItemIcon>
                                    Reject
                                 </MenuItem>
                              </>
                           )}
                        </Menu>
                     ) : null}
                  </div>
                  <div className="col-xl-12 col-12">
                     {tableData !== undefined && (
                        <>
                           {/* Table */}
                           <table id="table" border={1} class="tg" style={{ tableLayout: "fixed", width: "100%", display: "none" }}>
                              <colgroup>
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "54px" }} />
                                 <col style={{ width: "59px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "56px" }} />
                                 <col style={{ width: "77px" }} />
                              </colgroup>
                              <thead>
                                 <tr>
                                    <th className="tg-amwm" colspan="5" rowspan="4">
                                       Appendeix 07
                                       <br />
                                       <br />
                                       PT. Haier Sales Indonesia
                                    </th>
                                    <th className="tg-hjji" colspan="12" rowspan="4">
                                       <br />
                                       <span style={{ fontWeight: "bold" }}>Asset Disposal Request Form</span>
                                    </th>
                                 </tr>
                                 <tr></tr>
                                 <tr></tr>
                                 <tr></tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td className="tg-baqh" colspan="5">
                                       <span style={{ fontWeight: "bold" }}>Nama Pemelihara</span>
                                    </td>
                                    <td className="tg-baqh" colspan="3">
                                       <span style={{ fontWeight: "bold" }}>No Disposal</span>
                                    </td>
                                    <td className="tg-baqh" colspan="4">
                                       <span style={{ fontWeight: "bold" }}>Departmen</span>
                                    </td>
                                    <td className="tg-baqh" colspan="5">
                                       <span style={{ fontWeight: "bold" }}>Tanggal</span>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="tg-0lax" colspan="5"></td>
                                    <td className="tg-0lax" colspan="3">
                                       {tableData.id}
                                    </td>
                                    <td className="tg-0lax" colspan="4"></td>
                                    <td className="tg-0lax" colspan="5">
                                       {moment(tableData.created_at).format("LL")}
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="tg-baqh" colspan="4">
                                       <span style={{ fontWeight: "bold" }}>Asset Code</span>
                                    </td>
                                    <td className="tg-baqh" colspan="2">
                                       <span style={{ fontWeight: "bold" }}>Jumlah</span>
                                    </td>
                                    <td className="tg-baqh" colspan="3">
                                       <span style={{ fontWeight: "bold" }}>Asset Name</span>
                                    </td>
                                    <td className="tg-baqh" colspan="2">
                                       <span style={{ fontWeight: "bold" }}>Years Purchase</span>
                                    </td>
                                    <td className="tg-baqh" colspan="2">
                                       <span style={{ fontWeight: "bold" }}>Condition Asset</span>
                                    </td>
                                    <td className="tg-baqh" colspan="2">
                                       <span style={{ fontWeight: "bold" }}>Location Asset</span>
                                    </td>
                                    <td className="tg-baqh" colspan="2">
                                       <span style={{ fontWeight: "bold" }}>Purchase Price</span>
                                    </td>
                                 </tr>
                                 {tableData.asset_disposal_data.length > 0 &&
                                    tableData.asset_disposal_data.map((v, i) => {
                                       return (
                                          <tr key={i}>
                                             <td className="tg-0lax" colspan="4">
                                                {v.asset.asset_code}
                                             </td>
                                             <td className="tg-0lax" colspan="2">
                                                1
                                             </td>
                                             <td className="tg-0lax" colspan="3">
                                                {v.asset.asset_name}
                                             </td>
                                             <td className="tg-0lax" colspan="2">
                                                {v.asset.capitalized.split("-")[0]}
                                             </td>
                                             <td className="tg-0lax" colspan="2">
                                                {v.asset.condition.condition}
                                             </td>
                                             <td className="tg-0lax" colspan="2">
                                                {v.asset.location.location}
                                             </td>
                                             <td className="tg-0lax" colspan="2">
                                                0
                                             </td>
                                          </tr>
                                       );
                                    })}
                                 <tr>
                                    <td className="tg-baqh" colspan="15">
                                       <span style={{ fontWeight: "bold" }}>Total Harga</span>
                                    </td>
                                    <td className="tg-0lax" colspan="2"></td>
                                 </tr>
                                 <tr>
                                    <td className="tg-baqh" colspan="17">
                                       <span style={{ fontWeight: "bold" }}>Untuk Informasi Lebih Lanjut</span>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="tg-0lax" colspan="2">
                                       <span style={{ fontWeight: "bold" }}>Nama</span>
                                    </td>
                                    <td className="tg-0lax" colspan="5"></td>
                                    <td className="tg-0lax" colspan="2">
                                       <span style={{ fontWeight: "bold" }}>Phone</span>
                                    </td>
                                    <td className="tg-0lax" colspan="8"></td>
                                 </tr>
                                 <tr>
                                    <td className="tg-baqh" colspan="9">
                                       <span style={{ fontWeight: "bold" }}>Custodian</span>
                                    </td>
                                    <td className="tg-baqh" colspan="2">
                                       <span style={{ fontWeight: "bold" }}>Chekcer</span>
                                    </td>
                                    <td className="tg-baqh" colspan="6">
                                       <span style={{ fontWeight: "bold" }}>Approved</span>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="tg-0lax" colspan="3" rowspan="5"></td>
                                    <td className="tg-0lax" colspan="3" rowspan="5"></td>
                                    <td className="tg-0lax" colspan="3" rowspan="5"></td>
                                    <td className="tg-0lax" colspan="2" rowspan="5"></td>
                                    <td className="tg-0lax" colspan="3" rowspan="5"></td>
                                    <td className="tg-0lax" colspan="3" rowspan="5"></td>
                                 </tr>
                                 <tr></tr>
                                 <tr></tr>
                                 <tr></tr>
                                 <tr></tr>
                                 <tr>
                                    <td className="tg-baqh" colspan="3">
                                       <span style={{ fontWeight: "bold" }}>Name</span>
                                    </td>
                                    <td className="tg-baqh" colspan="3">
                                       <span style={{ fontWeight: "bold" }}>Direct Superior</span>
                                    </td>
                                    <td className="tg-baqh" colspan="3">
                                       <span style={{ fontWeight: "bold" }}>Dept Head</span>
                                    </td>
                                    <td className="tg-baqh" colspan="2">
                                       <span style={{ fontWeight: "bold" }}>General Affair</span>
                                    </td>
                                    <td className="tg-baqh" colspan="3">
                                       <span style={{ fontWeight: "bold" }}>HRGA Head</span>
                                    </td>
                                    <td className="tg-baqh" colspan="3">
                                       <span style={{ fontWeight: "bold" }}>President Director</span>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
export default Index;
