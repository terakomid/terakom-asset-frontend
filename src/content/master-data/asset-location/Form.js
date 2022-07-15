import React, { Component } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// Table
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// Data
import { getByCode, getByCodeId, create, update } from './services/Api'
import { ParentLocation, dataTable, deleteLocation } from './services/Data'
// Alert
import Swal from 'sweetalert2'

class Form extends Component {

	constructor(props) {
		super(props)

		this.state = {
			dataParentLocation: [],
			errorTextUniqueCode: '',
			errorTextParent: '',
			formcode: '',
			formlocation: '',
			formparentlocation: null,
			isLoading: true,
			dataLocation: [],

			titleForm: 'Add Asset Location',
			formid: null
		}

		this.Table = this.Table.bind(this)
		this.dataParentLocation = this.dataParentLocation.bind(this)

	}

	dataParentLocation = async () => {
		const dataParentLocation = await ParentLocation()

		this.setState({
			dataParentLocation
		})
	}

	Table = async () => {
		const dataLocation = await dataTable()

		this.setState({
			dataLocation,
			isLoading: false
		});
	}

	async componentDidMount() {
		this.dataParentLocation()
		this.Table()
	}

	render() {

		const handleCode = (event) => {
			const formcode = event.target.value.toUpperCase()
			this.setState({ formcode })

		}

		const handleLocation = (event) => {
			const formlocation = event.target.value
			this.setState({ formlocation })
		}

		const handleParentLocation = (event, value) => {
			console.log(value)
			if (value !== null) {
				if (value.code === this.state.formcode) {
					const errorTextParent = 'This is a parent location'
					this.setState({
						errorParent: true,
						errorTextParent,
					})
				} else {
					this.setState({
						errorParent: false,
						errorTextParent: ''
					})
				}
			} else {
				this.setState({
					errorParent: false,
					errorTextParent: ''
				})
			}
			this.setState({
				formparentlocation: (value != null) ? value : null
			})
		}

		const UniqueCode = async (data) => {

			// validation unique code
			await getByCode(data.code)
				.then(result => {

					if (result.data.result.length === 0) {
						this.setState({
							errorCode: false,
							errorTextUniqueCode: ''
						})

						// insert data
						create(data).then(result => {
							this.setState({
								errorCode: false,
								formcode: '',
								formlocation: '',
								formparentlocation: null,
								errorTextUniqueCode: ''
							})

							this.dataParentLocation()
							this.Table()
							Swal.fire("Succesfully add new entry!", '', "success")
						}).catch(error => {
							console.log(error)
						})

					} else {
						const errorTextUniqueCode = 'Code already exist'
						this.setState({
							errorCode: true,
							errorTextUniqueCode
						})
					}

				}).catch(error => {
					this.setState({
						errorCode: false,
						errorTextUniqueCode: ''
					})
				})
		}

		const handleSubmit = async (event) => {
			// set cost post
			const data = {
				code: this.state.formcode,
				location: this.state.formlocation,
				parent_location: (this.state.formparentlocation != null) ? this.state.formparentlocation.code : null
			}

			// check unik code
			UniqueCode(data)

			event.preventDefault()
		}

		const editData = async (param) => {
			const paramlocation = {
				id: param.id,
				code: param.parent_location_code,
				location: param.parent_location
			}

			const data = {
				formid: param.id,
				formcode: param.code,
				formlocation: param.location,
				formparentlocation: (param.parent_location) ? paramlocation : null,

				titleForm: 'Edit Asset Location',
				buttonCancel: true,
				errorTextUniqueCode: '',
				errorCode: false,
			}

			this.setState(data)
		}

		const editLink = (param) => {

			return (
				<div className="btn-group dropstart">

					<button className="btn dropdown-toggle p-0" type="button" id="tableOption" data-bs-toggle="dropdown" aria-expanded="false">
						<i className='bi bi-three-dots-vertical fs-3'></i>
					</button>
					<ul className="dropdown-menu dropstart-custom-table w-auto" aria-labelledby="tableOption">
						<li className='w-100 py-2' onClick={() => editData(param.row)}>
							<div className="form-check text-end me-3">
								<label className="form-check-label fs-6">
									Edit
									<i className='bi bi-pencil-fill mx-2'></i>
								</label>
							</div>
						</li>
						<li className='w-100 py-2' onClick={() => deleteData(param.row)}>
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

		const CheckCodeUpdate = async (data) => {

			// validation unique code
			await getByCodeId(data)
				.then(result => {

					if (result.data.result.length === 0) {
						this.setState({
							errorCode: false,
							errorTextUniqueCode: ''
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
									this.setState({
										errorCode: false,
										formcode: '',
										formlocation: '',
										formparentlocation: null,
										errorTextUniqueCode: '',
										buttonCancel: false
									})

									this.dataParentLocation()
									this.Table()
									Swal.fire("Succesfully updating entry!", '', "success")
								}).catch(error => {
									Swal.fire("Failed updating entry!", '', "error")
								})
							}
						})

					} else {
						const errorTextUniqueCode = 'Code already exist'
						this.setState({
							errorCode: true,
							errorTextUniqueCode
						})
					}

				}).catch(error => {
					this.setState({
						errorCode: false,
						errorTextUniqueCode: ''
					})
				})
		}

