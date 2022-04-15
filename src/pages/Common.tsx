// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

type props = {
    name: string
}

export default function PageFive({ name }: props) {
    const { themeStretch } = useSettings();

    return (
        <Page title={name}>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <Typography variant="h3" component="h1" paragraph>
                    {name}
                </Typography>

            </Container>
        </Page>
    );
}
