import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  ClientBuilder,
  type Credentials,
  type HttpMiddlewareOptions,
  type Middleware,
} from '@commercetools/sdk-client-v2';

const userClientBuilder = new ClientBuilder();
const anonymousClientBuilder = new ClientBuilder();
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
    if (credentials) {
      return (
        userClientBuilder
          //.withProjectKey(projectKey)
          .withMiddleware(authMiddleware)
          //.withPasswordFlow(authMiddleware)
          .withHttpMiddleware(httpMiddlewareOptions)
          .build()
      );
    }

    return (
      anonymousClientBuilder
        //.withProjectKey(projectKey)
        .withMiddleware(authMiddleware)
        //.withAnonymousSessionFlow(authMiddleware)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build()
    );
  }

  getProjectKey() {
    return this.projectKey;
  }

  getApiRoot(client: unknown) {
    return createApiBuilderFromCtpClient(client);
  }
}

export default Client;
