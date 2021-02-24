/*
  {
    "id": 1,
    "url": "http://169.48.29.83:8000/api/v1/transactions/1/",
    "account": "http://169.48.29.83:8000/api/v1/accounts/1/",
    "date_updated": "2020-02-19T17:41:28Z",
    "date_created": "2020-02-19T17:41:28Z",
    "base_type": "CREDIT",
    "category_type": "INCOME",
    "transaction_date": "2020-02-19T17:41:28Z",
    "description": "credit",
    "debit": "0.00",
    "credit": "0.20",
    "balance": "27.12",
    "currency": "CAD"
  },
 */

export type TransactionType = 'CREDIT' | 'DEBIT';
export type TransactionCategory = 'INCOME' | 'TRANSFER' | 'EXPENSE';

export interface TransactionItem {
  id: number;
  base_type: TransactionType;
  category_type: TransactionCategory;
  transaction_date: string;
  description: string;
  debit: string;
  credit: string;
  balance: string;
  currency: string;
}

export type TransactionItems = TransactionItem[];
