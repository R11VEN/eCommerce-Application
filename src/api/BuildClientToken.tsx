import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

const projectKey = 'jsfe2023q1';

const ctpClient = () => {
  const authorization = localStorage.getItem('loginToken');
  const options = {
    force: true,
  };
  if (authorization) {
    //console.log(authorization);
    return new ClientBuilder().withExistingTokenFlow(`Bearer ${authorization}`, options).build();
  }
};

const apiRootExistingToken = () => {
  return createApiBuilderFromCtpClient(ctpClient());
};

export { apiRootExistingToken, projectKey };
