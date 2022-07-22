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
    var bg = 'badge text-capitalize p-2 fw-bold bg-success'
    if(param.row.status === 'waiting approval') {
        bg = 'badge text-capitalize p-2 fw-bold bg-warning'
    }
    if(param.row.status === 'approval rejected') {
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
            { id: 1, created_date: '30 Oktober 2022 16:00:00', sk_number: '007/SK/Hapus/11/2022', informarion: 'Dihapus karena asset sudah rusak', supporting_docucment: 'doc.doc', amount_delete: 1, total_value: '3.500.000', updated_date: '01 November 2022 13:00:00', status: 'approval disetujui' },
            { id: 2, created_date: '30 Oktober 2022 16:00:00', sk_number: '007/SK/Hapus/11/2022', informarion: 'Dihapus karena asset sudah rusak', supporting_docucment: 'doc.doc', amount_delete: 1, total_value: '3.500.000', updated_date: '01 November 2022 13:00:00', status: 'approval rejected' },
            { id: 3, created_date: '30 Oktober 2022 16:00:00', sk_number: '007/SK/Hapus/11/2022', informarion: 'Dihapus karena asset sudah rusak', supporting_docucment: 'doc.doc', amount_delete: 1, total_value: '3.500.000', updated_date: '01 November 2022 13:00:00', status: 'approval disetujui' },
            { id: 4, created_date: '30 Oktober 2022 16:00:00', sk_number: '007/SK/Hapus/11/2022', informarion: 'Dihapus karena asset sudah rusak', supporting_docucment: 'doc.doc', amount_delete: 1, total_value: '3.500.000', updated_date: '01 November 2022 13:00:00', status: 'waiting approval' },
            { id: 5, created_date: '30 Oktober 2022 16:00:00', sk_number: '007/SK/Hapus/11/2022', informarion: 'Dihapus karena asset sudah rusak', supporting_docucment: 'doc.doc', amount_delete: 1, total_value: '3.500.000', updated_date: '01 November 2022 13:00:00', status: 'approval disetujui' },
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
                field: 'created_date',
                headerName: 'Created Date',
                width: 200,
            },
            {
                field: 'sk_number',
                headerName: 'SK Number',
                width: 200,
            },
            {
                field: 'informarion',
                headerName: 'Informarion',
                width: 250,
            },
            {
                field: 'supporting_docucment',
                headerName: 'Supporting Docucment',
                width: 200,
            },
            {
                field: 'amount_delete',
                headerName: 'Amount Delete',
                width: 150,
            },
            {
                field: 'total_value',
                headerName: 'Total Value',
                width: 200,
            },
            {
                field: 'updated_date',
                headerName: 'Updated Date',
                width: 200,
            },
            {
                field: 'status',
                headerName: 'Status',
                renderCell: status,
                width: 150,
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