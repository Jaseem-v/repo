import { useState } from "react"

// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui

import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  lang?: string;
  value?: string;
  edit?: boolean;
};

type Props = IProps & TextFieldProps;

export default function RHFTextField({ name, lang, value, edit, ...other }: Props) {
  // const { control } = useFormContext();
  const [values, setvalue] = useState<string | undefined>(value)



  return (
    // <Controller
    // name={name}
    // control={control}
    // render={({ field, fieldState: { error } }) => (
    <TextField value={values ? values : ""}  {...other}
      style={{ width: "100%" }}
      dir={lang === "arb" ? "rtl" : "ltr"}
      required
      disabled={!edit}
      onChange={e => setvalue(e.target.value)} />
    // )}
    // />
  );
}
