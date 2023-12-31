import {
  ApiRoot,
  type ClientResponse,
  type CustomerSignInResult,
} from '@commercetools/platform-sdk';
import {
  type Credentials,
  type HttpMiddlewareOptions,
  type Middleware,
} from '@commercetools/sdk-client-v2';

import { getApiRoot } from '../BuildClientAdmin';
import CartRepository from './Cart.tsx';
import Client from './Client';
import { getOptions } from './options.tsx';

export type CustomerData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  key: string;
};

type ICustomerOptions = {
  anonymousId?: object;
};

interface ICustomerRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  createCustomerDraft(customerData: CustomerData): object;
  createCustomer(
    customerData: CustomerData
  ): Promise<ClientResponse<CustomerSignInResult> | unknown>;
  getCustomer(
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    options: ICustomerOptions
  ): Promise<ClientResponse<CustomerSignInResult> | unknown>;
}

export class CustomerRepository implements ICustomerRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  constructor(options: {
    projectKey: string;
    authMiddleware: Middleware;
    httpMiddlewareOptions: HttpMiddlewareOptions;
    credentials: Credentials;
  }) {
    const rootClient = new Client(options);
    this.apiRoot = rootClient.getApiRoot(rootClient.getClientFromOption(options));
    this.projectKey = rootClient.getProjectKey();
  }

  createCustomerDraft(customerData: CustomerData) {
    const { email, password, firstName, lastName, countryCode, key } = customerData;

    return {
      email,
      password,
      key,
      firstName,
      lastName,
      addresses: [
        {
          country: countryCode,
        },
      ],
      defaultShippingAddress: 0,
    };
  }

  async createCustomer(
    customerData: CustomerData
  ): Promise<ClientResponse<CustomerSignInResult> | unknown> {
    try {
      const customer = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .customers()
        .post({
          body: this.createCustomerDraft(customerData),
        })
        .execute();

      return customer;
    } catch (error) {
      return error;
    }
  }

  async getCustomer({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ClientResponse<CustomerSignInResult> | unknown> {
    try {
      const cart = new CartRepository(getOptions({ username: email, password: password }));
      await cart.createCartForCurrentCustomer({ currency: 'EUR' });
      const state = JSON.parse(localStorage.getItem('state') as string);
      const id = state?.basket?.basket?.id;
      const anonymousId = state?.basket?.basket?.anonymousId;
      const customerId = state?.basket?.basket?.customerId;

      if (customerId) {
        const customer = await getApiRoot
          .login()
          .post({
            body: {
              email,
              password,
              updateProductData: true,
            },
          })
          .execute();
        return customer;
      } else if (id && anonymousId) {
        const customer = await getApiRoot
          .login()
          .post({
            body: {
              email,
              password,
              anonymousCart: { typeId: 'cart', id: id },
              updateProductData: true,
              anonymousId: anonymousId,
              anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
            },
          })
          .execute();
        return customer;
      }
    } catch (error) {
      return error;
    }
  }

  async logoutCustomer() {
    try {
      return null;
    } catch (error) {
      return error;
    }
  }
}
