import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import * as yup from 'yup';

import { isPreviousStepCompleted, setStepCompleted, sendStripePaymentToken } from './authSlice';
import { Form, SubmitButton, Checkbox } from '../../components/Form';
import { yupResolver } from '@hookform/resolvers';
import { SignUpStep1FormInputs } from './types';

import styles from './SignUpSteps.module.scss';
import stepStyles from './SignUpStep2.module.scss';

const stripePromise = loadStripe('pk_test_j65QOujCjrPkhLURdER1wenm');
const schemaResolver = yupResolver<SignUpStep1FormInputs>(
  yup.object().shape({
    accept_terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  }),
);

const StripeErrorMessage: React.FC = ({ children }) => (
  <div className={stepStyles.stripeErrorMessage} role="alert">
    {children}
  </div>
);

const SignUpStep2WithoutStripe: React.FC = () => {
  const previousStepCompleted = useSelector(isPreviousStepCompleted(2));
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [stripeError, setStripeError] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();

  if (!previousStepCompleted) {
    history.push('/user/sign-up/1');
    return null;
  }

  const onSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      card: cardElement!,
    });

    if (error) {
      console.log('[error]', error);
      setStripeError(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setStripeError(undefined);

      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await sendStripePaymentToken(paymentMethod!.id);
        dispatch(setStepCompleted(2));
        history.push('/user/sign-up/3');
      } catch (err) {
        setStripeError(err.message);
      }
    }
  };

  return (
    <Container fluid className="px-0 position-relative">
      <h3 className={stepStyles.title}>Payment Information</h3>
      <Form onSubmit={onSubmit} resolver={schemaResolver}>
        <div className={stepStyles.stripeField}>
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: '13px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          {stripeError && <StripeErrorMessage>{stripeError}</StripeErrorMessage>}
        </div>
        <Checkbox name="accept_terms" className={stepStyles.checkboxBlock}>
          I agree to the Arctic Rich Terms and Conditions
        </Checkbox>
        <div className={stepStyles.spacer} />
        <SubmitButton disabled={!stripe} value="Continue" className={styles.submitButtonBlock} />
      </Form>
    </Container>
  );
};

export const SignUpStep2 = () => {
  return (
    <Elements stripe={stripePromise} options={{}}>
      <SignUpStep2WithoutStripe />
    </Elements>
  );
};
