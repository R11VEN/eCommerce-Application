import { NavLink } from 'react-router-dom';

import { MAIN_ROUTE } from '../constants/pages.ts';

const BreadCamps = ({ titlePage }: { titlePage: string }) => {
  const pageName: string = `-> ${titlePage}`;
  return (
    <div className="bread-camps">
      <NavLink to={MAIN_ROUTE}>High voltage</NavLink> {pageName}
    </div>
  );
};

export default BreadCamps;
