import { ClientResponse, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  CustomerChangePassword,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

import {
  API_CLIENT_ID,
  API_CLIENT_SECRET,
  API_TOKEN_URL,
  PROJECT_KEY,
} from '../../constants/api.ts';
import { client } from '../BuildClientAdmin.tsx';
import { tokenCache } from '../tokenCache.tsx';
import { getOptions } from '../User/options.tsx';
import { CustomerRepository } from '../User/User.tsx';

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: PROJECT_KEY,
});

export async function signIn(email: string, password: string) {
  try {
    tokenCache.set({
      token: '',
      expirationTime: 0,
      refreshToken: '',
    });

    const options = getOptions({ username: email, password: password });
    return await new CustomerRepository(options).getCustomer({
      email: email,
      password: password,
    });
  } catch (e) {
    throw new Error();
  }
}

export async function updateCustomer(
  id: string,
  version: number,
  actions: CustomerUpdateAction[]
): Promise<ClientResponse> {
  return await apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();
}

export async function updateCustomerPassword(
  data: CustomerChangePassword
): Promise<ClientResponse> {
  const userData = await apiRoot
    .customers()
    .password()
    .post({
      body: data,
    })
    .execute();
  return userData;
}

export async function tokenInspection(token: string) {
  try {
    const headers = {
      Authorization: `Basic ${Buffer.from(`${API_CLIENT_ID}:${API_CLIENT_SECRET}`).toString(
        'base64'
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const options = {
      method: 'POST',
      headers,
      body: `token=${token}`,
    };

    const response = await fetch(API_TOKEN_URL as string, options);
    return response.json();
  } catch {
    throw new Error();
  }
}
