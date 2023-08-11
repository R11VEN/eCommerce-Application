import './App.css';

import { BrowserRouter } from 'react-router-dom';

import Pages from './coponents/pages/pages';

const App = () => {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  );
};

export default App;
