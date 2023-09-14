import {
  ApiRoot,
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';

import Client from './User/Client';
//import { apiRootSPA, projectKey } from './BuildClientSPA';
import { getOptions } from './User/options';

interface IProductRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  getProducts(
    offset: number,
    filterParam: string | string[],
    sortParam: string,
    searchValue: string
  ): Promise<ClientResponse<ProductProjectionPagedQueryResponse> | undefined>;
}

class Products implements IProductRepository {
  apiRoot: ApiRoot;
  projectKey: string;
  constructor() {
    const options = getOptions();
    const rootClient = new Client(options);
    this.apiRoot = rootClient.getApiRoot(rootClient.getClientFromOption(options));
    this.projectKey = rootClient.getProjectKey();
  }

  async getProducts(
    offset: number,
    filterParam: string | string[],
    sortParam: string,
    searchValue: string
  ) {
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
            ['text.ru-BY']: searchValue,
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
