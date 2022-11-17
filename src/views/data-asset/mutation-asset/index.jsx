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
   ListItemText,
   Select,
   OutlinedInput,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Box,
   Chip,
   FormControl,
   InputLabel,
   Checkbox,
} from "@mui/material";
import { AddRounded, CloseRounded, Delete, Download, Edit, FilterListRounded, MoreVert, Search, FileDownload } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";
import ModalDelete from "../../../component/Delete";

import { useRecoilValue } from "recoil";
import { authentication } from "../../../store/Authentication";
import { Permission } from "../../../component/Permission";
import { exportTableToExcel } from "../../../help/ExportToExcel";

const TableExport = (props) => {
   return (
      <table style={{ display: "none" }} border="1" id="table-export" >
         <thead>
            <tr>
               <td align="center">No.</td>
               <td>PIC Asset</td>
               <td>Receive Name</td>
               <td>Asset Code</td>
               <td>Asset Name</td>
               <td>From Branch</td>
               <td>From Room</td>
               <td>To Branch</td>
               <td>To Room</td>
            </tr>
         </thead>
         <tbody>
            {props.data !== undefined ? (
               props.data.data.length > 0 ? (
                  props.data.data.map((value, index) => (
                     <tr key={index}>
                        <td align="center">
                           {index + 1}.
                        </td>
                        <td>{value.pic.name}</td>
                        <td>{value.receive.name}</td>
                        <td>{value.asset.asset_code}</td>
                        <td>{value.asset.asset_name}</td>
                        <td>
                           {value.from_branch?.code} - {value.from_branch?.location}
                        </td>
                        <td>{value.from_room}</td>
                        <td>
                           {value.to_branch?.code} - {value.to_branch?.location}
                        </td>
                        <td>{value.to_room}</td>
                     </tr>
                  ))
               ) : (
                  null
               )
            ) : (
               null
            )}
         </tbody>
      </table>
   )
}

