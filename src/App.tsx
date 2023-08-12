import './App.css';
import { useState } from 'react';
import Pages from './coponents/pages/pages';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Pages />
    </>
  );
};

export default App;
