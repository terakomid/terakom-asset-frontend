import React, { Component } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

class SelectLocation extends Component {

  render() {
    return (
      <Autocomplete
        size='small'
        options={dataLocations}
        renderInput={(params) => <TextField {...params} label="Location" />}
      />
    );
  }
}

const dataLocations = [
  { label: '65D1 - HO Jakarta', code: '65D1' },
  { label: '65D1A - WH Cikarang', code: '65D1A' },
  { label: '65D1C - DSC Bogor', code: '65D1C' }
];


export default SelectLocation
