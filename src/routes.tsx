import {
  AUTH_ROUTE,
  CAT_ROUTE,
  MAIN_ROUTE,
  PAGE_404,
  PRODUCT_ROUTE,
  REG_ROUTE,
} from './constants/pages.ts';
import { RouteInterface } from './interfaces/route.interface.ts';
import AuthPage from './pages/auth-page.tsx';
import { CatalogPage } from './pages/catalog-page.tsx';
import { DetailedProductPage } from './pages/detailedProductPage.tsx';

import MainPage from './pages/main-page.tsx';
import Page404 from './pages/page404.tsx';
import RegPage from './pages/reg-page.tsx';

export const routesPages: RouteInterface[] = [
  {
    name: 'Main',
    path: MAIN_ROUTE,
    Component: ({ showPageName }) => <MainPage showName={showPageName} />,
  },
  {
    name: 'Catalog',
    path: CAT_ROUTE,
    Component: () => <CatalogPage />,
  },
  {
    name: 'Reference',
    path: '#',
    Component: () => <></>,
  },
  {
    name: 'About Us',
    path: '#',
    Component: () => <></>,
  },
];

export const routesAuth: RouteInterface[] = [
  {
    name: 'Sign in',
    path: AUTH_ROUTE,
    Component: ({ showPageName }) => <AuthPage showName={showPageName} />,
  },
  {
    name: 'Sign up',
    path: REG_ROUTE,
    Component: ({ showPageName }) => <RegPage showName={showPageName} />,
  },
];

export const routerPagesAndAuth = [...routesPages, ...routesAuth];

export const routesAll: RouteInterface[] = [
  ...routerPagesAndAuth,
  {
    name: 'Page 404',
    path: PAGE_404,
    Component: ({ showPageName }) => <Page404 showName={showPageName} />,
  },
  {
    name: 'Detailed Product Page',
    path: PRODUCT_ROUTE + '/:id',
    Component: () => <DetailedProductPage />,
  },
];
