import React, { Component } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

class SelectLocation extends Component {

  render() {
    return (
      <Autocomplete
        options={dataLocations}
        renderInput={(params) => <TextField {...params} label="Location" />}
      />
    );
  }
}

const dataLocations = [
  { label: '65D1 - HO Jakarta', year: '65D1' },
  { label: '65D1A - WH Cikarang', year: '65D1A' },
  { label: '65D1C - DSC Bogor', year: '65D1C' }
];


export default SelectLocation
