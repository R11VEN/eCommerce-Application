import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { tokenCache } from './tokenCache.tsx';

const projectKey = 'jsfe2023q1';
const scopes = [
  'create_anonymous_token:jsfe2023q1 view_products:jsfe2023q1 view_categories:jsfe2023q1 view_published_products:jsfe2023q1',
];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com//oauth/introspect',
  projectKey: projectKey,
  credentials: {
    clientId: 'bfHk24F2gUsdAnMFAUvZwNs6',
    clientSecret: 'pqpUkjhVQ3nyh55lreSbOZNnX5nhNNlp',
  },
  scopes,
  tokenCache: tokenCache,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com/oauth/introspect',
  fetch,
};

const ctpClient = new ClientBuilder()
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

const apiRootAnonymous = () => {
  return createApiBuilderFromCtpClient(ctpClient);
};

export { apiRootAnonymous, projectKey };
