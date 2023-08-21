import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { client, projectKey } from './BuildClientAdmin';

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: projectKey,
});

export const returnCustomerByEmail = async (customerEmail: string) => {
  return await apiRoot
    .customers()
    .get({
      queryArgs: {
        where: `email="${customerEmail}"`,
      },
    })
    .execute();
};