		const handleUpdate = async (event) => {

			const current = new Date();
			const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

			// set cost post
			const data = {
				id: this.state.formid,
				code: this.state.formcode,
				location: this.state.formlocation,
				parent_location: (this.state.formparentlocation != null) ? this.state.formparentlocation.code : null,
				updated_at: date
			}

			// check unik code
			CheckCodeUpdate(data)

			// event.preventDefault()
		}

		const deleteData = async (param) => {

			Swal.fire({
				title: 'Do you sure to delete this data?',
				showCancelButton: true,
				cancelButtonText: `Cancel`,
				cancelButtonClass: 'bg-primary',
				confirmButtonText: 'Continue',
				confirmButtonClass: 'bg-danger text-white',
			}).then(async (result) => {
				if (result.isConfirmed) {
					await deleteLocation(param.id).then(result => {
						this.dataParentLocation()
						this.Table()
						Swal.fire("Succesfully Delete entry!", '', "success")
					}).catch(error => {
						Swal.fire("Failed Delete entry!", '', "error")
					})
				}
			})

		}

		const cancelUpdate = () => {
			const data = {
				formid: '',
				formcode: '',
				formlocation: '',
				formparentlocation: null,

				titleForm: 'Add Asset Location',
				buttonCancel: false,
				errorTextUniqueCode: '',
				errorCode: false,
				errorParent: false,
			}

			this.setState(data)
		}

		const ButtonUpdate = () => (
			<div className='update d-flex justify-content-around'>
				<div className='btn-cancel'>
					<Button
						id="btnCancel"
						className='text-capitalize bg-danger'
						variant="contained"
						onClick={() => cancelUpdate()}
					>cancel</Button>
				</div>

				<div className='btn-update'>
					<Button
						id="btnUpdate"
						className='text-capitalize'
						variant="contained"
						onClick={() => handleUpdate()}
					>update asset location</Button>
				</div>
			</div>
		)

		const ButtonCreate = () => (
			<div id='create'>
				<Button
					id="btnCreate"
					className='text-capitalize float-end'
					variant="contained"
					type='submit'
				>create asset location</Button>
			</div>
		)

		const formcode = this.state.formcode
		const formlocation = this.state.formlocation
		const formparentlocation = this.state.formparentlocation
		const dataParentLocations = this.state.dataParentLocation
		const isLoading = this.state.isLoading

		const titleForm = this.state.titleForm

		const rows = (this.state.dataLocation) ? this.state.dataLocation : this.Table

		const columns = [
			{
				field: 'number',
				headerName: 'No',
				width: 50,
				type: 'number'
			},
			{
				field: 'code',
				headerName: 'Code',
				width: 150,
			},
			{
				field: 'location',
				headerName: 'Location',
				width: 180,
			},
			{
				field: 'parent_location',
				headerName: 'Parent Location',
				width: 150,
			},
			{
				field: 'id',
				headerName: ' ',
				width: 50,
				renderCell: editLink,
				sortable: false
			}
		];

		return (
			<div className='row'>
				{/* Table */}

				<div className='col-xl-8 col-12 mt-3'>
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

				{/* Form */}
				<div className='col-xl-4 col-12 mt-3'>
					<div className='card shadow-none border-1'>
						<div className='card-body'>
							<h2 className="card-title fw-bold">{titleForm}</h2>

							<ValidatorForm
								onSubmit={handleSubmit}
							>

								<div className='row mt-3'>
									<div className='col-xl-12 col-12 pt-3'>
										<TextValidator
											autoComplete='off'
											sx={{ width: '100%' }}
											id='outlined-basic'
											error={this.state.errorCode}
											helperText={this.state.errorTextUniqueCode}
											inputProps={{ maxLength: 6, style: { textTransform: "uppercase" } }}
											label='Code'
											name='code'
											onChange={handleCode}
											value={formcode}
											validators={['required', 'matchRegexp:^[a-zA-Z0-9]+$']}
											variant='outlined'
											errorMessages={['This Field is Required', 'Only Number and Capital Text(Alphabet)']}
										/>

									</div>
									<div className='col-xl-12 col-12 pt-3'>
										<TextValidator
											autoComplete='off'
											sx={{ width: '100%' }}
											id='outlined-basic'
											inputProps={{ style: { textTransform: "capitalize" } }}
											label='Location'
											name='location'
											onChange={handleLocation}
											value={formlocation}
											validators={['required', 'matchRegexp:^[a-zA-Z\\s]+$']}
											variant='outlined'
											errorMessages={['This Field is Required', 'Only Text(Alphabet)']}
										/>
									</div>
									<div className='col-xl-12 col-12 pt-3'>
										<Autocomplete
											sx={{ width: '100%' }}
											getOptionLabel={(dataParentLocations) => '[' + dataParentLocations.code + '] ' + dataParentLocations.location}
											loading={isLoading}
											name='parent_loaction'
											onChange={handleParentLocation}
											options={dataParentLocations}
											renderInput={(params) => <TextValidator
												error={this.state.errorParent}
												helperText={this.state.errorTextParent} {...params} label='Parent Location' />}
											value={formparentlocation}
										/>
									</div>
									<div className='col-xl-12 col-12 pt-3 '>
										{this.state.buttonCancel ? <ButtonUpdate /> : <ButtonCreate />}
									</div>
								</div>

							</ValidatorForm>
						</div>
					</div>
				</div>

			</div>
		)
	}

}

export default Form