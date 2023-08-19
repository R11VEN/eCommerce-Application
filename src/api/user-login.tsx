//import { ctpClient } from './BuildClientAdmin';
//import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
//
//const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
//  projectKey: 'jsfe2023q1',
//});
//
//const createCustomer = () => {
//  return apiRoot
//    .customers()
//    .post({
//      body: {
//        email: 'sdk@example.com',
//        password: 'examplePassword',
//      },
//    })
//    .execute();
//};
//// Create the customer and output the Customer ID
////createCustomer()
////  .then(({ body }) => {
////    console.log(body.customer.id);
////  })
////  .catch(console.error);
//
//export default createCustomer;
//import { apiRootSPA, projectKey } from './BuildClientSPA';
import { tokenCache } from './tokenCache';
import { apiRootExistingToken } from './BuildClientToken';
import { apiRootSPA, projectKey } from './BuildClientSPA';
import { apiRootPass } from './BuildClientPassword';
//import { clientBuilder, projectKey } from './ClientBuilder';

const Login = async ({
  emailValue,
  passwordlValue,
}: {
  emailValue: string;
  passwordlValue: string;
}) => {
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
    const response = await apiRootPass({ username: emailValue, password: passwordlValue })
      .withProjectKey({ projectKey })
      .me()
      .login()
      .post({
        body: {
          email: emailValue,
          password: passwordlValue,
        },
      })
      .execute();
    const data = response.body;
    console.log(data);
  } catch (e) {
    return console.log(e);
  }
  localStorage.setItem('loginToken', `${tokenCache.get().token}`);
  //console.log(token.getItem('access_token'));
  //console.log(tokenCache.get().token);
};

export default Login;
