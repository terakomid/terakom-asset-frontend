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
            { id: 1, uid: 1, code: '2020/FA/65d1/ID08/2000001031', sap_code: '2000001031', name: 'Computer 1', category: 'ID08 - Computers', capitalize_on: '22 Juli 2022', useful_life: '48 Bulan', usage_limit: '2 Tahun', usage_periode: '1 Bulan 12 Hari', acquisition: '15.0000.000' },
            { id: 2, uid: 2, code: '2020/FA/65d1/ID08/2000001032', sap_code: '2000001032', name: 'Computer 2', category: 'ID08 - Computers', capitalize_on: '22 Juli 2022', useful_life: '48 Bulan', usage_limit: '2 Tahun', usage_periode: '1 Bulan 12 Hari', acquisition: '15.0000.000' },
            { id: 3, uid: 3, code: '2020/FA/65d1/ID08/2000001033', sap_code: '2000001033', name: 'Computer 3', category: 'ID08 - Computers', capitalize_on: '22 Juli 2022', useful_life: '48 Bulan', usage_limit: '2 Tahun', usage_periode: '1 Bulan 12 Hari', acquisition: '15.0000.000' },
            { id: 4, uid: 4, code: '2020/FA/65d1/ID08/2000001034', sap_code: '2000001034', name: 'Computer 4', category: 'ID08 - Computers', capitalize_on: '22 Juli 2022', useful_life: '48 Bulan', usage_limit: '2 Tahun', usage_periode: '1 Bulan 12 Hari', acquisition: '15.0000.000' },
            { id: 5, uid: 5, code: '2020/FA/65d1/ID08/2000001035', sap_code: '2000001035', name: 'Computer 5', category: 'ID08 - Computers', capitalize_on: '22 Juli 2022', useful_life: '48 Bulan', usage_limit: '2 Tahun', usage_periode: '1 Bulan 12 Hari', acquisition: '15.0000.000' },
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
                field: 'code',
                headerName: 'Code Asset',
                width: 250,
            },
            {
                field: 'sap_code',
                headerName: 'SAP Code',
                width: 150,
            },
            {
                field: 'name',
                headerName: 'Asset Name',
                width: 200,
            },
            {
                field: 'category',
                headerName: 'Category Asset',
                width: 150,
            },
            {
                field: 'capitalize_on',
                headerName: 'Capitalize On',
                width: 150,
            },
            {
                field: 'useful_life',
                headerName: 'Useful Life',
                width: 150,
            },
            {
                field: 'usage_limit',
                headerName: 'Usage Limit',
                width: 150,
            },
            {
                field: 'usage_periode',
                headerName: 'Usage Periode',
                width: 150,
            },
            {
                field: 'acquisition',
                headerName: 'Acquisition Value',
                width: 150,
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
                <div className='row'>
                    <div className='col-xl-12'>
                        <div className='print-label d-flex justify-content-end'>
                            <Link to='/add-queue' variant="contained" className='btn btn-sm btn-primary text-capitalize text-white fw-bold mt-3 mx-2' >add to queue</Link>
                            <Link to='/show-detail' variant="contained" className='btn btn-sm btn-primary text-capitalize text-white fw-bold mt-3 mx-2' >show-detail</Link>
                        </div>
                    </div>
                </div>
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