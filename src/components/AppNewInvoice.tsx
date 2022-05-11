import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
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
} from '@mui/material';
// utils
import { fCurrency } from '../utils/formatNumber';
// components
import Label from './Label';
import Iconify from './Iconify';
import Scrollbar from './Scrollbar';
import { TableMoreMenu, TableHeadCustom } from './table';

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

export default function AppNewInvoice({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems="center"
            >
              <TableHeadCustom headLabel={tableLabels} />
            </Stack>
            <TableBody>
              {tableData.map((row) => (
                <AppNewInvoiceRow key={row.Contract_Purpose} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          View All
        </Button>
      </Box>
    </Card>
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
