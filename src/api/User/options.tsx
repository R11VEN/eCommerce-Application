import {
  createAuthForAnonymousSessionFlow,
  createAuthForPasswordFlow,
} from '@commercetools/sdk-client-v2';

const _credentials = {
  clientId: 'bfHk24F2gUsdAnMFAUvZwNs6',
  clientSecret: 'pqpUkjhVQ3nyh55lreSbOZNnX5nhNNlp',
};

export function getOptions(credentials?: { username: string; password: string }) {
  if (credentials) {
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
    const authMiddleware = createAuthForAnonymousSessionFlow({
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: 'jsfe2023q1',
      credentials: {
        clientId: 'bfHk24F2gUsdAnMFAUvZwNs6',
        clientSecret: 'pqpUkjhVQ3nyh55lreSbOZNnX5nhNNlp',
      },
      scopes: [
        'view_products:jsfe2023q1 view_categories:jsfe2023q1 create_anonymous_token:jsfe2023q1 view_published_products:jsfe2023q1',
      ],
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
