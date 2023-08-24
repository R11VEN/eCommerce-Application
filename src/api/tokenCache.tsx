import { type TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class MyTokenCache implements TokenCache {
  TokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  get() {
    return this.TokenStore;
  }

  set(TokenStore: TokenStore) {
    this.TokenStore = TokenStore;
  }
}

export const tokenCache = new MyTokenCache();
