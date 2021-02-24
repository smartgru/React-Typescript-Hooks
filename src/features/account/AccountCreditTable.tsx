import React from 'react';

import { AccountCreditItem } from './types';
import { Table, dateFormatter, priceFormatter, TableSortCaret } from '../../components/Table';

export interface AccountCreditTableProps {
  list: AccountCreditItem[];
}

export const AccountCreditTable: React.FC<AccountCreditTableProps> = ({ list }) => {
  const columns = [
    {
      dataField: 'provider_name',
      text: 'Provider',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'credit_account.available_credit',
      text: 'Available Credit',
      sort: true,
      formatter: priceFormatter,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'credit_account.running_balance',
      text: 'Running Balance',
      sort: true,
      formatter: priceFormatter,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'displayed_name',
      text: 'Displayed Name',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'account_name',
      text: 'Account Name',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'date_updated',
      text: 'Updated',
      sort: true,
      formatter: dateFormatter('MMM dd, yyyy'),
      sortCaret: TableSortCaret,
    },
  ];
  return <Table keyField="id" data={list} columns={columns} bootstrap4 />;
};
