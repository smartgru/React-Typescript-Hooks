import React from 'react';
import Container from 'react-bootstrap/Container';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { SubmitHandler, UnpackNestedValue } from 'react-hook-form/dist/types/form';
import { DeepPartial } from 'react-hook-form/dist/types/utils';

import { InsuranceFormInputs } from './types';
import { DatePicker, Form, Input, Select, SubmitButton } from '../../components/Form';

const schemaResolver = yupResolver<InsuranceFormInputs>(
  yup.object().shape({
    policy: yup.string().required(),
    policy_amount: yup.number().typeError('please enter a number').required().positive(),
    monthly_premium: yup.number().typeError('please enter a number').required().positive(),
    expiry: yup.string().required(),
  }),
);

const insurancePoliciesOptions = [
  { value: 'Home Insurance', label: 'Home Insurance' },
  { value: 'Auto Insurance', label: 'Auto Insurance' },
  { value: 'Health Insurance', label: 'Health Insurance' },
  { value: 'Life Insurance', label: 'Life Insurance' },
  { value: 'Disability Insurance', label: 'Disability Insurance' },
];

export type InsuranceFormProps = {
  defaultValues?: UnpackNestedValue<DeepPartial<InsuranceFormInputs>>;
  onSubmit: SubmitHandler<InsuranceFormInputs>;
};

export const InsuranceForm: React.FC<InsuranceFormProps> = ({ defaultValues = {}, onSubmit }) => {
  return (
    <Container fluid className="px-0">
      <Form onSubmit={onSubmit} resolver={schemaResolver} defaultValues={defaultValues}>
        <Select name="policy" options={insurancePoliciesOptions} placeholder="Policy" />
        <Input name="policy_amount" placeholder="Policy Amount" label="Policy Amount" prefix="$" />
        <DatePicker name="expiry" placeholder="Expiry" />
        <Input name="monthly_premium" placeholder="Monthly Premium" label="Monthly Premium" prefix="$" />
        <SubmitButton value="Submit" />
      </Form>
    </Container>
  );
};
