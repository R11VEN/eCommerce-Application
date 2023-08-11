import { useState } from 'react';

import Footer from '../footer/footer';
import Header from '../header/header';
import Router from '../Router.tsx';

const Pages = () => {
  const [title, setTitle] = useState<string>('');
  const handlePageNameChange = (name: string): void => {
    setTitle(name);
  };
  return (
    <div className="pages">
      <Header titlePage={title} />
      <Router showPageName={handlePageNameChange} />
      <Footer />
    </div>
  );
};
export default Pages;
