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
import { Add, CloseRounded, Delete, DownloadOutlined, Edit, FileDownload, FileUpload, FilterListRounded, MoreVert, Search, DoneOutline, Close, Circle } from "@mui/icons-material";
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
    responsive: true,

    plugins: {
      legend: {
        position: 'top',
      },
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
          boxWidth: 6
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
    const navigate = useNavigate()
    const [isComplete, setIsComplete] = useState(false)
    const [locationParams, setLocationParams] = useState({
        device_id: [],
        branch_id: [],
        sub_branch_id: [],
    })

    //Option
    const [deviceOption, setDeviceOption] = useState([])
    const [branchOption, setBranchOption] = useState([])

    //loading
    const [loading, setLoading] = useState(false)
    
    //get Data from API
    const getData = async () => {
        setIsComplete(false)
        const res = await http.get(`statistic/asset_by_sub_category`, {
            params: {
                category_id: id
            }
        })
        console.log(res.data.data)
        setData(res.data.data)
    }
    const getDevice = async () => {
        const res = await http.get(`sub_master_it`, {
            params: {
                master_it_id: 1,
            },
        });
        console.log(res.data)
        setDeviceOption(res.data.data)
    }


    //convert data response
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

    //Event Handler
    const locationChange = (e) => {
        const {
            target: { value },
        } = e;
        setLocationParams({
            ...locationParams,
           [e.target.name]: typeof value === 'string' ? value.split(',') : value,
        });
    }

    useEffect(() => {
        let mounted = true
        if(mounted){
            Promise.all([getDevice()]).then(res => {
                setIsComplete(true)
            })

        }

        return () => mounted = false
    }, [])

    return (
        <div className="main-content mb-5">
            <div className="page-content">
                <div className="container">
                    <div className="my-2">
                        <Stack direction="row" justifyContent={"space-between"}>
                            <h3 className="fw-bold mb-2">Dashboard Asset It </h3>
                        </Stack>
                        
                    </div>
                    {isComplete &&
                    <div className="row">
                        <div className="col-xl-12 col-12 mt-3">
                           <Grid container spacing={2}>

                                {/* Asset by Location */}
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="p" sx={{ fontWeight: 'bold' }}>Total Asset By Location</Typography>
                                            <Grid container spacing={2} my={2}>
                                                
                                                {/* Device option */}
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Device</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            name='device_id'
                                                            value={locationParams.device_id}
                                                            onChange={locationChange}
                                                            input={<OutlinedInput label="Device" />}
                                                            renderValue={(selected) => {
                                                                return deviceOption.filter(v => selected.includes(v.id)).map(v => {
                                                                    return (
                                                                        <Chip 
                                                                            label={v.sub_type} 
                                                                            onDelete={() => 's'}
                                                                        />
                                                                    )
                                                                })
                                                            }}
                                                        >
                                                            {deviceOption.length > 0 && deviceOption.map((v, i) => {
                                                                return (
                                                                <MenuItem key={v.id} value={v.id}>
                                                                    <Checkbox 
                                                                        checked={locationParams.device_id.indexOf(v.id) > -1} 
                                                                    />
                                                                    <ListItemText primary={v.sub_type} />
                                                                </MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                {/* Branch option */}
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Device</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            name='device_id'
                                                            value={locationParams.device_id}
                                                            onChange={locationChange}
                                                            input={<OutlinedInput label="Device" />}
                                                            renderValue={(selected) => {
                                                                return deviceOption.filter(v => selected.includes(v.id)).map(v => v.sub_type).join(', ')
                                                            }}
                                                        >
                                                            {deviceOption.length > 0 && deviceOption.map((v, i) => {
                                                                return (
                                                                <MenuItem key={v.id} value={v.id}>
                                                                    <Checkbox 
                                                                        checked={locationParams.device_id.indexOf(v.id) > -1} 
                                                                    />
                                                                    <ListItemText primary={v.sub_type} />
                                                                </MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                {/* sub branch option */}
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Device</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            name='device_id'
                                                            value={locationParams.device_id}
                                                            onChange={locationChange}
                                                            input={<OutlinedInput label="Device" />}
                                                            renderValue={(selected) => {
                                                                return deviceOption.filter(v => selected.includes(v.id)).map(v => v.sub_type).join(', ')
                                                            }}
                                                        >
                                                            {deviceOption.length > 0 && deviceOption.map((v, i) => {
                                                                return (
                                                                <MenuItem key={v.id} value={v.id}>
                                                                    <Checkbox 
                                                                        checked={locationParams.device_id.indexOf(v.id) > -1} 
                                                                    />
                                                                    <ListItemText primary={v.sub_type} />
                                                                </MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                {/* Bar Chart */}
                                                <Grid item xs={12} md={12}>
                                                    <Bar 
                                                        options={optionsBar} 
                                                        data={{
                                                            labels: ['Satu', 'Dua', 'Tiga'],
                                                            datasets: [
                                                                {
                                                                    id: 1,
                                                                    label: 'Asset',
                                                                    data: [15, 20, 5],
                                                                    backgroundColor: 'rgba(7, 82, 143, 1)',
                                                                },
                                                                {
                                                                    id: 1,
                                                                    label: 'Asset',
                                                                    data: [10, 15, 10],
                                                                    backgroundColor: 'rgba(7, 82, 143, 1)',
                                                                },
                                                                {
                                                                    id: 1,
                                                                    label: 'Asset',
                                                                    data: [5, 10, 5],
                                                                    backgroundColor: 'rgba(7, 82, 143, 1)',
                                                                },
                                                            ],
                                                        }} 
                                                    />

                                                </Grid>

                                                {/* by condition */}
                                                <Grid item xs={12} md={12}>
                                                    <Grid container  spacing={1}>
                                                        <Grid item xs={6} md={3}>
                                                            <Chip icon={<Circle />} label="Baik/layak : 200 asset" />

                                                        </Grid>
                                                        <Grid item xs={6} md={3}>
                                                            <Chip icon={<Circle />} label="Baik/layak : 200 asset" />

                                                        </Grid>
                                                        <Grid item xs={6} md={3}>
                                                            <Chip icon={<Circle />} label="Baik/layak : 200 asset" />

                                                        </Grid>
                                                        <Grid item xs={6} md={3}>
                                                            <Chip icon={<Circle />} label="Baik/layak : 200 asset" />

                                                        </Grid>

                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                            
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Asset by Department */}
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="p" sx={{ fontWeight: 'bold' }}>Total Asset By Department</Typography>
                                            <Grid container spacing={2} my={2}>
                                                
                                                {/* Device option */}
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Device</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            name='device_id'
                                                            value={locationParams.device_id}
                                                            onChange={locationChange}
                                                            input={<OutlinedInput label="Device" />}
                                                            renderValue={(selected) => {
                                                                return deviceOption.filter(v => selected.includes(v.id)).map(v => {
                                                                    return (
                                                                        <Chip 
                                                                            label={v.sub_type} 
                                                                            onDelete={() => 's'}
                                                                        />
                                                                    )
                                                                })
                                                            }}
                                                        >
                                                            {deviceOption.length > 0 && deviceOption.map((v, i) => {
                                                                return (
                                                                <MenuItem key={v.id} value={v.id}>
                                                                    <Checkbox 
                                                                        checked={locationParams.device_id.indexOf(v.id) > -1} 
                                                                    />
                                                                    <ListItemText primary={v.sub_type} />
                                                                </MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                {/* Department option */}
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Device</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            name='device_id'
                                                            value={locationParams.device_id}
                                                            onChange={locationChange}
                                                            input={<OutlinedInput label="Device" />}
                                                            renderValue={(selected) => {
                                                                return deviceOption.filter(v => selected.includes(v.id)).map(v => v.sub_type).join(', ')
                                                            }}
                                                        >
                                                            {deviceOption.length > 0 && deviceOption.map((v, i) => {
                                                                return (
                                                                <MenuItem key={v.id} value={v.id}>
                                                                    <Checkbox 
                                                                        checked={locationParams.device_id.indexOf(v.id) > -1} 
                                                                    />
                                                                    <ListItemText primary={v.sub_type} />
                                                                </MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                {/* branch option */}
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Device</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            name='device_id'
                                                            value={locationParams.device_id}
                                                            onChange={locationChange}
                                                            input={<OutlinedInput label="Device" />}
                                                            renderValue={(selected) => {
                                                                return deviceOption.filter(v => selected.includes(v.id)).map(v => v.sub_type).join(', ')
                                                            }}
                                                        >
                                                            {deviceOption.length > 0 && deviceOption.map((v, i) => {
                                                                return (
                                                                <MenuItem key={v.id} value={v.id}>
                                                                    <Checkbox 
                                                                        checked={locationParams.device_id.indexOf(v.id) > -1} 
                                                                    />
                                                                    <ListItemText primary={v.sub_type} />
                                                                </MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                {/* Bar Chart */}
                                                <Grid item xs={12} md={12}>
                                                    <Bar 
                                                        options={optionsBar} 
                                                        data={{
                                                            labels: ['Satu', 'Dua', 'Tiga'],
                                                            datasets: [
                                                                {
                                                                    id: 1,
                                                                    label: 'Asset',
                                                                    data: [15, 20, 5],
                                                                    backgroundColor: 'rgba(7, 82, 143, 1)',
                                                                },
                                                                {
                                                                    id: 1,
                                                                    label: 'Asset',
                                                                    data: [10, 15, 10],
                                                                    backgroundColor: 'rgba(7, 82, 143, 1)',
                                                                },
                                                                {
                                                                    id: 1,
                                                                    label: 'Asset',
                                                                    data: [5, 10, 5],
                                                                    backgroundColor: 'rgba(7, 82, 143, 1)',
                                                                },
                                                            ],
                                                        }} 
                                                    />

                                                </Grid>

                                                {/* by condition */}
                                                <Grid item xs={12} md={12}>
                                                    <Grid container  spacing={1}>
                                                        <Grid item xs={6} md={3}>
                                                            <Chip icon={<Circle />} label="Baik/layak : 200 asset" />

                                                        </Grid>
                                                        <Grid item xs={6} md={3}>
                                                            <Chip icon={<Circle />} label="Baik/layak : 200 asset" />

                                                        </Grid>
                                                        <Grid item xs={6} md={3}>
                                                            <Chip icon={<Circle />} label="Baik/layak : 200 asset" />

                                                        </Grid>
                                                        <Grid item xs={6} md={3}>
                                                            <Chip icon={<Circle />} label="Baik/layak : 200 asset" />

                                                        </Grid>

                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                            
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Asset Per Operating System by Location  */}
                                <Grid item xs={12} md={6}>
                                    <Card>
                                        <CardContent>
                                            <TableContainer>
                                                <Table >
                                                    <TableHead>
                                                        <TableRow sx={{
                                                            "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                                                            "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                                                        }}>
                                                            <TableCell>Location</TableCell>
                                                            <TableCell>Device</TableCell>
                                                            <TableCell>Windows</TableCell>
                                                            <TableCell>Linux</TableCell>
                                                            <TableCell>Mac</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell rowSpan={2}>Jakarta</TableCell>
                                                            <TableCell>Notebook</TableCell>
                                                            <TableCell>5</TableCell>
                                                            <TableCell>-</TableCell>
                                                            <TableCell>1</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Notebook</TableCell>
                                                            <TableCell>4</TableCell>
                                                            <TableCell>-</TableCell>
                                                            <TableCell>-</TableCell>
                                                        </TableRow>

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                        </CardContent>
                                    </Card>
                                    
                                </Grid>

                                {/* Asset Per Operating System by Location  */}
                                <Grid item xs={12} md={6}>
                                    <Card>
                                        <CardContent>
                                            <TableContainer>
                                                <Table >
                                                    <TableHead>
                                                        <TableRow sx={{
                                                            "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                                                            "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                                                        }}>
                                                            <TableCell>Location</TableCell>
                                                            <TableCell>Device</TableCell>
                                                            <TableCell>Windows</TableCell>
                                                            <TableCell>Linux</TableCell>
                                                            <TableCell>Mac</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell rowSpan={2}>Jakarta</TableCell>
                                                            <TableCell>Notebook</TableCell>
                                                            <TableCell>5</TableCell>
                                                            <TableCell>-</TableCell>
                                                            <TableCell>1</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>Notebook</TableCell>
                                                            <TableCell>4</TableCell>
                                                            <TableCell>-</TableCell>
                                                            <TableCell>-</TableCell>
                                                        </TableRow>

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

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