import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { InsuranceItems } from './types';
import {
  Table,
  dateFormatter,
  priceFormatter,
  deleteIconFormatter,
  editIconFormatter,
  TableSortCaret,
} from '../../components/Table';

import styles from '../../components/Table/Table.module.scss';
import { deleteInsurance, getInsuranceList } from './insuranceSlice';
import { useDispatch } from 'react-redux';

export interface InsuranceTableProps {
  insuranceList: InsuranceItems;
}

export const InsuranceTable: React.FC<InsuranceTableProps> = ({ insuranceList }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getInsuranceListAction = useCallback(() => dispatch(getInsuranceList()), [dispatch]);

  const columns = [
    {
      dataField: 'policy',
      text: 'Policies',
      sort: true,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'policy_amount',
      text: 'Policy Amount',
      sort: true,
      formatter: priceFormatter,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'expiry',
      text: 'Expiry',
      sort: true,
      formatter: dateFormatter('MMM dd, yyyy'),
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'monthly_premium',
      text: 'Monthly Premium',
      sort: true,
      formatter: priceFormatter,
      sortCaret: TableSortCaret,
    },
    {
      dataField: 'id',
      text: 'Edit',
      sort: false,
      formatter: editIconFormatter,
      classes: styles.editIconColumn,
      formatExtraData: {
        baseUrl: '/save/insurance/edit/',
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
          await deleteInsurance(id);
          getInsuranceListAction();
        },
      },
    },
  ];
  return <Table keyField="id" data={insuranceList} columns={columns} bootstrap4 />;
};
