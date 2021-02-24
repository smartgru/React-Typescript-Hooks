import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory, Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';

import { Form, Input, SubmitButton } from '../../components/Form';
import { LoginFormInputs } from './types';
import { loginWithCredentials, AuthenticationError } from '../../helpers/api';

import styles from './Login.module.scss';

const schemaResolver = yupResolver<LoginFormInputs>(
  yup.object().shape({
    email: yup.string().email('Please enter a valid Email').required('Please enter Email'),
    password: yup.string().required('Please enter Password'),
  }),
);

export const Login: React.FC = () => {
  const [formError, setFormError] = useState<string>('');
  const history = useHistory();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await loginWithCredentials(data);
      history.push('/');
    } catch (err) {
      if (err instanceof AuthenticationError) {
        if (typeof err.response.detail === 'string') {
          setFormError(err.response.detail);
        } else {
          setFormError('Unknown error occurred');
        }
        console.log(err.response);
      } else {
        setFormError('Unknown error occurred');
        console.log(err);
        console.log(err.message);
      }
    }
  };

  return (
    <Container fluid className="px-0">
      <React.Fragment>
        {formError.length ? <div className={styles.formErrorBlock + ' invalid-feedback'}>{formError}</div> : null}
      </React.Fragment>
      <Form onSubmit={onSubmit} resolver={schemaResolver}>
        <Input name="email" placeholder="Email" className={styles.inputBlock} labelClassName={styles.label} />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.inputBlock}
          labelClassName={styles.label}
        />
        <SubmitButton value="Continue" className={styles.submitButtonBlock} />
        <div className={styles.linksBlock}>
          <Link to="/user/forgot-password" className={styles.link}>
            Forgot password?
          </Link>
          <br />
          Don’t have an account?{' '}
          <Link to="/user/sign-up/1" className={styles.link}>
            Sign Up
          </Link>
        </div>
      </Form>
    </Container>
  );
};
