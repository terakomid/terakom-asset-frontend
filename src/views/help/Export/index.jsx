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
   Rating,
   Select,
   InputLabel,
   OutlinedInput,
   Checkbox,
   ListItemText,

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
import { exportTableToExcel } from '../../../help/ExportToExcel';
import { useMemo } from 'react';

const TableExport = (props) => {
    return (
        <table id="table-export" style={{ display: "none" }} border="1">
            <thead>
                <tr>
                    <th>No</th> 
                    <th>Name</th> 
                    <th>Category</th> 
                    <th>Total Rating</th> 
                    <th>Total Help Ticket</th> 
                    <th>Created by</th> 
                    <th>title</th> 
                    <th>purpose</th> 
                    <th>Status</th> 
                    <th>Rating</th> 
                    <th>Created at</th> 
                </tr>
            </thead>
            <tbody>
                {props !== undefined ? (
                props.data.length > 0 ? (
                    props.data.map((value, key) => (
                        <>
                            <tr key={key}>
                                <td rowSpan={value.receiver.help.length}>
                                    {key + 1}.
                                </td>
                                <td rowSpan={value.receiver.help.length}>{value.receiver.name}</td>
                                <td rowSpan={value.receiver.help.length}>{value.receiver.category == "it" ? "IT" : "NON IT"}</td>
                                <td rowSpan={value.receiver.help.length}>{value.receiver.accumulation_rating}</td>
                                <td rowSpan={value.receiver.help.length}>{value.receiver.total_help}</td>
                                {/* Row 1 */}
                                {/* <td>{value.receiver.help[0].user.name}</td> */}
                                <td>user name</td>
                                <td>{value.receiver.help[0].title}</td>
                                <td>{value.receiver.help[0].purpose}</td>
                                <td>{value.receiver.help[0].status}</td>
                                <td>{value.receiver.help[0].rating}</td>
                                <td>{moment(value.receiver.help[0].created_at).format('ll') }</td>
                            </tr>
                            {value.receiver.help.map((v, i) => {
                                if(i !== 0){
                                    return (
                                        <tr key={i}>
                                            <td>user name</td>
                                            <td>{v.title}</td>
                                            <td>{v.purpose}</td>
                                            <td>{v.status}</td>
                                            <td>{v.rating}</td>
                                            <td>{moment(v.created_at).format('ll') }</td>
                                        </tr>
                                    )
                                }
                            })}
                        </>
                            
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

const Index = () => {
    const navigate = useNavigate()
    const [rows, setRows] = useState();
    const [params, setParams] = useState({
        // search: "",
        created_from: moment(Date.now()).format('yyyy-MM-DD'), 
        created_until: moment().add(12, 'M').format('yyyy-MM-DD'),
        category: [],
        status: [],
        receiver_ids: [],
        export: 1,
    });
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const {
            target: { value },
        } = e;
        setParams({
            ...params,
           [e.target.name]: typeof value === 'string' ? value.split(',') : value,
        });
    }

    const getData = async () => {
        http
            .get(`/help`, {
                params: params,
            })
            .then((res) => {
                // console.log(params);
                setRows(res.data);
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
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const categoryOptions = useMemo(() => {
        return [
            {
                name: "IT",
                value: "it"
            },
            {
                name: "NON IT",
                value: "non-it"
            }
        ]
    }, [])

    const statusOption = useMemo(() => {
        return [
            {
                name: "Open",
                value: "open"
            },
            {
                name: "Close",
                value: "close"
            }
        ]
    }, [])
    
    const [adminHelpOption, setAdminHelpOption] = useState([])
    const getAdminHelp = async () => {
        const { data: { data: { data }} } = await http.get(`help_admin`)
        // console.log(data);
        setAdminHelpOption([...data])
    }

    useEffect(() => {
        let mounted = true;
        mounted ? getAdminHelp() : null
        return () => mounted = false
    }, [])

    return (
        <div className="main-content mb-5">
            <div className="page-content">
                <div className="container">
                    <div className="my-2">
                        <Stack direction="row" justifyContent={"space-between"}>
                            <h3 className="fw-bold mb-2">Admin Help Performance</h3>
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
                                                value={params.created_from}
                                                name="created_from"
                                                label="From Date"
                                                inputFormat="yyyy-MM-dd"
                                                mask="____-__-__"
                                                onChange={(newValue) => {
                                                    setParams({
                                                        ...params,
                                                        created_from: moment(newValue).format('yyyy-MM-DD')
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
                                                value={params.created_until}
                                                name="created_until"
                                                label="Until Date"
                                                inputFormat="yyyy-MM-dd"
                                                mask="____-__-__"
                                                onChange={(newValue) => {
                                                    setParams({
                                                        ...params,
                                                        created_until: moment(newValue).format('yyyy-MM-DD')
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
                                        <Button disabled={rows !== undefined && rows.data.length > 0 ? false : true} variant="contained" onClick={() => exportTableToExcel("#table-export", "Report_admin_help")} startIcon={<DownloadOutlined />}>
                                            Export
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3} mb={2}>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                multiple
                                                name='category'
                                                value={params.category}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Category" />}
                                                renderValue={(selected) => {
                                                    return categoryOptions.filter(v => selected.includes(v.value)).map(v => {
                                                        return (
                                                            <Chip 
                                                                label={v.name} 
                                                                onDelete={() => 's'}
                                                            />
                                                        )
                                                    })
                                                }}
                                            >
                                                {categoryOptions.map((v, i) => {
                                                    return (
                                                    <MenuItem key={v.value} value={v.value}>
                                                        <Checkbox 
                                                            checked={params.category.indexOf(v.value) > -1} 
                                                        />
                                                        <ListItemText primary={v.name} />
                                                    </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                multiple
                                                name='status'
                                                value={params.status}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Status" />}
                                                renderValue={(selected) => {
                                                    return statusOption.filter(v => selected.includes(v.value)).map(v => {
                                                        return (
                                                            <Chip 
                                                                label={v.name} 
                                                                onDelete={() => 's'}
                                                            />
                                                        )
                                                    })
                                                }}
                                            >
                                                {statusOption.map((v, i) => {
                                                    return (
                                                    <MenuItem key={v.value} value={v.value}>
                                                        <Checkbox 
                                                            checked={params.status.indexOf(v.value) > -1} 
                                                        />
                                                        <ListItemText primary={v.name} />
                                                    </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl fullWidth>
                                            <InputLabel>Admin Name</InputLabel>
                                            <Select
                                                multiple
                                                name='receiver_ids'
                                                value={params.receiver_ids}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="Admin Name" />}
                                                renderValue={(selected) => {
                                                    return adminHelpOption.filter(v => selected.includes(v.user.id)).map(v => {
                                                        return (
                                                            <Chip 
                                                                label={v.user.name} 
                                                                onDelete={() => 's'}
                                                            />
                                                        )
                                                    })
                                                }}
                                            >
                                                {adminHelpOption.map((v, i) => {
                                                    return (
                                                        <MenuItem key={v.user.id} value={v.user.id}>
                                                            <Checkbox 
                                                                checked={params.receiver_ids.indexOf(v.user.id) > -1} 
                                                            />
                                                            <ListItemText primary={v.user.name} />
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
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
                                                <TableCell>No</TableCell> 
                                                <TableCell>Name</TableCell> 
                                                <TableCell>Category</TableCell> 
                                                <TableCell>Total Rating</TableCell> 
                                                <TableCell>Total Help Ticket</TableCell> 
                                                <TableCell>Created by</TableCell> 
                                                <TableCell>title</TableCell> 
                                                <TableCell>purpose</TableCell> 
                                                <TableCell>Status</TableCell> 
                                                <TableCell>Rating</TableCell> 
                                                <TableCell>Created at</TableCell> 
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows !== undefined ? (
                                            rows.data.length > 0 ? (
                                                rows.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, key) => (
                                                    <>
                                                        <TableRow sx={{ backgroundColor: key % 2 == 0 ? "#eeeeee" : "#e0e0e0" }} key={key}>
                                                            <TableCell rowSpan={value.receiver.help.length} component="th" scope="row" align="center">
                                                                {page * rowsPerPage + key + 1}.
                                                            </TableCell>
                                                            <TableCell rowSpan={value.receiver.help.length}>{value.receiver.name}</TableCell>
                                                            <TableCell rowSpan={value.receiver.help.length}>{value.receiver.category == "it" ? "IT" : "NON IT"}</TableCell>
                                                            <TableCell rowSpan={value.receiver.help.length}><Rating precision={0.5} readOnly value={value.receiver.accumulation_rating} /></TableCell>
                                                            <TableCell rowSpan={value.receiver.help.length}>{value.receiver.total_help}</TableCell>
                                                            {/* Row 1 */}
                                                            {/* <TableCell>{value.receiver.help[0].user.name}</TableCell> */}
                                                            <TableCell>user name</TableCell>
                                                            <TableCell>  {value.receiver.help[0].title}</TableCell>
                                                            <TableCell>{value.receiver.help[0].purpose}</TableCell>
                                                            <TableCell><Chip color={value.receiver.help[0].status == "open" ? "default" : "error"} label={value.receiver.help[0].status} /></TableCell>
                                                            <TableCell><Rating precision={0.5} readOnly value={value.receiver.help[0].rating} /></TableCell>
                                                            <TableCell>{moment(value.receiver.help[0].created_at).format('ll') }</TableCell>
                                                        </TableRow>
                                                        {value.receiver.help.map((v, i) => {
                                                            if(i !== 0){
                                                                return (
                                                                    <TableRow sx={{ backgroundColor: key % 2 == 0 ? "#eeeeee" : "#e0e0e0" }} key={i}>
                                                                        <TableCell>user name</TableCell>
                                                                        <TableCell>{v.title}</TableCell>
                                                                        <TableCell>{v.purpose}</TableCell>
                                                                        <TableCell> <Chip color={v.status == "open" ? "default" : "error"} label={v.status} /></TableCell>
                                                                        <TableCell><Rating precision={0.5} readOnly value={v.rating} /></TableCell>
                                                                        <TableCell>{moment(v.created_at).format('ll') }</TableCell>
                                                                    </TableRow>
                                                                )
                                                            }
                                                        })}
                                                    </>
                                                        
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 10 }} colSpan={10}>
                                                        No result found.
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
                                        rowsPerPageOptions={[3, 6, 10, 25]}
                                        component="div"
                                        count={rows.data.length}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        showFirstButton
                                        showLastButton
                                    />
                                )}
                                {rows !== undefined && rows.data.length > 0 &&
                                    <TableExport data={rows.data} />
                                }
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