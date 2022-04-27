import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// layouts
// import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import AddNewCompany from 'src/pages/company/AddNewCompany';
import CompanyDetails from 'src/pages/company/companyDetails';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAuthenticated } = useAuth();

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <Home /> },
        { path: 'ecommerce', element: <User /> },
        { path: 'analytics', element: <Common name='dashboard/analytics' /> },
        { path: 'editemployeedetails', element: <EditEmployee /> },
        { path: 'addnewemployee', element: <NewEmployee /> },
        { path: 'add-new-company', element: <AddNewCompany /> },
        { path: 'company-details', element: <CompanyDetails /> },
        {
          path: 'Employee',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <Common name='e-commerce/shop' /> },
            { path: 'product/:name', element: <Common name='e-commerce/product/name' /> },
            { path: 'Add New Employee', element: <NewEmployee /> },
            { path: 'product/new', element: <Common name='e-commerce/product/new' /> },
            { path: 'product/:name/edit', element: <Common name='e-commerce/product/name/edit' /> },
            { path: 'checkout', element: <Common name='e-commerce/checkout' /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <Common name='user/profile' /> },
            { path: 'cards', element: <Common name='user/cards' /> },
            { path: 'list', element: <Common name='user/list' /> },
            { path: 'new', element: <Common name='user/new' /> },
            { path: ':name/edit', element: <Common name='user/name/edit' /> },
            { path: 'account', element: <Common name='user/account' /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <Common name='invoice list' /> },
            { path: ':id', element: <Common name='invoice/id' /> },
            { path: ':id/edit', element: <Common name='invoice/id/edit' /> },
            { path: 'new', element: <Common name='invoice/new' /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <Common name='blog-posts' /> },
            { path: 'post/:title', element: <Common name='post/title' /> },
            { path: 'new', element: <Common name='new blog' /> },
          ],
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Common name='mail/customLabel/' /> },
            { path: 'label/:customLabel/:mailId', element: <Common name='mail/customLabel/mailId' /> },
            { path: ':systemLabel', element: <Common name='mail:systemLabel' /> },
            { path: ':systemLabel/:mailId', element: <Common name='mail' /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <Common name='chat' />, index: true },
            { path: 'new', element: <Common name='chat-new' /> },
            { path: ':conversationKey', element: <Common name='chat-conversationkey' /> },
          ],
        },
        { path: 'calendar', element: <Common name='calender' /> },
        { path: 'kanban', element: <Common name='kanban' /> },
        { path: 'permission-denied', element: <Common name='permission-denied' /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <Common name='coming-soon' /> },
        { path: 'maintenance', element: <Common name='maintenance' /> },
        { path: 'pricing', element: <Common name='pricing' /> },
        { path: 'payment', element: <Common name='payment' /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <Navigate to={PATH_AFTER_LOGIN} replace />,
      // element: <MainLayout />,
      // children: [
      //   { element: <HomePage />, index: true },
      //   { path: 'about-us', element: <About /> },
      //   { path: 'contact-us', element: <Contact /> },
      //   { path: 'faqs', element: <Faqs /> },
      // ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

const Home = Loadable(lazy(() => import('../pages/Home')));
const User = Loadable(lazy(() => import('../pages/User')));
const NewEmployee = Loadable(lazy(() => import('../pages/emplyees/NewEmployee')));
const EditEmployee = Loadable(lazy(() => import('../pages/emplyees/EditEmployee')));


const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));

const Common = Loadable(lazy(() => import('../pages/Common')));