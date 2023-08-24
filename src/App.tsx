import './App.css';

import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AuthState, RootState } from './interfaces/state.interface.ts';
import Layout from './layout/Layout.tsx';

const App = () => {
  const auth: AuthState = useSelector((state: RootState) => state.auth);

  console.log(auth);
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
