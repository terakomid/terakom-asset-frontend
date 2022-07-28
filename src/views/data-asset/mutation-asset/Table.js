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
            { id: 1, uid: 1, code: '2020/FA/65d1/ID08/2000001031', pic: 'Abdul Ali', receiver: 'Raka', name: 'Notebook', quantity: '1', from_branch: '65D1 - HO Jakarta', from_room: 'Meeting Room', to_branch: '651A - Cikarang', to_room: 'Office Room', },
            { id: 2, uid: 2, code: '2020/FA/65d1/ID08/2000001032', pic: 'Abdul Ali', receiver: 'Raka', name: 'Notebook', quantity: '1', from_branch: '65D1 - HO Jakarta', from_room: 'Meeting Room', to_branch: '651A - Cikarang', to_room: 'Office Room', },
            { id: 3, uid: 3, code: '2020/FA/65d1/ID08/2000001033', pic: 'Abdul Ali', receiver: 'Raka', name: 'Notebook', quantity: '1', from_branch: '65D1 - HO Jakarta', from_room: 'Meeting Room', to_branch: '651A - Cikarang', to_room: 'Office Room', },
            { id: 4, uid: 4, code: '2020/FA/65d1/ID08/2000001034', pic: 'Abdul Ali', receiver: 'Raka', name: 'Notebook', quantity: '1', from_branch: '65D1 - HO Jakarta', from_room: 'Meeting Room', to_branch: '651A - Cikarang', to_room: 'Office Room', },
            { id: 5, uid: 5, code: '2020/FA/65d1/ID08/2000001035', pic: 'Abdul Ali', receiver: 'Raka', name: 'Notebook', quantity: '1', from_branch: '65D1 - HO Jakarta', from_room: 'Meeting Room', to_branch: '651A - Cikarang', to_room: 'Office Room', },
        ];
        
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
                width: 250,
            },
            {
                field: 'receiver',
                headerName: 'Receiver Name',
                width: 150,
            },
            {
                field: 'code',
                headerName: 'Asset Code',
                width: 200,
            },
            {
                field: 'name',
                headerName: 'Asset Name',
                width: 150,
            },
            {
                field: 'quantity',
                headerName: 'Quantity',
                width: 100,
            },
            {
                field: 'from_branch',
                headerName: 'From Branch',
                width: 150,
            },
            {
                field: 'from_room',
                headerName: 'From Room',
                width: 150,
            },
            {
                field: 'to_branch',
                headerName: 'To Branch',
                width: 150,
            },
            {
                field: 'to_room',
                headerName: 'To Room',
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