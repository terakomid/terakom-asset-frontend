import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Table
import Table from './Table'

class Form extends Component {

	render() {

		return (
			<div className='row'>
				{/* Form */}
				<div className='col-xl-6 col-12 mt-3'>
					<div className='card shadow-sm border-1'>
						<div className='card-body'>
							<h4 className="fw-bold">Asset IT</h4>
							<Link to='/data-asset-it' variant="contained" className='btn btn-primary text-capitalize text-white fw-bold mt-3' >create asset IT</Link>
						</div>
					</div>
				</div>
				<div className='col-xl-6 col-12 mt-3'>
					<div className='card shadow-sm border-1'>
						<div className='card-body'>
							<h4 className="fw-bold">Asset Non IT</h4>
							<Link to='/data-asset-non-it' variant="contained" className='btn btn-primary text-capitalize text-white fw-bold mt-3' >create asset non IT</Link>
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