import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { tokenCache } from '../api/tokenCache.tsx';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

const apiRootToken = async () => {
  const ctpClient = new ClientBuilder()
    .withProjectKey('jsfe2023q1')
    .withExistingTokenFlow(tokenCache.get().token)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
  return createApiBuilderFromCtpClient(ctpClient);
};

export { apiRootToken };
