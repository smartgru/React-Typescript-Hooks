import React from 'react';

import { AccountLineOfCreditItem } from './types';
import { Table, dateFormatter, priceFormatter, TableSortCaret } from '../../components/Table';

export interface AccountLineOfCreditTableProps {
  list: AccountLineOfCreditItem[];
}

export const AccountLineOfCreditTable: React.FC<AccountLineOfCreditTableProps> = ({ list }) => {
  const columns = [
    {
      dataField: 'provider_name',
      text: 'Provider',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'line_of_credit_account.principal_balance',
      text: 'Principal Balance',
      sort: true,
      formatter: priceFormatter,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'line_of_credit_account.classification',
      text: 'Classification',
      sort: true,
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
