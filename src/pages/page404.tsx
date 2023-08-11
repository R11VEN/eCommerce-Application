import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import { PageProps } from '../interfaces/pages.intarface.ts';

const Page404 = ({ showName }: PageProps): JSX.Element => {
  const name = 'Page 404';

  useEffect(() => {
    showName && showName(name);
  }, [showName]);

  return <h1>Error 404!</h1>;
};

export default Page404;
