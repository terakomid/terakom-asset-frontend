import React, { Component } from 'react'

// import axios from 'axios'

import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';

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
                    <div style={{ height: 400, width: '100%', id: 1 }}>
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
        field: 'name',
        headerName: 'User Name',
        width: 200,
    },
    {
        field: 'type_activity',
        headerName: 'Type Activity',
        width: 150,
    },
    {
        field: 'activity',
        headerName: 'Activity',
        width: 150,
    },
    {
        field: 'data',
        headerName: 'Data',
        width: 250,
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
    },
    {
        field: 'ip_address',
        headerName: 'IP Adress',
        width: 150,
    },
    {
        field: 'browser',
        headerName: 'Browser',
        width: 200,
    },
    {
        field: 'os',
        headerName: 'Operating System',
        width: 150,
    },
];

const rows = [
    { id: 1, name: 'Bambang Priadi', type_activity: 'Tambah', activity: 'Tambah Data Asset', data: 'Asset Code 3300/014/16/VI22/2593 | Printer', date: '30 Mei 2022 15:30:00', ip_address: '127.0.0.1', browser: 'Google Chrome 101.4', os: 'Windows'  },
    { id: 2, name: 'Bambang Priadi', type_activity: 'Tambah', activity: 'Tambah Data Asset', data: 'Asset Code 3300/014/16/VI22/2593 | Printer', date: '30 Mei 2022 15:30:00', ip_address: '127.0.0.1', browser: 'Google Chrome 101.4', os: 'Windows'  },
    { id: 3, name: 'Bambang Priadi', type_activity: 'Tambah', activity: 'Tambah Data Asset', data: 'Asset Code 3300/014/16/VI22/2593 | Printer', date: '30 Mei 2022 15:30:00', ip_address: '127.0.0.1', browser: 'Google Chrome 101.4', os: 'Windows'  },
    { id: 4, name: 'Bambang Priadi', type_activity: 'Tambah', activity: 'Tambah Data Asset', data: 'Asset Code 3300/014/16/VI22/2593 | Printer', date: '30 Mei 2022 15:30:00', ip_address: '127.0.0.1', browser: 'Google Chrome 101.4', os: 'Windows'  },
    { id: 5, name: 'Bambang Priadi', type_activity: 'Tambah', activity: 'Tambah Data Asset', data: 'Asset Code 3300/014/16/VI22/2593 | Printer', date: '30 Mei 2022 15:30:00', ip_address: '127.0.0.1', browser: 'Google Chrome 101.4', os: 'Windows'  },
];

export default Table