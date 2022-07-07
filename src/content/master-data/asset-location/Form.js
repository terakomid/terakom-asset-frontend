import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

class Form extends Component {

  render() {
    return (
      <div className='card shadow-none border-1'>
        <div className='card-body'>
          <h2 className="card-title fw-bold">Add Asset Location</h2>

          <div className='row'>
            <div className='col-xl-12 col-12 pt-3'>
              <TextField sx={{ width: '100%' }} id="outlined-basic" label="Code" variant="outlined" />
            </div>
            <div className='col-xl-12 col-12 pt-3'>
              <TextField sx={{ width: '100%' }} id="outlined-basic" label="Location" variant="outlined" />
            </div>
            <div className='col-xl-12 col-12 pt-3'>
              <Autocomplete
                sx={{ width: '100%' }}
                options={dataLocations}
                renderInput={(params) => <TextField {...params} label="Parent" />}
              />
            </div>
            <div className='col-xl-12 col-12 pt-3 text-end'>
              <Button variant="contained" id="create" className='text-capitalize'>create asset location</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const dataLocations = [
  { label: 'Jakarta' },
  { label: 'Bandung' },
  { label: 'Bogor' }
];

export default Form