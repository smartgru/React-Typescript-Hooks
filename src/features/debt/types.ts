import { AccountItem } from '../account';
import { BetterRates } from '../../types';

export enum DebtType {
  HOME_LOAN = 'Home Loan',
  AUTO_LOAN = 'Auto Loan',
  STUDENT_LOAN = 'Student Loan',
  LINE_OF_CREDIT = 'Line of Credit',
  CREDIT_CARD = 'Credit Card',
  OTHER = 'Other',
}

export interface DebtItem {
  id: number;
  better_rates: BetterRates;
  account: AccountItem;
  rate: string;
  maturity: string;
  limit: string;
  debt_type: DebtType;
}

export type DebtItems = DebtItem[];

export type DebtFormInputs = {
  account: AccountItem;
  limit: string;
  type: DebtType;
  rate: string;
  maturity: string;
};
