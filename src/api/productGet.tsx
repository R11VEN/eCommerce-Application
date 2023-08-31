import {
  ApiRoot,
  ClientResponse,
  ProductPagedQueryResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';

import { apiRootSPA, projectKey } from './BuildClientSPA';

interface IProductRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  getProduct(): Promise<ClientResponse<Product> | undefined>;
}

class Product implements IProductRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  constructor() {
    this.apiRoot = apiRootSPA();
    this.projectKey = projectKey;
  }

  async getProduct(id: { ID: string }) {
    try {
      const product = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .products()
        .withId(id)
        .get()
        .execute();

      return product;
    } catch (error) {
      console.error;
    }
  }
}

export default Product;
