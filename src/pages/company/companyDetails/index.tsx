import { Button, Container, Stack, useMediaQuery } from '@mui/material';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import useSettings from '../../../hooks/useSettings';

// icons

import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import DetailsTab from './DetailsTab';





export default function CompanyDetails() {
    const theme = useTheme()
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'))
    const { themeStretch } = useSettings();
    const [isEdit, setIsEdit] = useState<boolean>(true);
    const [contractTab, setContractTab] = useState<boolean>(false);






    return (
        <Page title='Company Details'>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Stack
                    direction={largeScreen ? "row" : "column"}
                    justifyContent="space-between"
                    alignItems="space-between"
                    mb={5}
                >

                    <HeaderBreadcrumbs
                        heading="Company Details"
                        links={[
                            { name: 'Employees', href: "/dashboard/app" },

                            { name: "EmployeeDetails", href: "/dashboard/EmployeeDetails", }
                        ]}
                        style={{ marginBottom: 0 }}
                    />

                    <Stack direction={"row"}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={3}>
                        {isEdit && !contractTab && <>
                            <Button variant='outlined' color="warning" startIcon={<DisabledByDefaultIcon />}  >
                                Block
                            </Button>
                            <Button variant='outlined' color="error" startIcon={<DeleteIcon />} >
                                Delete
                            </Button>

                            <Button variant='contained' color="primary" startIcon={<CreateOutlinedIcon />} onClick={() => setIsEdit(!isEdit)}>
                                Edit Details
                            </Button>
                        </>
                        }
                    </Stack>

                </Stack>

                <DetailsTab isEdit={isEdit} setIsEdit={setIsEdit} setContractTab={setContractTab} />


            </Container>
        </Page >

    )
}