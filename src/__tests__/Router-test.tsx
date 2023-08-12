import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Page404 from '../pages/page404.tsx';

describe('Router tests', () => {
  it('should show 404 page message', () => {
    render(
      <BrowserRouter>
        <Page404 />
      </BrowserRouter>
    );
    expect(screen.getByText(/Error 404!/i)).toBeTruthy();
  });
});
