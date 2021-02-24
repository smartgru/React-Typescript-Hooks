import React from 'react';
import Container from 'react-bootstrap/Container';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { SubmitHandler, UnpackNestedValue } from 'react-hook-form/dist/types/form';
import { DeepPartial } from 'react-hook-form/dist/types/utils';

import { AccountItemFormInputs, AccountType } from './types';
import { Form, Input, Select, SubmitButton } from '../../components/Form';

import styles from './AccountItemForm.module.scss';
import { accountPurposeOptions } from './constants';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';

const schemaResolver = yupResolver<AccountItemFormInputs>(
  yup.object().shape({
    purpose: yup.string().required('please choose a purpose of an account'),
  }),
);

export type InvestmentFormProps = {
  defaultValues: UnpackNestedValue<DeepPartial<AccountItemFormInputs>>;
  onSubmit: SubmitHandler<AccountItemFormInputs>;
};

export const AccountItemForm: React.FC<InvestmentFormProps> = ({ defaultValues = {}, onSubmit }) => {
  return (
    <Container fluid className="px-0">
      <Form onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
        <Select name="purpose" options={accountPurposeOptions} placeholder="Purpose" />

        {defaultValues.account_type === AccountType.SAVINGS && (
          <React.Fragment>
            <Input
              className={styles.firstHalfInput}
              name="savings_account.current_balance"
              placeholder="Current Balance"
              disabled
              value={defaultValues.savings_account && '$' + defaultValues.savings_account.current_balance}
            />
            <Input
              className={styles.secondHalfInput}
              name="savings_account.available_balance"
              placeholder="Available Balance"
              disabled
              value={defaultValues.savings_account && '$' + defaultValues.savings_account.available_balance}
            />
          </React.Fragment>
        )}

        {defaultValues.account_type === AccountType.CHECKING && (
          <React.Fragment>
            <Input
              name="checking_account.available_balance"
              placeholder="Available Balance"
              disabled
              value={defaultValues.checking_account && '$' + defaultValues.checking_account.available_balance}
            />
          </React.Fragment>
        )}

        {defaultValues.account_type === AccountType.OTHER && (
          <React.Fragment>
            <Input
              name="other_account.running_balance"
              placeholder="Running Balance"
              disabled
              value={defaultValues.other_account && '$' + defaultValues.other_account.running_balance}
            />
          </React.Fragment>
        )}

        <Input name="provider_name" placeholder="Provider Name" disabled />
        <Input name="account_name" placeholder="Account Name" disabled />

        <Input className={styles.firstHalfInput} name="displayed_name" placeholder="Displayed Name" disabled />
        <Input
          className={styles.secondHalfInput}
          name="date.updated"
          placeholder="Updated"
          disabled
          value={defaultValues.date_updated && format(parseISO(defaultValues.date_updated), 'MMM dd, yyyy')}
        />
        <SubmitButton value="Submit" />
      </Form>
    </Container>
  );
};
