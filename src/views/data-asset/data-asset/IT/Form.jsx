import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardHeader, Typography, TextField, MenuItem, Box, Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Chip } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import http from '../../../../component/api/Api'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../../component/Loading';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment'
import { produce } from "immer";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { AssignmentIndOutlined, DescriptionOutlined, InsertPhotoOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const Form = (props) => {
    //form 
    const [form, setForm] = useState({
        // asset information
        asset_code: "",
        category_id: "",
        sub_category_id: "",
        asset_name: "",
        spesification: "",
        capitalized: null,
        sap_code: "",

        // asset holder
        employ_id: "",
        department_id: "",
        location_id: "",
        condition_id: "",
        latitude: "",
        longitude: "",

        // depreciation asset
        cost_id: "",
        acquisition_value: "",
        depreciation_value: "",
        value_book: "",
        depreciation: "1",

        // Vendor information
        vendor_id: "",
        vendor_address: "",
        pic_contact: "",
        contact: "",

        // Device information
        device_id: "",
        type: "",
        brand_id: "",
        monitor_inch: "",
        model_brand: "",
        mac_address: "",
        warranty: null,
        computer_name: "",

        // Hardware
        dlp: "",
        soc: "",
        snnbpc: "",
        processor_id: "",
        hardware: "",

        //Sofware
        os_id: "",
        sn_windows: "",
        office_id: "",
        antivirus_id: "",
        notes: "",

    })

    // utils
    const navigate = useNavigate()
    const [isComplete, setIsComplete] = useState(false)
    const [loading, setLoading] = useState(false)
    
    //select
    const [assetLocations, setAssetLocations] = useState([])
    const [assetCategories, setAssetCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [employees, setEmployees] = useState([])
    const [assetConditions, setAssetConditions] = useState([])
    const [assetCost, setAssetCost] = useState([]);
    const [assetVendor, setAssetVendor] = useState([])
    const [masterDevices, setMasterDevices] = useState([])
    const [masterBrands, setMasterBrands] = useState([])
    const [masterProcessors, setMasterProcessors] = useState([])
    const [masterWindowOS, setMasterWindowOS] = useState([])
    const [masterOffices, setMasterOffices] = useState([])
    const [masterAntiVirus, setMasterAntiVirus] = useState([])

    //loading select
    const [subCategoriesLoading, setSubCategoriesLoading] = useState(false)

    //otomatic value
    const [department, setDepartment] = useState('')
    const [vendor, setVendor] = useState({
        vendor_address: '',
        contact: '',
        pic_contact: '',
    })

    //picture and evidence
    const [pictures, setPictures] = useState([
        {
            image_file: '',
            image_preview: ''
        }
    ])
    const [evidences, setEvidences] = useState([
        {
            file: '',
        }
    ])

    //get data from API
    const getAssetCategories = async () => {
        const res = await http.get(`category`)
        setAssetCategories([...res.data.data])
        return 1
    }

    const getSubCategory = async (category_id) => {
        setSubCategoriesLoading(true)
        const res = await http.get(`sub_category?category_id=${category_id}`)
        setSubCategories([...res.data.data])
        setSubCategoriesLoading(false)
    }

    const getAssetLocations = async () => {
        const res = await http.get(`location`)
        setAssetLocations([...res.data.data])
        return 1
    }

    const getEmployees = async () => {
        const res = await http.get(`user`, {
            params: {
                paginate: 0
            }
        })
        setEmployees([...res.data.data.data])
        return 1
    }

    const getAssetCondition = async () => {
        const res = await http.get(`condition`)
        setAssetConditions([...res.data.data])
        return 1
    }

    const getAssetCost = async () => {
        const res = await http.get(`cost`)
        setAssetCost([...res.data.data])
    }

    const getVendor = async () => {
        const res = await http.get(`vendor`)
        setAssetVendor([...res.data.data])
    }

    const getAssetMasterIt = async (master_it_id) => {
        const res = await http.get(`sub_master_it`, {
            params: {
                master_it_id,
            }
        })
        if(master_it_id === 1){
            setMasterDevices([...res.data.data])
        }else if(master_it_id === 2){
            setMasterBrands([...res.data.data])
        }else if(master_it_id === 3){
            setMasterProcessors([...res.data.data])
        }else if(master_it_id === 4){
            setMasterWindowOS([...res.data.data])
        }else if(master_it_id === 5){
            setMasterOffices([...res.data.data])
        }else if(master_it_id === 6){
            setMasterAntiVirus([...res.data.data])
        }
        return 1
    }

    // event handler
    const handleChange = (e) => {
        if(e.target.name === 'category_id'){
            getSubCategory(e.target.value)
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }else if(e.target.name === 'employ_id'){
            const user = employees.find(v => v.id == e.target.value)
            setForm({
                ...form,
                [e.target.name]: e.target.value,
                department_id: user.dept.id
            })
            setDepartment(user.dept.dept)
        }else if(e.target.name === 'vendor_id'){
            const vendor = assetVendor.find(v => v.id == e.target.value)
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
            setVendor({
                vendor_address: vendor.address,
                contact: vendor.contact,
                pic_contact: vendor.pic_contact,
            })
        }else{
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let url = ""
        const formData = new FormData();

        if(props.title === 'it'){
            formData.append("asset_type", "it")
        }else{
            formData.append("asset_type", "non-it")
        }
    }
    
    useEffect(() => {
        let mounted = true
        if(mounted){
            Promise.all([
                getAssetCategories(), 
                getAssetLocations(), 
                getEmployees(), 
                getAssetCondition(), 
                getAssetCost(), 
                getVendor(),
                getAssetMasterIt(1),
                getAssetMasterIt(2),
                getAssetMasterIt(3),
                getAssetMasterIt(4),
                getAssetMasterIt(5),
                getAssetMasterIt(6)
            ]).then(res => {
                setIsComplete(true)
            })
        }

        return () => mounted = false
    }, [props])
    return (
        <Box component="form" onSubmit={onSubmit}>
            <Grid container spacing={4}>
                {isComplete &&
                <>
                {/* Asset Information */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Asset Information</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.asset_code} 
                                        name="asset_code"
                                        fullWidth
                                        label="Asset Code"
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField 
                                        name="category_id"
                                        value={form.category_id}
                                        onChange={handleChange}
                                        fullWidth
                                        label="Category Code"
                                        select
                                    >
                                        {assetCategories.length > 0 && assetCategories.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{`${v.code}-${v.category}`}</MenuItem>
                                        ))}
                                        {assetCategories.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField 
                                        name="sub_category_id"
                                        value={form.sub_category_id}
                                        onChange={handleChange}
                                        fullWidth
                                        label="Sub Category Code"
                                        select
                                    >
                                        {subCategoriesLoading && <MenuItem disabled> <Loading /> </MenuItem>}
                                        {subCategories.length > 0 && subCategories.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{v.sub_category}</MenuItem>
                                        ))}
                                        {subCategories.length == 0 && !subCategoriesLoading &&
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.asset_name} 
                                        name="asset_name"
                                        fullWidth
                                        label="Asset Name"
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.spesification}
                                        name="spesification"
                                        fullWidth
                                        label="Spesification"
                                        
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={form.capitalized}
                                        name="capitalize"
                                        label="Capitalized On"
                                        inputFormat="yyyy/MM/dd"
                                        mask='____/__/__'
                                        onChange={(newValue) => {
                                            setForm({
                                                ...form,
                                                capitalized: newValue
                                            })
                                        }}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.sap_code} 
                                        name="sap_code"
                                        fullWidth
                                        label="SAP Code"
                                        
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Asset Holder */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Asset Holder</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.employ_id}
                                        name="employ_id"
                                        fullWidth
                                        label="Employ Name / PIC"
                                        select
                                    >
                                        {employees.length > 0 && employees.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{`${v.code}-${v.name}`}</MenuItem>
                                        ))}
                                        {employees.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={department} 
                                        name="department_id"
                                        fullWidth
                                        label="Department Using"
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        name="location_id"
                                        fullWidth
                                        onChange={handleChange}
                                        value={form.location_id}
                                        label="Asset Location"
                                        select
                                    >
                                        {assetLocations.length > 0 && assetLocations.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{`${v.code}-${v.location}`}</MenuItem>
                                        ))}
                                        {assetLocations.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.condition_id} 
                                        name="condition_id"
                                        fullWidth
                                        label="Asset Condition"
                                        select
                                    >
                                        {assetConditions.length > 0 && assetConditions.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{v.condition}</MenuItem>
                                        ))}
                                        {assetConditions.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={form.latitude} 
                                        onChange={handleChange}
                                        name="latitude"
                                        fullWidth
                                        label="Asset Coordinate Latitude"
                                        
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        value={form.longitude}
                                        onChange={handleChange}
                                        name="longitude"
                                        fullWidth
                                        label="Asset Coordinate Longitude"
                                        
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Depreciation Asset */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Depreciation Asset</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={form.cost_id}
                                        onChange={handleChange} 
                                        name="cost_id"
                                        fullWidth
                                        label="Cost Center Name"
                                        select
                                    >
                                        {assetCost.length > 0 && assetCost.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{`${v.code}-${v.name}`}</MenuItem>
                                        ))}
                                        {assetCost.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={form.acquisition_value}
                                        onChange={handleChange}  
                                        name="acquisition_value"
                                        fullWidth
                                        label="Acquisition Value"
                                        
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={form.depreciation_value}
                                        onChange={handleChange}   
                                        name="depreciation_value"
                                        fullWidth
                                        label="Depreciation Value"
                                        
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={form.value_book}
                                        onChange={handleChange}   
                                        name="value_book"
                                        fullWidth
                                        label="Value Book"
                                        
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Calculate Asset Depreciation ? </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="depreciation"
                                            value={form.depreciation}
                                            onChange={handleChange}
                                            
                                        >
                                            <FormControlLabel value={"1"} control={<Radio />} label="Yes" />
                                            <FormControlLabel value={"0"} control={<Radio />} label="No" />
                                           
                                        </RadioGroup>
                                    </FormControl>

                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Vendor Information */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Vendor Information</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        onChange={handleChange}
                                        value={form.vendor_id}
                                        name="vendor_id"
                                        fullWidth
                                        label="Vendor Name"
                                        select
                                    >
                                        {assetVendor.length > 0 && assetVendor.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{`${v.code}-${v.name}`}</MenuItem>
                                        ))}
                                        {assetVendor.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={vendor.vendor_address} 
                                        name="vendor_address"
                                        fullWidth
                                        label="Vendor Address"
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={vendor.pic_contact}  
                                        name="pic_contact"
                                        fullWidth
                                        label="PIC Contact"
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={vendor.contact}  
                                        name="contact"
                                        fullWidth
                                        label="Contact"
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Device Information */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Device Information</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        onChange={handleChange}
                                        value={form.device_id}
                                        name="device_id"
                                        fullWidth
                                        label="Device"
                                        select
                                    >
                                        {masterDevices.length > 0 && masterDevices.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{v.sub_type}</MenuItem>
                                        ))}
                                        {masterDevices.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.type} 
                                        name="type"
                                        fullWidth
                                        label="Type"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        onChange={handleChange}
                                        value={form.brand_id}
                                        name="brand_id"
                                        fullWidth
                                        label="Brand"
                                        select
                                    >
                                        {masterBrands.length > 0 && masterBrands.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{v.sub_type}</MenuItem>
                                        ))}
                                        {masterBrands.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        onChange={handleChange}
                                        value={form.monitor_inch} 
                                        name="monitor_inch"
                                        fullWidth
                                        label="Monitor Inch"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.model_brand}  
                                        name="model_brand"
                                        fullWidth
                                        label="Model Brand"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.mac_address}   
                                        name="mac_address"
                                        fullWidth
                                        label="Mac Address"
                                    />
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={form.warranty}
                                            name="warranty"
                                            label="Warranty Expiry"
                                            inputFormat="yyyy/MM/dd"
                                            mask='____/__/__'
                                            onChange={(newValue) => {
                                                setForm({
                                                    ...form,
                                                    warranty: newValue
                                                })
                                            }}
                                            renderInput={(params) => <TextField fullWidth {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.computer_name}
                                        name="computer_name"
                                        fullWidth
                                        label="Computer Name"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Hardware */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Hardware</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.dlp}
                                        name="dlp"
                                        fullWidth
                                        label="DLP"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.soc} 
                                        name="soc"
                                        fullWidth
                                        label="SOC"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        onChange={handleChange}
                                        value={form.snnbpc} 
                                        name="snnbpc"
                                        fullWidth
                                        label="SN NB & PC"
                                    />
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField 
                                        onChange={handleChange}
                                        value={form.processor_id}
                                        name="processor_id"
                                        fullWidth
                                        label="Processor"
                                        select
                                    >
                                        {masterProcessors.length > 0 && masterProcessors.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{v.sub_type}</MenuItem>
                                        ))}
                                        {masterProcessors.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.hardware} 
                                        name="hardware"
                                        fullWidth
                                        label="Hardware"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Software */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Software</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField 
                                        onChange={handleChange}
                                        value={form.os_id}
                                        name="os_id"
                                        fullWidth
                                        label="OS"
                                        select
                                    >
                                        {masterWindowOS.length > 0 && masterWindowOS.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{v.sub_type}</MenuItem>
                                        ))}
                                        {masterWindowOS.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        value={form.sn_windows} 
                                        name="sn_windows"
                                        fullWidth
                                        label="SN Windows"
                                    />
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField 
                                        onChange={handleChange}
                                        value={form.office_id}
                                        name="office_id"
                                        fullWidth
                                        label="MS Office"
                                        select
                                    >
                                        {masterOffices.length > 0 && masterOffices.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{v.sub_type}</MenuItem>
                                        ))}
                                        {masterOffices.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField 
                                        onChange={handleChange}
                                        value={form.antivirus_id}
                                        name="antivirus_id"
                                        fullWidth
                                        label="Anti Virus"
                                        select
                                    >
                                        {masterAntiVirus.length > 0 && masterAntiVirus.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{v.sub_type}</MenuItem>
                                        ))}
                                        {masterAntiVirus.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Information Support */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Information Support</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid Grid item md={12} xs={12}>
                                    <TextField
                                        onChange={handleChange} 
                                        value={form.note}
                                        name="note"
                                        fullWidth
                                        label="Note"
                                        multiline
                                        rows={5}
                                    />
                                </Grid>
                                <Grid Grid item md={12} xs={12}>
                                    <Typography>Picture</Typography>
                                    <Grid container>
                                        {pictures.map((v, i) => {
                                            return (
                                                <Grid key={i} item xs={6} md={4}>
                                                    <Stack spacing={2} alignItems="center">
                                                        <Box component="label" sx={{ mt: { xs: 2 } }} htmlFor={`img-${i}`}>
                                                            {v.image_preview == "" ? 
                                                            <InsertPhotoOutlined sx={{ fontSize: '100px' }} />
                                                            :
                                                            <img style={{ height: '100px' }} src={v.image_preview} alt="test"  />
                                                            }
                                                        </Box>
                                                        <input 
                                                            type="file" 
                                                            style={{ display: 'none' }} 
                                                            id={`img-${i}`}
                                                            onChange={e => {
                                                                let image_file = e.target.files[0]
                                                                let image_preview = URL.createObjectURL(e.target.files[0])
                                                                setPictures(currentAnswers => 
                                                                    produce(currentAnswers, v => {
                                                                        v[i] = {
                                                                            image_file,
                                                                            image_preview
                                                                        }
                                                                    })
                                                                );
                                                            }} 
                                                        />
                                                        {pictures.length > 1 &&
                                                            <Chip
                                                                color="error" 
                                                                label="delete" 
                                                                onClick={() => {
                                                                    setPictures(currentAnswers => currentAnswers.filter((v, x) => x !== i))
                                                                }} 
                                                            />
                                                        }
                                                    </Stack>
                                                    
                                                </Grid>
                                            )
                                        })}
                                        <Grid item md={12} xs={12}>
                                            <Chip
                                                color="primary"
                                                sx={{ width: { xs: '100%', md: 'auto' }, mt: { xs: 2, md: 5 } }} 
                                                label="Tambah Image" 
                                                onClick={() => {
                                                    setPictures(currentAnswers => [
                                                        ...currentAnswers, 
                                                        { 
                                                            image_file: '',
                                                            image_preview: ''
                                                        }
                                                    ])
                                                }}
                                            />
                                        </Grid>
                                        

                                    </Grid>
                                </Grid>
                                <Grid Grid item md={12} xs={12}>
                                    <Typography>Evidences</Typography>
                                    <Grid container>
                                        {evidences.map((v, i) => {
                                            return (
                                                <Grid key={i} item xs={6} md={4}>
                                                    <Stack spacing={2} alignItems="center">
                                                        <Box component="label" sx={{ mt: { xs: 2 } }} htmlFor={`ev-${i}`}>
                                                            {v.file == "" ? 
                                                            <DescriptionOutlined sx={{ fontSize: '100px' }} />
                                                            :
                                                            <Typography sx={{ height: '100px' }}>{v.file.name}</Typography>
                                                            }
                                                        </Box>
                                                        <input 
                                                            type="file" 
                                                            style={{ display: 'none' }} 
                                                            id={`ev-${i}`}
                                                            onChange={e => {
                                                                let file = e.target.files[0]
                                                                setEvidences(currentAnswers => 
                                                                    produce(currentAnswers, v => {
                                                                        v[i] = {
                                                                            file
                                                                        }
                                                                    })
                                                                );
                                                            }} 
                                                        />
                                                        {evidences.length > 1 &&
                                                            <Chip
                                                                color="error" 
                                                                label="delete" 
                                                                onClick={() => {
                                                                    setEvidences(currentAnswers => currentAnswers.filter((v, x) => x !== i))
                                                                }} 
                                                            />
                                                        }
                                                    </Stack>
                                                    
                                                </Grid>
                                            )
                                        })}
                                        <Grid item md={12} xs={12}>
                                            <Chip
                                                color="primary"
                                                sx={{ width: { xs: '100%', md: 'auto' }, mt: { xs: 2, md: 5 } }} 
                                                label="Tambah Document" 
                                                onClick={() => {
                                                    setEvidences(currentAnswers => [
                                                        ...currentAnswers, 
                                                        { 
                                                            file: '',
                                                        }
                                                    ])
                                                }}
                                            />
                                        </Grid>
                                        

                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                
                {/* Button */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <LoadingButton sx={{ display: 'flex', mt: 2, borderRadius: 25, mx: 'auto', width: '50%'  }} type="submit" loading={loading} variant="contained">
                                {props.title !== 'add' ? "Save" : "Create" }
                            </LoadingButton>
                        </CardContent>
                    </Card>

                </Grid>

                </>
                }
                {!isComplete && 
                <Grid item xs={12} md={12}>
                    <Loading />
                </Grid>
                }

            {/* close Grid Container */}
            </Grid>

        </Box>
    );
};

export default Form;