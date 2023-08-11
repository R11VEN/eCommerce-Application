import { AUTH_ROUTE, MAIN_ROUTE, PAGE_404, REG_ROUTE } from './constants/pages.ts';
import { RouteInterface } from './interfaces/route.interface.ts';
import AuthPage from './pages/auth-page.tsx';
import MainPage from './pages/main-page.tsx';
import Page404 from './pages/page404.tsx';
import RegPage from './pages/reg-page.tsx';

export const routesPages: RouteInterface[] = [
  {
    name: 'Main page',
    path: MAIN_ROUTE,
    Component: ({ showPageName }) => <MainPage showName={showPageName} />,
  },
];

export const routesAuth: RouteInterface[] = [
  {
    name: 'Sign Up',
    path: AUTH_ROUTE,
    Component: ({ showPageName }) => <AuthPage showName={showPageName} />,
  },
  {
    name: 'Sign in',
    path: REG_ROUTE,
    Component: ({ showPageName }) => <RegPage showName={showPageName} />,
  },
];

export const routesAll: RouteInterface[] = [
  ...routesPages,
  ...routesAuth,
  {
    name: 'Page 404',
    path: PAGE_404,
    Component: ({ showPageName }) => <Page404 showName={showPageName} />,
  },
];
