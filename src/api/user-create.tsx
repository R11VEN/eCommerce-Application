import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { client } from './BuildClientAdmin';

const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: 'jsfe2023q1',
});

const createCustomer = () => {
  return apiRoot
    .customers()
    .post({
      body: {
        email: 'sdk@example.com',
        password: 'examplePassword',
      },
    })
    .execute();
};

createCustomer()
  .then(({ body }) => {
    console.log(body.customer.id);
  })
  .catch(console.error);

export default createCustomer;
