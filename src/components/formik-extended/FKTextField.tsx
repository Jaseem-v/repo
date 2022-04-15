import { useField } from 'formik'
import { TextField, TextFieldProps } from '@mui/material'


type props = {
    name: string
}

export default function FKTextField({ name, ...others }: props & TextFieldProps) {

    const [field, meta, helpers] = useField(name)

    return (
        <TextField
            {...field}
            {...others}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            {...helpers}
        />
    )
}