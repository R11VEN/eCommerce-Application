import { getApiRoot } from './BuildClientAdmin';

export const getCostumer = async () => {
  const costumer = await getApiRoot
    .customers()
    .withId({ ID: '7aabeca9-4609-4cac-9a3d-84f6bb803ba7' })
    .get()
    .execute();

  return costumer.body;
};
