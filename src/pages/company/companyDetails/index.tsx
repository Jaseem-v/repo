import { Box, Button, Container } from '@mui/material';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import CompanyDetailsWithEditForm from './Details';




export default function CompanyDetails() {

    const { themeStretch } = useSettings();
    return (
        <Page title='Company Details'>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <HeaderBreadcrumbs
                    heading={'Company Details'}
                    links={[]}
                    action={<>
                        <Box sx={{ display: 'flex' }}>
                            <Button color='warning'>Disable</Button>
                            <Button sx={{ mx: 1 }} variant='contained' color='error'>Delete</Button>
                            <Button variant='contained' >Edit</Button>
                        </Box>
                    </>}
                />
                <CompanyDetailsWithEditForm />
            </Container>
        </Page>
    )
}