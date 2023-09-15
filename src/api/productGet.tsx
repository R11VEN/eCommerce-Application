import { ApiRoot, ClientResponse, Product } from '@commercetools/platform-sdk';

import Client from './User/Client';
import { getOptions } from './User/options.tsx';

interface IProductRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  getProduct(id: string): Promise<ClientResponse<Product> | undefined>;
}

class ProductItem implements IProductRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  constructor() {
    const options = getOptions();
    const rootClient = new Client(options);
    this.apiRoot = rootClient.getApiRoot(rootClient.getClientFromOption(options));
    this.projectKey = rootClient.getProjectKey();
  }

  async getProduct(id: string) {
    try {
      const product = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .products()
        .withId({ ID: id })
        .get()
        .execute();

      return product;
    } catch (error) {
      console.error;
    }
  }
}

export default ProductItem;
