import { Autocomplete, TextareaAutosize } from '@mui/material';
import React, { Component } from 'react';

import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { Button, FormLabel } from 'react-bootstrap';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

class Add extends Component {

  render() {

    /**
     * ==========================================================
     * Form Button
     * ==========================================================
     */

    const ButtonCreate = () => (
      <div id='create'>
        <Button
          id="btnCreate"
          className='text-capitalize float-end bg-primary text-white'
          variant="contained"
          type='submit'
        >add asset</Button>
      </div>
    )
    const ButtonSave = () => (
      <div id='save px-3'>
        <Button
          id="btnSave"
          className='text-capitalize float-end bg-primary text-white'
          variant="contained"
          type='submit'
        >save</Button>
      </div>
    )
    const ButtonCancel = () => (
      <div id='cancel px-3'>
        <Link
          id="btnCancel"
          className='text-capitalize float-end btn btn-secondary'
          variant="contained"
          to='/maintenance-asset'
        >Cancel</Link>
      </div>
    )

    const editLink = (param) => {

      return (
        <div className="form-check text-end text-danger me-3">
          <label className="form-check-label fs-5">
            <i className='bi bi-trash-fill mx-2'></i>
          </label>
        </div>
      )
    }


    const rows = [
      { id: 1, code: '2020/FA/65d1/ID08/2000001031', name: 'Notebook', duration_use: '3 year 4 month 13 Day', reason: 'Service Hardwere' },
      { id: 2, code: '2020/FA/65d1/ID08/2000001032', name: 'Notebook', duration_use: '3 year 4 month 13 Day', reason: 'Service Hardwere' },
      { id: 3, code: '2020/FA/65d1/ID08/2000001033', name: 'Notebook', duration_use: '3 year 4 month 13 Day', reason: 'Service Hardwere' },
      { id: 4, code: '2020/FA/65d1/ID08/2000001034', name: 'Notebook', duration_use: '3 year 4 month 13 Day', reason: 'Service Hardwere' },
      { id: 5, code: '2020/FA/65d1/ID08/2000001035', name: 'Notebook', duration_use: '3 year 4 month 13 Day', reason: 'Service Hardwere' },
    ];

    const isLoading = false

    const columns = [
      {
        field: 'id',
        headerName: 'No',
        width: 50,
        type: 'number'
      },
      {
        field: 'name',
        headerName: 'Asset Name',
        width: 200,
      },
      {
        field: 'code',
        headerName: 'Asset Code',
        width: 250,
      },
      {
        field: 'duration_use',
        headerName: 'Duration Use',
        width: 200,
      },
      {
        field: 'reason',
        headerName: 'Reason for Repair',
        width: 170,
      },
      {
        field: '',
        headerName: 'Action',
        width: 70,
        renderCell: editLink,
        sortable: false
      }
    ];

    const options = [
      { code: 1, label: 'Dummy 1' },
      { code: 2, label: 'Dummy 2' },
      { code: 3, label: 'Dummy 3' }
    ];

    return (

      <div className='main-content'>
        <div className="page-content">
          <div className="container-fluid">
            <div className='row'>

              <div className='card'>
                <div className='card-body p-3'>
                  <div className='row'>

                    <ValidatorForm
                      onSubmit={this}
                    >
                      <div className='row'>
                        {/* Form */}
                        <h4 className="fw-bold">Create Maintenance Asset</h4>

                        <div className='col-xl-12 col-12 my-3'>
                          <div className='card shadow-sm border-1'>
                            <div className='card-body mx-3'>

                              <div className='row mt-3'>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <Autocomplete
                                    sx={{ width: '100%' }}
                                    name='pic'
                                    options={options}
                                    renderInput={(params) => <TextValidator {...params} label='PIC Asset' />}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    label="Department"
                                    name='department'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-4 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    InputLabelProps={{ shrink: true }}
                                    label="Applicant Date"
                                    name='applicant_date'
                                    type='date'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-4 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    InputLabelProps={{ shrink: true }}
                                    label="Request Date Repair"
                                    name='repair_date'
                                    type='date'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-4 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    InputLabelProps={{ shrink: true }}
                                    label="Request Time to Finish"
                                    name='time_to_finish'
                                    type='date'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                        <div className='col-xl-12 col-12 my-3'>
                          <div className='card shadow-sm border-1'>
                            <div className='card-body mx-3'>

                              <div className='row mt-3'>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    InputLabelProps={{ shrink: true }}
                                    label="Testing Date"
                                    name='testing_date'
                                    type='date'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    InputLabelProps={{ shrink: true }}
                                    label="Testing Finish Date"
                                    name='testing_finish_date'
                                    type='date'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-12 col-12 pt-3'>
                                  <FormLabel>Testing Result:</FormLabel>
                                  <TextareaAutosize
                                    className='form-control'
                                    name='testing_result'
                                    placeholder="Testing Result"
                                    minRows={5}
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                  />
                                </div>
                                <div className='col-xl-4 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    label="Person Testing"
                                    name='person_testing'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-4 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    label="Final Cost"
                                    name='final_cost'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-4 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    InputLabelProps={{ shrink: true }}
                                    label="Returning Date"
                                    name='returning_date'
                                    type='date'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-12 col-12 pt-3'>
                                  <FormLabel>Repair Record:</FormLabel>
                                  <TextareaAutosize
                                    className='form-control'
                                    placeholder="Testing Result"
                                    name='repair_record'
                                    minRows={5}
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                  />
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                        {/* Table */}
                        <div className='col-xl-12 col-12 mt-3'>
                          <div className='card shadow-none border-1' >

                            <div className='card-body'>
                              {/* Table */}

                              <div className='row mt-3'>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <Autocomplete
                                    sx={{ width: '100%' }}
                                    name='asset'
                                    options={options}
                                    renderInput={(params) => <TextValidator {...params} label='Choose Asset' />}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <Autocomplete
                                    sx={{ width: '100%' }}
                                    name='asset_condition'
                                    options={options}
                                    renderInput={(params) => <TextValidator {...params} label='Asset Condition' />}
                                  />
                                </div>
                                <div className='col-xl-12 col-12 pt-3'>
                                  <FormLabel>Reason For Repair:</FormLabel>
                                  <TextareaAutosize
                                    className='form-control'
                                    placeholder="Testing Result"
                                    name='reason_repair'
                                    minRows={5}
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                  />
                                </div>

                                <div className='col-xl-12 col-12 py-3 pb-5 text-end'>
                                  <ButtonCreate />
                                </div>
                              </div>

                              <div>
                                <Box sx={{
                                  height: 450,
                                  width: '100%'
                                }}>
                                  <DataGrid
                                    sx={{
                                      boxShadow: 0,
                                      border: 0,
                                    }}
                                    loading={isLoading}
                                    disableColumnMenu
                                    disableColumnFilter
                                    disableColumnSelector
                                    disableColumnButton
                                    disableDensitySelector
                                    checkboxSelection
                                    columns={columns}
                                    pageSize={5}
                                    rows={rows}
                                    rowsPerPageOptions={[5]}
                                    components={{
                                      LoadingOverlay: LinearProgress,
                                      Toolbar: GridToolbar
                                    }}
                                    componentsProps={{
                                      toolbar: {
                                        quickFilterProps: { debounceMs: 500 },
                                        showQuickFilter: true,
                                      },
                                    }}
                                  />
                                </Box>
                              </div >
                            </div>
                          </div>
                        </div>

                        <div className='col-xl-12 col-12 pt-3 d-flex justify-content-start'>
                          <ButtonSave /><ButtonCancel />
                        </div>

                      </div>

                    </ValidatorForm>

                  </div >
                </div >
              </div >
            </div >
          </div >
        </div >
      </div >
    )
  }

}

export default Add