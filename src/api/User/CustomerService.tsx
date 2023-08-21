import { type ClientResponse, type CustomerSignInResult } from '@commercetools/platform-sdk';

import { CustomerData, CustomerRepository } from './User';

interface ICustomerService {
  customerRepository: CustomerRepository;
  createCustomer(
    customerData: CustomerData
  ): Promise<ClientResponse<CustomerSignInResult> | unknown>;
  getCustomer({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ClientResponse<CustomerSignInResult> | unknown>;
}

class CustomerService implements ICustomerService {
  customerRepository: CustomerRepository;
  constructor(CustomerRepository: CustomerRepository) {
    this.customerRepository = CustomerRepository;
  }

  createCustomer(customer: CustomerData) {
    return this.customerRepository.createCustomer(customer);
  }

  getCustomer(customer: CustomerData) {
    return this.customerRepository.getCustomer(customer);
  }
}

export default CustomerService;
