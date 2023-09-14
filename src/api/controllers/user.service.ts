import { Cart, ClientResponse, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  CustomerChangePassword,
  //CustomerSignInResult,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

//import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';
import {
  API_CLIENT_ID,
  API_CLIENT_SECRET,
  API_TOKEN_URL,
  PROJECT_KEY,
} from '../../constants/api.ts';
import { client } from '../BuildClientAdmin.tsx';
import { tokenCache } from '../tokenCache.tsx';
import CartRepository from '../User/Cart.tsx';
//import { apiRootPass, projectKey } from '../BuildClientPassword.tsx';
//import { CustomerRepository } from '../User/User.tsx';
import Client from '../User/Client';
import { getOptions } from '../User/options.tsx';

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: PROJECT_KEY,
});

export async function signIn(email: string, password: string) {
  try {
    console.log(tokenCache);
    //tokenCache.set({
    //  token: '',
    //  expirationTime: 0,
    //  refreshToken: '',
    //});

    const options = getOptions({ username: email, password: password });
    const rootClient = new Client(options);
    const apiRoot = rootClient.getApiRoot(rootClient.getClientFromOption(options));
    const projectKey = rootClient.getProjectKey();
    const userData = apiRoot
      .withProjectKey({ projectKey: projectKey })
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();

    //Переделать, добавлено для теста
    const token = tokenCache.get().token;
    console.log(token);
    localStorage.setItem('auth', 'true');
    if (token) {
      localStorage.setItem('token', token);
      console.log(token);
    }

    //const userData = await apiRootPass({ username: email, password: password })
    //  .withProjectKey({ projectKey })
    //  .me()
    //  .login()
    //  .post({
    //    body: {
    //      email,
    //      password,
    //    },
    //  })
    //  .execute();

    //Тут, поидее, нужно создать/обновить/объединить корзину нашего юзера

    const cart = async () => {
      const cartRep = new CartRepository(options);
      const currentCart = (await cartRep
        .createCartForCurrentCustomer({ currency: 'EUR', customerEmail: email })
        .then((body) => body)) as ClientResponse<Cart>;
      console.log(currentCart.body.id);
      return currentCart;
    };
    cart();

    //После логина у пользователя появляется корзина

    return userData;
  } catch (e) {
    throw new Error();
  }
}

export async function updateCustomer(
  id: string,
  version: number,
  actions: CustomerUpdateAction[]
): Promise<ClientResponse> {
  const userData = await apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();
  return userData;
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
