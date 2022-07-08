import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class Form extends Component {

  render() {
    return (
      <div className='card shadow-none border-1'>
        <div className='card-body'>
          <h2 className="card-title fw-bold">Add Cost Center</h2>

          <div className='row mt-3'>
            <div className='col-xl-12 col-12 pt-3'>
              <TextField sx={{ width: '100%' }} id="outlined-basic" label="Cost Center Code" variant="outlined" />
            </div>
            <div className='col-xl-12 col-12 pt-3'>
              <TextField sx={{ width: '100%' }} id="outlined-basic" label="Cost Center Name" variant="outlined" />
            </div>
            <div className='col-xl-12 col-12 pt-3 text-end'>
              <Button variant="contained" id="create" className='text-capitalize'>create cost center</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Form