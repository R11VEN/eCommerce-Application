import {
  createAuthForAnonymousSessionFlow,
  createAuthForPasswordFlow,
  createAuthWithExistingToken,
} from '@commercetools/sdk-client-v2';

import { tokenCache } from '../tokenCache.tsx';

const _credentials = {
  clientId: 'bfHk24F2gUsdAnMFAUvZwNs6',
  clientSecret: 'pqpUkjhVQ3nyh55lreSbOZNnX5nhNNlp',
};

export function getOptions(credentials?: { username: string; password: string }) {
  const token = localStorage.getItem('token');
  const authorization = `Bearer ${token}`;
  // console.log('options token: ', `Bearer ${token}`);
  const options: { force: boolean } = {
    force: true,
  };

  if (token && !credentials) {
    console.log('token Options', authorization);
    const authMiddleware = createAuthWithExistingToken(authorization, options);
    return {
      authMiddleware,
      projectKey: 'jsfe2023q1',
      credentials: {
        clientId: 'bfHk24F2gUsdAnMFAUvZwNs6',
        clientSecret: 'pqpUkjhVQ3nyh55lreSbOZNnX5nhNNlp',
      },
      httpMiddlewareOptions: {
        host: 'https://api.europe-west1.gcp.commercetools.com',
        fetch,
      },
    };
  } else if (credentials) {
    console.log('user Options');
    const authMiddleware = createAuthForPasswordFlow({
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: 'jsfe2023q1',
      credentials: {
        clientId: 'bfHk24F2gUsdAnMFAUvZwNs6',
        clientSecret: 'pqpUkjhVQ3nyh55lreSbOZNnX5nhNNlp',
        user: {
          ...credentials,
        },
      },
      scopes: [
        'manage_my_business_units:jsfe2023q1 view_products:jsfe2023q1 view_categories:jsfe2023q1 create_anonymous_token:jsfe2023q1 manage_my_payments:jsfe2023q1 manage_my_orders:jsfe2023q1 view_published_products:jsfe2023q1 manage_my_shopping_lists:jsfe2023q1 manage_my_quotes:jsfe2023q1 manage_my_profile:jsfe2023q1 manage_my_quote_requests:jsfe2023q1',
      ],
      tokenCache,
      fetch,
    });

    return {
      authMiddleware,
      projectKey: 'jsfe2023q1',
      credentials: {
        clientId: 'bfHk24F2gUsdAnMFAUvZwNs6',
        clientSecret: 'pqpUkjhVQ3nyh55lreSbOZNnX5nhNNlp',
        user: {
          ...credentials,
        },
      },
      httpMiddlewareOptions: {
        host: 'https://api.europe-west1.gcp.commercetools.com',
        fetch,
      },
    };
  } else {
    console.log('anon Options');
    const authMiddleware = createAuthForAnonymousSessionFlow({
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: 'jsfe2023q1',
      credentials: {
        clientId: 'bfHk24F2gUsdAnMFAUvZwNs6',
        clientSecret: 'pqpUkjhVQ3nyh55lreSbOZNnX5nhNNlp',
      },
      scopes: [
        'manage_my_business_units:jsfe2023q1 view_products:jsfe2023q1 view_categories:jsfe2023q1 create_anonymous_token:jsfe2023q1 manage_my_payments:jsfe2023q1 manage_my_orders:jsfe2023q1 view_published_products:jsfe2023q1 manage_my_shopping_lists:jsfe2023q1 manage_my_quotes:jsfe2023q1 manage_my_profile:jsfe2023q1 manage_my_quote_requests:jsfe2023q1',
      ],
      tokenCache,
      fetch,
    });

    return {
      authMiddleware,
      projectKey: 'jsfe2023q1',
      credentials: _credentials,
      httpMiddlewareOptions: {
        host: 'https://api.europe-west1.gcp.commercetools.com',
        fetch,
      },
    };
  }
}
