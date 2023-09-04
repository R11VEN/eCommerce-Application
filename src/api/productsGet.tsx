import {
  ApiRoot,
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';

import { apiRootSPA, projectKey } from './BuildClientSPA';

interface IProductRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  getProducts(
    offset: number,
    filterParam: string | string[],
    sortParam: string
  ): Promise<ClientResponse<ProductProjectionPagedQueryResponse> | undefined>;
}

class Products implements IProductRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  constructor() {
    this.apiRoot = apiRootSPA();
    this.projectKey = projectKey;
  }

  async getProducts(offset: number, filterParam: string | string[], sortParam: string) {
    try {
      const products = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .productProjections()
        .search()
        .get({
          queryArgs: {
            limit: 8,
            offset: offset,
            sort: sortParam,
            filter: filterParam,
          },
        })
        .execute();

      return products;
    } catch (error) {
      console.error;
    }
  }
}

export default Products;
