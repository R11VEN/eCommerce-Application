import './App.css';

import { HashRouter } from 'react-router-dom';

import Layout from './layout/Layout.tsx';

const App = () => {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
};

export default App;
