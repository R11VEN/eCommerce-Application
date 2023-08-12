import { useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

import { PageProps } from '../interfaces/page.interface.ts';

export interface IPageProps {
  showPageName?: (name: string) => void;
}

const RegPage = ({ showName }: PageProps): JSX.Element => {
  const name: string = 'Registration';

  useEffect(() => {
    showName && showName(name);
  }, [showName]);

  return (
    <main className="reg-page">
      <div className="main-container">
        <h1>Registration</h1>
        <form className="registration-form">
          <label htmlFor="First name">First name</label>
          <input type="text" placeholder="First name" name="First name"></input>
          <label htmlFor="Last name">Last name</label>
          <input type="text" placeholder="Last name" name="Last name"></input>
          <label htmlFor="Date of Birth">Date of Birth</label>
          <input type="date" name="Date of Birth"></input>
          <fieldset name="adress" className="adress">
            <legend>Address</legend>
            <label htmlFor="Street">Street</label>
            <input type="text" placeholder="Street" name="Street"></input>
            <label htmlFor="City">City</label>
            <input type="text" placeholder="City" name="City"></input>
            <label htmlFor="Postal code">Postal code</label>
            <input type="number" placeholder="Postal code" name="Postal code"></input>
            <label htmlFor="Country">Country</label>
            <input type="text" placeholder="Country" name="Country"></input>
          </fieldset>
          <div>
            <input type="checkbox" name="different shipping address"></input>
            <label htmlFor="different shipping address">Set a different shipping address</label>
          </div>
          <label htmlFor="Email">Email</label>
          <input type="email" placeholder="Email" name="Email"></input>
          <label htmlFor="Password">Password</label>
          <input type="password" placeholder="Password" name="Password"></input>
          <input type="submit"></input>
        </form>
      </div>
    </main>
  );
};

export default RegPage;
