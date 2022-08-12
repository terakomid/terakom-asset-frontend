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
        location_id: [],
        sub_location_id: [],
    })
    const [departmentParams, setDepartmentParams] = useState({
        device_id: [],
        department_id: [],
        sub_location_id: [],
    })


    //data
    const [dataByLocation, setDataByLocation] = useState({})
    const [dataByDeparment, setDataByDeparment] = useState({})
    const [dataOsByLocation, setDataOsByLocation] = useState([])
    const [dataOsByDepartment, setDataOsByDepartment] = useState([])

    //Option
    const [deviceOption, setDeviceOption] = useState([])
    const [departmentOptions, setDepartmentOptions] = useState([])
    const [locationOption, setLocationOption] = useState([])

    //loading
    const [loading, setLoading] = useState(false)
    const [locationLoading, setLocationLoading] = useState(false)
    const [departmentLoading, setDepartmentLoading] = useState(false)
    
    //get Data from API
    const getDataByLocation = async () => {
        const res = await http.get(`/statistic/asset_it_by_location`, {
            params: {
                device_id: locationParams.device_id,
                location_id: locationParams.location_id,
                sub_location_id: locationParams.sub_location_id
            }
        })
        setDataByLocation(res.data.data)
    }

    const getDataByDepartment = async () => {
        const res = await http.get(`/statistic/asset_it_by_department`, {
            params: {
                device_id: departmentParams.device_id,
                department_id: departmentParams.department_id,
                sub_location_id: departmentParams.sub_location_id
            }
        })
        setDataByDeparment(res.data.data)
    }

    const getDevice = async () => {
        const res = await http.get(`sub_master_it`, {
            params: {
                master_it_id: 1,
            },
        });
        setDeviceOption(res.data.data)
    }

    const getLocation = async () => {
        const res = await http.get(`location`);
        setLocationOption(res.data.data)
    }

    const getDepartment = async () => {
        const res = await http.get('dept')
        setDepartmentOptions([...res.data.data])
    }

    const locationSubmit = async () => {
        setLocationLoading(true)
        getDataByLocation().then(res => {
            setLocationLoading(false)
        })
    }

    const departmentSubmit = async () => {
        setDepartmentLoading(true)
        getDataByDepartment().then(res => {
            setDepartmentLoading(false)
        })
    }

    //convert data response
    const covertDataGroupLocation = (arr) => {
        const temp = arr.map((v, i)=> {
            return {
                id: i,
                label: v.device,
                data: [...v.asset_count],
                backgroundColor: `rgba(0, 0, ${160 + i * 5}, 1)`
            }
        })
        return temp
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

    const departmentChange = (e) => {
        const {
            target: { value },
        } = e;
        setDepartmentParams({
            ...departmentParams,
           [e.target.name]: typeof value === 'string' ? value.split(',') : value,
        });
    }


    //pagination

    //by location
    const [pageLocation, setPageLocation] = useState(0);
    const [rowsPerPageLocation, setRowsPerPageLocation] = useState(5);
    const [paginationLocation, setPaginationLocation] = useState({
        limit: 3,
        page: 1
    })
    const getDataOsByLocation = async () => {
        const res = await http.get('statistic/asset_it_by_os_location', {
            params: {
                ...paginationLocation
            }
        })
        setDataOsByLocation(res.data.data)
    }
    const handleChangePageLocation = (event, newPage) => {
        setPaginationLocation({
           ...paginationLocation,
           page: newPage + 1,
        });
     };
  
    const handleChangeRowsPerPageLocation = (event) => {
    setPaginationLocation({
        ...paginationLocation,
        page: 1,
        limit: +event.target.value,
    });
    };
    useEffect(() => {
    setDataOsByLocation(undefined);
    let timer = setTimeout(() => {
        if (paginationLocation) getDataOsByLocation();
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationLocation]);

    //by depart
    const [pageDepartment, setPageDepartment] = useState(0);
    const [rowsPerPageDepartment, setRowsPerPageDepartment] = useState(5);
    const [paginationDepartment, setPaginationDepartment] = useState({
        limit: 3,
        page: 1
    })
    const getDataOsByDepartment = async () => {
        const res = await http.get('statistic/asset_it_by_os_department', {
            params: {
                ...paginationDepartment
            }
        })
        setDataOsByDepartment(res.data.data)
    }
    const handleChangePageDepartment = (event, newPage) => {
        setPaginationDepartment({
           ...paginationDepartment,
           page: newPage + 1,
        });
     };
  
    const handleChangeRowsPerPageDepartment = (event) => {
    setPaginationDepartment({
        ...paginationDepartment,
        page: 1,
        limit: +event.target.value,
    });
    };
    useEffect(() => {
    setDataOsByDepartment(undefined);
    let timer = setTimeout(() => {
        if (paginationDepartment) getDataOsByDepartment();
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationDepartment]);

    useEffect(() => {
        let mounted = true
        if(mounted){
            Promise.all([getDevice(), getDataByLocation(), getLocation(), getDataByDepartment(), getDepartment(), getDataOsByLocation(), getDataOsByDepartment()]).then(res => {
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
                                            <Grid container spacing={2} my={2} alignItems="center">
                                                
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

                                                {/* Location option */}
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Branch</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            name='location_id'
                                                            disabled={locationParams.sub_location_id.length > 0 ? true : false}
                                                            value={locationParams.location_id}
                                                            onChange={locationChange}
                                                            input={<OutlinedInput label="Branch" />}
                                                            renderValue={(selected) => {
                                                                return locationOption.filter(v => selected.includes(v.id)).map(v => {
                                                                    return (
                                                                        <Chip 
                                                                            label={v.location} 
                                                                            onDelete={() => 's'}
                                                                        />
                                                                    )
                                                                })
                                                            }}
                                                        >
                                                            {locationOption.length > 0 && locationOption.filter(v => v.parent === null).map((v, i) => {
                                                                return (
                                                                <MenuItem key={v.id} value={v.id}>
                                                                    <Checkbox 
                                                                        checked={locationParams.location_id.indexOf(v.id) > -1} 
                                                                    />
                                                                    <ListItemText primary={v.location} />
                                                                </MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                {/* Sub Location option */}
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Sub Branch</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            name='sub_location_id'
                                                            value={locationParams.sub_location_id}
                                                            onChange={locationChange}
                                                            disabled={locationParams.location_id.length > 0 ? true : false}
                                                            input={<OutlinedInput label="Sub Branch" />}
                                                            renderValue={(selected) => {
                                                                return locationOption.filter(v => selected.includes(v.id)).map(v => {
                                                                    return (
                                                                        <Chip 
                                                                            label={v.location} 
                                                                            onDelete={() => 's'}
                                                                        />
                                                                    )
                                                                })
                                                            }}
                                                        >
                                                            {locationOption.length > 0 && locationOption.filter(v => v.parent !== null).map((v, i) => {
                                                                return (
                                                                <MenuItem key={v.id} value={v.id}>
                                                                    <Checkbox 
                                                                        checked={locationParams.sub_location_id.indexOf(v.id) > -1} 
                                                                    />
                                                                    <ListItemText primary={v.location} />
                                                                </MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <LoadingButton loading={locationLoading} variant='contained' onClick={locationSubmit}>
                                                            Submit
                                                    </LoadingButton>
                                                    
                                                </Grid>

                                                

                                                {/* Bar Chart */}
                                                <Grid item xs={12} md={12}>
                                                    {dataByLocation.asset_count !== undefined && dataByLocation.location !== undefined &&
                                                    <Bar 
                                                        options={optionsBar} 
                                                        data={{
                                                            labels: dataByLocation.location,
                                                            datasets: covertDataGroupLocation(dataByLocation.asset_count)
                                                        }} 
                                                    />
                                                    
                                                    }

                                                </Grid>

                                                {/* by condition */}
                                                <Grid item xs={12} md={12}>
                                                    <Grid container  spacing={1}>
                                                        {dataByLocation.condition !== undefined && dataByLocation.condition.map(v => {
                                                            return (
                                                                <Grid item xs={6} md={3}>
                                                                    <Chip icon={<Circle />} label={`${v.condition} : ${v.asset_count}`} />
                                                                </Grid>

                                                            )
                                                        })}
                                                        
                                                       

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
                                            <Grid container spacing={2} my={2} alignItems="center">
                                                
                                                {/* Device option */}
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Device</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            name='device_id'
                                                            value={departmentParams.device_id}
                                                            onChange={departmentChange}
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
                                                                        checked={departmentParams.device_id.indexOf(v.id) > -1} 
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
                                                        <InputLabel>Department</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            name='department_id'
                                                            value={departmentParams.department_id}
                                                            onChange={departmentChange}
                                                            input={<OutlinedInput label="Department" />}
                                                            renderValue={(selected) => {
                                                                return departmentOptions.filter(v => selected.includes(v.id)).map(v => {
                                                                    return (
                                                                        <Chip 
                                                                            label={v.dept} 
                                                                            onDelete={() => 's'}
                                                                        />
                                                                    )
                                                                })
                                                            }}
                                                        >
                                                            {departmentOptions.length > 0 && departmentOptions.filter(v => v.parent !== null).map((v, i) => {
                                                                return (
                                                                <MenuItem key={v.id} value={v.id}>
                                                                    <Checkbox 
                                                                        checked={departmentParams.department_id.indexOf(v.id) > -1} 
                                                                    />
                                                                    <ListItemText primary={v.dept} />
                                                                </MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                {/* Sub Location option */}
                                                <Grid item xs={12} md={6}>
                                                    <FormControl fullWidth>
                                                        <InputLabel>Branch</InputLabel>
                                                        <Select
                                                            labelId="demo-multiple-checkbox-label"
                                                            id="demo-multiple-checkbox"
                                                            multiple
                                                            name='sub_location_id'
                                                            value={departmentParams.sub_location_id}
                                                            onChange={departmentChange}
                                                            input={<OutlinedInput label="Branch" />}
                                                            renderValue={(selected) => {
                                                                return locationOption.filter(v => selected.includes(v.id)).map(v => {
                                                                    return (
                                                                        <Chip 
                                                                            label={v.location} 
                                                                            onDelete={() => 's'}
                                                                        />
                                                                    )
                                                                })
                                                            }}
                                                        >
                                                            {locationOption.length > 0 && locationOption.filter(v => v.parent === null).map((v, i) => {
                                                                return (
                                                                <MenuItem key={v.id} value={v.id}>
                                                                    <Checkbox 
                                                                        checked={departmentParams.sub_location_id.indexOf(v.id) > -1} 
                                                                    />
                                                                    <ListItemText primary={v.location} />
                                                                </MenuItem>
                                                                )
                                                            })}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                

                                                

                                                <Grid item xs={12} md={6}>
                                                    <LoadingButton variant='contained' loading={departmentLoading} onClick={departmentSubmit}>
                                                            Submit
                                                    </LoadingButton>
                                                    
                                                </Grid>

                                                

                                                {/* Bar Chart */}
                                                <Grid item xs={12} md={12}>
                                                    {dataByDeparment.asset_count !== undefined && dataByDeparment.department !== undefined &&
                                                    <Bar 
                                                        options={optionsBar} 
                                                        data={{
                                                            labels: dataByDeparment.department,
                                                            datasets: covertDataGroupLocation(dataByDeparment.asset_count)
                                                        }} 
                                                    />
                                                    
                                                    }

                                                </Grid>

                                                {/* by condition */}
                                                <Grid item xs={12} md={12}>
                                                    <Grid container  spacing={1}>
                                                        {dataByDeparment.condition !== undefined && dataByDeparment.condition.map(v => {
                                                            return (
                                                                <Grid item xs={6} md={3}>
                                                                    <Chip icon={<Circle />} label={`${v.condition} : ${v.asset_count}`} />
                                                                </Grid>

                                                            )
                                                        })}
                                                        
                                                       

                                                    </Grid>

                                                </Grid>

                                            </Grid>
                                            
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Asset Per Operating System by Location  */}
                                <Grid item xs={12} md={6}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="p" sx={{ fontWeight: 'bold' }}>Asset IT Per Operating System By Location</Typography>
                                            <TableContainer sx={{ mt: 2 }}>
                                                <Table >
                                                    <TableHead>
                                                        <TableRow sx={{
                                                            "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                                                            "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                                                        }}>
                                                            <TableCell>Location</TableCell>
                                                            <TableCell>Device</TableCell>
                                                            <TableCell>OS</TableCell>
                                                            <TableCell>OS Count</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {dataOsByLocation !== undefined && dataOsByLocation.data.map((v, i) => {
                                                            return (
                                                                <>
                                                                    <TableRow key={v.id}>
                                                                        <TableCell rowSpan={v.os.length}>{v.location}</TableCell>
                                                                        <TableCell rowSpan={v.os.length}>dummy</TableCell>
                                                                        <TableCell>{v.os[0].sub_type}</TableCell>
                                                                        <TableCell>{v.os[0].os_count}</TableCell>
                                                                    </TableRow>
                                                                    {v.os.map((k, i) => {
                                                                        if(i !== 0){
                                                                            return (
                                                                                <TableRow sx={{ borderBottom: i == v.os.length - 1 ? 1 : 0 }}>
                                                                                    <TableCell>{k.sub_type}</TableCell>
                                                                                    <TableCell>{k.os_count}</TableCell>
                                                                                </TableRow>
                                                                            )
                                                                        }
                                                                    })}
                                                                </>
                                                            )
                                                        })}

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            {dataOsByLocation !== undefined && dataOsByLocation.data.length > 0 && (
                                                <TablePagination
                                                    component="div"
                                                    count={dataOsByLocation.meta.total}
                                                    page={paginationLocation.page - 1}
                                                    rowsPerPage={paginationLocation.limit}
                                                    onPageChange={handleChangePageLocation}
                                                    onRowsPerPageChange={handleChangeRowsPerPageLocation}
                                                    rowsPerPageOptions={[3, 10, 25, 100]}
                                                    showFirstButton
                                                    showLastButton
                                                />
                                            )}

                                        </CardContent>
                                    </Card>
                                    
                                </Grid>

                                {/* Asset Per Operating System by Department  */}
                                <Grid item xs={12} md={6}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="p" sx={{ fontWeight: 'bold' }}>Asset IT Per Operating System By Location</Typography>
                                            <TableContainer sx={{ mt: 2 }}>
                                                <Table >
                                                    <TableHead>
                                                        <TableRow sx={{
                                                            "& th:first-of-type": { borderRadius: "0.5em 0 0 0.5em" },
                                                            "& th:last-of-type": { borderRadius: "0 0.5em 0.5em 0" },
                                                        }}>
                                                            <TableCell>Department</TableCell>
                                                            <TableCell>Device</TableCell>
                                                            <TableCell>OS</TableCell>
                                                            <TableCell>OS Count</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {dataOsByDepartment !== undefined && dataOsByDepartment.data.map((v, i) => {
                                                            return (
                                                                <>
                                                                    <TableRow key={v.id}>
                                                                        <TableCell rowSpan={v.os.length}>{v.department}</TableCell>
                                                                        <TableCell rowSpan={v.os.length}>dummy</TableCell>
                                                                        <TableCell>{v.os[0].sub_type}</TableCell>
                                                                        <TableCell>{v.os[0].os_count}</TableCell>
                                                                    </TableRow>
                                                                    {v.os.map((k, i) => {
                                                                        if(i !== 0){
                                                                            return (
                                                                                <TableRow sx={{ borderBottom: i == v.os.length - 1 ? 1 : 0 }}>
                                                                                    <TableCell>{k.sub_type}</TableCell>
                                                                                    <TableCell>{k.os_count}</TableCell>
                                                                                </TableRow>
                                                                            )
                                                                        }
                                                                    })}
                                                                </>
                                                            )
                                                        })}

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            {dataOsByDepartment !== undefined && dataOsByDepartment.data.length > 0 && (
                                                <TablePagination
                                                    component="div"
                                                    count={dataOsByDepartment.meta.total}
                                                    page={paginationDepartment.page - 1}
                                                    rowsPerPage={paginationDepartment.limit}
                                                    onPageChange={handleChangePageDepartment}
                                                    onRowsPerPageChange={handleChangeRowsPerPageDepartment}
                                                    rowsPerPageOptions={[3, 10, 25, 100]}
                                                    showFirstButton
                                                    showLastButton
                                                />
                                            )}

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