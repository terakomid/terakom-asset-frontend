import React, { Component } from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

class Table extends Component {
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
                                filterIcon='false'
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
        width: 100,
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
    }
];

const rows = [
    { id: 1, code: '65D1A', location: 'Jon', parent: 'Jakarta' },
    { id: 2, code: '65D1', location: 'Cersei', parent: '-' },
    { id: 3, code: '65D4A', location: 'Jaime', parent: '-' },
    { id: 4, code: '65D4', location: 'Arya', parent: 'Bandung' },
    { id: 5, code: '65DA', location: 'Daenerys', parent: '-' },
    { id: 6, code: '65D4A', location: 'Jaime', parent: '-' },
    { id: 7, code: '65D4', location: 'Arya', parent: 'Bandung' },
    { id: 8, code: '65DA', location: 'Daenerys', parent: '-' },
    { id: 9, code: '65D4A', location: 'Jaime', parent: '-' },
    { id: 10, code: '65D4', location: 'Arya', parent: 'Bandung' }
];

export default Table