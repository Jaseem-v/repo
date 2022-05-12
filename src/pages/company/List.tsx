import DataTable from 'src/components/DataTable';
import { _TableHead } from 'src/@types/common'
import { IconButton, MenuItem, Container, TextField } from '@mui/material';
import TableMoreMenu from 'src/components/DataTable/TableMoreMenu';
import { useState } from 'react';
import Iconify from 'src/components/Iconify';
import Page from 'src/components/Page'
import useSettings from 'src/hooks/useSettings';




const FilterOptions = ({ setFilter }: { setFilter: (filter: any) => void }) => {

    const [filter, setFilterState] = useState('all');

    return (
        <TextField
            sx={{
                minWidth: '190px',
            }}
            select
            value={filter}
            onChange={(event) => { setFilterState(event.target.value) }}
            label='Filter by Status'
        >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Submitted by HOD</MenuItem>
            <MenuItem value="inactive">Rejected by HOD</MenuItem>
        </TextField>
    )
}





export default function CompanyLists() {

    const TableHead: _TableHead[] = [
        { _key: 'company_name', label: 'Company Name', },
        { _key: 'contract', label: 'Contract', },
        { _key: 'reference_no', label: 'Reference No', },
        { _key: 'license', label: 'License', },
        { _key: 'status', label: 'status', },
        { _key: 'remarks', label: 'Remarks', },
        { _key: 'created_at', label: 'Created At', },
        { _key: 'action', label: 'Actions', component: ListAction },
    ]

    const { themeStretch } = useSettings();

    return (
        <Page title='Companies' >
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <DataTable
                    tableHead={TableHead}
                    demoData={demoData}
                    containerProps={{
                        minWidth: 1050, position: 'relative'
                    }}
                    tabNavValues={[
                        { label: 'All', value: 'all' },
                        { label: 'Completed', value: 'completed' },
                        { label: 'Pending', value: 'pending' },
                    ]}
                    Filter={FilterOptions}
                />
            </Container>
        </Page>
    )
}

function ListAction({ data }: any) {

    const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setOpenMenuActions(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };

    return (
        <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
                <>
                    <MenuItem
                        onClick={() => {
                            handleCloseMenu();
                        }}
                        sx={{ color: 'error.main' }}
                    >
                        <Iconify icon={'eva:trash-2-outline'} />
                        Delete
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleCloseMenu();
                        }}
                    >
                        <Iconify icon={'eva:edit-fill'} />
                        Edit
                    </MenuItem>
                </>
            }
        />
    )
}



const demoData = [{
    "company_name": "Glover, Braun and Sawayn",
    "contract": "S59032S",
    "reference_no": "922303993-2",
    "license": "641939009-5",
    "status": 'false',
    "remarks": "American badger",
    "created_at": "1/1/2022"
}, {
    "company_name": "Sporer Inc",
    "contract": "B96",
    "reference_no": "053923842-2",
    "license": "063538177-X",
    "status": 'true',
    "remarks": "Trumpeter, dark-winged",
    "created_at": "2/2/2022"
}, {
    "company_name": "Harvey Inc",
    "contract": "Z9072",
    "reference_no": "858074382-6",
    "license": "292442709-6",
    "status": 'false',
    "remarks": "Southern hairy-nosed wombat",
    "created_at": "3/25/2022"
}, {
    "company_name": "Wunsch, Fadel and Will",
    "contract": "S35416D",
    "reference_no": "372612842-5",
    "license": "346316076-5",
    "status": 'true',
    "remarks": "Eland, common",
    "created_at": "4/30/2022"
}, {
    "company_name": "Parker Group",
    "contract": "T25122",
    "reference_no": "870502107-3",
    "license": "305679485-4",
    "status": 'true',
    "remarks": "Oystercatcher, blackish",
    "created_at": "7/12/2021"
}]
