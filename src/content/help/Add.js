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
          to='/help'
        >Cancel</Link>
      </div>
    )


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
                        <h4 className="fw-bold">Add Ticket</h4>

                        <div className='col-xl-12 col-12 my-3'>
                          <div className='card shadow-sm border-1'>
                            <div className='card-body mx-3'>

                              <div className='row mt-3'>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    label="Title"
                                    name='title'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-6 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    label="Attachment"
                                    name='attachment'
                                    variant="outlined"

                                    validators={['required']}
                                    errorMessages={['This Field is Required']}
                                  />
                                </div>
                                <div className='col-xl-12 col-12 pt-3'>
                                  <TextValidator
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    label="Purpose"
                                    name='purpose'
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