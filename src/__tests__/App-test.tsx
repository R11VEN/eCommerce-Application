import { render } from '@testing-library/react';
import App from '../App.tsx';

describe('Application', () => {
  it('CheckboxWithLabel changes the text after click', () => {
    render(<App />);
  });
});
