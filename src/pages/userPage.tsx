import { useEffect } from 'react';

import { PageProps } from '../interfaces/page.interface.ts';

const UserPage = ({ showName }: PageProps) => {
  useEffect((): void => {
    showName && showName('Страница пользователя');
  }, []);

  return <div></div>;
};

export default UserPage;
