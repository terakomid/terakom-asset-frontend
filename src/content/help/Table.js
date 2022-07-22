import React, { Component } from 'react';

import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// edit button
export const editLink = (param) => {

    return (
        <div className="btn-group dropstart">

            <button className="btn btn-sm dropdown-toggle p-0" type="button" id="filterDashboard" data-bs-toggle="dropdown" aria-expanded="false">
                <i className='bi bi-three-dots-vertical fs-3'></i>
            </button>
            <ul className="dropdown-menu dropstart-custom-table w-auto" aria-labelledby="filterDashboard">
                <li className='w-100 py-2'>
                    <div className="form-check text-end me-3">
                        {/* <Link to='/edit-data-asset-non-it' className="form-check-label fs-5"> */}
                            Edit
                            <i className='bi bi-pencil-fill mx-2'></i>
                        {/* </Link> */}
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
export const status = (param) => {
    var bg = 'badge text-capitalize p-2 fw-bold bg-info'
    if(param.row.status === 'close') {
        bg = 'badge text-capitalize p-2 fw-bold bg-danger'
    }

    return (
        <div className={bg}>
            {param.row.status}
        </div>
    )
}

class Table extends Component {

    render() {

        const rows = [
            { id: 1, title: 'Licensi Windows', description: 'Mohon disediakan installer untuk Windows terbaru', date: '23 July 2022 15:30:30', user_name: 'Rahmat', status: 'open' },
            { id: 2, title: 'Licensi Windows', description: 'Mohon disediakan installer untuk Windows terbaru', date: '23 July 2022 15:30:30', user_name: 'Rahmat', status: 'open' },
            { id: 3, title: 'Licensi Windows', description: 'Mohon disediakan installer untuk Windows terbaru', date: '23 July 2022 15:30:30', user_name: 'Rahmat', status: 'close' },
            { id: 4, title: 'Licensi Windows', description: 'Mohon disediakan installer untuk Windows terbaru', date: '23 July 2022 15:30:30', user_name: 'Rahmat', status: 'open' },
            { id: 5, title: 'Licensi Windows', description: 'Mohon disediakan installer untuk Windows terbaru', date: '23 July 2022 15:30:30', user_name: 'Rahmat', status: 'open' },
        ];

        // const rows = (this.props.dataLocation) ? this.props.dataLocation : this.state.dataLocation
        // const isLoading = (this.props.isLoading) ? this.props.isLoading : this.state.isLoading
        const isLoading = false

        const columns = [
            {
                field: 'id',
                headerName: 'No',
                width: 50,
                type: 'number'
            },
            {
                field: 'title',
                headerName: 'Title',
                width: 200,
            },
            {
                field: 'description',
                headerName: 'Description',
                width: 200,
            },
            {
                field: 'date',
                headerName: 'Date',
                width: 200,
            },
            {
                field: 'user_name',
                headerName: 'User Name',
                width: 200,
            },
            {
                field: 'status',
                headerName: 'Status',
                renderCell: status,
                width: 100,
            },
            {
                field: '',
                headerName: 'Action',
                width: 70,
                renderCell: editLink,
                sortable: false
            }
        ];


        return (
            <div className='card shadow-none border-1' >

                <div className='card-body'>
                    {/* Table */}

                    <div>
                        <Box sx={{
                            height: 450,
                            width: '100%'
                        }}>
                            <DataGrid
                                sx={{
                                    boxShadow: 0,
                                    border: 0,
                                }}
                                loading={isLoading}
                                disableColumnMenu
                                disableColumnFilter
                                disableColumnSelector
                                disableColumnButton
                                disableDensitySelector
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

export default Table