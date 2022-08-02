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
   Chip,

} from "@mui/material";
import { Add, CloseRounded, Delete, Edit, FileDownload, FileUpload, MoreVert, Search } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom'

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";
import ModalDelete from "../../../component/Delete";

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
      department_id: "", 
      role: "",
      limit: 5,
      paginate: 0
   });
   const [loading, setLoading] = useState(false)

   const getData = async () => {
      http
            .get(`user`, {
               params: params,
            })
            .then((res) => {
               //  console.log(res.data.data);
               setRows(res.data.data.data);
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


  

   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };


   const handleSearch = (e) => {
      setPage(0);
      setParams({
            ...params,
            page: 1,
            [e.target.name]: e.target.value,
      });
   };

   const handleEdit = () => {
      setData(staging);
      handleMenu();
      navigate(`/user-list-edit/${staging.id}`)
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
            .delete(`/user/${staging.id}`, {})
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
               <div className="d-flex align-items-center justify-content-between my-2">
                  <h3 className="fw-bold mb-0">User</h3>
                  <Stack direction="row" spacing={1}>
                     <Button variant="contained" startIcon={<FileDownload />}>
                        Import
                     </Button>
                     <Button variant="contained" startIcon={<FileUpload />}>
                        Export
                     </Button>
                     <Button onClick={() => navigate('/user-list-add')} variant="contained" startIcon={<Add />}>
                        Add User
                     </Button>
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
                                       <TableCell>Name</TableCell>
                                       <TableCell>Code</TableCell>
                                       <TableCell>Phone Number</TableCell>
                                       <TableCell>Department</TableCell>
                                       <TableCell>Role</TableCell>
                                       <TableCell>Status</TableCell>
                                       <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {rows !== undefined ? (
                                       rows.length > 0 ? (
                                          rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, key) => (
                                             <TableRow key={key}>
                                                <TableCell component="th" scope="row" align="center">
                                                   {page * rowsPerPage + key + 1}.
                                                </TableCell>
                                                <TableCell>
                                                   <Stack direction="row" >
                                                      <Avatar src={value.photo_url} sx={{ height: '5vh', width: '5vh' }} />
                                                      <Typography sx={{ ml: 1 }}>
                                                         {value.name}
                                                      </Typography>
                                                   </Stack>
                                                </TableCell>
                                                <TableCell>{value.code}</TableCell>
                                                <TableCell>{value.phone_number}</TableCell>
                                                <TableCell>{value.dept.dept}</TableCell>
                                                <TableCell>{value.role}</TableCell>
                                                <TableCell>{value.status == 1 ? <Chip label="Active" color="success" /> : <Chip label="Not Active" color="error" />}</TableCell>
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
                           {rows !== undefined && rows.length > 0 && (
                              <TablePagination
                                 rowsPerPageOptions={[5, 10, 25]}
                                 component="div"
                                 count={rows.length}
                                 page={page}
                                 rowsPerPage={rowsPerPage}
                                 onPageChange={handleChangePage}
                                 onRowsPerPageChange={handleChangeRowsPerPage}
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