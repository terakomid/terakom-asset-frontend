import React, { Component } from 'react'
import { Link } from "react-router-dom"

// import axios from 'axios'

import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';

function codeLink(params) {
    // return (<Link to={`/asset-subcategory/${params.row.code ||''}`} key={params.row.code ||''} >{params.row.code || ''}</Link>)
    return (<Link to={`/asset-subcategory`} >{params.row.code || ''}</Link>)
}

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
    //     axios.get(`https://jsonplaceholder.typicode.com/users`)
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
                                components={{
                                    LoadingOverlay: LinearProgress,
                                    Toolbar: GridToolbar
                                }}
                                componentsProps={{
                                    toolbar: {
                                        quickFilterProps: { debounceMs: 500 },
                                        showQuickFilter: true,
                                    },
                                }}
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
        width: 50
    },
    {
        field: 'code',
        headerName: 'Code',
        width: 200,
        renderCell: codeLink
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 280,
    },
    {
        field: 'uid',
        headerName: '',
        width: 50,
        renderCell: editLink
    }
];

const rows = [
    { id: 1, uid: 1, code: 'ID09', category: 'Furniture & Fixture' },
    { id: 2, uid: 2, code: 'ID02', category: 'Building' },
    { id: 3, uid: 3, code: 'ID03', category: 'Tools' },
    { id: 4, uid: 4, code: 'ID04', category: 'Equipment' },
    { id: 5, uid: 5, code: 'ID05', category: 'Computers' }
];

export default Table