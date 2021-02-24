import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { DebtItems } from './types';
import {
  Table,
  dateFormatter,
  priceFormatter,
  deleteIconFormatter,
  editIconFormatter,
  percentageFormatter,
  TableSortCaret,
  betterRatesModalFormatter,
} from '../../components/Table';
import { deleteDebt, getDebtList } from './debtSlice';

import styles from '../../components/Table/Table.module.scss';

export interface DebtTableProps {
  debtList: DebtItems;
}

export const DebtTable: React.FC<DebtTableProps> = ({ debtList }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getDebtListAction = useCallback(() => dispatch(getDebtList()), [dispatch]);

  const columns = [
    {
      dataField: 'better_rates',
      text: 'Better Rates',
      sort: false,
      formatter: betterRatesModalFormatter,
      formatExtraData: {},
    },
    {
      dataField: 'account.provider_name',
      text: 'Provider',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'debt_type',
      text: 'Purpose',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'account.account_name',
      text: 'Account Name',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'account.balance',
      text: 'Balance',
      sort: true,
      formatter: priceFormatter,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'limit',
      text: 'Limit',
      sort: true,
      formatter: priceFormatter,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'rate',
      text: 'Rate',
      sort: true,
      formatter: percentageFormatter,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'maturity',
      text: 'Maturity',
      sort: true,
      formatter: dateFormatter('MMM dd, yyyy'),
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'id',
      text: 'Edit',
      sort: false,
      formatter: editIconFormatter,
      classes: styles.editIconColumn,
      formatExtraData: {
        baseUrl: '/loan/edit/',
        locationObj: location,
      },
    },
    {
      dataField: 'delete',
      text: 'Delete',
      sort: false,
      formatter: deleteIconFormatter,
      classes: styles.deleteIconColumn,
      formatExtraData: {
        clickHandler: async (id: number) => {
          await deleteDebt(id);
          getDebtListAction();
        },
      },
    },
  ];
  return <Table keyField="id" data={debtList} columns={columns} bootstrap4 />;
};
