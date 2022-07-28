import { Autocomplete } from '@mui/material';
import React, { Component } from 'react';

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
          to='/user-list'
        >Cancel</Link>
      </div>
    )

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
                        <h4 className="fw-bold">New User</h4>

                        <div className='col-xl-4 col-12 my-3'>
                          <div className='card shadow-sm border-1'>
                            <div className='card-body mx-3'>

                              <img src="assets/images/new-user.png" alt="" style={{ width: '100%' }} />

                            </div>
                          </div>
                        </div>

                        <div className='col-xl-8 col-12 my-3'>
                          <div className='card shadow-sm border-1'>
                            <div className='card-body mx-3'>

                              <div className='row mt-3'>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    label="Employ Code"
                                    name='code'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    label="Full Name"
                                    name='name'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    label="Phone Number"
                                    name='phone_number'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    label="Email"
                                    name='email'
                                    variant="outlined"
                                    type='email'

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <Autocomplete
                                    sx={{ width: '100%' }}
                                    name='department'
                                    options={options}
                                    renderInput={(params) => <TextValidator {...params} label='Department' />}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <Autocomplete
                                    sx={{ width: '100%' }}
                                    name='role'
                                    options={options}
                                    renderInput={(params) => <TextValidator {...params} label='Role' />}
                                  />
                                </div>
                                <div className='col-xl-12 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    label="Address"
                                    name='address'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>

                                <div className='col-xl-12 col-12 pt-3 d-flex justify-content-end'>
                                  <ButtonSave /><ButtonCancel />
                                </div>
                              </div>

                            </div>
                          </div>
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