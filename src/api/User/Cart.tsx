import { ApiRoot, type Cart, type MyCartUpdate } from '@commercetools/platform-sdk';
import {
  type ClientResponse,
  type Credentials,
  type HttpMiddlewareOptions,
  type Middleware,
} from '@commercetools/sdk-client-v2';

import { getApiRoot } from '../BuildClientAdmin';
import Client from './Client';

interface ICart {
  apiRoot: ApiRoot;
  projectKey: string;
  createCartForCurrentCustomer(cartDraft: CartDraft): Promise<ClientResponse<Cart> | unknown>;
  getActiveCart(): Promise<ClientResponse<Cart> | unknown>;
}

type CartDraft = {
  currency: string;
  customerEmail?: string;
};

//type MyCartUpdate = {
//  version: number;
//  actions: Array<MyCartUpdateAction>;
//};

//type MyCartUpdateAction = {
//  readonly action: 'addLineItem';
//  readonly productId?: string;
//  readonly variantId?: number;
//  readonly quantity?: number;
//};

type MyCartRemoveItem = {
  version: number;
  actions: Array<MyCartRemoveLineItemAction>;
};

type MyCartRemoveLineItemAction = {
  readonly action: 'removeLineItem';
  readonly lineItemId: string;
  readonly quantity?: number;
};

type CartUpdateDraft = {
  version: number;
  productId: string;
  variantId: number;
  quantity: number;
};

type CartRemoveItemDraft = {
  version: number;
  lineItemId: string;
  quantity: number;
};

type CartDiscountDraft = {
  version: number;
  code: string;
};

class CartRepository implements ICart {
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

  private createCustomerCartDraft(cartData: CartDraft) {
    const { currency, customerEmail } = cartData;

    return {
      currency,
      customerEmail,
    };
  }

  private createCartUpdateDraft(cartUpdateDraft: CartUpdateDraft): MyCartUpdate {
    const action = 'addLineItem'; // default value needed to tell the system we are adding an item to cart
    const { version, productId, variantId, quantity } = cartUpdateDraft;
    return {
      version,
      actions: [
        {
          action,
          productId,
          variantId,
          quantity,
        },
      ],
    };
  }

  private createRemoveItemDraft(cartRemoveItemDraft: CartRemoveItemDraft): MyCartRemoveItem {
    const action = 'removeLineItem'; // default value needed to tell the system we are removing an item from the cart
    const { version, lineItemId, quantity } = cartRemoveItemDraft;
    return {
      version,
      actions: [
        {
          action,
          lineItemId,
          quantity,
        },
      ],
    };
  }

  private createCartDiscountDraft(cartDiscountDraft: CartDiscountDraft): MyCartUpdate {
    const action = 'addDiscountCode';
    const { version, code } = cartDiscountDraft;
    return {
      version,
      actions: [
        {
          action,
          code,
        },
      ],
    };
  }

  async createCartForCurrentCustomer(
    cartDraft: CartDraft
  ): Promise<ClientResponse<Cart> | unknown> {
    try {
      const cart = (await this.getActiveCart()) as ClientResponse<Cart>;
      if (cart?.statusCode == 200) return cart;
      return this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .carts()
        .post({
          body: this.createCustomerCartDraft(cartDraft),
        })
        .execute();
    } catch (error) {
      return error;
    }
  }

  async getActiveCart(): Promise<ClientResponse<Cart> | unknown> {
    try {
      const activeCart = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .activeCart()
        .get()
        .execute();

      return activeCart;
    } catch (error) {
      return error;
    }
  }

  async updateActiveCart(productDetails: {
    cartId: string;
    cartUpdateDraft: CartUpdateDraft;
  }): Promise<ClientResponse<Cart> | unknown> {
    try {
      // eslint-disable-next-line prefer-const
      let { cartId, cartUpdateDraft } = productDetails;
      // if cartId is undefined create an anonymous cart
      if (!cartId) {
        const body = (await this.createCartForCurrentCustomer({
          currency: 'EUR',
        })) as Cart;
        cartId = body.id;
        cartUpdateDraft.version = body.version;
      }

      const updatedCart = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .carts()
        .withId({ ID: cartId })
        .post({ body: this.createCartUpdateDraft(cartUpdateDraft) })
        .execute();

      return updatedCart;
    } catch (error) {
      return error;
    }
  }

  async removeLineItem(productDetails: CartRemoveItemDraft) {
    try {
      const { body } = (await this.getActiveCart()) as ClientResponse<Cart>;
      if (body) {
        const updatedCart = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .me()
          .carts()
          .withId({ ID: body.id })
          .post({ body: this.createRemoveItemDraft(productDetails) })
          .execute();

        return updatedCart;
      }
    } catch (error) {
      return error;
    }
  }

  async addCartDiscount(cartDiscountDraft: CartDiscountDraft, id: string) {
    try {
      //const body = (await this.createCartForCurrentCustomer({
      //  currency: 'EUR',
      //})) as Cart;

      const addDiscountCode = await getApiRoot
        .carts()
        .withId({ ID: id })
        .post({ body: this.createCartDiscountDraft(cartDiscountDraft) })
        .execute();

      return addDiscountCode;
    } catch (error) {
      return error;
    }
  }

  async deleteCart() {
    const cart = (await this.getActiveCart()) as ClientResponse<Cart>;
    if (cart.body) {
      await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .me()
        .carts()
        .withId({ ID: cart.body.id })
        .delete({
          queryArgs: {
            version: cart.body.version,
          },
        })
        .execute();
    }
  }
}

export default CartRepository;
