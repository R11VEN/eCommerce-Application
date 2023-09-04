import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  CustomerChangePassword,
  CustomerDraft,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';

import { PROJECT_KEY } from '../../constants/api.ts';
import { Customer } from '../../interfaces/form.interface.ts';
import { UserResponse } from '../../interfaces/user.interface.ts';
import { client } from '../BuildClientAdmin.tsx';
import { tokenCache } from '../tokenCache.tsx';
import { signIn, tokenInspection, updateCustomer, updateCustomerPassword } from './user.service.ts';

export interface userResponse {
  userData: ClientResponse;
  token: string;
}

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: PROJECT_KEY,
});

export async function userUpdate(
  id: string,
  version: number,
  actions: CustomerUpdateAction[]
): Promise<ClientResponse> {
  try {
    const userData = await updateCustomer(id, version, actions);
    console.log(userData);
    return userData;
  } catch {
    throw new Error();
  }
}

export async function LoginAnton(email: string, password: string): Promise<userResponse> {
  try {
    const userData = await signIn(email, password);
    const token = tokenCache.get().token;
    return { userData, token } as userResponse;
  } catch {
    throw new Error();
  }
}

export async function userUpdatePassword(data: CustomerChangePassword) {
  try {
    const userData = await updateCustomerPassword(data);
    tokenCache.set({
      token: '',
      refreshToken: '',
      expirationTime: 0,
    });
    return userData;
  } catch {
    throw new Error();
  }
}

export async function CheckAuthorization(token: string) {
  try {
    const response = await tokenInspection(token);
    return response;
  } catch {
    throw new Error();
  }
}

export async function getUserById(id: string) {
  try {
    const { body, statusCode } = await apiRoot.customers().withId({ ID: id }).get().execute();
    // console.log(body);
    const userEntity: UserResponse = {
      ...body,
      statusCode: statusCode,
    };
    return userEntity;
  } catch {
    throw new Error();
  }
}

export const CreateUser = async (data: Customer) => {
  try {
    const body = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      addresses: [
        {
          country: 'BY',
          city: data.city,
          streetName: data.street,
          postalCode: data.postalCode,
        },
      ],
      shippingAddresses: [0],
      billingAddresses: [0],
    };

    if (data.differentBilling) {
      body.addresses[1] = {
        country: 'BY',
        city: data.cityBilling,
        streetName: data.streetBilling,
        postalCode: data.postalCodeBilling,
      };
      body.billingAddresses = [1];
      if (data.defaultBilling) {
        Object.assign(body, { defaultBillingAddress: 1 });
      }
    }
    if (data.defaultShipping) {
      Object.assign(body, { defaultShippingAddress: 0 });
    }
    const userData: ClientResponse = await apiRoot
      .customers()
      .post({ body: body as CustomerDraft })
      .execute();
    return userData;
  } catch {
    throw new Error();
  }
};
