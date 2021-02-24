/*
  {
    url: 'http://169.48.29.83:8000/api/v1/insurances/2/',
    policy: 'Auto Insurance',
    policy_amount: '2000.00',
    monthly_premium: '75.00',
    expiry: '2021-04-29T17:41:28Z',
    date_updated: '2020-04-19T17:41:28Z',
    date_created: '2020-03-19T17:41:28Z',
  },
 */

export type InsurancePolicyType =
  | 'Home Insurance'
  | 'Auto Insurance'
  | 'Health Insurance'
  | 'Life Insurance'
  | 'Disability Insurance';

export interface InsuranceItem {
  id: number;
  url: string;
  policy: InsurancePolicyType;
  policy_amount: string;
  monthly_premium: string;
  expiry: string;
  date_updated: string;
  date_created: string;
}

export type InsuranceItems = InsuranceItem[];

export type InsuranceFormInputs = {
  policy: InsurancePolicyType;
  policy_amount: string;
  monthly_premium: string;
  expiry: string;
};

export type Thumbnail = {
  title: string;
  subtitle: string;
  images: { low: string; medium: string; high: string };
};

export type Thumbnails = Thumbnail[];

export type InsuranceThumbnails = {
  [key: string]: Thumbnails;
};
