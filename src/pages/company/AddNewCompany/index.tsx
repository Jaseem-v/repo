import { Container } from '@mui/material';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import CreateNewCompanyForm from './Create';




export default function AddNewCompany() {

    const { themeStretch } = useSettings();
    return (
        <Page title='Add New Company'>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <HeaderBreadcrumbs
                    heading={'Add New Company'}
                    links={[]}
                />
                <CreateNewCompanyForm />
            </Container>
        </Page>
    )
}