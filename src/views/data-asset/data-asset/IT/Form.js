import React from 'react';
import { Grid, Card, CardContent, CardHeader, Typography, TextField, MenuItem, Box, Stack, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
const Form = () => {
    return (
        <Box component="form">
            <Grid container spacing={4}>
                
                {/* Asset Information */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Asset Information</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid item md={4} xs={12}>
                                    <TextField 
                                        name="asset_code"
                                        fullWidth
                                        label="Asset Code"
                                        
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField 
                                        name="asset_category"
                                        fullWidth
                                        label="Category Code"
                                        select
                                    >
                                        <MenuItem>Test</MenuItem>
                                        <MenuItem>Test</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField 
                                        name="asset_name"
                                        fullWidth
                                        label="Asset Name"
                                        select
                                    >
                                        <MenuItem>Test</MenuItem>
                                        <MenuItem>Test</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField 
                                        name="spesification"
                                        fullWidth
                                        label="Spesification"
                                        
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <MobileDatePicker
                                        label="Capitalized On"
                                        inputFormat="MM/dd/yyyy"
                                        renderInput={(params) => <TextField type="date" fullWidth {...params} />}
                                    />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField 
                                        name="sap"
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
                                        name="employ_name"
                                        fullWidth
                                        label="Employ Name / PIC"
                                        select
                                    >
                                        <MenuItem>Test</MenuItem>
                                        <MenuItem>Test</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        name="department"
                                        fullWidth
                                        label="Department Using"
                                        select
                                    >
                                        <MenuItem>Test</MenuItem>
                                        <MenuItem>Test</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        name="asset_location"
                                        fullWidth
                                        label="Asset Location"
                                        select
                                    >
                                        <MenuItem>Test</MenuItem>
                                        <MenuItem>Test</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        name="asset_condition"
                                        fullWidth
                                        label="Asset Condition"
                                        select
                                    >
                                        <MenuItem>Test</MenuItem>
                                        <MenuItem>Test</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <TextField 
                                        name="coordinate"
                                        fullWidth
                                        label="Asset Coordinate Longitude & Latitude"
                                        
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
                                        name="cost_center"
                                        fullWidth
                                        label="Cost Center Name"
                                        select
                                    >
                                        <MenuItem>Test</MenuItem>
                                        <MenuItem>Test</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        name="acquisition"
                                        fullWidth
                                        label="Acquisition Value"
                                        
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField 
                                        name="useful_life"
                                        fullWidth
                                        label="Useful Life (Month)"
                                        select
                                    >
                                        <MenuItem>Test</MenuItem>
                                        <MenuItem>Test</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField 
                                        name="depreciation"
                                        fullWidth
                                        label="Depreciation Value"
                                        
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField 
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
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                           
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
                                        name="vendor_name"
                                        fullWidth
                                        label="Vendor Name"
                                        select
                                    >
                                        <MenuItem>Test</MenuItem>
                                        <MenuItem>Test</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        name="vendor_address"
                                        fullWidth
                                        label="Vendor Address"
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
                                        name="pic_contact"
                                        fullWidth
                                        label="PIC Contact"
                                        disabled
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField 
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
                                        name="device"
                                        fullWidth
                                        label="Device"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        name="type"
                                        fullWidth
                                        label="Type"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        name="brand"
                                        fullWidth
                                        label="Brand"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        name="monitor_inch"
                                        fullWidth
                                        label="Monitor Inch"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        name="model_brand"
                                        fullWidth
                                        label="Model Brand"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        name="mac_address"
                                        fullWidth
                                        label="Mac Address"
                                    />
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <MobileDatePicker
                                            label="warranty_expiry"
                                            inputFormat="MM/dd/yyyy"
                                            renderInput={(params) => <TextField type="date" fullWidth {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField 
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
                                        name="dlp"
                                        fullWidth
                                        label="DLP"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        name="soc"
                                        fullWidth
                                        label="SOC"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        name="sn_nb_pc"
                                        fullWidth
                                        label="SN NB & PC"
                                    />
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField 
                                        name="processor"
                                        fullWidth
                                        label="Processor"
                                    />
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField 
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
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        name="os"
                                        fullWidth
                                        label="OS"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        name="sn_windows"
                                        fullWidth
                                        label="SB Windows"
                                    />
                                </Grid>
                                <Grid Grid item md={4} xs={12}>
                                    <TextField 
                                        name="ms_office"
                                        fullWidth
                                        label="MS Office"
                                    />
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField 
                                        name="sn_office"
                                        fullWidth
                                        label="SN Office"
                                    />
                                </Grid>
                                <Grid Grid item md={6} xs={12}>
                                    <TextField 
                                        name="antivirus"
                                        fullWidth
                                        label="Antivirus"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Information Support */}
                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Typography>Software</Typography>
                            <Grid container mt={2} spacing={2}>
                                <Grid Grid item md={12} xs={12}>
                                    <TextField 
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
                                        <Grid item xs={4} md={2}>
                                            <img src={"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=80"} alt  />
                                        </Grid>
                                        <Grid item xs={4} md={2}>
                                            <img src={"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=80"} alt  />
                                        </Grid>
                                        <Grid item xs={4} md={2}>
                                            <img src={"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=80"} alt  />
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid Grid item md={12} xs={12}>
                                    <Typography>Document</Typography>
                                    <Grid container>
                                        <Grid item xs={4} md={2}>
                                            <img src={"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=80"} alt  />
                                        </Grid>
                                        <Grid item xs={4} md={2}>
                                            <img src={"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=80"} alt  />
                                        </Grid>
                                        <Grid item xs={4} md={2}>
                                            <img src={"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=80"} alt  />
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

            {/* close Grid Container */}
            </Grid>

        </Box>
    );
};

export default Form;