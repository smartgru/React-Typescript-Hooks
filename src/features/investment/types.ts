import { AccountItem } from '../account';
import { BetterRates } from '../../types';

export type InvestmentType = 'EF' | 'STI' | 'LTI';

export enum InvestmentSubType {
  SAVINGS_ACCOUNT = 'Savings Account',
  GIC = 'GIC',
  ETF = 'ETF',
  BOND = 'Bond',
  STOCK = 'Stock',
  MUTUAL_FUND = 'Mutual Fund',
  OTHER = 'Other',
}

export enum InvestmentEmergencyFundPurpose {
  THREE_MONTH_CUSHION = '3-month Cushion',
  SIX_MONTH_CUSHION = '6-month Cushion',
  NINE_MONTH_CUSHION = '9-month Cushion',
  TWELVE_MONTH_CUSHION = '12-month Cushion',
}

export enum InvestmentShortTermPurpose {
  HOME = 'Home',
  AUTO = 'Auto',
  EDUCATION = 'Education',
  WEDDING = 'Wedding',
  OTHER = 'Other',
}

export enum InvestmentLongTermPurpose {
  RETIREMENT = 'Retirement',
  CHILD_EDUCATION = 'Child Education',
  OTHER = 'Other',
}

export type InvestmentPurpose = InvestmentEmergencyFundPurpose & InvestmentShortTermPurpose & InvestmentLongTermPurpose;

export interface InvestmentItem {
  id: number;
  better_rates: BetterRates;
  account: AccountItem;
  investment_type: InvestmentType;
  subtype: InvestmentSubType;
  rate: string;
  maturity: string;
  purpose: InvestmentPurpose;
}

export type InvestmentItems = InvestmentItem[];

export type InvestmentFormInputs = {
  investment_type: InvestmentType;
  account: AccountItem;
  limit: string;
  purpose: InvestmentPurpose;
  subtype: InvestmentSubType;
  rate: string;
  maturity: string;
};
