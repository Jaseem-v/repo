import * as React from 'react';
import { useState, useMemo } from 'react';
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
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { TableMoreMenu, TableHeadCustom } from '../../../components/table';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { FormProvider } from 'src/components/hook-form';
import { CompanyRegistrationSchema, OwnerPopupSchema } from '../common/CompanyRegistrationSchema';
import { OwnerPopup } from './common/TablePopupComponents';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TablePopup from './common/TablePopup';
// ----------------------------------------------------------------------

type RowProps = {
  ownerName: string,
  place_of_work: string,
  unified_no: number,
  notes: string,
  // status: string,
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;


}

export default function OwnerTable({
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
    ownerName: "",
    ownerName_ar: "",
    position: "",
    unified_code: "",
    work_place: "",
    work_place_ar: "",
  }), [])

  const methods = useForm({
    resolver: yupResolver(OwnerPopupSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    if (Object.keys(errors).length === 0) {
      handleClose()
      enqueueSnackbar('Successfully Added', { variant: 'success' })
      reset(defaultValues)
    }

  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };




  return (
    <Card {...other}>

      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
        <Button variant='contained' color="primary" style={{ marginRight: "1rem" }} onClick={handleClickOpen}>
          + Add New
        </Button>
      </Stack>
      {/* ---- */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .css-y4brsv-MuiPaper-root-MuiDialog-paper': { maxWidth: "700px" },
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <TablePopup handleClose={handleClose}>
            <OwnerPopup />
          </TablePopup>
        </FormProvider>
      </Dialog>
      {/* ---- */}
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>

            <TableHeadCustom headLabel={tableLabels} />
            <TableBody>
              {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                <InfoTableRow row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          {tableData.length > 5 &&
            <TablePagination
              component="div"
              count={tableData.length}
              rowsPerPage={5}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />}
        </Paper>

      </Box>


    </Card >
  );
}

// ----------------------------------------------------------------------

type InfoTableRowProps = {
  row: RowProps;
};

function InfoTableRow({ row }: InfoTableRowProps) {
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

      {
        Object.values(row).map((el) => {
          return (
            <TableCell>{el}</TableCell>
          )
        })
      }

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



