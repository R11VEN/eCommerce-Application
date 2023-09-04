import {
  createApiBuilderFromCtpClient,
  CustomerPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { CustomerDraft } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';

import { Customer } from '../interfaces/form.interface.ts';
import { UserDto } from '../interfaces/user.interface.ts';
import { client } from './BuildClientAdmin';
import { returnCustomerByEmail } from './userGetByEmail';
import Login from './userLogin.tsx';
// import Login from './userLogin';

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: 'jsfe2023q1',
});

export type userData = ClientResponse | ClientResponse<CustomerPagedQueryResponse>;

const createCustomer = async (customerData: Customer): Promise<userData | void> => {
  try {
    const data = customerData.email && (await returnCustomerByEmail(customerData.email));
    if (data) {
      const body = data && data.body;
      if (body && body.count !== 0) {
        return data as userData;
      }
    }
    // console.log('customerData: ', customerData);
    const regData = {
      body: {
        email: customerData.email,
        password: customerData.password,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        dateOfBirth: customerData.dateOfBirth,
        addresses: [
          {
            country: 'BY',
            city: customerData.city,
            streetName: customerData.street,
            postalCode: customerData.postalCode,
          },
        ],
        shippingAddresses: [0],
        billingAddresses: [0],
      },
    };

    if (customerData.differentBilling) {
      regData.body.addresses[1] = {
        country: 'BY',
        city: customerData.cityBilling,
        streetName: customerData.streetBilling,
        postalCode: customerData.postalCodeBilling,
      };
      regData.body.billingAddresses = [1];
      if (customerData.defaultBilling) {
        Object.assign(regData.body, { defaultBillingAddress: 1 });
      }
    }
    if (customerData.defaultShipping) {
      Object.assign(regData.body, { defaultShippingAddress: 0 });
    }
    // console.log('regData: ', regData);
    const userData: ClientResponse = await apiRoot
      .customers()
      .post({ body: regData.body as CustomerDraft })
      .execute();
    if (userData) {
      await Login({ email: customerData.email, password: customerData.password } as UserDto);
      return userData as userData;
    }
  } catch (e) {
    // console.log(e);
  }
};

export default createCustomer;
