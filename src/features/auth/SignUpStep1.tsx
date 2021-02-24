import React, { useCallback, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import { Form, Input, SubmitButton } from '../../components/Form';
import { SignUpStep1FormInputs } from './types';
import { createUser, setTokens, setStepCompleted, resetAllSteps } from './authSlice';
import { BadRequestError } from '../../helpers/api';
import { useDispatch } from 'react-redux';

import styles from './SignUpSteps.module.scss';

const schemaResolver = yupResolver<SignUpStep1FormInputs>(
  yup.object().shape({
    first_name: yup.string().required('Please enter First Name'),
    last_name: yup.string().required('Please enter Last Name'),
    email: yup.string().email('Please enter a valid Email').required('Please enter Email'),
    password: yup.string().required('Please enter Password').min(8, 'Password should be at least 8 symbols'),
    password_confirmation: yup.string().when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], 'Both passwords need to be the same'),
    }),
  }),
);

export const SignUpStep1: React.FC = () => {
  const [formError, setFormError] = useState<string>('');
  const history = useHistory();
  const dispatch = useDispatch();

  const resetAllStepsAction = useCallback(() => dispatch(resetAllSteps()), [dispatch]);

  useEffect(() => {
    resetAllStepsAction();
  }, [resetAllStepsAction]);

  const onSubmit = async (data: SignUpStep1FormInputs) => {
    try {
      const response = await createUser(data);

      dispatch(
        setTokens({
          accessToken: response.tokens.access,
          refreshToken: response.tokens.refresh,
        }),
      );
      dispatch(setStepCompleted(1));
      history.push('/user/sign-up/2');
    } catch (err) {
      if (err instanceof BadRequestError) {
        if (err.response.email && Array.isArray(err.response.email)) {
          setFormError(err.response.email[0]);
        }
        console.log(err.response);
      } else {
        console.log(err);
        console.log(err.message);
      }
    }
  };

  return (
    <Container fluid className="px-0">
      <h3 className={styles.title}>Account Information</h3>
      {formError.length ? (
        <div className="invalid-feedback mb-2" style={{ display: 'block' }}>
          {formError}
        </div>
      ) : null}
      <Form onSubmit={onSubmit} resolver={schemaResolver}>
        <Input type="hidden" name="home_phone" value="1234-1234" placeholder="1234-1234" />
        <Input type="hidden" name="mobile_phone" value="777-7777-7777" placeholder="777-7777-7777" />
        <Input
          name="first_name"
          placeholder="First Name"
          className={styles.firstHalfInput + ' ' + styles.inputBlock}
          labelClassName={styles.label}
        />
        <Input
          name="last_name"
          placeholder="Last Name"
          className={styles.secondHalfInput + ' ' + styles.inputBlock}
          labelClassName={styles.label}
        />
        <Input name="email" placeholder="Email Address" className={styles.inputBlock} labelClassName={styles.label} />
        <Input
          type="password"
          name="password"
          placeholder="Create Password"
          className={styles.inputBlock}
          labelClassName={styles.label}
        />
        <Input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          className={styles.inputBlock}
          labelClassName={styles.label}
        />
        <SubmitButton value="Continue" className={styles.submitButtonBlock} />
      </Form>
    </Container>
  );
};
