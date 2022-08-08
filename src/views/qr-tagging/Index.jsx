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
                        <Grid container>
                            <Grid item md={12} xs={12}>
                                
                            </Grid>

                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Index;