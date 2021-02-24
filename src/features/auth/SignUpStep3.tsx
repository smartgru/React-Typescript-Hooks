import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import { Form, Input, Select, SubmitButton } from '../../components/Form';
import { BadRequestError } from '../../helpers/api';

import { updateUser, isPreviousStepCompleted, setStepCompleted } from './authSlice';
import { SignUpStep3FormInputs } from './types';
import { signUpProvinceOptions, signUpSexOptions, signUpEducationOptions } from './constants';

import styles from './SignUpSteps.module.scss';

const schemaResolver = yupResolver<SignUpStep3FormInputs>(yup.object().shape({}));

export const SignUpStep3: React.FC = () => {
  const previousStepCompleted = useSelector(isPreviousStepCompleted(3));
  const history = useHistory();
  const dispatch = useDispatch();

  if (!previousStepCompleted) {
    history.push('/user/sign-up/1');
    return null;
  }

  const onSubmit = async (data: SignUpStep3FormInputs) => {
    try {
      await updateUser(data);
      dispatch(setStepCompleted(3));
      history.push('/user/sign-up/4');
    } catch (err) {
      if (err instanceof BadRequestError) {
        console.log(err.response);
      } else {
        console.log(err);
        console.log(err.message);
      }
    }
  };

  return (
    <Container fluid className="px-0">
      <h3 className={styles.title}>Personal Information</h3>
      <Form onSubmit={onSubmit} resolver={schemaResolver}>
        <Input
          name="address"
          placeholder="Address"
          className={styles.firstHalfInput + ' ' + styles.inputBlock}
          labelClassName={styles.label}
        />
        <Input
          name="city"
          placeholder="City"
          className={styles.secondHalfInput + ' ' + styles.inputBlock}
          labelClassName={styles.label}
        />

        <Select
          name="province"
          options={signUpProvinceOptions}
          placeholder="Province"
          className={styles.firstHalfInput + ' ' + styles.inputBlock}
          wrapClassName={styles.selectWrap}
        />
        <Input
          name="postal_code"
          placeholder="Postal Code"
          className={styles.secondHalfInput + ' ' + styles.inputBlock}
          labelClassName={styles.label}
        />

        <Input
          name="home_phone"
          placeholder="Home Phone"
          className={styles.firstHalfInput + ' ' + styles.inputBlock}
          labelClassName={styles.label}
        />
        <Input
          name="mobile_phone"
          placeholder="Cell Phone"
          className={styles.secondHalfInput + ' ' + styles.inputBlock}
          labelClassName={styles.label}
        />

        <Select
          name="sex"
          options={signUpSexOptions}
          placeholder="Sex"
          className={styles.firstHalfInput + ' ' + styles.inputBlock}
          wrapClassName={styles.selectWrap}
        />
        <Select
          name="education"
          options={signUpEducationOptions}
          placeholder="Education"
          className={styles.secondHalfInput + ' ' + styles.inputBlock}
          wrapClassName={styles.selectWrap}
        />

        <SubmitButton value="Continue" className={styles.submitButtonBlock} />
      </Form>
    </Container>
  );
};
