import {
  ABOUT_ROUTE,
  AUTH_ROUTE,
  BASKET_ROUTE,
  CAT_ROUTE,
  MAIN_ROUTE,
  PAGE_404,
  PRODUCT_ROUTE,
  REG_ROUTE,
  USER_ROUTE,
} from './constants/pages.ts';
import { RouteInterface } from './interfaces/route.interface.ts';
import { AboutUsPage } from './pages/AboutUsPage.tsx';
import AuthPage from './pages/AuthPage';
import BasketPage from './pages/BasketPage';
import { CatalogPage } from './pages/CatalogPage';
import { DetailedProductPage } from './pages/DetailedProductPage';
import MainPage from './pages/MainPage';
import Page404 from './pages/Page404';
import RegPage from './pages/RegPage';
import UserPage from './pages/UserPage';

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
    path: ABOUT_ROUTE,
    Component: ({ showPageName }) => <AboutUsPage showName={showPageName} />,
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
