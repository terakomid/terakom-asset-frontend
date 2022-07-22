import { AddPhotoAlternate, CalendarMonth, Photo, PictureAsPdf } from '@mui/icons-material';
import { FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, TextareaAutosize } from '@mui/material';
import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';


class AssetIT extends Component {

    render() {

        return (
            <div className='main-content'>
                <div className="page-content">
                    <div className="container-fluid">

                        <div className='row'>

                            <div className='card'>
                                <div className='card-body p-3'>
                                    <div className='row'>

                                        {/* Title */}
                                        <div className='col-xl-8 col-12 mb-3'>
                                            <h2 className="fw-bold">Data Asset IT</h2>
                                        </div>
                                        <div className='row'>

                                            <ValidatorForm
                                                ref={this.form}
                                                onSubmit={this.handleSubmit}
                                            >
                                                {/* asset information */}
                                                <div className='col-xl-12 col-12'>
                                                    <div className='card shadow-sm border-1 p-5'>
                                                        <label className="fs-4 fw-bold">Asset Information</label>

                                                        <div className='row mt-3'>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Asset Code'
                                                                    name='code'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Category Asset'
                                                                    name='category'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Asset Name'
                                                                    name='name'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Specification'
                                                                    name='spesification'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Capitalize On'
                                                                    InputLabelProps={{ shrink: true }}
                                                                    name='capitalize_on'
                                                                    type='date'
                                                                    InputProps={{
                                                                      endAdornment: (
                                                                        <InputAdornment position="end">
                                                                          <CalendarMonth />
                                                                        </InputAdornment>
                                                                      )
                                                                    }}
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='SAP Code'
                                                                    name='sap_code'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* asset holder */}
                                                <div className='col-xl-12 col-12'>
                                                    <div className='card shadow-sm border-1 p-5'>
                                                        <label className="fs-4 fw-bold">Asset Holder</label>

                                                        <div className='row mt-3'>
                                                            <div className='col-xl-6 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Employe Name / PIC'
                                                                    name='employe'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-6 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Department Using'
                                                                    name='department'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-6 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Asset Condition'
                                                                    name='condition'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-6 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Specification'
                                                                    name='spesification'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-12 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Asset Condition Langiture & Latitude'
                                                                    name='langitude_latitude'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* depreciation asset */}
                                                <div className='col-xl-12 col-12'>
                                                    <div className='card shadow-sm border-1 p-5'>
                                                        <label className="fs-4 fw-bold">Depreciation Asset</label>

                                                        <div className='row mt-3'>
                                                            <div className='col-xl-6 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Cost Center Name'
                                                                    name='cost_center'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-6 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Acquisition Value'
                                                                    name='acquisition'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Useful Life (Month)'
                                                                    name='useful_life'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Depreciation Value'
                                                                    name='depreciation'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Value Book'
                                                                    name='value_book'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-6 col-12 pt-3'>

                                                                <FormControl>
                                                                    <FormLabel id="calculate_asset_deprecation">Calculate Asset Deprecation</FormLabel>

