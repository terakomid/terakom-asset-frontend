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
import moment from 'moment';

import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import http from "../../../component/api/Api";
import Loading from "../../../component/Loading";

const Index = () => {
    const navigate = useNavigate()
    const [rows, setRows] = useState();
    const [data, setData] = useState({
        code: "",
        location: "",
    });
    const [date, setDate] = useState([null, null])
    const [params, setParams] = useState({
        search: "",
        limit: 10,
        page: 1,
        paginate: 1,
        from_date: moment(Date.now()).format('yyyy-MM-DD'), 
        until_date: moment().add(1, 'M').format('yyyy-MM-DD'),
        export: 0,
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
             console.log(err.response);
            });
    };

    const handleDownload = async (e) => {
        e.preventDefault()
        http
            .get(`/activity_log`, {
            responseType: 'blob',
            params: {
                ...params,
                export: 1,
                paginate: 0,
            },
            })
            .then((res) => {
                const temp = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = temp;
                link.setAttribute("download", `activity.xlsx`); 
                document.body.appendChild(link);
                link.click();

            })
            .catch((err) => {
             console.log(err.response);
            });
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

    return (
        <div className="main-content mb-5">
            <div className="page-content">
                <div className="container">
                    <div className="my-2">
                        <Stack direction="row" justifyContent={"space-between"}>
                            <h3 className="fw-bold mb-2">Admin Helom Performance</h3>
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
                                                value={params.from_date}
                                                name="from_date"
                                                label="From Date"
                                                inputFormat="yyyy-MM-dd"
                                                mask="____-__-__"
                                                onChange={(newValue) => {
                                                    setParams({
                                                        ...params,
                                                        from_date: moment(newValue).format('yyyy-MM-DD')
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
                                                value={params.until_date}
                                                name="until_date"
                                                label="From Date"
                                                inputFormat="yyyy-MM-dd"
                                                mask="____-__-__"
                                                onChange={(newValue) => {
                                                    setParams({
                                                        ...params,
                                                        until_date: moment(newValue).format('yyyy-MM-DD')
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
                                        <Button variant="contained" onClick={handleDownload} startIcon={<DownloadOutlined />}>
                                            Export
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            name="search"
                                            variant="outlined"
                                            label="Search"
                                            autoComplete="off"
                                            onChange={handleSearch}
                                            value={params.search}
                                            fullWidth
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
                                        />
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
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Index;