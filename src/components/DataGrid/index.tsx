import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    TextField,
    FormControl,
    Button,
    Stack,
    Drawer,
    Container,
} from '@mui/material'

import { EditOutlined, DeleteOutline, FilterOutlined } from '@mui/icons-material'

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useState } from 'react'
import Scrollbar from 'src/components/Scrollbar'

import Components from './ComponentType'
import { checkTargetForNewValues } from 'framer-motion';

function AddEditDrawer({ open, schema, value, onClose }: { value: {}, schema: [TableSchemaI], open: boolean, onClose: () => void }) {


    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Container>
                {schema.map((eSchema: TableSchemaI) => {
                    if (!Components.hasOwnProperty(eSchema.type)) {
                        return (
                            <div key={eSchema.field}>
                                No Element Found
                            </div>
                        )
                    } else {
                        console.log(value&&value[eSchema.field],"e",eSchema.field,value);
                        
                        return (
                            <div key={eSchema.field}>
                                {React.createElement(Components[eSchema.type].control, {...eSchema,value:value?value[eSchema.field]:{}}, null)}
                            </div>
                        )
                    }


                })}
            </Container>
        </Drawer>
    )
}



export default function Index(props: { rows: any, columns: any, pageSize?: number, rowsPerPageOptions?: [number], checkboxSelection?: boolean }) {
    let { rows, columns, checkboxSelection = true, pageSize = 5, rowsPerPageOptions = [5] } = props

    const [_rows, set_rows] = useState(rows)
    const [Selected, setSelected] = useState([])

    const [OpenDrawer, setOpenDrawer] = useState(false)
    const [ID, setID] = useState(null)
    console.log(_rows);

    return (
        <Scrollbar>
            <Stack direction="row" spacing={2}>

                <TextField size="small" label="search"></TextField>
                <Button variant="outlined" startIcon={<FilterOutlined />}>Add Filter</Button>

            </Stack>
            <div style={{ width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        {columns.map((e: TableSchemaI) => <TableCell>{e.label} </TableCell>)}
                    </TableHead>
                    <TableBody>
                        {_rows.map((row: any, i: number) =>

                        (

                            <TableRow key={"row" + i}>
                                <TableCell width={25}>
                                    <IconButton onClick={()=>{
                                        setOpenDrawer(true)
                                        setID(row._id)
                                        console.log(row._id,"qqq");
                                        
                                        
                                    }}>
                                        <EditOutlined />
                                    </IconButton>
                                </TableCell>
                                <TableCell width={25}>
                                    <IconButton>
                                        <DeleteOutline />
                                    </IconButton>
                                </TableCell>

                                {
                                    columns.map((clm: any) =>
                                        <TableCell key={clm.field}>{row[clm.field]} </TableCell>


                                    )
                                }
                            </TableRow>

                        )

                        )}
                    </TableBody>
                </Table>
            </div>
            <AddEditDrawer value={ID ? _rows.find((e: any) => e._id == ID) : null} onClose={() => { setOpenDrawer(false) }} schema={columns} open={OpenDrawer} />
        </Scrollbar>
    )
}





export type TableSchemaI = {
    field: string;
    type: string;
    label?: string;
    renderCell?: (e: { value: string }) => React.ElementType
}