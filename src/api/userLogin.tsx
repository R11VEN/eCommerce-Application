import { UserDto } from '../interfaces/user.interface.ts';
import { apiRootPass, projectKey } from './BuildClientPassword';
import { apiRootExistingToken } from './BuildClientToken';
import { tokenCache } from './tokenCache';
//import { useDispatch } from 'react-redux';

const Login = async ({ email, password }: UserDto) => {
  if (localStorage.getItem('loginToken')) {
    apiRootExistingToken();
    console.log('Вход уже выполнен!');
    return true;
  }

  try {
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