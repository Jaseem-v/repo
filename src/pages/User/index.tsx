import DataTable from 'src/components/DataTable';
import { _TableHead } from 'src/@types/common'
import { IconButton, MenuItem, Container, Select, TextField } from '@mui/material';
import TableMoreMenu from 'src/components/DataTable/TableMoreMenu';
import { useState } from 'react';
import Iconify from 'src/components/Iconify';
import Page from 'src/components/Page'
import useSettings from 'src/hooks/useSettings';
import Label from 'src/components/Label';


function Filter({ setFilter }: { setFilter: (filter: any) => void }) {

  const [filter, setFilterState] = useState('all');

  return (
    <TextField
      select
      sx={{
        minWidth: '170px',
      }}
      label='Filter by role'
      value={filter}
      onChange={(event) => { setFilterState(event.target.value) }}
    >
      <MenuItem value="all">All</MenuItem>
      <MenuItem value="admin">Admin</MenuItem>
      <MenuItem value="user">User</MenuItem>
    </TextField>
  )
}



export default function UsersLists() {

  const TableHead: _TableHead[] = [
    { _key: 'user_name', label: 'User Name', },
    { _key: 'name', label: 'name', },
    { _key: 'surname', label: 'Surname', },
    { _key: 'roles', label: 'Roles', },
    { _key: 'email', label: 'Email', },
    { _key: 'email_verified', label: 'Email Verified', component: EmailVerified },
    { _key: 'active', label: 'Active', component: isUserActive },
    { _key: 'created_at', label: 'Created At', },
    { _key: 'action', label: 'Actions', component: ListAction },
  ]

  const { themeStretch } = useSettings();

  return (
    <Page title='Users' >
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <DataTable
          tableHead={TableHead}
          demoData={demoData}
          containerProps={{
            minWidth: 1050, position: 'relative'
          }}
          Filter={Filter}

        />
      </Container>
    </Page>
  )
}


const EmailVerified = ({ data }: any) => {

  return (
    <Label color={data.email_verified ? 'success' : 'error'} >
      {data.email_verified ? 'Yes' : 'No'}
    </Label>
  )
}

const isUserActive = ({ data }: any) => {

  return (
    <Label color={data.active ? 'success' : 'error'} >
      {data.active ? 'Yes' : 'No'}
    </Label>
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
  "user_name": "rmack0",
  "name": "Rosy",
  "surname": "Mack",
  "roles": "Supervisor",
  "email": "rmack0@hhs.gov",
  "email_verified": true,
  "active": false,
  "created_at": "4/8/2022"
}, {
  "user_name": "ahallibone1",
  "name": "Ag",
  "surname": "Hallibone",
  "roles": "Construction Manager",
  "email": "ahallibone1@un.org",
  "email_verified": true,
  "active": false,
  "created_at": "4/16/2022"
}, {
  "user_name": "kwebster2",
  "name": "Katee",
  "surname": "Webster",
  "roles": "Construction Worker",
  "email": "kwebster2@home.pl",
  "email_verified": true,
  "active": true,
  "created_at": "10/2/2021"
}, {
  "user_name": "egloucester3",
  "name": "Eryn",
  "surname": "Gloucester",
  "roles": "Construction Manager",
  "email": "egloucester3@home.pl",
  "email_verified": false,
  "active": false,
  "created_at": "11/30/2021"
}, {
  "user_name": "ablackler4",
  "name": "Ardenia",
  "surname": "Blackler",
  "roles": "Engineer",
  "email": "ablackler4@naver.com",
  "email_verified": true,
  "active": false,
  "created_at": "7/1/2021"
}]

