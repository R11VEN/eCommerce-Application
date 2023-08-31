import {
  AUTH_ROUTE,
  CAT_ROUTE,
  BASKET_ROUTE,
  MAIN_ROUTE,
  PAGE_404,
  PRODUCT_ROUTE,
  REG_ROUTE,
  USER_ROUTE,
} from './constants/pages.ts';
import { RouteInterface } from './interfaces/route.interface.ts';
import { CatalogPage } from './pages/catalog-page.tsx';
import { DetailedProductPage } from './pages/detailedProductPage.tsx';

import AuthPage from './pages/authPage.tsx';
import BasketPage from './pages/basketPage.tsx';
import MainPage from './pages/main-page.tsx';
import Page404 from './pages/page404.tsx';
import RegPage from './pages/regPage.tsx';
import UserPage from './pages/userPage.tsx';

export const routesPages: RouteInterface[] = [
  {
    name: 'Main',
    path: MAIN_ROUTE,
    Component: ({ showPageName }) => <MainPage showName={showPageName} />,
  },
  {
    name: 'Catalog',
    path: CAT_ROUTE,
    Component: ({ showPageName }) => <CatalogPage showName={showPageName} />,
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
    name: 'Корзина',
    path: BASKET_ROUTE,
    Component: ({ showPageName }) => <BasketPage showName={showPageName} />,
  },
  {
    name: 'Персональная страница',
    path: USER_ROUTE,
    Component: ({ showPageName }) => <UserPage showName={showPageName} />,
  },
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
