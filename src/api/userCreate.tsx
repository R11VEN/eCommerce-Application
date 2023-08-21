import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { client } from './BuildClientAdmin';
import { returnCustomerByEmail } from './userGetByEmail';
import Login from './userLogin';

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: 'jsfe2023q1',
});

const createCustomer = async ({
  email,
  password,
  firsrName,
  lastName,
  date,
  city,
  street,
  cityBilling,
  streetBilling,
  postalCodeBilling,
  postalCode,
  setAddress,
}: {
  email: string;
  password: string;
  firsrName: string;
  lastName: string;
  date: string;
  city: string;
  street: string;
  postalCode: string;
  cityBilling: string;
  streetBilling: string;
  postalCodeBilling: string;
  setAddress: { defaultBilling: boolean; defaultShiping: boolean; differentBilling: boolean };
}) => {
  await returnCustomerByEmail(email)
    .then(({ body }) => {
      if (body.count !== 0) {
        console.log('Такой пользователь уже существует!');
        return;
      } else {
        console.log('Пользователь успешно зарегистрирован!');

        const body = {
          body: {
            email: email,
            password: password,
            firstName: firsrName,
            lastName: lastName,
            dateOfBirth: date,
            addresses: [
              {
                country: 'BY',
                city: city,
                streetName: street,
                postalCode: postalCode,
              },
            ],
            shippingAddresses: [0],
            billingAddresses: [0],
          },
        };
        if (setAddress.differentBilling) {
          body.body.addresses[1] = {
            country: 'BY',
            city: cityBilling,
            streetName: streetBilling,
            postalCode: postalCodeBilling,
          };
          body.body.billingAddresses = [1];
          if (setAddress.defaultBilling) {
            Object.assign(body.body, { defaultBillingAddress: 1 });
          }
        }
        if (setAddress.defaultShiping) {
          Object.assign(body.body, { defaultShippingAddress: 0 });
        }
        const regAndLogin = async () => {
          await apiRoot.customers().post(body).execute();
          Login({ username: email, password: password });
        };
        return regAndLogin();
      }
    })
    .catch(console.error);
};

export default createCustomer;
