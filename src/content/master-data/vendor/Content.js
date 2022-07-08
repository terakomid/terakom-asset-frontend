// Content.js
import React, { Component } from 'react'
import { Add, FileDownload, FileUpload } from '@mui/icons-material';
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
                                        <div className='col-xl-7 col-12 mb-3'>
                                            <h2 className="fw-bold">Master Vendor</h2>
                                        </div>

                                        {/* Button Import & Export */}
                                        <div className='col-xl-5 col-12'>
                                            <div className='d-flex justify-content-evenly'>
                                                <Button variant="contained" size='small' startIcon={<FileDownload />}>Import</Button>
                                                <Button variant="contained" size='small' startIcon={<FileUpload />}>Export</Button>
                                                <Button variant="contained" size='small' startIcon={<Add />}>Add Vendor</Button>
                                            </div>
                                        </div>

                                        {/* Form */}
                                        <div className='col-xl-12 col-12 mt-3'>
                                            <Form />
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
                    {/* container-fluid  */}
                </div >
            </div>
        )
    }

}

export default Content