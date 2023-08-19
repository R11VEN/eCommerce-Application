import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { tokenCache } from './tokenCache';

const projectKey = 'jsfe2023q1';
const scopes = [
  'manage_my_business_units:jsfe2023q1 view_products:jsfe2023q1 view_categories:jsfe2023q1 create_anonymous_token:jsfe2023q1 manage_my_payments:jsfe2023q1 manage_my_orders:jsfe2023q1 view_published_products:jsfe2023q1 manage_my_shopping_lists:jsfe2023q1 manage_my_quotes:jsfe2023q1 manage_my_profile:jsfe2023q1 manage_my_quote_requests:jsfe2023q1',
];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: 'bfHk24F2gUsdAnMFAUvZwNs6',
    clientSecret: 'pqpUkjhVQ3nyh55lreSbOZNnX5nhNNlp',
  },
  scopes,
  tokenCache,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

const ctpClient = new ClientBuilder()
  //.withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  //.withLoggerMiddleware() // Include middleware for logging
  .build();

const apiRootSPA = () => {
  return createApiBuilderFromCtpClient(ctpClient);
};

export { apiRootSPA, projectKey };
