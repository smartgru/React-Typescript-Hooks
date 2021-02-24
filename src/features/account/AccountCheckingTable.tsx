import React from 'react';
import { useLocation } from 'react-router-dom';

import { AccountCheckingItem } from './types';
import { Table, dateFormatter, priceFormatter, TableSortCaret, editIconFormatter } from '../../components/Table';
import styles from '../../components/Table/Table.module.scss';

export interface AccountCheckingTableProps {
  list: AccountCheckingItem[];
}

export const AccountCheckingTable: React.FC<AccountCheckingTableProps> = ({ list }) => {
  const location = useLocation();

  const columns = [
    {
      dataField: 'provider_name',
      text: 'Provider',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'checking_account.available_balance',
      text: 'Available Balance',
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
    {
      dataField: 'purpose',
      text: 'Purpose',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'id',
      text: 'Edit',
      sort: false,
      formatter: editIconFormatter,
      classes: styles.editIconColumn,
      formatExtraData: {
        baseUrl: '/sync/balance/edit/',
        locationObj: location,
      },
    },
  ];
  return <Table keyField="id" data={list} columns={columns} bootstrap4 />;
};
