import React, { useState, useEffect } from 'react';
import {
   Button,
   Box,
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
   FormControl,
   TablePagination,
   Avatar,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,

} from "@mui/material";
import { Add, CloseRounded, Delete, Edit, FileDownload, FileUpload, MoreVert, Search } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom'

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";
import ModalDelete from "../../../component/Delete";
import moment from 'moment';

const ModalFilter = (props) => {
   const [roleOptions, setRoleOptions] = useState([])
   const [departmentOptions, setDepartmentOptions] = useState([])
   const [filter, setFilter] = useState({
      role: '',
      department_id: ''
   })
   const [isComplete, setIsComplete] = useState(false)

   const getDepartment = async() => {
		const res = await http.get(`dept`)
		setDepartmentOptions([...res.data.data])
		return 1
	}

	const getRole = async() => {
		const res = await http.get(`role`)
		setRoleOptions([...res.data.data])
		return 1
	}

   useEffect(() => {
		let mounted = true
		if(mounted && props.open){
			Promise.all([getDepartment(), getRole()]).then(res => {
				setIsComplete(true)
				
			})
		}


		return () => mounted = false
	}, [props.open])

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
            {isComplete &&
            <Grid container>
               <Grid item xs={12} md={6}>
                  <TextField 
                     select
                     multiple
                     size="small"
                     name="role"
                     label="role"
                     value={filter.role}
                     fullWidth
                  >
                     {roleOptions.length > 0 && roleOptions.map(v => (
                        <MenuItem key={v.id} value={v.name}>{v.name}</MenuItem>
                     ))}
                     {roleOptions.length == 0 && 
                        <MenuItem disabled>Kosong</MenuItem>
                     }
                  </TextField>
               </Grid>

            </Grid>
            }
         </DialogContent>
         <DialogActions>
            <Button variant="text" onClick={props.handleClose}>
               Cancel
            </Button>
            <Button variant="text" color="error" onClick={() => console.log('filter')} autoFocus>
               Delete
            </Button>
         </DialogActions>
      </Dialog>
   )
}

const Index = () => {
   const navigate = useNavigate()
   const [rows, setRows] = useState();
   const [data, setData] = useState({
      code: "",
      location: "",
   });
   const [params, setParams] = useState({
      search: "",
      order_by_name: 0,
      limit: 1,
      page: 1,
   });
   const [loading, setLoading] = useState(false)

   const getData = async () => {
      http
            .get(`/asset`, {
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
      if(staging.asset_type === "it"){
         navigate(`/edit-data-asset-it/${staging.id}`)
      }else{
         navigate(`/edit-data-asset-non-it/${staging.id}`)
      }
   };

   const [openModal, setOpenModal] = useState(false);
   const handleModal = (e) => {
      setOpenModal(!openModal);
   };

   const [modalFilter, setModalFilter] = useState(false)
   const handleModalFilter = () => {
      setModalFilter(!modalFilter)
   }

   const onDelete = async () => {
      http
            .delete(`/asset/${staging.id}`, {})
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
      setStaging(value);
   };
   const handleMenu = () => {
      setAnchorEl(null);
   };
   
   return (
      <div className="main-content mb-5">
         <div className="page-content">
            <div className="container">
               <div className="my-2">
                  <h3 className="fw-bold mb-2">Data Asset</h3>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography>Asset IT</Typography>
                                <Button sx={{ mt: 1 }} onClick={() => navigate('/data-asset-it')} variant="contained">Create Asset IT</Button>
                            </CardContent>
                        </Card>
                     
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography>Asset Non IT</Typography>
                                <Button sx={{ mt: 1 }} onClick={() => navigate('/data-asset-non-it')} variant="contained">Create Asset Non IT</Button>
                            </CardContent>
                        </Card>
                    </Grid>

                  </Grid>
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
                                 <Button onClick={handleModalFilter} variant="contained">
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
                                       <TableCell>Code Asset</TableCell>
                                       <TableCell>SAP Code </TableCell>
                                       <TableCell>Asset Name</TableCell>
                                       <TableCell>Category Asset</TableCell>
                                       <TableCell>Capitalized On</TableCell>
                                       <TableCell>Useful Life</TableCell>
                                       <TableCell>Acquisition Value</TableCell>
                                       <TableCell align="center">Action</TableCell>
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
                                                  {value.asset_code}
                                                </TableCell>
                                                <TableCell>{value.sap_code}</TableCell>
                                                <TableCell>{value.asset_name}</TableCell>
                                                <TableCell>{value.category.category}</TableCell>
                                                <TableCell>{moment(value.capitalized).format('ddd, MM yyyy') }</TableCell>
                                                <TableCell>{value.sub_category.useful_life}</TableCell>
                                                <TableCell>{value.acquisition_value}</TableCell>
                                                <TableCell align="center">
                                                   <IconButton onClick={(e) => handleClick(e, value)}>
                                                      <MoreVert />
                                                   </IconButton>
                                                </TableCell>
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
                                 rowsPerPageOptions={[1, 10, 25, 50, 100]}
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
                     <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenu}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                     >
                        <MenuItem onClick={handleEdit}>
                           <ListItemIcon>
                              <Edit />
                           </ListItemIcon>
                           Edit
                        </MenuItem>
                        <MenuItem onClick={handleModal}>
                           <ListItemIcon>
                              <Delete />
                           </ListItemIcon>
                           Delete
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