export default function MutationAsset() {
   const { user } = useRecoilValue(authentication);

   const [data, setData] = useState();
   const [rows, setRows] = useState();
   const [params, setParams] = useState({
      search: "",
      type: "mutation",
      paginate: 1,
      limit: 10,
      page: 1,
      pic_id: [],
      receive_id: [],
      from_branch_id: [],
      to_branch_id: [],
   });

   const getUsers = async () => {
      const res = await http.get(`user?paginate=0`);
      return res.data.data.data;
   };
   const getLocation = async () => {
      const res = await http.get(`location`);
      return res.data.data;
   };
   const getData = async () => {
      await http
         .get(`asset_mutation`, {
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
         Promise.all([getUsers(), getLocation()]).then((res) => {
            handleComplete();
            setRows({
               ...rows,
               users: res[0],
               location: res[1],
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
         receive_id: filter.receive_id,
         from_branch_id: filter.from_branch_id,
         to_branch_id: filter.to_branch_id,
      });
   };

   const handleReset = async (e) => {
      e.preventDefault();
      handleDialog();
      setParams({
         ...params,
         pic_id: [],
         receive_id: [],
         from_branch_id: [],
         to_branch_id: [],
      });
      setFilter({
         pic_id: [],
         receive_id: [],
         from_branch_id: [],
         to_branch_id: [],
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
         .delete(`asset_mutation/${staging.id}`)
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
      receive_id: [],
      from_branch_id: [],
      to_branch_id: [],
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
                  <h3 className="fw-bold mb-0">Mutation Asset</h3>
                  <Box sx={{ display: 'flex' }}>
                     <Button disabled={data !== undefined && data.data.length > 0 ? false : true} sx={{ mr: 2 }} variant="contained" startIcon={<FileDownload />} onClick={() => exportTableToExcel("#table-export",  "Report_mutation_asset")}>
                        Export
                     </Button>
                     {Permission(user.permission, "create asset mutation") && (
                        <Stack direction="row" spacing={1}>
                           <Button variant="contained" startIcon={<AddRounded />} component={RouterLink} to="./add">
                              Add Mutation Asset
                           </Button>
                        </Stack>
                     )}

                  </Box>

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
                                 <TableCell>PIC Asset</TableCell>
                                 <TableCell>Receive Name</TableCell>
                                 <TableCell>Asset Code</TableCell>
                                 <TableCell>Asset Name</TableCell>
                                 <TableCell>From Branch</TableCell>
                                 <TableCell>From Room</TableCell>
                                 <TableCell>To Branch</TableCell>
                                 <TableCell>To Room</TableCell>
                                 {Permission(user.permission, "update asset mutation") || Permission(user.permission, "delete asset mutation") ? (
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
                                          <TableCell>{value.pic.name}</TableCell>
                                          <TableCell>{value.receive.name}</TableCell>
                                          <TableCell>{value.asset.asset_code}</TableCell>
                                          <TableCell>{value.asset.asset_name}</TableCell>
                                          <TableCell>
                                             {value.from_branch?.code} - {value.from_branch?.location}
                                          </TableCell>
                                          <TableCell>{value.from_room}</TableCell>
                                          <TableCell>
                                             {value.to_branch?.code} - {value.to_branch?.location}
                                          </TableCell>
                                          <TableCell>{value.to_room}</TableCell>
                                          {Permission(user.permission, "update asset mutation") || Permission(user.permission, "delete asset mutation") ? (
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
                        />
                     )}
                  </CardContent>
               </Card>
               {data !== undefined && data.data.length > 0 &&
                  <TableExport data={data} />
               }
               <ModalDelete open={openModal} delete={onDelete} handleClose={handleModal} />
               {Permission(user.permission, "update asset mutation") || Permission(user.permission, "delete asset mutation") ? (
                  <Menu
                     anchorEl={anchorEl}
                     open={open}
                     onClose={handleMenu}
                     transformOrigin={{ horizontal: "right", vertical: "top" }}
                     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                     {Permission(user.permission, "update asset mutation") && (
                        <MenuItem component={RouterLink} to={`/history-asset/mutation-asset/edit/${staging?.id}`}>
                           <ListItemIcon>
                              <Edit />
                           </ListItemIcon>
                           Edit
                        </MenuItem>
                     )}
                     {staging !== undefined && staging.document !== null && (
                        <MenuItem component="a" href={staging.document} target="_blank">
                           <ListItemIcon>
                              <Download />
                           </ListItemIcon>
                           Download Support Document
                        </MenuItem>
                     )}
                     {/* {Permission(user.permission, "delete asset mutation") && (
                        <MenuItem onClick={handleModal}>
                           <ListItemIcon>
                              <Delete />
                           </ListItemIcon>
                           Delete
                        </MenuItem>
                     )} */}
                  </Menu>
               ) : null}
               <Dialog open={dialog} onClose={handleDialog} maxWidth="md" fullWidth>
                  <DialogTitle>Filter</DialogTitle>
                  {complete ? (
                     <DialogContent dividers>
                        <Grid container spacing={2}>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>PIC Asset</InputLabel>
                                 <Select
                                    multiple
                                    name="pic_id"
                                    value={filter.pic_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="PIC Asset" />}
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
                                 <InputLabel>Receive Name</InputLabel>
                                 <Select
                                    multiple
                                    name="receive_id"
                                    value={filter.receive_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Receive Name" />}
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
                                                <Checkbox checked={filter.receive_id.indexOf(v.id) > -1} />
                                                <ListItemText primary={`${v.code} - ${v.name}`} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>From Branch</InputLabel>
                                 <Select
                                    multiple
                                    name="from_branch_id"
                                    value={filter.from_branch_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="From Branch" />}
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
                                                <Checkbox checked={filter.from_branch_id.indexOf(v.id) > -1} />
                                                <ListItemText primary={`${v.code} - ${v.location}`} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <FormControl sx={{ mt: 1 }} fullWidth>
                                 <InputLabel>To Branch</InputLabel>
                                 <Select
                                    multiple
                                    name="to_branch_id"
                                    value={filter.to_branch_id}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="To Branch" />}
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
                                                <Checkbox checked={filter.to_branch_id.indexOf(v.id) > -1} />
                                                <ListItemText primary={`${v.code} - ${v.location}`} />
                                             </MenuItem>
                                          );
                                       })}
                                 </Select>
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
