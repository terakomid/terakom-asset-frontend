import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Table
import Table from './Table'

class Form extends Component {

	render() {

		return (
			<div className='row'>

				{/* Table */}
				<div className='col-xl-12 col-12 mt-3'>
					<Table />
				</div>

			</div>
		)
	}

}

export default Form