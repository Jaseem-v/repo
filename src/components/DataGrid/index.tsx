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
    MenuItem, Menu, MenuList, Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControlLabel
} from '@mui/material'

import { EditOutlined, DeleteOutline, FilterOutlined } from '@mui/icons-material'

import React, { useEffect, useRef, useState } from 'react'

import Scrollbar from 'src/components/Scrollbar'

import Components from './ComponentType'
import { checkTargetForNewValues } from 'framer-motion';


let operators: { [key: string]: (a: any, b: any) => boolean } = {
    '==': (a: any, b: any) => a == b,
    '>': (a: any, b: any) => a > b,
    '<': (a: any, b: any) => a < b,
}


function AddEditDrawer({ open, schema, value, onClose, onSave }: { value: {}, schema: [TableSchemaI], open: boolean, onClose: () => void, onSave: (e: any) => void }) {

    const [Value, setValue] = useState(value)

    useEffect(() => {
        setValue(value)
    }, [value])

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
                        //console.log(value&&value[eSchema.field],"e",eSchema.field,value);

                        return (
                            <div key={eSchema.field}>
                                {React.createElement(Components[eSchema.type].control, { ...eSchema, onChange: (val: any) => { setValue(e => ({ ...e, [eSchema.field]: val })) }, value: Value ? Value[eSchema.field] : null }, null)}
                            </div>
                        )
                    }


                })}

                <Button onClick={() => { onSave(Value) }}>
                    Save
                </Button>
            </Container>
        </Drawer>
    )
}

function FilterMenu({ OpenFil, setOpenFil, Filter, setFilter, FilterRef }: { OpenFil: boolean, setOpenFil: () => void, Filter: FilterI[], setFilter: any, FilterRef: any }) {


    return (
        <>
            <Menu anchorEl={FilterRef.current} onClose={() => { setOpenFil(false) }} open={OpenFil}>
                {Filter.map(fl => (
                    <Accordion>
                        <AccordionSummary>{fl.key}</AccordionSummary>
                        <AccordionDetails>
                            {fl.matches.map((eMatch, i) => (

                                <FormControlLabel
                                    label={eMatch.label}
                                    control={<Checkbox
                                        checked={eMatch.active}
                                        onChange={
                                            (e) => {
                                                setFilter((_fl: any) => {
                                                    let _ = _fl.map((_efl) => {
                                                        if (_efl.key == fl.key) {
                                                            _efl.matches[i].active = !(eMatch.active)
                                                        }
                                                        return _efl
                                                    })

                                                    return _

                                                })

                                            }
                                        }

                                    />}

                                />

                            ))}
                        </AccordionDetails>
                    </Accordion>

                )


                )}
            </Menu></>)
}

export default function Index(props: { rows: any, columns: any, pageSize?: number, rowsPerPageOptions?: [number], filters: FilterI[], checkboxSelection?: boolean }) {
    let { rows, columns, filters = [], checkboxSelection = true, pageSize = 5, rowsPerPageOptions = [5] } = props

    const [_rows, set_rows] = useState(rows)
    const [Selected, setSelected] = useState([])

    const [Search, setSearch] = useState("")

    const [OpenDrawer, setOpenDrawer] = useState(false)
    const [ID, setID] = useState(null)

    const [Filter, setFilter] = useState<FilterI[]>(filters)

    const [OpenFil, setOpenFil] = useState(true)

    const FilterRef = useRef(null)


    function FilteredData(Rows: []) {
        return Rows.filter((row) => {

            let ActFilter: FilterI[] = Filter.map((_fl) => ({
                ..._fl,
                matches:
                _fl.matches.filter((_match) => _match.active)
            })
            ).filter(e => e.matches.length)

            if (ActFilter.length == 0) {
                return Rows
            }

            console.log(ActFilter, "wqwer");

            for (let efl of ActFilter) {
                let key = efl.key
                let mt = efl.matches

                let matches = mt.some(e => operators[e.op](row[key], e.with))

                if (matches) {
                    return true
                }


            }

        })
    }


    let SearchStr = function (Rows: []) {
        let keys: [string] = ["firstName"]
        if (Search == "") {
            return Rows
        } else {
            var lowSearch = Search.toLowerCase();
            return Rows.filter((_row: any) =>
                keys.some(key =>
                    String(_row[key]).toLowerCase().includes(lowSearch)
                )
            );
        }

    }



    return (
        <Scrollbar>
            <Stack direction="row" spacing={2}>

                <TextField onChange={(e) => {
                    setSearch(e.target.value);
                }} size="small" label="search"></TextField>
                <Button onClick={() => { setOpenFil(true) }} ref={FilterRef} variant="outlined" size="small" startIcon={<FilterOutlined fontSize='small' />}>Add Filter</Button>

                <FilterMenu OpenFil={OpenFil} FilterRef={FilterRef} setOpenFil={setOpenFil} Filter={Filter} setFilter={setFilter} />
            </Stack>
            <div style={{ width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        {columns.map((e: TableSchemaI) => <TableCell>{e.label} </TableCell>)}
                    </TableHead>
                    <TableBody>
                        {SearchStr(FilteredData(_rows)).map((row: any, i: number) =>

                        (

                            <TableRow key={"row" + i}>
                                <TableCell width={25}>
                                    <IconButton size="small" onClick={() => {
                                        setOpenDrawer(true)
                                        setID(row._id)


                                    }}>
                                        <EditOutlined fontSize='small' />
                                    </IconButton >
                                </TableCell>
                                <TableCell width={25}>
                                    <IconButton size="small">
                                        <DeleteOutline fontSize='small' />
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
            <AddEditDrawer onSave={(res) => {
                //if ID, save changes on raw with the ID 
                if (ID) {
                    set_rows((data: [any]) => {
                        let _ = [...data]
                        let Ind: number = _.findIndex((e: any) => e._id == ID)
                        _[Ind] ? _[Ind] = res : console.error("Errs");
                        return _
                    })
                } else {
                    ///add New Raw
                    set_rows((data: []) => [...data, res])
                }
                setOpenDrawer(false)
                setID(null)

            }} value={ID ? _rows.find((e: any) => e._id == ID) : null} onClose={() => { setOpenDrawer(false); setID(null) }} schema={columns} open={OpenDrawer} />
        </Scrollbar>
    )
}



export type FilterI = {
    key: string,
    matches: [{
        active?: boolean,
        label: string,
        op: string,
        with: any
    }]
}

export type TableSchemaI = {
    field: string;
    type: string;
    label?: string;
    renderCell?: (e: { value: string }) => React.ElementType
}