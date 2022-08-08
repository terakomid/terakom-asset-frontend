import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, TextField, MenuItem, Box, Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Chip, Button, Divider } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import http from '../../../component/api/Api'
import { useNavigate } from 'react-router-dom'
import Loading from '../../../component/Loading'
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment'
import { produce } from "immer";
import {  AssignmentLateOutlined, AssignmentTurnedInOutlined, DescriptionOutlined, DownloadForOffline, DownloadForOfflineOutlined, InsertPhotoOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import QRCode from 'react-qr-code';

const DetailComponent = (props) => {
    return (
        <Grid item xs={12} md={12} alignItems="center" justifyContent="center" display="flex" flexDirection={'column'}>
            <Stack direction={"row"} spacing={3}>
                <img alt="label" style={{ height: '150px' }} src={props.data.picture[0].file}/>
                <Box sx={{ border: 1,  height: '200px', display: 'flex', alignItems: "center" }}>
                    <Box sx={{ border: 1 }}>
                        <Stack direction={"row"} justifyContent="center" >
                            <div style={{  background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100px' }}>
                                <QRCode
                                    size={256}
                                    value={props.data.asset_code}
                                    style={{ height: '80px', width: '80px' }}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                            <Stack border={1} alignItems="stretch">
                                <Typography sx={{ fontWeight: 'bold', color: 'black', p: 2, textAlign: 'center' }}>PT. Haier Sales Indonesia</Typography>
                                <Stack 
                                    divider={
                                        <Divider 
                                            orientation="vertical" 
                                            flexItem
                                            light 
                                        />
                                    } 
                                    direction={"row"} 
                                    spacing={2} 
                                    border={1}
                                >
                                    <Typography sx={{ borderRight: 1, px: 2 }}>{`${props.data.capitalized.split('-')[0]}`}</Typography>
                                    <Typography sx={{ borderRight: 1, pr: 2 }}>{`${props.data.asset_code}`}</Typography>
                                    <Typography sx={{ borderRight: 1, pr: 2 }}>{`ID${props.data.id}`}</Typography>
                                    <Typography sx={{ borderRight: 1, pr: 2 }}>{`${props.data.sap_code}`}</Typography>
                                </Stack>
                                <Typography sx={{ fontWeight: 'bold', color: 'black', p: 2, textAlign: 'center' }}>
                                    {`${props.data.asset_name} - ${props.data.employee.name} - ${props.data.department.dept}`}
                                </Typography>
                            </Stack>
                            
                        </Stack>
                    </Box>
                </Box>
            </Stack>
            <Button sx={{ mt: 2 }} variant="contained">Print Label</Button>    
        </Grid>
    )
}

const Form = (props) => {
    const [id, setId] = useState('')

    //form 
    const [form, setForm] = useState({
        // asset information
        asset_code: "",
        category_id: "",
        sub_category_id: "",
        asset_name: "",
        specification: "",
        capitalized: null,
        sap_code: "",

        // asset holder
        employee_id: "",
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

        // information support
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
    const [useful, setUseFul] = useState('')
    const [mainPicture, setMainPicture] = useState({})

    //picture and evidence
    const [pictures, setPictures] = useState([
        {
            id: '',
            image_file: '',
            image_preview: ''
        }
    ])
    const [evidences, setEvidences] = useState([
        {
            id: '',
            file: '',
            file_url: '',
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
        }else if(e.target.name === 'employee_id'){
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
        }else if(e.target.name === 'sub_category_id'){
            const sub_category = subCategories.find(v => v.id == e.target.value)
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
            setUseFul(sub_category.useful_life)
        }else{
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }

    //Automatic value for edit
    const setAutomatic = (data) => {
        setId(data.id)
        setDepartment(data.department.dept)
        setUseFul(data.sub_category.useful_life)
        setVendor({
            vendor_address: data.vendor.address,
            contact: data.vendor.contact,
            pic_contact: data.vendor.pic_contact,
        })
    }

    //set image and evidence 
    const setPictureFromApi = (data) => {
        let temp = []
        data.picture.map((v, i) => {
            temp.push({
                id: v.id,
                image_preview: v.file,
                image_file: ''
            })
        })
        // console.log(temp)
        setPictures([...temp])
        let main = data.picture.find(v => v.main === 1)
        setMainPicture(main)
    }

    const setEvidenceFromApi = (data) => {
        let temp = []
        data.evidence.map((v, i) => {
            temp.push({
                id: v.id,
                file: '',
                file_url: v.file
            })
        })
        // console.log(temp)
        setEvidences([...temp])
    }

    const store = async (formData) => {
        try{
            const res = await http.post('asset', formData)
            // console.log(res.data.data)
            setLoading(false)    
            navigate('/data-asset')      
        }catch(err) {
            console.log(err.response)
        }
    }

    const edit = async (formData, id) => {
        try{
            const res = await http.post(`asset/${id}`, formData)
            // console.log(res.data.data) 
            setLoading(false)   
            navigate('/data-asset')      
        }catch(err) {
            console.log(err.response)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        let url = ""
        const formData = new FormData();

        //asset Information
        formData.append('asset_code', form.asset_code)
        formData.append('category_id', form.category_id)
        formData.append('sub_category_id', form.sub_category_id)
        formData.append('asset_name', form.asset_name)
        formData.append('specification', form.specification)
        formData.append('capitalized', moment(form.capitalized).format('yyyy/MM/DD'))
        formData.append('sap_code', form.sap_code)
        

        //asset holder
        formData.append('employee_id', form.employee_id)
        formData.append('department_id', form.department_id)
        formData.append('location_id', form.location_id)
        formData.append('condition_id', form.condition_id)
        formData.append('latitude', form.latitude)
        formData.append('longitude', form.longitude)

        //depreciation asset
        formData.append('cost_id', form.cost_id)
        formData.append('acquisition_value', form.acquisition_value)
        formData.append('depreciation_value', form.depreciation_value)
        formData.append('value_book', form.value_book)
        formData.append('depreciation', form.depreciation)

        //Vendor information
        formData.append('vendor_id', form.vendor_id)
        formData.append('notes', form.notes)

        if(props.title === 'add') {
            pictures.map((v, i) => {
                if(i === 0){
                    formData.append(`picture[${i}][file]`, v.image_file)
                    formData.append(`picture[${i}][main]`, 1)
                }else{
                    formData.append(`picture[${i}][file]`, v.image_file)
                    formData.append(`picture[${i}][main]`, 1)
                }
            })
            evidences.map((v, i) => {
                if(i === 0){
                    formData.append(`evidence[${i}][file]`, v.file)
                }else{
                    formData.append(`evidence[${i}][file]`, v.file)
                }
            })
        }else{
            pictures.map((v, i) => {
                if(i === 0){
                    if(v.image_file === ''){
                        formData.append(`picture[${i}][id]`, v.id)
                    }else{
                        formData.append(`picture[${i}][file]`, v.image_file)
                    }
                    formData.append(`picture[${i}][main]`, 1)
                }else{
                    if(v.image_file === ''){
                        formData.append(`picture[${i}][id]`, v.id)
                    }else{
                        formData.append(`picture[${i}][file]`, v.image_file)
                    }
                    formData.append(`picture[${i}][main]`, 0)
                }
            })
            evidences.map((v, i) => {
                if(v.file === ""){
                    formData.append(`evidence[${i}][id]`, v.id)
                }else{
                    formData.append(`evidence[${i}][file]`, v.file)
                }
            })
        }

        

        if(props.type === 'it'){
            formData.append("asset_type", "it")
            //Device information
            formData.append('device_id', form.device_id)
            formData.append('type', form.type)
            formData.append('brand_id', form.brand_id)
            formData.append('monitor_inch', form.monitor_inch)
            formData.append('model_brand', form.model_brand)
            formData.append('mac_address', form.mac_address)
            formData.append('warranty', moment(form.warranty).format('yyyy/MM/DD'))
            formData.append('computer_name', form.computer_name)

            //Hardware
            formData.append('dlp', form.dlp)
            formData.append('soc', form.soc)
            formData.append('snnbpc', form.snnbpc)
            formData.append('processor_id', form.processor_id)
            formData.append('hardware', form.hardware)

            //Sofware
            formData.append('os_id', form.os_id)
            formData.append('sn_windows', form.sn_windows)
            formData.append('office_id', form.office_id)
            formData.append('antivirus_id', form.antivirus_id)
            if(props.title === 'add'){
                store(formData)
            }else{
                formData.append('_method', 'PUT')
                edit(formData, id)
                // console.log(Object.fromEntries(formData))
            }
        }else{
            formData.append("asset_type", "non-it")
            if(props.title === 'add'){
                store(formData)
            }else{
                formData.append('_method', 'PUT')
                edit(formData, id)
                console.log(Object.fromEntries(formData))
            }
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
                if(props.data){
                    const data = props.data
                    //otomatic value
                    setAutomatic(data)
                    setPictureFromApi(data)
                    setEvidenceFromApi(data)
                    getSubCategory(data.category.id).then(res => {
                        if(props.type === "it"){
                            setForm({
                                ...form,
    
                                // asset information
                                asset_code: data.asset_code,
                                category_id: data.category.id,
                                sub_category_id: data.sub_category.id,
                                asset_name: data.asset_name,
                                specification: data.specification,
                                capitalized: moment(data.capitalized).format('yyyy/MM/DD'),
                                sap_code: data.sap_code,
    
                                // asset holder
                                employee_id: data.employee.id,
                                department_id: data.department.id,
                                location_id: data.location.id,
                                condition_id: data.condition.id,
                                latitude: data.latitude,
                                longitude: data.longitude,
    
                                // depreciation asset
                                cost_id: data.cost.id,
                                acquisition_value: data.acquisition_value,
                                depreciation_value: data.depreciation_value,
                                value_book: data.value_book,
                                depreciation: data.depreciation,
    
                                // Vendor information
                                vendor_id: data.vendor.id,
    
                                // Device information
                                device_id: data.device.id,
                                type: data.type,
                                brand_id: data.brand.id,
                                monitor_inch: data.monitor_inch,
                                model_brand: data.model_brand,
                                mac_address: data.mac_address,
                                warranty: moment(data.warranty).format('yyyy/MM/DD'),
                                computer_name: data.computer_name,
    
                                // Hardware
                                dlp: data.dlp,
                                soc: data.soc,
                                snnbpc: data.snnbpc,
                                processor_id: data.processor.id,
                                hardware: data.hardware,
    
                                //Sofware
                                os_id: data.os.id,
                                sn_windows: data.sn_windows,
                                office_id: data.office.id,
                                antivirus_id: data.antivirus.id,

                                // information support
                                notes: data.notes,
                            })
                        }else{
                            setForm({
                                ...form,
    
                                // asset information
                                asset_code: data.asset_code,
                                category_id: data.category.id,
                                sub_category_id: data.sub_category.id,
                                asset_name: data.asset_name,
                                specification: data.specification,
                                capitalized: moment(data.capitalized).format('yyyy/MM/DD'),
                                sap_code: data.sap_code,
    
                                // asset holder
                                employee_id: data.employee.id,
                                department_id: data.department.id,
                                location_id: data.location.id,
                                condition_id: data.condition.id,
                                latitude: data.latitude,
                                longitude: data.longitude,
    
                                // depreciation asset
                                cost_id: data.cost.id,
                                acquisition_value: data.acquisition_value,
                                depreciation_value: data.depreciation_value,
                                value_book: data.value_book,
                                depreciation: data.depreciation,
    
                                // Vendor information
                                vendor_id: data.vendor.id,

                                // information support
                                notes: data.notes,

                            })

                        }
                            setIsComplete(true)

                    })

                }else{
                    setIsComplete(true)

                }
            })
        }

        return () => mounted = false
    }, [props])
    return (
        <Box component="form" onSubmit={onSubmit}>
            <Grid container spacing={4}>
                {isComplete &&
                <>
                {/* Print Label*/}
                {props.detail && 
                    <DetailComponent data={props.data} />
                }
                {/* Asset Information */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Asset Information</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        disabled={props.detail}
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
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        fullWidth
                                        label="Category Code"
                                        select
                                    >
                                        {assetCategories.length > 0 && assetCategories.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{`${v.code} - ${v.category}`}</MenuItem>
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
                                        disabled={props.detail}
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
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        value={form.asset_name} 
                                        name="asset_name"
                                        fullWidth
                                        label="Asset Name"
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        value={form.specification}
                                        name="specification"
                                        fullWidth
                                        label="specification"
                                        
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        value={useful}
                                        name="useful"
                                        fullWidth
                                        label="Useful Life"
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={form.capitalized}
                                        name="capitalize"
                                        label="Capitalized On"
                                        inputFormat="yyyy/MM/dd"
                                        mask='____/__/__'
                                        disabled={props.detail}
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
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        disabled={props.detail}
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
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        value={form.employee_id}
                                        name="employee_id"
                                        fullWidth
                                        label="Employ Name / PIC"
                                        select
                                    >
                                        {employees.length > 0 && employees.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{`${v.code} - ${v.name}`}</MenuItem>
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
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        value={form.location_id}
                                        label="Asset Location"
                                        select
                                    >
                                        {assetLocations.length > 0 && assetLocations.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{`${v.code} - ${v.location}`}</MenuItem>
                                        ))}
                                        {assetLocations.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        disabled={props.detail}
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
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        name="latitude"
                                        fullWidth
                                        label="Asset Coordinate Latitude"
                                        
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        value={form.longitude}
                                        disabled={props.detail}
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
                                        disabled={props.detail}
                                        onChange={handleChange} 
                                        name="cost_id"
                                        fullWidth
                                        label="Cost Center Name"
                                        select
                                    >
                                        {assetCost.length > 0 && assetCost.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{`${v.code} - ${v.name}`}</MenuItem>
                                        ))}
                                        {assetCost.length == 0 && 
                                            <MenuItem disabled>Kosong</MenuItem>
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={form.acquisition_value}
                                        disabled={props.detail}
                                        onChange={handleChange}  
                                        name="acquisition_value"
                                        fullWidth
                                        label="Acquisition Value"
                                        
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={form.depreciation_value}
                                        disabled={props.detail}
                                        onChange={handleChange}   
                                        name="depreciation_value"
                                        fullWidth
                                        label="Depreciation Value"
                                        
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={form.value_book}
                                        disabled={props.detail}
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
                                            disabled={props.detail}
                                            onChange={handleChange}
                                            
                                        >
                                            <FormControlLabel disabled={props.detail} value={"1"} control={<Radio />} label="Yes" />
                                            <FormControlLabel disabled={props.detail} value={"0"} control={<Radio />} label="No" />
                                           
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
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        value={form.vendor_id}
                                        name="vendor_id"
                                        fullWidth
                                        label="Vendor Name"
                                        select
                                    >
                                        {assetVendor.length > 0 && assetVendor.map(v => (
                                            <MenuItem key={v.id} value={v.id}>{`${v.code} - ${v.name}`}</MenuItem>
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
                
                {props.type === "it" && 
                <>
                {/* Device Information */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Device Information</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        disabled={props.detail}
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
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        value={form.type} 
                                        name="type"
                                        fullWidth
                                        label="Type"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        disabled={props.detail}
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
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        value={form.monitor_inch} 
                                        name="monitor_inch"
                                        fullWidth
                                        label="Monitor Inch"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        value={form.model_brand}  
                                        name="model_brand"
                                        fullWidth
                                        label="Model Brand"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField
                                        disabled={props.detail}
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
                                            disabled={props.detail}
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
                                        disabled={props.detail}
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
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        value={form.dlp}
                                        name="dlp"
                                        fullWidth
                                        label="DLP"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        value={form.soc} 
                                        name="soc"
                                        fullWidth
                                        label="SOC"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        value={form.snnbpc} 
                                        name="snnbpc"
                                        fullWidth
                                        label="SN NB & PC"
                                    />
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField 
                                        disabled={props.detail}
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
                                        disabled={props.detail}
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
                                        disabled={props.detail} 
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
                                        disabled={props.detail}
                                        onChange={handleChange}
                                        value={form.sn_windows} 
                                        name="sn_windows"
                                        fullWidth
                                        label="SN Windows"
                                    />
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField 
                                        disabled={props.detail}
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
                                        disabled={props.detail}
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
                </>
                }

                {/* Information Support */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Information Support</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid Grid item md={12} xs={12}>
                                    <TextField
                                        disabled={props.detail}
                                        onChange={handleChange} 
                                        value={form.notes}
                                        name="notes"
                                        fullWidth
                                        label="Notes"
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
                                                        <Box component="label" sx={{ mt: { xs: 2 }, cursor: 'pointer' }} htmlFor={`img-${i}`}>
                                                            {v.image_preview == "" ? 
                                                            <InsertPhotoOutlined sx={{ fontSize: '100px' }} />
                                                            :
                                                            <img style={{ height: '100px' }} src={v.image_preview} alt="test"  />
                                                            }
                                                        </Box>
                                                        <input
                                                            disabled={props.detail} 
                                                            type="file" 
                                                            style={{ display: 'none' }} 
                                                            id={`img-${i}`}
                                                            onChange={e => {
                                                                let image_file = e.target.files[0]
                                                                let image_preview = URL.createObjectURL(e.target.files[0])
                                                                setPictures(currentAnswers => 
                                                                    produce(currentAnswers, v => {
                                                                        v[i] = {
                                                                            id: '',
                                                                            image_file,
                                                                            image_preview
                                                                        }
                                                                    })
                                                                );
                                                            }} 
                                                        />
                                                        {pictures.length > 1 &&
                                                            <Chip
                                                                disabled={props.detail}
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
                                                disabled={props.detail}
                                                color="primary"
                                                sx={{ width: { xs: '100%', md: 'auto' }, mt: { xs: 2, md: 5 } }} 
                                                label="Tambah Image" 
                                                onClick={() => {
                                                    setPictures(currentAnswers => [
                                                        ...currentAnswers, 
                                                        { 
                                                            id: '',
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
                                                        <Box component="label" sx={{ mt: { xs: 2 }, cursor: 'pointer' }} htmlFor={`ev-${i}`}>
                                                            {v.file_url == "" ? 
                                                            <DescriptionOutlined sx={{ fontSize: '100px' }} />
                                                            :
                                                            <AssignmentTurnedInOutlined sx={{ fontSize: '100px' }} />
                                                            }
                                                        </Box>
                                                        <input 
                                                            type="file"
                                                            disabled={props.detail} 
                                                            style={{ display: 'none' }} 
                                                            id={`ev-${i}`}
                                                            onChange={e => {
                                                                let file = e.target.files[0]
                                                                let file_url = URL.createObjectURL(e.target.files[0])
                                                                setEvidences(currentAnswers => 
                                                                    produce(currentAnswers, v => {
                                                                        v[i] = {
                                                                            id: '',
                                                                            file,
                                                                            file_url
                                                                        }
                                                                    })
                                                                );
                                                            }} 
                                                        />
                                                        <Stack direction="row" justifyContent={'center'} alignContent="center">
                                                            <a target="_blank" href={v.file_url} style={{ cursor: 'pointer' }}>
                                                                <DownloadForOfflineOutlined  sx={{ fontSize: '10x', marginTop: '3px', marginRight: '3px' }} />
                                                            </a>
                                                                
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
                                                    </Stack>
                                                    
                                                </Grid>
                                            )
                                        })}
                                        <Grid item md={12} xs={12}>
                                            <Chip
                                                disabled={props.detail}
                                                color="primary"
                                                sx={{ width: { xs: '100%', md: 'auto' }, mt: { xs: 2, md: 5 } }} 
                                                label="Tambah Document" 
                                                onClick={() => {
                                                    setEvidences(currentAnswers => [
                                                        ...currentAnswers, 
                                                        { 
                                                            id: '',
                                                            file: '',
                                                            file_url: '',
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
                {!props.detail && 
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <LoadingButton sx={{ display: 'flex', mt: 2, borderRadius: 25, mx: 'auto', width: '50%'  }} type="submit" loading={loading} variant="contained">
                                {props.title !== 'add' ? "Save" : "Create" }
                            </LoadingButton>
                        </CardContent>
                    </Card>

                </Grid>
                }

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