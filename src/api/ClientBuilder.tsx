import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
  //type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import { tokenCache } from './tokenCache';
export const projectKey = 'jsfe2023q1';
export const clientBuilder = (type?: string, scopes?: string[]) => {
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

  const authMiddlewareOptionsAnon: AuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: projectKey,
    credentials: {
      clientId: 'bfHk24F2gUsdAnMFAUvZwNs6',
      clientSecret: 'pqpUkjhVQ3nyh55lreSbOZNnX5nhNNlp',
    },
    scopes,
    fetch,
  };

  //const authMiddlewareOptionsPass: PasswordAuthMiddlewareOptions = {
  //  host: 'https://auth.europe-west1.gcp.commercetools.com',
  //  projectKey: projectKey,
  //  credentials: {
  //    clientId: 'bfHk24F2gUsdAnMFAUvZwNs6',
  //    clientSecret: 'pqpUkjhVQ3nyh55lreSbOZNnX5nhNNlp',
  //    user: {
  //      ...user,
  //    },
  //  },
  //  tokenCache,
  //  scopes,
  //  fetch,
  //};

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  };

  const savedToken = localStorage.getItem('loginToken');

  const options = {
    force: true,
  };

  const ctpClient = (
    authMiddlewareOptions: AuthMiddlewareOptions,
    httpMiddlewareOptions: HttpMiddlewareOptions
  ) => {
    return new ClientBuilder()
      .withAnonymousSessionFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  };

  //const ctpClientPass = (
  //  authMiddlewareOptionsPass: PasswordAuthMiddlewareOptions,
  //  httpMiddlewareOptions: HttpMiddlewareOptions
  //) => {
  //  return new ClientBuilder()
  //    .withPasswordFlow(authMiddlewareOptionsPass)
  //    .withHttpMiddleware(httpMiddlewareOptions)
  //    .build();
  //};

  const ctpClientAnon = (savedToken: string, options: { force: boolean }) => {
    return new ClientBuilder().withExistingTokenFlow(savedToken, options).build();
  };

  switch (type) {
    case 'anonymous':
      return () => {
        return createApiBuilderFromCtpClient(
          ctpClient(authMiddlewareOptionsAnon, httpMiddlewareOptions)
        );
      };
    case 'credentials':
      return () => {
        return createApiBuilderFromCtpClient(
          ctpClient(authMiddlewareOptions, httpMiddlewareOptions)
        );
      };
    case 'token':
      if (savedToken) {
        return () => {
          return createApiBuilderFromCtpClient(ctpClientAnon(savedToken, options));
        };
      }
      break;
    //case 'password':
    //  return () => {
    //    return createApiBuilderFromCtpClient(
    //      ctpClientPass(authMiddlewareOptionsPass, httpMiddlewareOptions)
    //    );
    //  };
  }

  return () => {
    return createApiBuilderFromCtpClient(
      ctpClient(authMiddlewareOptionsAnon, httpMiddlewareOptions)
    );
  };
};

export const api = clientBuilder();
