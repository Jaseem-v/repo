import { TextField } from '@mui/material';
import React from 'react'

let Comptypes: ComptypesI = {
    ID: {
        view: ({ value }: { value: any }) => (
            <div>{value} </div>
        ),
        control: (props: { label: string, value: any }) => (
            <div>
                id: <b>{props.value}</b>
            </div>
        )
    },
    Text: {
        view: ({ value }: { value: any }) => (
            <div>{value} </div>
        ),
        control: (props: { label: string, value: any }) => (
            <TextField  {...props}></TextField>
        )

    }
}
























type ComptypesI = {
    [key: string]: {
        view: React.ElementType,
        control: React.ElementType
    }
}
export default Comptypes;
