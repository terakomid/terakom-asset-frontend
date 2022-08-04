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
import { Add, CloseRounded, Delete, DownloadOutlined, Edit, FileDownload, FileUpload, FilterListRounded, MoreVert, Search, DoneOutline, Close } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom'
import FileUploadIcon from '@mui/icons-material/FileUpload';

import http from "../../component/api/Api";
import Loading from "../../component/Loading";
import ModalDelete from "../../component/Delete";
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
        limit: 10,
        page: 1,
        paginate: 1
    });
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        http
            .get(`/activity_log`, {
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
        navigate(`/disposal-asset-edit/${staging.id}`)
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
    const handleClick = (event, value) => {
        setAnchorEl(event.currentTarget);
        setStaging(value);
    };
    const handleMenu = () => {
        setAnchorEl(null);
    };
    const handleReject = async () => {
        const res = await http.patch(`/asset_disposal/${staging.id}/update_status?status=rejected`)
        getData();
        handleMenu();
    }
    const handleAccept = async () => {
        const res = await http.patch(`/asset_disposal/${staging.id}/update_status?status=accepted`)
        getData();
        handleMenu();
    }

    return (
        <div className="main-content mb-5">
            <div className="page-content">
                <div className="container">
                    <div className="my-2">
                        <Stack direction="row" justifyContent={"space-between"}>
                            <h3 className="fw-bold mb-2">Activity Log</h3>
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
                                        <Button variant="link" startIcon={<FilterListRounded />}>
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
                                            <TableCell>Log Name</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>User</TableCell>
                                            <TableCell>Ip</TableCell>
                                            <TableCell>Browser</TableCell>
                                            <TableCell>OS</TableCell>
                                            <TableCell>Created At</TableCell>
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
                                                        <TableCell>{value.log_name}</TableCell>
                                                        <TableCell>{value.description}</TableCell>
                                                        <TableCell>
                                                            {value.user !== null && value.user}
                                                        </TableCell>
                                                        <TableCell>{value.ip}</TableCell>
                                                        <TableCell>{value.browser}</TableCell>
                                                        <TableCell>{value.os}</TableCell>
                                                        <TableCell>{moment(value.created_at).format('ll') }</TableCell>
                                                        
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
                                {staging !== undefined && staging.status === 'process' &&
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
                                }
                                {staging !== undefined && staging.status === 'accepted' && 
                                <MenuItem onClick={handleReject}>
                                    <ListItemIcon>
                                        <Close />
                                    </ListItemIcon>
                                        Reject
                                </MenuItem>
                                }
                                {staging !== undefined && staging.status === 'rejected' && 
                                <MenuItem onClick={handleAccept}>
                                    <ListItemIcon>
                                        <DoneOutline />
                                    </ListItemIcon>
                                        Accept
                                </MenuItem>
                                }
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Index;