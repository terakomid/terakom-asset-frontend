import React, { useState, useEffect } from "react";
import {
   Card,
   Grid,
   CardContent,
   Avatar,
   Stack,
   Typography,
   TextField,
   Box,
   MenuItem,
   Button,
   OutlinedInput,
   InputLabel,
   FormControl,
   InputAdornment,
   FormHelperText,
   IconButton,
   FormLabel,
   RadioGroup,
   FormControlLabel,
   Radio,
   InputBase,
   Chip,
   TableContainer,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   Menu,
   ListItemIcon,
   Tooltip,
   CircularProgress,
   Autocomplete,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import http from "../../../component/api/Api";
import { Close, Delete, DeleteForever, FileUploadOutlined, InsertDriveFile,  } from "@mui/icons-material";
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useNavigate } from "react-router-dom";
import Loading from "../../../component/Loading";
import { produce } from "immer";
import moment from "moment";
import { useSnackbar } from "notistack";
import { NumberFormat } from "../../../component/Format";


const Form = (props) => {
	const [rows, setRows] = useState([])
	const [form, setForm] = useState({
		from: '',
        to: '',
        location_id_to: "",
        department_id_to: ""
	});
    const { enqueueSnackbar } = useSnackbar();

	const [loading, setLoading] = useState(false);
	const [assetId, setAssetId] = useState([])

    const [loading2, setLoading2] = useState([]);
    const [option, setOption] = useState({
        department: [],
        location: [],
    })

	const [params, setParams] = useState({
        search: "",
        employee_id: '',
        order_by_name: 1,
        limit: 5,
        page: 1,
		paginate: 1,
    });

    const [employeeParams, setEmployeeParams] = useState({
        from : {
            search: '',
            limit: 5,
            paginate: 1,
            vacant: 1,
        },
        to: {
            search: '',
            limit: 5,
            paginate: 1,
            vacant: 1,
        }
    })
    const [employeeData, setEmployeeData] = useState({
        from: [],
        to: []
    })
    
    const getDataEmployee = (params, key) => {
        http
            .get(`/user`, {
            	params: params,
            })
            .then((res) => {
           		setEmployeeData({
                    ...employeeData,
                    [key]: res.data.data.data
                });
            })
            .catch((err) => {
            });
    }
	const getData = () => {
		http
            .get(`/asset`, {
            	params,
            })
            .then((res) => {
           		setRows(res.data.data.data);
            })
            .catch((err) => {
            });
	}
    
    const [tableData, setTableData] = useState([])
	const getDataMultipleAsset = () => {
		http
            .get(`/asset/get_multiple`, {
            	params: {
					ids: assetId
				},
            })
            .then((res) => {
				setTableData(res.data.data)
            })
            .catch((err) => {
            });
	}
 	useEffect(() => {
        setEmployeeData({
            ...employeeData,
            from: []
        });
        let timer = setTimeout(() => {
        	if (employeeParams.from) getDataEmployee(employeeParams.from, "from");
        }, 500);
        return () => clearTimeout(timer);

    }, [employeeParams.from]);
 	useEffect(() => {
        setEmployeeData({
            ...employeeData,
            to: []
        });
        let timer = setTimeout(() => {
        	if (employeeParams.to) getDataEmployee(employeeParams.to, "to");
        }, 500);
        return () => clearTimeout(timer);

    }, [employeeParams.to]);


	useEffect(() => {
        setRows([]);
        let timer = setTimeout(() => {
        	if (params) getData();
        }, 500);
        	return () => clearTimeout(timer);

    }, [params]);
	useEffect(() => {
        assetId.length > 0 ? getDataMultipleAsset() : null
    }, [assetId]);
    
    const [disabled, setDisabled] = useState({
        department: true,
        location: true,
    })
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const getLocation = async () => {
        const res = await http.get(`location`);
        return res.data;
     };

     const getDepartment = async () => {
        const res = await http.get(`dept`);
        return res.data;
     };

    useEffect(() => {
        let mounted = true
        if(!mounted) return
        Promise.all([getDepartment(), getLocation()]).then(res => {
            setOption({
                department: [...res[0].data],
                location: [...res[1].data]
            })
            setLoading2(false)
        })
        return () => mounted = false
    }, [])

	const onSubmit = (e) => {
		e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append('user_from_id', form.from)
        formData.append('user_to_id', form.to)
        formData.append('location_id_to', form.location_id_to)
        formData.append('department_id_to', form.department_id_to)
        
        assetId.map((v, i) => {
            formData.append(`asset_id[${i}]`, v)
        })

        http.post(`/asset/replacement`, formData)
        .then(res => {
            setLoading(false)
            enqueueSnackbar("Success Replacement Asset Data", { variant: "success" })
            setAssetId([])
            
        })
        .catch(err => {
            setLoading(false)
            if(err.response){
                enqueueSnackbar("Failed Replacement Asset Data", { variant: "error" })
            }
        })
	};

	return (
		<Grid container spacing={2}>
            <Grid item md xs={12}>
				<Card>
					<CardContent>
                        {!loading2 ? 
						<Box component="form" onSubmit={onSubmit} autoComplete="off">
                            <Typography variant="h6" mb={2} >
                                User Replacement
                            </Typography>
							<Grid container spacing={3} alignItems="center" >
                                <Grid item xs={12} md={6}>
                                    <Autocomplete
                                        freeSolo
                                        disableClearable
                                        options={employeeData.from.filter(v => v.id !== form.to)}
                                        fullWidth
                                        getOptionLabel={(option) => {
                                            return `${option.code} - ${option.name}`;
                                        }}
                                        inputValue={employeeParams.from.search}
                                        onInputChange={(event, newInputValue, reason) => {
                                            setAssetId([])
                                            setForm({
                                                ...form,
                                                from: '',
                                            })
                                            setEmployeeParams({
                                                ...employeeParams,
                                                from: {
                                                    ...employeeParams.from,
                                                    search: newInputValue
                                                }
                                            })
                                        }}
                                        onChange={(e, value) => {
                                            setParams({
                                                ...params,
                                                employee_id: [value.id]
                                            })
                                            setForm({
                                                ...form,
                                                from: value.id
                                            })
                                        }}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Employ Name / PIC (From)"
                                            InputProps={{
                                                ...params.InputProps,
                                                type: "search",
                                            }}
                                        />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Autocomplete
                                        freeSolo
                                        disableClearable
                                        options={employeeData.to.filter(v => v.id != form.from)}
                                        fullWidth
                                        getOptionLabel={(option) => {
                                            return `${option.code} - ${option.name}`;
                                        }}
                                        inputValue={employeeParams.to.search}
                                        onInputChange={(event, newInputValue, reason) => {
                                            setForm({
                                                ...form,
                                                to: '',
                                            })
                                            setEmployeeParams({
                                                ...employeeParams,
                                                to: {
                                                    ...employeeParams.to,
                                                    search: newInputValue
                                                }
                                            })
                                        }}
                                        onChange={(e, value) => {
                                            setForm({
                                                ...form,
                                                to: value.id,
                                                location_id_to: value.location === null ? "" : value.location.id,
                                                department_id_to: value.dept === null ? "" : value.dept.id 
                                            })
                                            setDisabled({
                                                department: value.location === null ? false : true,
                                                location: value.dept === null ? false : true
                                            })
                                        }}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Employ Name / PIC (To)"
                                            InputProps={{
                                                ...params.InputProps,
                                                type: "search",
                                            }}
                                        />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        name="location_id_to"
                                        label="Location Id To"
                                        fullWidth
                                        value={form.location_id_to}
                                        select
                                        required
                                        disabled={disabled.location}
                                        onChange={onChange}
                                    >
                                        {option.location.map((v, i) => {
                                            return <MenuItem key={v.id} value={v.id}>{`${v.code} - ${v.location}`}</MenuItem>
                                        })}   
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        name="department_id_to"
                                        label="Department Id To"
                                        fullWidth
                                        value={form.department_id_to}
                                        select
                                        required
                                        disabled={disabled.department}
                                        onChange={onChange}
                                    >
                                        {option.department.map((v, i) => {
                                            return <MenuItem key={v.id} value={v.id}>{v.dept}</MenuItem>
                                        })}   
                                    </TextField>
                                </Grid>

								<Grid item xs={12} md={12}>
                                    <Autocomplete
                                        freeSolo
                                        disableClearable
                                        options={rows.filter(v => !assetId.includes(v.id))}
                                        fullWidth
                                        getOptionLabel={(option) => `${option.asset_code} - ${option.asset_name}`}
                                        inputValue={params.search}
                                        onInputChange={(event, newInputValue, reason) => {
                                            setParams({
                                                ...params,
                                                search: reason === 'reset' ? '' : newInputValue
                                            })
                                        }}
                                        onChange={(e, value) => {
                                            setAssetId([...assetId, value.id])

                                        }}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search input (Add)"
                                            InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                            }}
                                        />
                                        )}
                                    />
								</Grid>
                                <Grid item xs={12} md={12}>
                                    {assetId.length > 0 &&
                                        <>
                                        <Typography variant="button" my={2} >
                                            Asset To Replace
                                        </Typography>
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
                                                    <TableCell>Code Asset</TableCell>
                                                    <TableCell>Asset Name</TableCell>
                                                    <TableCell>PIC Name</TableCell>
                                                    <TableCell>Category Asset</TableCell>
                                                    <TableCell>Capitalized On</TableCell>
                                                    <TableCell>Useful Life</TableCell>
                                                    <TableCell>Acquisition Value</TableCell>
                                                    <TableCell>Book Value</TableCell>
                                                    <TableCell>Condition</TableCell>
                                                    <TableCell align="center">Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {tableData !== undefined ? (
                                                    tableData.length > 0 ? (
                                                        tableData.filter(v => assetId.includes(v.id)).map((value, key) => (
                                                            <TableRow key={key}>
                                                                <TableCell component="th" scope="row" align="center">
                                                                {1 + key}.
                                                                </TableCell>
                                                                <TableCell>
                                                                    {value.asset_code}
                                                                </TableCell>
                                                                <TableCell>{value.asset_name}</TableCell>
                                                                <TableCell>{value.employee.name}</TableCell>
                                                                <TableCell>{value.category.category}</TableCell>
                                                                <TableCell>{moment(value.capitalized).format('ll') }</TableCell>
                                                                <TableCell>{value.sub_category.useful_life}</TableCell>
                                                                <TableCell>{NumberFormat(value.acquisition_value, "Rp")}</TableCell>
                                                                <TableCell>{NumberFormat(value.book_value, "Rp")}</TableCell>
                                                                <TableCell>{value.condition.condition}</TableCell>
                                                                <TableCell align="center">
                                                                    <IconButton 
                                                                        onClick={() => {
                                                                            if(assetId.length > 1){
                                                                                setAssetId(currentAssetId => currentAssetId.filter((v, x) => v !== value.id))
                                                                            }else{
                                                                                setAssetId([])
                                                                            }
                                                                            // var index = array.indexOf(item);
                                                                            // if (index !== -1) {
                                                                            //   array.splice(index, 1);
                                                                            // }
                                                                        }}
                                                                    >
                                                                        <DeleteForever color="error" />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    ) : (
                                                        <TableRow>
                                                        <TableCell component="th" scope="row" sx={{ textAlign: "center", py: 5 }} colSpan={10}>
                                                            <Loading />
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
                                        </>
									}
                                </Grid>
							</Grid>
							<LoadingButton sx={{ display: "flex", mt: 3, borderRadius: 25, ml: "auto" }} type="submit" loading={loading} variant="contained">
								Save
							</LoadingButton>
						</Box>
                        :
                            <Loading />      
                        }
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default Form;
