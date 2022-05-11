// i18n
import './locales/i18n';

// highlight
import './utils/highlight';

// scroll bar
// import 'simplebar/src/simplebar.css';
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
// import 'react-image-lightbox/style.css';

// map
// import './utils/mapboxgl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// editor
// import 'react-quill/dist/quill.snow.css';

// slick-carousel
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// redux
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';

// Check our docs
// https://docs-minimals.vercel.app/authentication/ts-version

import { AuthProvider } from './contexts/JWTContext';
// import { AuthProvider } from './contexts/Auth0Context';
// import { AuthProvider } from './contexts/FirebaseContext';
// import { AuthProvider } from './contexts/AwsCognitoContext';

//
import App from './App';
import CompanyContextProvider from './pages/company/CompanyContext';

// ----------------------------------------------------------------------

ReactDOM.render(
  <AuthProvider>
    <HelmetProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <CollapseDrawerProvider>
            <CompanyContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CompanyContextProvider>
          </CollapseDrawerProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </HelmetProvider>
  </AuthProvider>,
  document.getElementById('root')
);

