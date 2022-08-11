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
    Checkbox,
    ListItemText,
    InputLabel,
    OutlinedInput,
    Select,
    Link,
} from "@mui/material";
import { Add, CloseRounded, Delete, DownloadOutlined, Edit, FileDownload, FileUpload, FilterListRounded, MoreVert, Search, DoneOutline, Close } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Link as RouterLink } from "react-router-dom";
import { useParams } from 'react-router-dom'

import http from "../../../component/api/Api";
import {
    Chart as ChartJS,
    CategoryScale,
    ArcElement,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Loading from '../../../component/Loading';
import { LoadingButton } from '@mui/lab';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

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

const ModalTable = (props) => {
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

export const optionsBar = {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            bar: {
                borderWidth: 2,
            }
        },
        responsive: true,
        barPercentage: 0.8,
        maintainAspectRatio: true,
        categoryPercentage: 1.0,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            xAxis: {
                ticks: {
                    maxTicksLimit: 10
                }
            }
        }
};

export const optionsPie = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'left',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        }
      },
      title: {
        display: true,
        color: '#5F6368',
        font: {
          size: 19.5,
          weight: '600'
        },
        text: '',
        position: 'top',
        align: 'start'
      }
    }
};
  

const index = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [isComplete, setIsComplete] = useState(false)

    const [data, setData] = useState([])

    //loading
    const [loading, setLoading] = useState(false)
    
    const getData = async () => {
        setIsComplete(false)
        const res = await http.get(`statistic/asset_by_sub_category`, {
            params: {
                category_id: id
            }
        })
        setData(res.data.data)
    }

    const covertDataConditionCount = (arr) => {
        return arr.map(v => v.asset_count)
    }

    const covertDataConditionLabels = (arr) => {
        return arr.map(v => v.condition)
    }

    const coverDataSubLabels = (arr) => {
        return arr.map(v => v.sub_category)
    }

    const convertDataSubCount = (arr) => {
        return arr.map(v => v.asset_count)
    }

    useEffect(() => {
        let mounted = true
        if(mounted){
            getData().then(res => {
                setIsComplete(true)
            })

        }

        return () => mounted = false
    }, [id])

    return (
        <div className="main-content mb-5">
            <div className="page-content">
                <div className="container">
                    <div className="my-2">
                        <Stack direction="row" justifyContent={"space-between"}>
                            <h3 className="fw-bold mb-2">Dashboard By Category</h3>
                        </Stack>
                        
                    </div>
                    {isComplete &&
                    <div className="row">
                        <div className="col-xl-12 col-12 mt-3">
                           <Grid container spacing={2}>
                                <Grid item xs={12} md={8}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="p" sx={{ mb: 2, fontWeight: 'bold' }}>Asset By Category</Typography>
                                            {data.asset_condition !== undefined &&
                                            <Bar 
                                                options={optionsBar} 
                                                data={{
                                                    labels: coverDataSubLabels(data.asset_sub_category),
                                                    datasets: [
                                                        {
                                                            id: 1,
                                                            label: 'Asset',
                                                            data: convertDataSubCount(data.asset_sub_category),
                                                            backgroundColor: 'rgba(7, 82, 143, 1)',
                                                        }
                                                    ],
                                                }} 
                                            />
                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="p" sx={{ mb: 2, fontWeight: 'bold' }}>Asset By Condition</Typography>
                                            {data.asset_condition !== undefined &&
                                            <Pie data={{
                                                labels: covertDataConditionLabels(data.asset_condition),
                                                datasets: [
                                                    {
                                                    label: '# of Votes',
                                                    data: covertDataConditionCount(data.asset_condition),
                                                    backgroundColor: [
                                                        'rgba(7, 82, 143, 1)',
                                                        'rgba(0, 180, 215, 1)',
                                                        'rgba(145, 224, 239, 1)',
                                                        'rgba(252, 230, 29, 1)',
                                                        'rgba(217, 217, 217, 1)',
                                                    ],
                                                    borderColor: [
                                                        'rgba(7, 82, 143, 1)',
                                                        'rgba(0, 180, 215, 1)',
                                                        'rgba(145, 224, 239, 1)',
                                                        'rgba(252, 230, 29, 1)',
                                                        'rgba(217, 217, 217, 1)',
                                                    ],
                                                    borderWidth: 1,
                                                    },
                                                ],
                                                }} 
                                                options={optionsPie} />
                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>
                           </Grid>
                        </div>
                        
                    </div>
                    }
                </div>
            </div>
        </div>
    );
};
export default index;