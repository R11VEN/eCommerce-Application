import { JSX } from 'react/jsx-runtime';

const Header = ({ titlePage }: { titlePage: string }) => {
  return <div className="header">Header:{titlePage}</div>;
};
export default Header;
