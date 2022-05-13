import { useState, useMemo } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  TableContainer,
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
// utils

// components
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { TableMoreMenu, TableHeadCustom } from '../../components/table';
import { ContractDetails } from 'src/pages/company/common/FormComponents';


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { FormProvider } from 'src/components/hook-form';
import { CompanyRegistrationSchema } from './common/CompanyRegistrationSchema';
// ----------------------------------------------------------------------

type RowProps = {
  Contract_Purpose: string,
  employee_required: number,
  reliever_count: number,
  contract_no: string,
  status: string,
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;


}

export default function TableComponent({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}: Props) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues)
  };


  const defaultValues = useMemo(() => ({
    contract_purpose: '',
    contract_no: '',
    employee_required: '',
    reliever_count: '',
  }), [])

  const methods = useForm({
    resolver: yupResolver(CompanyRegistrationSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = methods;

  const onSubmit = (data: any) => {

    handleClose()
    enqueueSnackbar('Successfully Added', { variant: 'success' })
    reset(defaultValues)

  }

  return (
    <Card {...other}>

      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
        <Button variant='outlined' color="error" style={{ marginRight: "1rem" }} onClick={handleClickOpen}>
          add
        </Button>
      </Stack>
      {/* ---- */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

          {/* <DialogTitle id="alert-dialog-title">
            {"Add new Contract"}
          </DialogTitle> */}
          {/* <Divider /> */}

          <DialogContent>
            <ContractDetails isEdit={false} popup={true} />
          </DialogContent>
          <DialogActions style={{ paddingTop: "0" }}>
            <Button onClick={handleClose}>cancel</Button>
            <Button type="submit">
              Save
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
      {/* ---- */}
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>

            <TableHeadCustom headLabel={tableLabels} />
            <TableBody>
              {tableData.map((row) => (
                <AppNewInvoiceRow key={row.Contract_Purpose} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />



    </Card >
  );
}

// ----------------------------------------------------------------------

type AppNewInvoiceRowProps = {
  row: RowProps;
};

function AppNewInvoiceRow({ row }: AppNewInvoiceRowProps) {
  const theme = useTheme();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };





  return (
    <TableRow>
      <TableCell style={{ paddingLeft: "3.5rem" }}>{row.Contract_Purpose}</TableCell>

      <TableCell style={{ paddingLeft: "3.5rem" }}>{row.contract_no}</TableCell>

      <TableCell style={{ paddingLeft: "3.5rem" }}>{row.employee_required}</TableCell>

      <TableCell style={{ paddingLeft: "3.5rem" }}>{row.reliever_count}</TableCell>

      <TableCell>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (row.status === 'in_progress' && 'warning') ||
            (row.status === 'out_of_date' && 'error') ||
            'success'
          }
        >
          {sentenceCase(row.status)}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem >
                <Iconify icon={'dashicons:edit'} />
                Edit
              </MenuItem>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <MenuItem sx={{ color: 'error.main' }}>
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
// ---------------------------------------------------------

export function AlertDialog() {


  return (
    <div>

    </div>
  );
}