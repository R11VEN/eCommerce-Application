export interface UserDto {
  email: string;
  password: string;
}

export interface Address {
  city?: string;
  country?: string;
  id?: string;
  postalCode?: string;
  streetName?: string;
}

export interface AddressPrint extends Omit<Address, 'id'> {}

export interface UserCreateDto {
  firstName?: string;
  lastName?: string;
  date?: string;
  email: string;
  password?: string;
  city?: string;
  street?: string;
  postalCode?: string;
  cityBilling?: string;
  streetBilling?: string;
  postalCodeBilling?: string;
  defaultBilling?: boolean;
  defaultShipping?: boolean;
  differentBilling?: boolean;
}

export interface UserResponse {
  dateOfBirth?: string;
  firstName?: string;
  lastName?: string;
  id: string;
  email: string;
  addresses?: Address[];
  isEmailVerified: boolean;
  shippingAddressIds?: string[];
  version: number;
  createdAt: string;
  versionModifiedAt?: string;
  statusCode?: number;
}
