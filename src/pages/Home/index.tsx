// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';
import { useQuery } from '@apollo/client';
import { ALL_USERS } from 'src/graphql/home';
import { ServerError } from '../Page500';
import LoadingScreen from 'src/components/LoadingScreen';


import UserList from './sub/UserList';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// ----------------------------------------------------------------------



export default function Home() {

    const { themeStretch } = useSettings();

    const { data, loading, error } = useQuery(ALL_USERS)

    return (
        <Page title={'Home | Dashboard'}>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <HeaderBreadcrumbs
                    heading='All users'
                    links={[]}
                />
                {
                    error ? <ServerError /> :
                        loading ? <h3>Loading...</h3> :
                            <UserList users={data.users?.data || []} />
                }


            </Container>
        </Page>
    );
}


