import { Navigate, Route, Routes } from 'react-router-dom';

import { PAGE_404 } from '../constants/pages';
import { RouteInterface, RouterProps } from '../interfaces/route.interface.ts';
import { routesAll } from '../routes.tsx';

const AppRouter = ({ showPageName }: RouterProps) => {
  const renderRoutes = (route: RouteInterface) => {
    const Component = route.Component;
    return (
      <Route
        key={route.path}
        path={route.path}
        element={<Component showPageName={showPageName} />}
      />
    );
  };

  return (
    <Routes>
      {routesAll.map(renderRoutes)}
      <Route path="*" element={<Navigate to={PAGE_404} />} />
    </Routes>
  );
};

export default AppRouter;
