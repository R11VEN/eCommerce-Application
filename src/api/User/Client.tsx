import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type Middleware,
} from '@commercetools/sdk-client-v2';

const userClientBuilder = new ClientBuilder();
const anonymousClientBuilder = new ClientBuilder();
const tokenClientBuilder = new ClientBuilder();

interface Credentials {
  clientId: string;
  clientSecret: string;
  anonymousId?: string;
  user?: { username: string; password: string };
}

interface Options {
  projectKey: string;
  oauthUri?: string;
  baseUri?: string;
  credentials?: Credentials;
}

class Client {
  private projectKey: string;
  private oauthUri?: string;
  private baseUri?: string;
  private credentials?: Credentials;

  constructor({ projectKey, oauthUri, baseUri, credentials }: Options) {
    this.projectKey = projectKey;
    this.oauthUri = oauthUri;
    this.baseUri = baseUri;
    this.credentials = credentials;
  }

  getDefaultClient() {
    if (this.baseUri && this.credentials) {
      console.log('default Client');
      return anonymousClientBuilder
        .defaultClient(this.baseUri, this.credentials, this.oauthUri, this.projectKey)
        .build();
    }
  }

  getClientFromOption(options: {
    projectKey: string;
    authMiddleware: Middleware;
    httpMiddlewareOptions: HttpMiddlewareOptions;
    credentials: Credentials;
  }) {
    const { authMiddleware, httpMiddlewareOptions, credentials } = options;

    if (credentials.user) {
      console.log('user Client', credentials);
      return userClientBuilder
        .withProjectKey('jsfe2023q1')
        .withMiddleware(authMiddleware)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();
    }

    if (localStorage.getItem('token') && !credentials.user) {
      console.log('token Client');
      return tokenClientBuilder
        .withProjectKey('jsfe2023q1')
        .withMiddleware(authMiddleware)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build();
    }

    console.log('anon Client');
    return anonymousClientBuilder
      .withProjectKey('jsfe2023q1')
      .withMiddleware(authMiddleware)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  }

  getProjectKey() {
    return this.projectKey;
  }

  getApiRoot(client: unknown) {
    return createApiBuilderFromCtpClient(client);
  }
}

export default Client;
