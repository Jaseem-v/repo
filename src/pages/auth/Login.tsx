import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="300px" height="53px" viewBox="0 0 300 53" enable-background="new 0 0 300 53">  <image id="image0" width="300" height="53" x="0" y="0"
    href="data:image/png;base64,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
bWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==" />
</svg>
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome
            </Typography> */}
            <Image
              visibleByDefault
              disabledEffect
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          
          <ContentStyle>
            <Logo sx={{ mb: 5 }}/>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ color: 'text.secondary' }} variant="h4" gutterBottom>
                  Sign in to your account
                </Typography>
              </Box>

              
            </Stack>


            <LoginForm />

            {/* {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                  Get started
                </Link>
              </Typography>
            )} */}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
