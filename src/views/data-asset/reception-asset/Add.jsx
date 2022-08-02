import { Autocomplete } from '@mui/material';
import React, { Component } from 'react';

import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { Button } from 'react-bootstrap';
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
          to='/reception-asset'
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
      { id: 1, code: '2020/FA/65d1/ID08/2000001031', name: 'Notebook', specification: 'Asus Core i5', condition: 'Baik/Layak', status: 'purcase', },
      { id: 2, code: '2020/FA/65d1/ID08/2000001032', name: 'Notebook', specification: 'Asus Core i5', condition: 'Baik/Layak', status: 'purcase', },
      { id: 3, code: '2020/FA/65d1/ID08/2000001033', name: 'Notebook', specification: 'Asus Core i5', condition: 'Baik/Layak', status: 'rent', },
      { id: 4, code: '2020/FA/65d1/ID08/2000001034', name: 'Notebook', specification: 'Asus Core i5', condition: 'Baik/Layak', status: 'purcase', },
      { id: 5, code: '2020/FA/65d1/ID08/2000001035', name: 'Notebook', specification: 'Asus Core i5', condition: 'Baik/Layak', status: 'rent', },
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
        width: 150,
      },
      {
        field: 'code',
        headerName: 'Asset Code',
        width: 250,
      },
      {
        field: 'specification',
        headerName: 'Specification',
        width: 150,
      },
      {
        field: 'condition',
        headerName: 'Condition',
        width: 100,
      },
      {
        field: 'status',
        headerName: 'Purcase/Rent',
        width: 150,
      },
      {
        field: '',
        headerName: 'Action',
        width: 100,
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
                        <h4 className="fw-bold">Create reception Asset</h4>

                        <div className='col-xl-12 col-12 my-3'>
                          <div className='card shadow-sm border-1'>
                            <div className='card-body mx-3'>

                              <div className='row mt-3'>
                                <div className='col-xl-4 col-12 pt-3'>
                                  <Autocomplete
                                    sx={{ width: '100%' }}
                                    name='location'
                                    options={options}
                                    renderInput={(params) => <TextValidator {...params} label='Location' />}
                                  />
                                </div>
                                <div className='col-xl-4 col-12 pt-3'>
                                  <Autocomplete
                                    sx={{ width: '100%' }}
                                    name='department'
                                    options={options}
                                    renderInput={(params) => <TextValidator {...params} label='Department' />}
                                  />
                                </div>
                                <div className='col-xl-4 col-12 pt-3'>
                                  <Autocomplete
                                    sx={{ width: '100%' }}
                                    name='vendor'
                                    options={options}
                                    renderInput={(params) => <TextValidator {...params} label='Vendor Name' />}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    label="PO Number"
                                    name='po_number'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    InputLabelProps={{ shrink: true }}
                                    id="outlined-basic"
                                    label="Date"
                                    name='date'
                                    variant="outlined"
                                    type='date'

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <Autocomplete
                                    sx={{ width: '100%' }}
                                    name='asset'
                                    options={options}
                                    renderInput={(params) => <TextValidator {...params} label='Asset' />}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <Autocomplete
                                    sx={{ width: '100%' }}
                                    name='purcase_status'
                                    options={options}
                                    renderInput={(params) => <TextValidator {...params} label='Purcase/Rent' />}
                                  />
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                        <div className='col-xl-12 col-12 pb-5 text-end'>
                          <ButtonCreate />
                        </div>

                        {/* Table */}
                        <div className='col-xl-12 col-12 mt-3'>
                          <div className='card shadow-none border-1' >

                            <div className='card-body'>
                              {/* Table */}

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