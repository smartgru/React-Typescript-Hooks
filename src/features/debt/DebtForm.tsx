import React, { useCallback, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { SubmitHandler, UnpackNestedValue } from 'react-hook-form/dist/types/form';
import { DeepPartial } from 'react-hook-form/dist/types/utils';
import { useDispatch, useSelector } from 'react-redux';

import { DebtFormInputs } from './types';
import { DatePicker, Form, Input, Select, SubmitButton, WatchInput } from '../../components/Form';
import { getAccountList, selectAccountList, selectListLoading } from '../account/accountSlice';

import styles from './DebtForm.module.scss';

const schemaResolver = yupResolver<DebtFormInputs>(
  yup.object().shape({
    rate: yup.number().min(0).max(100).typeError('please enter a percentage').required(),
    limit: yup.number().typeError('please enter a number').required(),
    debt_type: yup.string().required(),
    maturity: yup.string().required(),
  }),
);

const debtTypesOptions = [
  { value: 'Home Loan', label: 'Home Loan' },
  { value: 'Auto Loan', label: 'Auto Loan' },
  { value: 'Student Loan', label: 'Student Loan' },
  { value: 'Line of Credit', label: 'Line of Credit' },
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Other', label: 'Other' },
];

export type DebtFormProps = {
  defaultValues?: UnpackNestedValue<DeepPartial<DebtFormInputs>>;
  onSubmit: SubmitHandler<DebtFormInputs>;
};

export const DebtForm: React.FC<DebtFormProps> = ({ defaultValues = {}, onSubmit }) => {
  const dispatch = useDispatch();
  const getAccountListAction = useCallback(() => dispatch(getAccountList()), [dispatch]);

  const accountList = useSelector(selectAccountList);
  const listLoading = useSelector(selectListLoading);

  useEffect(() => {
    getAccountListAction();
  }, [getAccountListAction]);

  if (listLoading) {
    return <Spinner animation="border" />;
  }

  const accountOptionsList = accountList.map((account) => ({
    value: account.id,
    label: account.account_name,
  }));

  return (
    <Container fluid className="px-0">
      <Form onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
        <Select name="account.id" options={accountOptionsList} placeholder="Bank Account" />

        <WatchInput
          className={styles.firstHalfInput}
          name="account.balance"
          placeholder="Balance"
          fieldToWatch="account.id"
          dataList={accountList}
          dataKey="balance"
        />
        <WatchInput
          className={styles.secondHalfInput}
          name="account.purpose"
          placeholder="Account"
          fieldToWatch="account.id"
          dataList={accountList}
          dataKey="purpose"
        />

        <Input name="limit" placeholder="Limit" />
        <Select name="debt_type" options={debtTypesOptions} placeholder="Purpose" />

        <WatchInput
          name="account.provider_name"
          placeholder="Provider"
          fieldToWatch="account.id"
          dataList={accountList}
          dataKey="provider_name"
        />

        <Input className={styles.firstHalfInput} name="rate" placeholder="Interest Rate" />
        <DatePicker className={styles.secondHalfInput} name="maturity" placeholder="Maturity" />

        <SubmitButton value="Submit" />
      </Form>
    </Container>
  );
};
