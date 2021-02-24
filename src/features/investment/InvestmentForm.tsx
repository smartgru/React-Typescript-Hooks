import React, { useCallback, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { SubmitHandler, UnpackNestedValue } from 'react-hook-form/dist/types/form';
import { DeepPartial } from 'react-hook-form/dist/types/utils';
import { useDispatch, useSelector } from 'react-redux';

import { InvestmentFormInputs } from './types';
import { DatePicker, Form, Input, Select, SubmitButton, WatchInput } from '../../components/Form';
import { getAccountList, selectAccountList, selectListLoading } from '../account/accountSlice';

import styles from './InvestmentForm.module.scss';
import { getPurposeOptions, investmentSubTypeOptions } from './constants';

const schemaResolver = yupResolver<InvestmentFormInputs>(
  yup.object().shape({
    account: yup.object().shape({
      id: yup.string().required('please choose a bank account'),
    }),
    rate: yup.number().min(0).max(100).typeError('please enter a percentage').required(),
    purpose: yup.string().required('please choose a purpose of an investment'),
    subtype: yup.string().required('please choose a type of an investment'),
    maturity: yup.string().required(),
  }),
);

export type InvestmentFormProps = {
  defaultValues?: UnpackNestedValue<DeepPartial<InvestmentFormInputs>>;
  onSubmit: SubmitHandler<InvestmentFormInputs>;
};

export const InvestmentForm: React.FC<InvestmentFormProps> = ({ defaultValues = {}, onSubmit }) => {
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
        <Input
          type="hidden"
          name="investment_type"
          value={defaultValues.investment_type}
          placeholder={defaultValues.investment_type || ''}
        />
        <Select name="account.id" options={accountOptionsList} placeholder="Bank Account" />

        <WatchInput
          className={styles.firstHalfInput}
          placeholder="Balance"
          name="account.balance"
          fieldToWatch="account.id"
          dataList={accountList}
          dataKey="balance"
        />
        <Select
          className={styles.secondHalfInput}
          name="purpose"
          options={getPurposeOptions(defaultValues.investment_type)}
          placeholder="Purpose"
        />

        <Select name="subtype" options={investmentSubTypeOptions} placeholder="Type" />

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
