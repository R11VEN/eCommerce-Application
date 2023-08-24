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
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  date?: string;
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
