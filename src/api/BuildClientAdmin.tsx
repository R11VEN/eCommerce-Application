import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  AuthMiddlewareOptions,
  Client,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const projectKey = 'jsfe2023q1';
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'K0utiNLlhYan_BQyOkJAbbBD',
    clientSecret: 'Z8C20sMfqtsXyVR6NRUoBpK5DSCjF1Sn',
  },
  scopes: [`manage_project:${projectKey}`],
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

export const client: Client = new ClientBuilder()
  //.withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  //.withLoggerMiddleware()
  .build();

const getApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: projectKey });

export { getApiRoot, projectKey };
