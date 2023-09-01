import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';

import { PROJECT_KEY } from '../../constants/api.ts';
import { UserResponse } from '../../interfaces/user.interface.ts';
import { client } from '../BuildClientAdmin.tsx';
import { tokenCache } from '../tokenCache.tsx';
import { signIn, tokenInspection } from './user.service.ts';

export interface userResponse {
  userData: ClientResponse;
  token: string;
}

export const LoginAnton = async (email: string, password: string): Promise<userResponse> => {
  try {
    const userData = await signIn(email, password);
    const token = tokenCache.get().token;
    return { userData, token } as userResponse;
  } catch {
    throw new Error();
  }
};

export async function CheckAuthorization(token: string) {
  try {
    const response = await tokenInspection(token);
    return response;
  } catch {
    throw new Error();
  }
}

export async function getUserById(id: string) {
  const getApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
  try {
    const { body, statusCode } = await getApiRoot.customers().withId({ ID: id }).get().execute();
    const userEntity: UserResponse = {
      id: body.id,
      email: body.email,
      addresses: body.addresses,
      isEmailVerified: body.isEmailVerified,
      shippingAddressIds: body.shippingAddressIds,
      version: body.version,
      createdAt: body.createdAt,
      statusCode: statusCode,
    };
    return userEntity;
  } catch {
    throw new Error();
  }
}

// const rrr = {
//   active: true,
//   scope:
//     'manage_my_business_units:jsfe2023q1 view_products:jsfe2023q1 customer_id:91596296-6a2a-42a2-868b-a1690fac0a03 view_categories:jsfe2023q1 create_anonymous_token:jsfe2023q1 manage_my_payments:jsfe2023q1 manage_my_orders:jsfe2023q1 view_published_products:jsfe2023q1 manage_my_shopping_lists:jsfe2023q1 manage_my_quotes:jsfe2023q1 manage_my_profile:jsfe2023q1 manage_my_quote_requests:jsfe2023q1',
//   exp: 1693747092209,
//   client_id: 'bfHk24F2gUsdAnMFAUvZwNs6',
// };
// const rrtt = {
//   userData: {
//     body: {
//       customer: {
//         id: '91596296-6a2a-42a2-868b-a1690fac0a03',
//         version: 1,
//         versionModifiedAt: '2023-08-21T19:45:20.259Z',
//         lastMessageSequenceNumber: 1,
//         createdAt: '2023-08-21T19:45:20.259Z',
//         lastModifiedAt: '2023-08-21T19:45:20.259Z',
//         lastModifiedBy: {
//           clientId: 'K0utiNLlhYan_BQyOkJAbbBD',
//           isPlatformClient: false,
//         },
//         createdBy: {
//           clientId: 'K0utiNLlhYan_BQyOkJAbbBD',
//           isPlatformClient: false,
//         },
//         email: 'info@rza.by',
//         password: '****hXY=',
//         addresses: [
//           {
//             id: 't2FZcwFO',
//             streetName: 'Ssdfsdf',
//             postalCode: '222222',
//             city: 'Wroclaw',
//             country: 'BY',
//           },
//         ],
//         shippingAddressIds: ['t2FZcwFO'],
//         billingAddressIds: ['t2FZcwFO'],
//         isEmailVerified: false,
//         stores: [],
//         authenticationMode: 'Password',
//       },
//     },
//     statusCode: 200,
//   },
//   token: 'cJwv-STA6_EXUh20rUZSksJMPMuaN9iJ',
// };
