export type SignUpStep1FormInputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type SignUpStep3FormInputs = {
  address: string;
  city: string;
  province: string;
  home_phone: string;
  mobile_phone: string;
  sex: string;
  education: string;
};

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type ProfileForm1Inputs = {
  first_name: string;
  last_name: string;
  email: string;
};

export type ProfileForm2Inputs = {
  mobile_phone: string;
  home_phone: string;
  password: string;
};

export type UserDetails = ProfileForm1Inputs & ProfileForm2Inputs & { customer_id: number };
