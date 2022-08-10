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
import { useNavigate } from 'react-router-dom'

import http from "../../component/api/Api";
import QrScanner from 'qr-scanner';

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
    const [code, setCode] = useState('')
    const [data, setData] = useState({})
    const [display, setDisplay] = useState('block')
    const navigate = useNavigate()

    const getDetailAsset = async (asset_code) => {
        try{
            const formData = new FormData()
            formData.append('asset_code', asset_code)
            const res = await http.post(`asset/show_by_code`, formData)
            // console.log(res.data)
            setData(res.data.data)

        }catch(err){
            console.log(err.response)
        }
        
    }

    const setScanner = () => {
        setDisplay('block')
        const videoElem = document.querySelector('#video-elem')
        const qrScanner = new QrScanner(
            videoElem,
            result => {
                
                setCode(result)
                setDisplay('none')
                getDetailAsset(result)
                qrScanner.destroy()
            },
            true
            
        );
        qrScanner.start()
    }

    const handleDetail = () => {
        if(data.asset_type === 'it'){
            navigate(`/detail-data-asset-it/${data.id}`)
        }else{
            navigate(`/detail-data-asset-non-it/${data.id}`)
        }
    }

    const handleEdit = () => {
        if(data.asset_type === 'it'){
            navigate(`/edit-data-asset-it/${data.id}`)
        }else{
            navigate(`/edit-data-asset-non-it/${data.id}`)
        }
    }

    useEffect(() => {
        setScanner()
        
    }, [])

    return (
        <div className="main-content mb-5">
            <div className="page-content">
                <div className="container">
                    <div className="my-2">
                        <Stack direction="row" justifyContent={"space-between"}>
                            <h3 className="fw-bold mb-2">QR Tagging</h3>
                        </Stack>
                        
                    </div>
                    <div className="row">
                        <Grid container spacing={3}>
                            <Grid item md={12} xs={12} display={display}>
                                <Card>
                                    <CardContent>
                                        <Typography>
                                            Scan QR Code Here 
                                        </Typography>
                                        <video style={{ height: '400px', }} id="video-elem"></video>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography>
                                            Asset Code : {code}
                                        </Typography>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="contained" onClick={() => {
                                                setScanner()
                                            }}>
                                                Re-Scan QR Code
                                            </Button>
                                            {JSON.stringify(data) !== '{}' &&
                                            <>
                                            <Button variant="contained" onClick={handleDetail}>
                                                Lihat Detail Asset
                                            </Button>
                                            <Button variant="contained" onClick={handleEdit}>
                                                Edit Asset
                                            </Button>
                                            
                                            </>
                                            }

                                        </Stack>
                                    </CardContent>
                                </Card>
                                
                            </Grid>

                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Index;