import React, { useState } from 'react';
import MainPage from '../../pages/main-page/main-page';
import Header from '../header/header';
import Footer from '../footer/footer';

const Pages = () => {
  const [title, setTitle] = useState('');
  const handlePageNameChange = (name: string) => {
    setTitle(name);
  };
  return (
    <div className="pages">
      <Header titlePage={title} />
      <MainPage showName={handlePageNameChange} />
      <Footer />
    </div>
  );
};
export default Pages;
