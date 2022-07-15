// Content.js
import React, { Component } from 'react'
import { FileDownload, FileUpload } from '@mui/icons-material';
import Button from '@mui/material/Button';

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
                                            <h2 className="fw-bold">History Asset</h2>
                                        </div>

                                        {/* Button Import & Export */}
                                        <div className='col-xl-4 col-12' style={{display: 'none'}}>
                                            <div className='d-flex justify-content-evenly'>
                                                <Button variant="contained" startIcon={<FileDownload />}>Import</Button>
                                                <Button variant="contained" startIcon={<FileUpload />}>Export</Button>
                                            </div>
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