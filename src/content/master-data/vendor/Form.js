import React, { Component } from 'react';
// Form
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@mui/material/Button';
import { Add, FileDownload, FileUpload } from '@mui/icons-material';
// Table
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// Data
import { getByCode, getByCodeId, create, update } from './services/Api'
import { dataTable, deleteData } from './services/Data'
// Alert
import Swal from 'sweetalert2'

class Form extends Component {

  constructor(props) {
    super(props)

    this.state = {
      s_id: '',
      s_code: '',
      s_name: '',
      s_address: '',
      s_contact: '',

      s_formTitle: 'Add Vendor',
      s_btnCancel: false,
      s_errorCodeStatus: false,
      s_errorCodeText: null,

      s_loading: true
    }

    this.Table = this.Table.bind(this)

  }

  Table = async () => {
    const _dataTable = await dataTable()

    this.setState({
      s_dataTable: _dataTable,
      s_loading: false
    });
  }

  async componentDidMount() {
    this.Table()
  }

  render() {


    /**
     * ==========================================================
     * Form
     * ==========================================================
     */

    const f_checkCode = (event) => {
      const _code = event.target.value.toUpperCase()
      this.setState({ s_code: _code })
    }
    const f_checkName = (event) => {
      const _Name = event.target.value
      this.setState({ s_name: _Name })
    }
    const f_checkAddress = (event) => {
      const _address = event.target.value
      this.setState({ s_address: _address })
    }
    const f_checkContact = (event) => {
      const _contact = event.target.value
      this.setState({ s_contact: _contact })
    }


    /**
     * ==========================================================
     * Form Save
     * ==========================================================
     */
    const checkCreate = async (data) => {
      // validation unique code
      await getByCode(data.code)
        .then(result => {
          if (!result.data.result) {
            saveCreate(data)
          } else {
            const _errorCodeText = 'Code already exist'
            this.setState({
              s_errorCodeStatus: true,
              s_errorCodeText: _errorCodeText
            })
          }

        }).catch(error => {
          if (error.response.status === 404) {
            saveCreate(data)
          }
        })
    }

    const saveCreate = async (data) => {
      this.setState({
        s_errorCodeStatus: false,
        s_errorCodeText: null
      })

      // insert data
      create(data).then(result => {

        if (result.status === 200) {
          if (!result.data.result) {
            const response = `
              <div>
                <span className='text-danger'>${result.data.name ? result.data.name : ''}</span>
                <span className='text-danger'>${result.data.address ? result.data.address : ''}</span>
                <span className='text-danger'>${result.data.contact ? result.data.contact : ''}</span>
              </div>
            `
            Swal.fire({
              title: 'Validation',
              icon: 'info',
              html: response,
              showCloseButton: true,
            })
          } else {

            btnCancelUpdate()
            this.Table()

            Swal.fire("Succesfully add new entry!", '', "success")
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }

    const formSubmit = async (event) => {
      // set cost post
      const data = {
        code: this.state.s_code,
        name: this.state.s_name,
        address: this.state.s_address,
        contact: this.state.s_contact,
      }

      // check unik code
      checkCreate(data)

      event.preventDefault()
    }


    /**
     * ==========================================================
     * Form Update
     * ==========================================================
     */
    const checkCodeUpdate = async () => {

      const current = new Date();
      const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

      // set cost post
      const data = {
        id: this.state.s_id,
        code: this.state.s_code,
        name: this.state.s_name,
        address: this.state.s_address,
        contact: this.state.s_contact,
        updated_at: date
      }

      // validation unique code
      await getByCodeId(data)
        .then(result => {
          if (result.data.result.length === 0) {
            saveUpdate(data)
          } else {
            const _errorCodeText = 'Code already exist'
            this.setState({
              s_errorCodeStatus: true,
              s_errorCodeText: _errorCodeText
            })
          }

        }).catch(error => {
          this.setState({
            s_errorCodeStatus: false,
            s_errorCodeText: null
          })
        })
    }

    const saveUpdate = async (data) => {
      this.setState({
        s_errorCodeStatus: false,
        s_errorCodeText: null
      })

      Swal.fire({
        title: 'Do you want to save the data changes?',
        showCancelButton: true,
        cancelButtonText: `Cancel`,
        cancelButtonClass: 'bg-danger',
        confirmButtonText: 'Continue',
        confirmButtonClass: 'bg-primary text-white',
      }).then((result) => {
        if (result.isConfirmed) {

          // update data
          update(data.id, data).then(result => {
            btnCancelUpdate()

            this.Table()
            Swal.fire("Succesfully updating entry!", '', "success")
          }).catch(error => {
            Swal.fire("Failed updating entry!", '', "error")
          })
        }
      })

    }


    /**
     * ==========================================================
     * Form Button
     * ==========================================================
     */
    const ButtonAdd = () => (
      <div id='add'>
        <Button
          id="btnAdd"
          className='text-capitalize float-end'
          variant="contained"
          type='submit'
        ><Add /> add vendor</Button>
      </div>
    )

    const ButtonCreate = () => (
      <div id='create'>
        <Button
          id="btnCreate"
          className='text-capitalize float-end'
          variant="contained"
          type='submit'
        >create vendor</Button>
      </div>
    )

    const ButtonUpdate = () => (
      <div className='update d-flex justify-content-around'>
        <div className='btn-cancel'>
          <Button
            id="btnCancel"
            className='text-capitalize bg-danger'
            variant="contained"
            onClick={() => btnCancelUpdate()}
          >cancel</Button>
        </div>

        <div className='btn-update'>
          <Button
            id="btnUpdate"
            className='text-capitalize'
            variant="contained"
            onClick={() => checkCodeUpdate()}
          >update vendor</Button>
        </div>
      </div>
    )

    const btnCancelUpdate = () => {
      const data = {
        s_id: '',
        s_code: '',
        s_name: '',
        s_address: '',
        s_contact: '',

        s_formTitle: 'Add Vendor',
        s_btnCancel: false,
        s_errorCodeStatus: false,
        s_errorCodeText: null
      }

      this.setState(data)
    }


    /**
     * ==========================================================
     * Table Button
     * ==========================================================
     */
    const btnMore = (param) => {
      return (
        <div className="btn-group dropstart">
          <button className="btn dropdown-toggle p-0" type="button" id="tableOption" data-bs-toggle="dropdown" aria-expanded="false">
            <i className='bi bi-three-dots-vertical fs-3'></i>
          </button>
          <ul className="dropdown-menu dropstart-custom-table w-auto" aria-labelledby="tableOption">
            <li className='w-100 py-2' onClick={() => btnEdit(param.row)}>
              <div className="form-check text-end me-3">
                <label className="form-check-label fs-6">
                  Edit
                  <i className='bi bi-pencil-fill mx-2'></i>
                </label>
              </div>
            </li>
            <li className='w-100 py-2' onClick={() => btnDelete(param.row)}>
              <div className="form-check text-end me-3">
                <label className="form-check-label fs-6">
                  Delete
                  <i className='bi bi-trash-fill mx-2'></i>
                </label>
              </div>
            </li>
          </ul>
        </div>
      )
    }

    const btnEdit = async (param) => {
      const data = {
        s_id: param.id,
        s_code: param.code,
        s_name: param.name,
        s_address: param.address,
        s_contact: param.contact,

        s_formTitle: 'Edit Vendor',
        s_btnCancel: true,
        s_errorCodeStatus: false,
        s_errorCodeText: null
      }

      this.setState(data)
    }

    const btnDelete = async (param) => {
      Swal.fire({
        title: 'Do you sure to delete this data?',
        showCancelButton: true,
        cancelButtonText: `Cancel`,
        cancelButtonClass: 'bg-primary',
        confirmButtonText: 'Continue',
        confirmButtonClass: 'bg-danger text-white',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const remove = await deleteData(param.id).then(result => {
            this.Table()
            Swal.fire("Succesfully Delete entry!", '', "success")
          }).catch(error => {
            Swal.fire("Failed Delete entry!", '', "error")
          })
        }
      })

    }


    /**
     * ==========================================================
     * Table
     * ==========================================================
     */
    const columns = [
      {
        field: 'number',
        headerName: 'No',
        width: 50,
      },
      {
        field: 'code',
        headerName: 'Code',
        width: 150,
      },
      {
        field: 'name',
        headerName: 'Vendor Name',
        width: 250,
      },
      {
        field: 'address',
        headerName: 'Vendor Address',
        width: 200,
      },
      {
        field: 'contact',
        headerName: 'Vendor Contact',
        width: 200,
      },
      {
        field: '',
        headerName: '',
        width: 50,
        renderCell: btnMore
      }
    ];
    const rows = (this.state.s_dataTable) ? this.state.s_dataTable : this.Table


    return (

      <div className='row'>

        {/* Title */}
        <div className='col-xl-7 col-12 mb-3'>
          <h2 className="fw-bold">Master Vendor</h2>
        </div>

        {/* Button Import & Export */}
        <div className='col-xl-5 col-12'>
          <div className='d-flex justify-content-end'>
            <Button variant="contained" size='small' className='mx-3' startIcon={<FileDownload />}>Import</Button>
            <Button variant="contained" size='small' className='mx-3' startIcon={<FileUpload />}>Export</Button>
            {this.state.s_btnCancel ? null : <ButtonAdd />}
          </div>
        </div>

        {/* Form */}
        <div className='col-xl-12 col-12 mt-3'>
          <div className='card shadow-none border-1'>
            <div className='card-body'>
              <h2 className="card-title fw-bold">Master Vendor</h2>

              <ValidatorForm
                onSubmit={formSubmit}
              >
                <div className='row mt-3'>
                  <div className='col-xl-6 col-12 pt-3'>
                    <TextValidator
                      sx={{ width: '100%' }}
                      id="outlined-basic"
                      label="Code"
                      name='code'
                      variant="outlined"

                      inputProps={{ maxLength: 6, style: { textTransform: "uppercase" } }}
                      onChange={f_checkCode}
                      value={this.state.s_code}

                      error={this.state.s_errorCodeStatus}
                      helperText={this.state.s_errorCodeText}
                      validators={['required', 'matchRegexp:^[a-zA-Z0-9]+$']}
                      errorMessages={['This Field is Required', 'Only Number and Capital Text(Alphabet)']}
                    />
                  </div>
                  <div className='col-xl-6 col-12 pt-3'>
                    <TextValidator
                      sx={{ width: '100%' }}
                      id="outlined-basic"
                      label="Vendor Name"
                      name='name'
                      variant="outlined"

                      inputProps={{ style: { textTransform: "capitalize" } }}
                      onChange={f_checkName}
                      value={this.state.s_name}

                      validators={['required', 'matchRegexp:^[a-zA-Z0-9\\s]+$']}
                      errorMessages={['This Field is Required', 'Only Number and Text(Alphabet)']}
                    />
                  </div>
                  <div className='col-xl-6 col-12 pt-3'>
                    <TextValidator
                      sx={{ width: '100%' }}
                      id="outlined-basic"
                      label="Vendor Address"
                      name='address'
                      variant="outlined"

                      inputProps={{ style: { textTransform: "capitalize" } }}
                      onChange={f_checkAddress}
                      value={this.state.s_address}

                      validators={['required']}
                      errorMessages={['This Field is Required']}
                    />
                  </div>
                  <div className='col-xl-6 col-12 pt-3'>
                    <TextValidator
                      sx={{ width: '100%' }}
                      id="outlined-basic"
                      label="Contact"
                      name='contact'
                      variant="outlined"

                      onChange={f_checkContact}
                      value={this.state.s_contact}

                      validators={['required']}
                      errorMessages={['This Field is Required']}
                    />
                  </div>
                  <div className='col-xl-12 col-12 pt-3 text-end'>
                    {this.state.s_btnCancel ? <ButtonUpdate /> : <ButtonCreate />}
                  </div>
                </div>

              </ValidatorForm>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className='col-xl-12 col-12 mt-3'>
          <div className='card shadow-none border-1' >
            <div className='card-body'>
              {/* Table */}
              <div style={{ height: 400, width: '100%' }}>
                <Box sx={{
                  height: 400,
                  width: '100%'
                }}>
                  <DataGrid
                    sx={{
                      boxShadow: 0,
                      border: 0,
                    }}
                    loading={this.state.s_loading}
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

      </div>
    )
  }

}

export default Form