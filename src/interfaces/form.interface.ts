export interface FormInterface {
  Email?: string;
  Password?: string;
}

export type inputType = {
  label: string;
  type: string;
  id: string;
  placeholder: string;
  isDisable?: boolean;
};

export interface Customer {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
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
  defaultBillingAddress?: boolean;
}
