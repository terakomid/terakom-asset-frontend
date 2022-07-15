import React, { Component } from 'react';

import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { Link } from 'react-router-dom';

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
                        <Link to='/edit-data-asset-non-it' className="form-check-label fs-5">
                            Edit
                            <i className='bi bi-pencil-fill mx-2'></i>
                        </Link>
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

    render() {

        const rows = [
            { id: 1, uid: 1, code: '1035', pic: 'Abdul Ali', department: 'Logistik & Import', applicant_date: '8 June 2022', request_repair_date: '15 June 2022', request_finish_date: '17 June 2022' },
            { id: 2, uid: 2, code: '1035', pic: 'Abdul Ali', department: 'Logistik & Import', applicant_date: '8 June 2022', request_repair_date: '15 June 2022', request_finish_date: '17 June 2022' },
            { id: 3, uid: 3, code: '1035', pic: 'Abdul Ali', department: 'Logistik & Import', applicant_date: '8 June 2022', request_repair_date: '15 June 2022', request_finish_date: '17 June 2022' },
            { id: 4, uid: 4, code: '1035', pic: 'Abdul Ali', department: 'Logistik & Import', applicant_date: '8 June 2022', request_repair_date: '15 June 2022', request_finish_date: '17 June 2022' },
            { id: 5, uid: 5, code: '1035', pic: 'Abdul Ali', department: 'Logistik & Import', applicant_date: '8 June 2022', request_repair_date: '15 June 2022', request_finish_date: '17 June 2022' },
        ];

        // const rows = (this.props.dataLocation) ? this.props.dataLocation : this.state.dataLocation
        // const isLoading = (this.props.isLoading) ? this.props.isLoading : this.state.isLoading
        const isLoading = false

        const columns = [
            {
                field: 'uid',
                headerName: 'No',
                width: 50,
                type: 'number'
            },
            {
                field: 'pic',
                headerName: 'PIC Asset',
                width: 200,
            },
            {
                field: 'department',
                headerName: 'Department',
                width: 150,
            },
            {
                field: 'applicant_date',
                headerName: 'Applicant Date',
                width: 150,
            },
            {
                field: 'request_repair_date',
                headerName: 'Request Date Repair',
                width: 200,
            },
            {
                field: 'request_finish_date',
                headerName: 'Request Time To Finish',
                width: 200,
            },
            {
                field: 'id',
                headerName: ' ',
                width: 50,
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