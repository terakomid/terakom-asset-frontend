// Content.js
import React, { Component } from 'react'
import { Add } from '@mui/icons-material';

// Form
import Form from './Form'
import { Link } from 'react-router-dom';


class Content extends Component {


    render() {

        return (

            <div className='main-content'>
                <div className="page-content">
                    <div className="container-fluid">

                        <div className='row'>

                            <div className='card'>
                                <div className='card-body p-3'>
                                    <div className='row'>

                                        {/* Title */}
                                        <div className='col-xl-12 col-12 mb-3'>
                                            <h2 className="fw-bold">User List</h2>
                                        </div>

                                        {/* Link Import & Export */}
                                        <div className='col-xl-12 col-12 text-end'>
                                            <Link to='/user-list-add' className='text-capitalize fw-bold btn btn-md btn-primary' variant="contained"><Add /> New user</Link>
                                        </div>

                                        {/* Table & Form */}
                                        <div className='col-xl-12 col-12 mt-3'>
                                            <Form />
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    {/* container-fluid  */}
                </div >
            </div>
        )
    }

}

export default Content