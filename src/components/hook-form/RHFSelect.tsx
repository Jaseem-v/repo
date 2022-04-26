// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  children: any;
  edit: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFSelect({ name, children, edit, ...other }: Props) {
  // const { control } = useFormContext();

  return (
    // <Controller
    //   name={name}
    //   control={control}
    //   render={({ field, fieldState: { error } }) => (
    <TextField
      // {...field}
      select
      fullWidth
      SelectProps={{ native: true }}
      // error={!!error}
      // helperText={error?.message}
      {...other}

      disabled={!edit}
    >
      {children}
    </TextField>
    // )}
    // />
  );
}
