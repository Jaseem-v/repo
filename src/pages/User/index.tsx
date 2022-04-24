import { Container, IconButton } from '@mui/material';
import React from 'react'
import Page from 'src/components/Page';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DataGrid, { TableSchemaI } from 'src/components/DataGrid'



const columns: TableSchemaI[] = [
    {
        field: "_id",
        label: "ID",
        type: "ID"
    },
    {
        field: "lastName",
        label: "lastName",
        type: "Text"
    },
    {
        field: "firstName",
        label: "firstName",
        type: "Text"
    },
];

const rows = [
    { _id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { _id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { _id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { _id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { _id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { _id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { _id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { _id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { _id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Test() {
    return (
        <Page title='TestTable'>
            <Container>
                <DataGrid columns={columns} rows={rows} />
            </Container>

        </Page>
    )
}