                                                                    <RadioGroup
                                                                        row
                                                                        aria-labelledby="calculate_asset_deprecation"
                                                                        name="calculate_asset" defaultValue="1"
                                                                    >
                                                                        <FormControlLabel value="1" control={<Radio />} className='me-3' label="Yes" />
                                                                        <FormControlLabel value="0" control={<Radio />} label="No" />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* vendor information */}
                                                <div className='col-xl-12 col-12'>
                                                    <div className='card shadow-sm border-1 p-5'>
                                                        <label className="fs-4 fw-bold">Vendor Information</label>

                                                        <div className='row mt-3'>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Vendor Name'
                                                                    name='vendor_name'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Vendor Address'
                                                                    name='vendor_address'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Vendor Contact'
                                                                    name='vendor_contact'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* device Information */}
                                                <div className='col-xl-12 col-12'>
                                                    <div className='card shadow-sm border-1 p-5'>
                                                        <label className="fs-4 fw-bold">Device Information</label>

                                                        <div className='row mt-3'>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Device'
                                                                    name='device_name'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Type'
                                                                    name='device_type'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Brand'
                                                                    name='device_brand'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Monitor (Inch)'
                                                                    name='device_monitor'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Model Brand'
                                                                    name='device_model_brand'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Mac Address'
                                                                    name='device_mac_address'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    InputLabelProps={{
                                                                        shrink: true
                                                                    }}
                                                                    label='Warranty Expiry Date'
                                                                    name='device_expire_date'
                                                                    type='date'
                                                                    InputProps={{
                                                                      endAdornment: (
                                                                        <InputAdornment position="end">
                                                                          <CalendarMonth />
                                                                        </InputAdornment>
                                                                      )
                                                                    }}
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Computer Name'
                                                                    name='device_computer_name'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* hardware */}
                                                <div className='col-xl-12 col-12'>
                                                    <div className='card shadow-sm border-1 p-5'>
                                                        <label className="fs-4 fw-bold">Hardware</label>

                                                        <div className='row mt-3'>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='DLP'
                                                                    name='dlp'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='SOC'
                                                                    name='soc'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='SN NB & PC'
                                                                    name='sn_nb_pc'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-6 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Processor'
                                                                    name='processor'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-6 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Hardware'
                                                                    name='hardware'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* software */}
                                                <div className='col-xl-12 col-12'>
                                                    <div className='card shadow-sm border-1 p-5'>
                                                        <label className="fs-4 fw-bold">Software</label>

                                                        <div className='row mt-3'>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Window OS'
                                                                    name='windows_os'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='SN Windows'
                                                                    name='sn_windows'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-4 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='MS Office'
                                                                    name='ms_office'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-6 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='SN Office'
                                                                    name='sn_office'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                            <div className='col-xl-6 col-12 pt-3'>
                                                                <TextValidator
                                                                    size='normal'
                                                                    autoComplete='off'
                                                                    sx={{ width: '100%' }}
                                                                    id='outlined-basic'
                                                                    label='Antivirus'
                                                                    name='antivirus'
                                                                    validators={['required']}
                                                                    variant='outlined'
                                                                    errorMessages={['This Field is Required']}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                {/* support */}
                                                <div className='col-xl-12 col-12'>
                                                    <div className='card shadow-sm border-1 p-5'>
                                                        <label className="fs-4 fw-bold">Information Support</label>

                                                        <div className='row mt-3'>
                                                            <div className='col-xl-12 col-12 pt-3'>
                                                                <FormLabel>Notes:</FormLabel>
                                                                <TextareaAutosize
                                                                    className='form-control'
                                                                    placeholder="Note"
                                                                    minRows={5}
                                                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                                                />
                                                            </div>
                                                            <div className='col-xl-12 col-12 pt-3'>
                                                                <FormLabel>Picture:</FormLabel>
                                                                {/* thumbnail */}

                                                                <div className='d-flex justify-content-start'>
                                                                    <div className='img-fluid card shadow-none border-1 text-center mx-2' style={{ width: '150px', cursor: 'pointer' }}>
                                                                        <FormLabel className='fw-bold p-3'><Photo className='fs-7em ' />Thumbnail 1</FormLabel>
                                                                    </div>
                                                                    <div className='img-fluid card shadow-none border-1 text-center mx-2' style={{ width: '150px', cursor: 'pointer' }}>
                                                                        <FormLabel className='fw-bold p-3'><Photo className='fs-7em ' />Thumbnail 2</FormLabel>
                                                                    </div>

                                                                    <div className='img-fluid card shadow-none border-1 text-center mx-2' style={{ width: '150px', cursor: 'pointer' }}>
                                                                        <FormLabel htmlFor='picture' className='fw-bold p-3'><AddPhotoAlternate className='fs-7em ' />Upload Image</FormLabel>
                                                                        <input id='picture' name='picture' type='file' style={{ display: 'none' }}></input>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-xl-12 col-12 pt-3'>
                                                                <FormLabel>Evidance:</FormLabel>
                                                                {/* thumbnail */}

                                                                <div className='d-flex justify-content-start'>
                                                                    <div className='img-fluid card shadow-none border-1 text-center mx-2' style={{ width: '150px', cursor: 'pointer' }}>
                                                                        <FormLabel className='fw-bold p-3'><PictureAsPdf className='fs-7em ' />File 1</FormLabel>
                                                                    </div>
                                                                    <div className='img-fluid card shadow-none border-1 text-center mx-2' style={{ width: '150px', cursor: 'pointer' }}>
                                                                        <FormLabel className='fw-bold p-3'><PictureAsPdf className='fs-7em ' />File 2</FormLabel>
                                                                    </div>

                                                                    <div className='img-fluid card shadow-none border-1 text-center mx-2' style={{ width: '150px', cursor: 'pointer' }}>
                                                                        <FormLabel htmlFor='evidance' className='fw-bold p-3'><AddPhotoAlternate className='fs-7em ' />Upload File</FormLabel>
                                                                        <input id='evidance' name='evidance' type='file' style={{ display: 'none' }}></input>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ValidatorForm>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

export default AssetIT