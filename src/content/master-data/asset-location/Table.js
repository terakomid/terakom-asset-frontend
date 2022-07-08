import React, { Component } from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
// API
import { dataTable } from './API/TableApi';

// edit button
function editLink(params) {
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
        rows: [],
    }

    componentDidMount() {
        console.log(dataTable)
    }

    render() {
        return (
            < div className='card shadow-none border-1' >
                <div className='card-body'>
                    {/* Table */}
                    {dataTable()}
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
        field: 'code',
        headerName: 'Code',
        width: 150,
    },
    {
        field: 'location',
        headerName: 'Location',
        width: 200,
    },
    {
        field: 'parent',
        headerName: 'Parent',
        width: 130
    },
    {
        field: 'uid',
        headerName: '',
        width: 50,
        renderCell: editLink
    }
];

const rows = [
    { id: 1, uid: 1, code: '65D1A', location: 'Kebayoran Baru', parent: 'Jakarta' },
    { id: 2, uid: 2, code: '65D1', location: 'Jakarta', parent: '-' },
    { id: 3, uid: 3, code: '65D4A', location: 'Bandung', parent: '-' },
    { id: 4, uid: 4, code: '65D4', location: 'Lembang', parent: 'Bandung' },
    { id: 5, uid: 5, code: '65DA', location: 'Bogor', parent: '-' },
];

export default Table