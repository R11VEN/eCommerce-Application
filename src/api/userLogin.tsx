//import { apiRootSPA, projectKey } from './BuildClientSPA';

import { UserDto } from '../interfaces/user.interface.ts';
import { apiRootPass, projectKey } from './BuildClientPassword';
import { apiRootExistingToken } from './BuildClientToken';
import { tokenCache } from './tokenCache';
//import { clientBuilder, projectKey } from './ClientBuilder';

const Login = async ({ email, password }: UserDto) => {
  if (localStorage.getItem('loginToken')) {
    //clientBuilder('token', ['']);
    apiRootExistingToken();
    console.log('Вход уже выполнен!');
    return true;
  }

  try {
    //const api = clientBuilder('credentials', [
    //  'manage_my_business_units:jsfe2023q1 view_products:jsfe2023q1 view_categories:jsfe2023q1 create_anonymous_token:jsfe2023q1 manage_my_payments:jsfe2023q1 manage_my_orders:jsfe2023q1 view_published_products:jsfe2023q1 manage_my_shopping_lists:jsfe2023q1 manage_my_quotes:jsfe2023q1 manage_my_profile:jsfe2023q1 manage_my_quote_requests:jsfe2023q1',
    //]);
    email &&
      password &&
      (await apiRootPass({ username: email, password: password })
        .withProjectKey({ projectKey })
        .me()
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute());
    const token = tokenCache.get().token;
    localStorage.setItem('loginToken', token);
    localStorage.setItem('isAuth', 'true');
    return true;
  } catch (e) {
    return false;
  }
};

export default Login;
