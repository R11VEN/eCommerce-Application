import { API_CLIENT_ID, API_CLIENT_SECRET, API_URL } from '../../constants/api.ts';
import { apiRootPass, projectKey } from '../BuildClientPassword.tsx';

export async function signIn(email: string, password: string) {
  try {
    const userData = await apiRootPass({ username: email, password: password })
      .withProjectKey({ projectKey })
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();
    return userData;
  } catch (e) {
    throw new Error();
  }
}

export async function tokenInspection(token: string) {
  try {
    const headers = {
      Authorization: `Basic ${Buffer.from(`${API_CLIENT_ID}:${API_CLIENT_SECRET}`).toString(
        'base64'
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const options = {
      method: 'POST',
      headers,
      body: `token=${token}`,
    };

    const response = await fetch(API_URL as string, options);
    return response.json();
  } catch {
    throw new Error();
  }
}
