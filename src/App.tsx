import './App.css';

import { BrowserRouter } from 'react-router-dom';

import Layout from './layout/layout.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
