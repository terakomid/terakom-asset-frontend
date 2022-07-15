import React, { Component } from 'react';

// Table
import Table from './Table'

class Add extends Component {

	render() {

		return (

			<div className='main-content'>
				<div className="page-content">
					<div className="container-fluid">

						<div className='row'>

							<div className='card'>
								<div className='card-body p-3'>
									<div className='row'>

										<div className='row'>
											{/* Form */}
											<div className='col-xl-12 col-12 mt-3'>
												<div className='card shadow-sm border-1'>
													<div className='card-body mx-3'>
														<h4 className="fw-bold">Create Mutation Asset</h4>
													</div>
												</div>
											</div>

											{/* Table */}
											<div className='col-xl-12 col-12 mt-3'>
												<Table />
											</div>

										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default Add