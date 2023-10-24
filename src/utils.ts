import { Cart, ClientResponse } from '@commercetools/platform-sdk';

import CartRepository from './api/User/Cart.tsx';
import { getOptions } from './api/User/options.tsx';

export interface CustomResponse<T> {
  cartRep: CartRepository;
  currentCart: ClientResponse<T>;
}
export async function getBasket(): Promise<CustomResponse<Cart>> {
  const opt = getOptions();
  const cartRep = new CartRepository(opt);
  const currentCart = (await cartRep.createCartForCurrentCustomer({
    currency: 'EUR',
  })) as ClientResponse<Cart>;
  return { cartRep, currentCart };
}
export function createDate(time: string) {
  const date = new Date(time);
  return (
    date.getFullYear() +
    ' ' +
    date.getMonth() +
    ' ' +
    date.getDay() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes()
  );
}

export function capitalize(string: string) {
  return 'set' + string.charAt(0).toUpperCase() + string.slice(1);
}

export function prepareActions(data: [key: string, value: string | number | boolean][]) {
  return data.map(([key, value]) => {
    return {
      action: capitalize(key),
      [key]: value,
    };
  });
}
