import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { InvestmentItems } from './types';
import {
  Table,
  dateFormatter,
  priceFormatter,
  TableSortCaret,
  betterRatesModalFormatter,
  percentageFormatter,
  editIconFormatter,
  deleteIconFormatter,
} from '../../components/Table';
import styles from '../../components/Table/Table.module.scss';
import { deleteInvestment, getInvestmentList } from './investmentSlice';

export interface InvestmentTableProps {
  list: InvestmentItems;
}

export const InvestmentTable: React.FC<InvestmentTableProps> = ({ list }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const getInvestmentListAction = useCallback(() => dispatch(getInvestmentList()), [dispatch]);

  const columns = [
    {
      dataField: 'better_rates',
      text: 'Better Rates',
      sort: false,
      formatter: betterRatesModalFormatter,
    },
    {
      dataField: 'account.provider_name',
      text: 'Provider',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'subtype',
      text: 'Type',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'account.displayed_name',
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
      dataField: 'rate',
      text: 'Interest Rate (%)',
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
      dataField: 'Purpose',
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
        baseUrl: '/save/investment/edit/',
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
          await deleteInvestment(id);
          getInvestmentListAction();
        },
      },
    },
  ];
  return <Table keyField="id" data={list} columns={columns} bootstrap4 />;
};
