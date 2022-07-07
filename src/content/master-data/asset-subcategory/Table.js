import React, { Component } from 'react';

// import axios from 'axios'

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

function editLink() {
    return (
        <div className="btn-group dropstart">

            <button className="btn dropdown-toggle p-0" type="button" id="filterDashboard" data-bs-toggle="dropdown" aria-expanded="false">
                <i className='bi bi-three-dots-vertical fs-3'></i>
            </button>
            <ul className="dropdown-menu dropstart-custom-table w-auto" aria-labelledby="filterDashboard">
                <li className='w-100 py-2'>
                    <div className="form-check text-end me-3">
                        <label className="form-check-label fs-5">
                            Edit
                            <i className='bi bi-pencil-fill mx-2'></i>
                        </label>
                    </div>
                </li>
                <li className='w-100 py-2'>
                    <div className="form-check text-end me-3">
                        <label className="form-check-label fs-5">
                            Delete
                            <i className='bi bi-trash-fill mx-2'></i>
                        </label>
                    </div>
                </li>
            </ul>
        </div>
    )
}

class Table extends Component {

    state = {
        rows: []
    }

    // componentDidMount() {
    //     axios.get(`https://jsonplaceholder.typisubCategory.com/users`)
    //         .then(res => {
    //             const rows = res.data;
    //             this.setState({ rows });

    //             console.log(rows)
    //         })
    // }

    render() {
        return (
            < div className='card shadow-none border-1' >
                <div className='card-body'>
                    {/* Table */}
                    <div style={{ height: 400, width: '100%' }}>
                        <Box sx={{
                            height: 400,
                            width: '100%'
                        }}>
                            <DataGrid
                                sx={{
                                    boxShadow: 0,
                                    border: 0,
                                }}
                                disableColumnMenu
                                checkboxSelection
                                columns={columns}
                                pageSize={5}
                                rows={rows}
                                rowsPerPageOptions={[5]}
                            />
                        </Box>
                    </div >
                </div>
            </div>
        )
    }
}

const columns = [
    {
        field: 'id',
        headerName: 'No',
        width: 50,
    },
    {
        field: 'subCategory',
        headerName: 'Sub Category',
        width: 230,
    },
    {
        field: 'usefulLife',
        headerName: 'Useful Life',
        width: 250,
    },
    {
        field: 'uid',
        headerName: '',
        width: 50,
        renderCell: editLink
    }
];

const rows = [
    { id: 1, uid: 1, subCategory: 'Meja', usefulLife: '60 Bulan' },
    { id: 2, uid: 2, subCategory: 'Kursi', usefulLife: '60 Bulan' },
    { id: 3, uid: 3, subCategory: 'Lemari', usefulLife: '60 Bulan' },
    { id: 4, uid: 4, subCategory: 'Lampu', usefulLife: '24 Bulan' },
    { id: 5, uid: 5, subCategory: 'Loker', usefulLife: '48 Bulan' },
    { id: 6, uid: 6, subCategory: 'Kursi', usefulLife: '60 Bulan' },
    { id: 7, uid: 7, subCategory: 'Lampu', usefulLife: '24 Bulan' },
    { id: 8, uid: 8, subCategory: 'Lemari', usefulLife: '60 Bulan' },
    { id: 9, uid: 9, subCategory: 'Loker', usefulLife: '48 Bulan' },
    { id: 10, uid: 10, subCategory: 'Meja', usefulLife: '60 Bulan' }
];

export default Table