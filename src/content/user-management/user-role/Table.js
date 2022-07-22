import React, { Component } from 'react'

// import axios from 'axios'

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

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
        field: 'role',
        headerName: 'Role',
        width: 480,
    },
];

const rows = [
    { id: 1, role: 'IT'},
    { id: 2, role: 'GA'},
    { id: 3, role: 'Admin Department'},
    { id: 4, role: 'Staff'},
];

export default Table