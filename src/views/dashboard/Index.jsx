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

import http from "../../component/api/Api";
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
import Loading from '../../component/Loading';
import { LoadingButton } from '@mui/lab';
import { useRecoilValue } from 'recoil';
import { authentication } from '../../store/Authentication';
import { useMemo } from 'react';
import { useCallback } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

export const optionsBarByCategory = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: '#5F6368',
        font: {
          size: 19.5,
          weight: '600'
        },
        text: 'Total Asset By Category',
        padding: {
          bottom: 50
        },
        position: 'top',
        align: 'start'
      }
    },
    scales: {
      y: {
        position: 'right',
        ticks: {
          align: 'center',
          padding: 1,
          beginAtZero: true,
          min: 0,
          stepSize: 10,
        },
        grid: {
          display: true,
          borderDash: [10, 10],
          borderWidth: 0,
          borderDashOffset: 0.0
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#5F6368',
          font: {
            weight: 'bold'
          },
          padding: 5
        }
      }
    }
};
export const optionsBarByLocation = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: '#5F6368',
        font: {
          size: 19.5,
          weight: '600'
        },
        text: 'Total Asset By Location',
        padding: {
          bottom: 50
        },
        position: 'top',
        align: 'start'
      }
    },
    scales: {
      y: {
        position: 'right',
        ticks: {
          align: 'center',
          padding: 1,
          beginAtZero: true,
          min: 0,
          stepSize: 10,
        },
        grid: {
          display: true,
          borderDash: [10, 10],
          borderWidth: 0,
          borderDashOffset: 0.0
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#5F6368',
          font: {
            weight: 'bold'
          },
          padding: 5
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
          boxWidth: 15
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
    const user = useRecoilValue(authentication)

    const [data, setData] = useState([])
    const [dataByLoc, setDataByLoc] = useState({})
    const [params, setParams] = useState({
        location_id: '',
    })
    const [locationOption, setLocationOption] = useState([])
    const [categoryOption, setCategoryOption] = useState([])
    const [subCategoryOption, setSubCategoryOption] = useState([])

    //loading
    const [loading, setLoading] = useState(false)
    const [subCategoriesLoading, setSubCategoriesLoading] = useState(false)

    const [child, setChild] = useState(0)
    const getLocation = async () => {
        if(user.user.role !== "Admin Department"){
            setChild(1)
            const res = await http.get('location')
            setLocationOption([...res.data.data]) 
        }else{
            const location_id = user.user.location.id;
            const getLocationById = await http.get(`location/${location_id}/show_by_id`)
            if(getLocationById.data.data.total_child > 0){
                setChild(getLocationById.data.data.total_child)
                const res = await http.get('location', {
                    params: {
                        parent_id: user.user.location.id 
                    }
                })
                setLocationOption([...res.data.data])
            }
        }
        
    }

    const getCategory = async () => {
        const res = await http.get('category')
        setCategoryOption([...res.data.data])
    }

    const getSubCategory = async (category_id) => {
        setSubCategoriesLoading(true)
        const res = await http.get(`sub_category?category_id=${category_id}`)
        setSubCategoryOption([...res.data.data])
        setSubCategoriesLoading(false)
    }
    
    const getData = async () => {
        if(user.user.role !== "Admin Department"){
            const res = await http.get(`statistic/asset`, {
                params: {
                    location_id: params.location_id
                }
            })
            setData(res.data.data)
        }else{
            const res = await http.get(`statistic/asset`, {
                params: {
                    location_id: params.location_id === "" ? user.user.location.id : params.location_id
                }
            })
            setData(res.data.data)
        }
    }
    const getDataByLoc = async () => {
        if(user.user.role !== "Admin Department"){
            const res = await http.get(`statistic/asset_by_location`, {
                params: {
                    location_id: params.location_id
                }
            })
            setDataByLoc(res.data.data)
        }else{
            const location_id = user.user.location.id;
            const getLocationById = await http.get(`location/${location_id}/show_by_id`)
            if(getLocationById.data.data.total_child > 0){
                const res = await http.get(`statistic/asset_by_location`, {
                    params: {
                        location_id: params.location_id === '' ? user.user.location.id : params.location_id 
                    }
                })
                setDataByLoc(res.data.data)
            }
        }
    }

    const covertDataConditionCount = (arr) => {
        return arr.map(v => v.asset_count)
    }

    const covertDataConditionLabels= (arr) => {
        return arr.map(v => v.condition)
    }

    const covertDataCategoryLabels = (arr) => {
        return arr.map(v => v.category)
    }

    const covertDataCategoryCount = (arr) => {
        return arr.map(v => v.asset_count)
    }

    const convertCategoryColor = useMemo(() => {
        return data.asset_location !== undefined && data.asset_location.map(v => `#${Math.floor(Math.random()*16777215).toString(16)}`)
    }, [data.asset_location?.length])

    const covertDataLocationLabels = (arr) => {
        return arr.map(v => v.location)
    }

    const covertDataLocationCount = (arr) => {
        return arr.map(v => v.asset_count)
    }

    const convertLocationColor = useMemo(() => {
        return typeof dataByLoc.length !== "undefined" && dataByLoc.map(v => `#${Math.floor(Math.random()*16777215).toString(16)}`)
    }, [dataByLoc.length])


    

    useEffect(() => {
        let mounted = true
        if(mounted){
            Promise.all([getLocation(), getCategory(), getDataByLoc(), getData()  ]).then(res => {
                setIsComplete(true)
            })
        }

        return () => mounted = false
    }, [])

    const onFilter = (e) => {
        e.preventDefault()
        setLoading(true)
        Promise.all([getDataByLoc(), getData()]) 
            .then(res => {
            })
            .catch(err => {
                if(err.response){
                }
            })
            .finally(e => {
                setLoading(false)

            })
    }

    return (
        <div className="main-content mb-5">
            <div className="page-content">
                <div className="container">
                    <div className="my-2">
                        <Stack direction="row" justifyContent={"space-between"}>
                            <h3 className="fw-bold mb-2">{user.user.role !== 'Employee' ? 'Dashboard' : 'Menu'}</h3>
                        </Stack>
                        
                    </div>
                    {isComplete && user.user.role !== 'Employee' &&
                    <div className="row">
                        <div className="col-xl-12 col-12 mt-3">
                           <Grid container spacing={2}>
                                {child > 0 &&
                                <Grid item xs={12} md={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ mb: 2 }}>Filter</Typography>
                                            <Box component='form' onSubmit={onFilter}>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item xs={12} md={5}>
                                                        <TextField
                                                            value={params.location_id}
                                                            fullWidth
                                                            onChange={(e) => {
                                                                setParams({
                                                                    ...params,
                                                                    location_id: e.target.value
                                                                })
                                                            }}
                                                            label="Location"
                                                            select
                                                        >
                                                        {locationOption.length > 0 && locationOption.map((v, i) => {
                                                            return (
                                                            <MenuItem key={v.id} value={v.id}>
                                                                {v.location}
                                                            </MenuItem>
                                                            )
                                                        })}
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <LoadingButton type="submit" loading={loading} variant="contained">
                                                            Filter
                                                        </LoadingButton>
                                                        <Button onClick={(e) => { setParams({...params, location_id: ''}) }}>
                                                            Reset
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                        </CardContent>
                                    </Card>
                                </Grid>
                                }
                                {dataByLoc.length > 0 &&
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Bar 
                                                options={optionsBarByLocation} 
                                                data={{
                                                    labels: covertDataLocationLabels(dataByLoc),
                                                    datasets: [
                                                        {
                                                            id: 1,
                                                            label: 'Asset',
                                                            data: covertDataLocationCount(dataByLoc),
                                                            backgroundColor: convertLocationColor,
                                                        }
                                                    ],
                                                }} 
                                            />

                                        </CardContent>
                                    </Card>
                                </Grid>
                                }
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            {data.asset_location !== undefined && 
                                            <Bar 
                                                options={optionsBarByCategory} 
                                                data={{
                                                    labels: covertDataCategoryLabels(data.asset_location),
                                                    datasets: [
                                                        {
                                                            id: 1,
                                                            label: 'Asset',
                                                            data: covertDataCategoryCount(data.asset_location),
                                                            backgroundColor: convertCategoryColor,
                                                        }
                                                    ],
                                                }} 
                                            />
                                            }

                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="p" sx={{ fontWeight: 'bold', }}>Asset By Category</Typography>
                                            <Grid container mt={2}>
                                                {categoryOption.length > 0 && categoryOption.map((v, i) => {
                                                    return(
                                                        <Grid item md={4} xs={12} key={v.id} >
                                                            <Link component={RouterLink} to={`/dashboard-by-category/${v.id}`}>
                                                                {v.code} - {v.category}
                                                            </Link>
                                                        </Grid>
                                                    )
                                                })}

                                            </Grid>
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
                                <Grid item xs={12} md={4}>
                                    <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/dashboard-asset-it')}>
                                        <CardContent>
                                            <Stack spacing={2} alignItems="center">
                                                <Typography variant="p" sx={{ mb: 2, fontWeight: 'bold' }}>Total Asset IT</Typography>
                                                {data.asset_type !== undefined && 
                                                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>{data.asset_type.it}</Typography>
                                                }

                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Stack spacing={2} alignItems="center">
                                                <Typography variant="p" sx={{ mb: 2, fontWeight: 'bold' }}>Total Asset Non IT</Typography>
                                                {data.asset_type !== undefined && 
                                                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>{data.asset_type.non_it}</Typography>
                                                }
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                           </Grid>
                        </div>
                        
                    </div>
                    }
                    {isComplete && user.user.role === 'Employee' &&
                    <div className="row">
                        <div className="col-xl-12 col-12 mt-3">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Card>
                                        <CardContent sx={{ cursor: 'pointer' }} onClick={() => navigate('/data-asset')}>
                                            <Typography>
                                                My Asset
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Card>
                                        <CardContent sx={{ cursor: 'pointer' }} onClick={() => navigate('/help')}>
                                            <Typography>
                                                Help
                                            </Typography>
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