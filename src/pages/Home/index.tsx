// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';

import UserList from './sub/UserList';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// ----------------------------------------------------------------------



export default function Home() {

    const { themeStretch } = useSettings();

    return (
        <Page title={'Home | Dashboard'}>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <HeaderBreadcrumbs
                    heading='All users'
                    links={[]}
                />
                <UserList />
            </Container>
        </Page>
    );
}


