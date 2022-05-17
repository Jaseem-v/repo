import { useState, useMemo, useEffect } from 'react';
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
    TablePagination,
    Box,
} from '@mui/material';
import Paper from '@mui/material/Paper';

// utils

// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { TableMoreMenu, TableHeadCustom } from '../../../components/table';
import { ContractDetails } from 'src/pages/company/common/FormComponents';


import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { FormProvider } from 'src/components/hook-form';
import { CompanyRegistrationSchema, NatinalityPopupSchema } from '../common/CompanyRegistrationSchema';
import { AuthorisedSignaturePopup, NationalitiesWorkingPopup, OwnerPopup, StaffListPopup } from './common/TablePopupComponents';
import TablePopup from './common/TablePopup';
// ----------------------------------------------------------------------

type RowProps = {
    number: number,
    country: string
    notes: string,
    // status: string,
};

interface Props extends CardProps {
    title?: string;
    subheader?: string;
    tableData: RowProps[];
    tableLabels: any;


}

export interface NationalityFormValue {
    number: string,
    nationality: { code: string, label: string, phone: string },
}


export default function NationalitiesWorkingTable({
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
        number: '',
        nationality: { code: "", label: "", phone: "" },
    }), [])

    const methods = useForm({
        resolver: yupResolver(NatinalityPopupSchema),
        defaultValues,
    })

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        reset, setValue, getValues
    } = methods;

    console.log("errors", errors);

    useEffect(() => {
        if (errors) {
            console.log("hello");

            if (errors.nationality) {
                if (errors.nationality?.code) {
                    // errors.nationality.message = "Please"
                    console.log("hello");

                }

            }
        }

    }, [])

    const onSubmit = (data: any) => {

        handleClose()
        enqueueSnackbar('Successfully Added', { variant: 'success' })
        reset(defaultValues)

    }
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
                        <NationalitiesWorkingPopup getValue={getValues} setValue={setValue} />
                    </TablePopup>

                </FormProvider>
            </Dialog>
            {/* ---- */}
            <Scrollbar>
                <TableContainer sx={{ minWidth: 720 }}>
                    <Table>

                        <TableHeadCustom headLabel={tableLabels} />
                        <TableBody>
                            {tableData.map((row, i) => (
                                <InfoTableRow key={i} row={row} />
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

            {/* <TableCell>
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
      </TableCell> */}

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

