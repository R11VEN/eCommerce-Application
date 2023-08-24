import { AuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

const host = 'https://api.europe-west1.gcp.commercetools.com';
const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY || 'jsfe2023q1';

const authMiddleware: AuthMiddlewareOptions = {
  host,
  projectKey,
  credentials: {
    clientId: 'K0utiNLlhYan_BQyOkJAbbBD',
    clientSecret: 'Z8C20sMfqtsXyVR6NRUoBpK5DSCjF1Sn',
  },
  scopes: [`manage_project:${projectKey}`],
  fetch,
};

const httpMiddleware: HttpMiddlewareOptions = {
  host,
  fetch,
};

export { authMiddleware, httpMiddleware };
