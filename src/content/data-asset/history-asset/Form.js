import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Table
import Table from './Table'

class Form extends Component {

	render() {

		return (
			<div className='row'>
				{/* Form */}
				<div className='col-xl-4 col-12 mt-3'>
					<div className='card shadow-sm border-1'>
						<div className='card-body mx-3'>
							<h4 className="fw-bold">Mutasi Asset</h4>
							<Link to='/mutation-asset' variant="contained" className='btn btn-primary text-capitalize text-white fw-bold mt-3' >Mutasi Asset</Link>
						</div>
					</div>
				</div>
				<div className='col-xl-4 col-12 mt-3'>
					<div className='card shadow-sm border-1'>
						<div className='card-body mx-3'>
							<h4 className="fw-bold">Maintenance</h4>
							<Link to='/maintenance-asset' variant="contained" className='btn btn-primary text-capitalize text-white fw-bold mt-3' >Maintenance</Link>
						</div>
					</div>
				</div>
				<div className='col-xl-4 col-12 mt-3'>
					<div className='card shadow-sm border-1'>
						<div className='card-body mx-3'>
							<h4 className="fw-bold">Stok Opname</h4>
							<Link to='/stock-opname' variant="contained" className='btn btn-primary text-capitalize text-white fw-bold mt-3' >Stok Opname</Link>
						</div>
					</div>
				</div>

				{/* Table */}
				<div className='col-xl-12 col-12 mt-3'>
					<Table />
				</div>

			</div>
		)
	}

}

export default Form