import React, { Component } from 'react';

import Button from '@mui/material/Button';
import { FileDownload, FileUpload } from '@mui/icons-material';

// Jquery
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'

class AssetLocation extends Component {
    // State array variable to save and show data
    constructor(props) {
        super(props)
        this.state = {
            data: [],

        }
    }
    componentDidMount() {
        //Get all users details in bootstrap table
        // axios.get('http://localhost/getList.php').then(res => {
        //     //Storing users detail in state array object
        //     this.setState({ data: res.data });

        // });

        //initialize datatable
        $(function () {
            setTimeout(function () {
                $('#example').DataTable();
            }, 1000);
        });
    }

    render() {
        return (

            <div className='card'>
                <div className='card-body p-3'>
                    <div className='row'>

                        <div className='col-xl-8 col-12 mb-3'>
                            {/* Title */}
                            <h4 className="card-title fs-4 fw-bold">Asset Location</h4>
                        </div>

                        <div className='col-xl-4 col-12'>
                            {/* Button Import & Export */}
                            <div className='d-flex justify-content-around'>
                                <Button variant="contained" startIcon={<FileDownload />}>Import</Button>
                                <Button variant="contained" startIcon={<FileUpload />}>Export</Button>
                            </div>
                        </div>

                        <div className='col-xl-8 col-12 mt-5'>
                            <div className='card shadow-none border-1'>
                                <div className='card-body'>

                                    <div className='row'>
                                        <div className='col-xl-12 col-12'>
                                            <div className="container">

                                                <table id="example" className="table table-hover table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Email</th>
                                                            <th>Username</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* {this.state.data.map((result) => {
                                                            return (

                                                                <tr>
                                                                    <td>{result.id}</td>
                                                                    <td>{result.email}</td>
                                                                    <td>{result.username}</td>
                                                                </tr>

                                                            )
                                                        })} */}

                                                        <tr>
                                                            <td>id</td>
                                                            <td>email</td>
                                                            <td>username</td>
                                                        </tr>

                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4 col-12'></div>
                    </div>

                </div>
            </div>
        );
    }
}

export default AssetLocation
