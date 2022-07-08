// Content.js
import React, { Component } from 'react'
import { FileDownload, FileUpload } from '@mui/icons-material';
import Button from '@mui/material/Button';

// Table
import Table from './Table'
// Form
import Form from './Form'


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
                                        <div className='col-xl-8 col-12 mb-3'>
                                            <h2 className="fw-bold">Master IT</h2>
                                        </div>

                                        {/* Table */}
                                        <div className='col-xl-8 col-12 mt-3'>
                                            <Table />
                                        </div>

                                        {/* Form */}
                                        <div className='col-xl-4 col-12 mt-3' style={{display: 'none'}}>
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