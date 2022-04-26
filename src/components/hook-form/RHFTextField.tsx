// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  lang:string
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({ name,lang ,...other }: Props) {
  // const { control } = useFormContext();

  return (
    // <Controller
    // name={name}
    // control={control}
    // render={({ field, fieldState: { error } }) => (
    <TextField  {...other} style={{ width: "100%" }} dir={lang === "arb" ? "rtl" : "ltr"} required />
    // )}
    // />
  );
}
