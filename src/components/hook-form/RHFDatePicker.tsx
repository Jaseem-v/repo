// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';


// ----------------------------------------------------------------------

type IProps = {
    name: string;
    isEdit?: boolean
};

type Props = IProps & TextFieldProps;

export default function RHFDatePicker({ name, isEdit, ...other }: Props) {
    const { control } = useFormContext();
    const today = new Date();


    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <DatePicker
                    value={field.value}
                    onChange={(newValue) => {
                        field.onChange(newValue);
                    }}
                    minDate={today}
                    disabled={{ ...other }.disabled}
                    renderInput={(params) => (
                        <TextField {...params} fullWidth error={!!error} helperText={error?.message} {...other} />
                    )}
                />
            )}
        />
    );
}
