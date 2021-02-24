import React from 'react';

import { TransactionItems } from './types';
import { Table, dateFormatter, priceFormatter, TableSortCaret } from '../../components/Table';

export interface TransactionTableProps {
  transactionList: TransactionItems;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactionList }) => {
  const columns = [
    {
      dataField: 'transaction_date',
      text: 'Transaction Date',
      sort: true,
      formatter: dateFormatter('MMM dd, yyyy'),
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'base_type',
      text: 'Type',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'debit',
      text: 'Debit',
      sort: true,
      formatter: priceFormatter,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'credit',
      text: 'Credit',
      sort: true,
      formatter: priceFormatter,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'balance',
      text: 'Balance',
      sort: true,
      formatter: priceFormatter,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'category_type',
      text: 'Category',
      sort: true,
      sortCaret: TableSortCaret,
    },
  ];
  return <Table keyField="id" data={transactionList} columns={columns} bootstrap4 />;
};
