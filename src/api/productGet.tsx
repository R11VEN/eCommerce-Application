import { ApiRoot, ClientResponse, Product } from '@commercetools/platform-sdk';

import { apiRootSPA, projectKey } from './BuildClientSPA';

interface IProductRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  getProduct(id: string): Promise<ClientResponse<Product> | undefined>;
}

class ProductItem implements IProductRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  constructor() {
    this.apiRoot = apiRootSPA();
    this.projectKey = projectKey;
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
