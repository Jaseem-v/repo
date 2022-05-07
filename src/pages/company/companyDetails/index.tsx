import { Box, Button, Container, Stack, useMediaQuery } from '@mui/material';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import CompanyDetailsWithEditForm from './Details';

// icons

import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';




export default function CompanyDetails() {
    const theme = useTheme()
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'))
    const [isEdit, setIsEdit] = useState<boolean>(true)
    const { themeStretch } = useSettings();
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
                        spacing={4}>
                        {isEdit && <>
                            <Button variant='contained' color="warning" startIcon={<DisabledByDefaultIcon />}  >
                                Disable
                            </Button>
                            <Button variant='contained' color="error" startIcon={<DeleteIcon />} >
                                Delete
                            </Button>
                        </>
                        }
                        {isEdit &&
                            <Button variant='contained' color={"info"} startIcon={<CreateOutlinedIcon />} onClick={() => setIsEdit(!isEdit)}>
                                Edit
                            </Button>
                        }
                    </Stack>

                </Stack>

                <CompanyDetailsWithEditForm isEdit={isEdit} 
                setIsEdit={setIsEdit}/>
            </Container>
        </Page>
    )
}