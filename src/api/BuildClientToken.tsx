import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

const projectKey = 'jsfe2023q1';

const ctpClient = () => {
  const savedToken = localStorage.getItem('loginToken');
  const options = {
    force: true,
  };
  if (savedToken) {
    console.log(savedToken);
    return new ClientBuilder().withExistingTokenFlow(savedToken, options).build();
  }
};

const apiRootExistingToken = () => {
  return createApiBuilderFromCtpClient(ctpClient());
};

export { apiRootExistingToken, projectKey };
