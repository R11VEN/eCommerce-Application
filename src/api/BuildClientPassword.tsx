import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  //type PasswordAuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { tokenCache } from './tokenCache';

const projectKey = 'jsfe2023q1';
const scopes = [
  'manage_my_business_units:jsfe2023q1 view_products:jsfe2023q1 view_categories:jsfe2023q1 create_anonymous_token:jsfe2023q1 manage_my_payments:jsfe2023q1 manage_my_orders:jsfe2023q1 view_published_products:jsfe2023q1 manage_my_shopping_lists:jsfe2023q1 manage_my_quotes:jsfe2023q1 manage_my_profile:jsfe2023q1 manage_my_quote_requests:jsfe2023q1',
];

export type UserAuthOptions = {
  username: string;
  password: string;
};

let authMiddlewareOptions;

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

const apiRootPass = (user: UserAuthOptions) => {
  authMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: projectKey,
    credentials: {
      clientId: 'bfHk24F2gUsdAnMFAUvZwNs6',
      clientSecret: 'pqpUkjhVQ3nyh55lreSbOZNnX5nhNNlp',
      user: user,
    },
    scopes,
    tokenCache,
    fetch,
  };
  const ctpClient = new ClientBuilder()
    //.withProjectKey(projectKey)
    .withPasswordFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    //.withLoggerMiddleware() // Include middleware for logging
    .build();
  return createApiBuilderFromCtpClient(ctpClient);
};

export { apiRootPass, projectKey };
