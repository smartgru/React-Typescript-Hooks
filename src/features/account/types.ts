export enum AccountType {
  SAVINGS = 'SAVINGS',
  CREDIT = 'CREDIT',
  LINE_OF_CREDIT = 'LINE_OF_CREDIT',
  CHECKING = 'CHECKING',
  OTHER = 'OTHER',
}

export enum AccountPurpose {
  SAVINGS_ACCOUNT = 'Savings Account',
  GIC = 'GIC',
  ETF = 'ETF',
  BOND = 'Bond',
  STOCK = 'Stock',
  MUTUAL_FUND = 'Mutual Fund',
  OTHER = 'Other',
}

export interface AccountItem {
  id: number;
  url: string;
  balance: string;
  displayed_name: string;
  account_name: string;
  account_type: AccountType;
  date_updated: string;
  purpose: AccountPurpose;
  provider_name: string;
}

export type AccountItems = AccountItem[];

export interface AccountSavingsItem extends AccountItem {
  savings_account: {
    current_balance: string;
    available_balance: string;
  };
}

export interface AccountCreditItem extends AccountItem {
  credit_account: {
    available_credit: string;
    running_balance: string;
  };
}

export interface AccountLineOfCreditItem extends AccountItem {
  line_of_credit_account: {
    classification: string;
    principal_balance: string;
  };
}

export interface AccountCheckingItem extends AccountItem {
  checking_account: {
    available_balance: string;
  };
}

export interface AccountOtherItem extends AccountItem {
  other_account: {
    running_balance: string;
  };
}

export type AccountItemFormInputs = {
  purpose: AccountPurpose;
  account_type: AccountType;
  checking_account?: {
    available_balance: string;
  };
  savings_account?: {
    current_balance: string;
    available_balance: string;
  };
  other_account?: {
    running_balance: string;
  };
  provider_name: string;
  account_name: string;
  displayed_name: string;
  date_updated: string;
};
