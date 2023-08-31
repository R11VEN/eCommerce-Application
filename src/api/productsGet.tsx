import { ApiRoot, ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk';

import { apiRootSPA, projectKey } from './BuildClientSPA';

interface IProductRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  getProducts(): Promise<ClientResponse<ProductPagedQueryResponse> | undefined>;
}

class Products implements IProductRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  constructor() {
    this.apiRoot = apiRootSPA();
    this.projectKey = projectKey;
  }

  async getProducts() {
    try {
      const products = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .products()
        .get()
        .execute();

      return products;
    } catch (error) {
      console.error;
    }
  }
}

export default Products;
