//import { apiRootSPA, projectKey } from './BuildClientSPA';
import { tokenCache } from './tokenCache';
import { apiRootExistingToken } from './BuildClientToken';
import { apiRootPass, projectKey } from './BuildClientPassword';
//import { clientBuilder, projectKey } from './ClientBuilder';

const Login = async ({ username, password }: { username: string; password: string }) => {
  if (localStorage.getItem('loginToken')) {
    //clientBuilder('token', ['']);
    apiRootExistingToken();
    console.log('Вход уже выполнен!');
    return;
  }
  try {
    //const api = clientBuilder('credentials', [
    //  'manage_my_business_units:jsfe2023q1 view_products:jsfe2023q1 view_categories:jsfe2023q1 create_anonymous_token:jsfe2023q1 manage_my_payments:jsfe2023q1 manage_my_orders:jsfe2023q1 view_published_products:jsfe2023q1 manage_my_shopping_lists:jsfe2023q1 manage_my_quotes:jsfe2023q1 manage_my_profile:jsfe2023q1 manage_my_quote_requests:jsfe2023q1',
    //]);
    const response = await apiRootPass({ username: username, password: password })
      .withProjectKey({ projectKey })
      .me()
      .login()
      .post({
        body: {
          email: username,
          password: password,
        },
      })
      .execute();
    const data = response.body;
    console.log(data);
  } catch (e) {
    return console.log(e);
  }
  localStorage.setItem('loginToken', `${tokenCache.get().token}`);
};

export default Login;
