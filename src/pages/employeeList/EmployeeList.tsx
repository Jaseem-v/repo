import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import {
    Box,
    Card,
    Table,
    Button,
    Switch,
    Tooltip,
    TableBody,
    Container,
    IconButton,
    TableContainer,
    TablePagination,
    FormControlLabel,
} from '@mui/material';
// redux
// import { useDispatch, useSelector } from '../../redux/store';
// import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// @types
import { emList, Product } from '../../@types/product';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
    TableNoData,
    TableSkeleton,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedActions,
} from '../../components/table';
// sections

import
ProductTableRow
    from './product-list/ProductTableRow';
import
ProductTableToolbar
    from './product-list/ProductTableToolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Employee Name', align: 'left', },
    { id: 'uid', label: 'Uid', align: 'left', },
    { id: 'company', label: 'Company', align: 'left', },
    { id: 'referance', label: 'Referance No', align: 'left', },
    { id: 'pass_duration', label: 'Pass Duration', align: 'left', },
    { id: 'status', label: 'Status', align: 'left', width: 280 },
    { id: 'createdAt', label: 'Create at', align: 'left' },
    { id: '' },
];

const products = [
    {
        name: "Test 1",
        uid: "5789",
        // id: "122",
        company: "Floges",
        referance_no: "565656",
        pass_duration: "1 Year ",
        status: "MOPA Approval - Company Notified",
        createdAt: "9/16/21, 10:12 AM",
    },
    {
        name: "neymar",
        uid: "5789456",
        // id: "122",
        company: "Floges",
        referance_no: "565656",
        pass_duration: "1 Year ",
        status: "MOPA Approval - Company Notified",
        createdAt: "9/16/21, 10:12 AM",
    },
    {
        name: "messi",
        uid: "578967",
        // id: "122",
        company: "Floges",
        referance_no: "565656",
        pass_duration: "1 Year ",
        status: "MOPA Approval - Company Notified",
        createdAt: "9/16/21, 10:12 AM",
    },

]

// ----------------------------------------------------------------------

export default function EmployeeList() {
    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        //
        selected,
        setSelected,
        onSelectRow,
        onSelectAllRows,
        //
        onSort,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable({
        defaultOrderBy: 'createdAt',
    });

    const { themeStretch } = useSettings();

    const navigate = useNavigate();

    // const dispatch = useDispatch();

    // const { products, isLoading } = useSelector((state) => state.product);

    const [tableData, setTableData] = useState<emList[]>([]);

    const [filterName, setFilterName] = useState('');

    // useEffect(() => {
    //     // dispatch(getProducts());
    // }, [dispatch]);




    useEffect(() => {
        // if (products.length) {
        setTableData(products);
        // }
    }, [products]);

    const handleFilterName = (filterName: string) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleDeleteRow = (id: string) => {
        const deleteRow = tableData.filter((row) => row.uid !== id);
        setSelected([]);
        setTableData(deleteRow);
    };

    const handleDeleteRows = (selected: string[]) => {
        const deleteRows = tableData.filter((row) => !selected.includes(row.uid));
        setSelected([]);
        setTableData(deleteRows);
    };

    const handleEditRow = (id: string) => {
        navigate(PATH_DASHBOARD.eCommerce.edit(paramCase(id)));
    };

    const dataFiltered = applySortFilter({
        tableData,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const denseHeight = dense ? 60 : 80;

    const isNotFound = (!dataFiltered.length && !!filterName) || (!dataFiltered.length);

    return (
        <Page title="Employee List">
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <HeaderBreadcrumbs
                    heading="Employee List"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {
                            name: 'Employee',
                            href: PATH_DASHBOARD.eCommerce.root,
                        },
                        { name: 'Employee List' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            component={RouterLink}
                            to={"/dashboard/add-new-employee"}
                        >
                            New Employee
                        </Button>
                    }
                />

                <Card>
                    <ProductTableToolbar filterName={filterName} onFilterName={handleFilterName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
                            {selected.length > 0 && (
                                <TableSelectedActions
                                    dense={dense}
                                    numSelected={selected.length}
                                    rowCount={tableData.length}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            tableData.map((row) => row.uid)
                                        )
                                    }
                                    actions={
                                        <Tooltip title="Delete">
                                            <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                                                <Iconify icon={'eva:trash-2-outline'} />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                />
                            )}

                            <Table size={dense ? 'small' : 'medium'}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={tableData.length}
                                    numSelected={selected.length}
                                    onSort={onSort}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            tableData.map((row) => row.uid)
                                        )
                                    }
                                />

                                <TableBody>
                                    {(dataFiltered)
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) =>
                                            row ? (
                                                <ProductTableRow
                                                    key={row.uid}
                                                    row={row}
                                                    selected={selected.includes(row.uid)}
                                                    onSelectRow={() => onSelectRow(row.uid)}
                                                    onDeleteRow={() => handleDeleteRow(row.uid)}
                                                    onEditRow={() => handleEditRow(row.name)}
                                                />
                                            ) : (
                                                !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                                            )
                                        )}

                                    <TableEmptyRows
                                        height={denseHeight}
                                        emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                                    />

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <Box sx={{ position: 'relative' }}>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={dataFiltered.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={onChangePage}
                            onRowsPerPageChange={onChangeRowsPerPage}
                        />

                        <FormControlLabel
                            control={<Switch checked={dense} onChange={onChangeDense} />}
                            label="Dense"
                            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
                        />
                    </Box>
                </Card>
            </Container>
        </Page>
    );
}

// ----------------------------------------------------------------------

function applySortFilter({
    tableData,
    comparator,
    filterName,
}: {
    tableData: emList[];
    comparator: (a: any, b: any) => number;
    filterName: string;
}) {
    const stabilizedThis = tableData.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    tableData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        tableData = tableData.filter(
            (item: Record<string, any>) =>
                item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        );
    }

    return tableData;
}
