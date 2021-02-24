import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';

import styles from './Profile.module.scss';
import { Form, Input, SubmitButton } from '../../components/Form';
import { ProfileForm1Inputs, ProfileForm2Inputs } from './types';
import { getUserDetails, selectUserDetails, selectUserDetailsLoading, updateUser, signOut } from './authSlice';
import { BadRequestError } from '../../helpers/api';

const schema1Resolver = yupResolver<ProfileForm1Inputs>(
  yup.object().shape({
    first_name: yup.string().required('Please enter First Name'),
    last_name: yup.string().required('Please enter Last Name'),
    email: yup.string().email('Please enter a valid Email').required('Please enter Email'),
  }),
);

const schema2Resolver = yupResolver<ProfileForm2Inputs>(
  yup.object().shape({
    password: yup
      .string()
      .test('len', 'Password should be at least 8 symbols', (val) => !val || (val && val.toString().length > 8)),
    password_confirmation: yup.string().when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], 'Both passwords need to be the same'),
    }),
  }),
);

export const Profile: React.FC = () => {
  const [block1Active, setBlock1Active] = useState(false);
  const [block2Active, setBlock2Active] = useState(false);

  const dispatch = useDispatch();
  const getUserDetailsAction = useCallback(() => dispatch(getUserDetails()), [dispatch]);

  const userDetails = useSelector(selectUserDetails);
  const userDetailsLoading = useSelector(selectUserDetailsLoading);

  useEffect(() => {
    getUserDetailsAction();
  }, [getUserDetailsAction]);

  const onSubmitBlock1 = async (data: ProfileForm1Inputs) => {
    try {
      await updateUser(data);
      getUserDetailsAction();
    } catch (err) {
      if (err instanceof BadRequestError) {
        console.log(err.response);
      } else {
        console.log(err);
        console.log(err.message);
      }
    }
  };

  const onSubmitBlock2 = async (data: ProfileForm2Inputs) => {
    if (!data.password) {
      delete data.password;
    }
    try {
      await updateUser(data);
      getUserDetailsAction();
    } catch (err) {
      if (err instanceof BadRequestError) {
        console.log(err.response);
      } else {
        console.log(err);
        console.log(err.message);
      }
    }
  };

  if (userDetailsLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <Container className="position-relative">
          <button type="button" className={styles.signOutButton + ' btn'} onClick={() => signOut()}>
            Sign Out
          </button>
          <div className={styles.profileName}>
            {userDetails && userDetails.first_name} {userDetails && userDetails.last_name}
          </div>
          <div className={styles.accountId}>Account ID: {userDetails && userDetails.customer_id}</div>
        </Container>
      </div>
      <Container>
        {block1Active ? (
          <div className={styles.profileBlock}>
            <div className={styles.profileFormBlock}>
              <h2 className={styles.activeBlockHeading}>Account</h2>
              <Form onSubmit={onSubmitBlock1} resolver={schema1Resolver} defaultValues={userDetails}>
                <Input name="first_name" placeholder="First Name" label="First Name" />
                <Input name="last_name" placeholder="Last Name" label="Last Name" />
                <Input name="email" placeholder="E-mail" label="E-mail" />

                <SubmitButton value="Submit" className={styles.submitButton} />
              </Form>
            </div>
          </div>
        ) : (
          <div className={styles.profileBlock}>
            <button type="button" className={styles.editButton + ' btn'} onClick={() => setBlock1Active(true)}>
              Edit
            </button>
            <h2 className={styles.inactiveBlockHeading}>Account</h2>
            <div className={styles.profileBlockFieldTitle}>First Name</div>
            <div className={styles.profileBlockFieldValue}>{userDetails && userDetails.first_name}</div>
            <div className={styles.profileBlockFieldTitle}>Last Name</div>
            <div className={styles.profileBlockFieldValue}>{userDetails && userDetails.last_name}</div>
            <div className={styles.profileBlockFieldTitle}>E-Mail</div>
            <div className={styles.profileBlockFieldValue}>{userDetails && userDetails.email}</div>
            <div className={styles.grayLine} />
          </div>
        )}
        {block2Active ? (
          <div className={styles.profileBlock}>
            <div className={styles.profileFormBlock}>
              <h2 className={styles.activeBlockHeading}>Security</h2>
              <Form onSubmit={onSubmitBlock2} resolver={schema2Resolver} defaultValues={userDetails}>
                <Input type="password" name="password" placeholder="Password" label="Password" />
                <Input
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                />
                <Input name="mobile_phone" placeholder="Cell Phone" label="Cell Phone" />
                <Input name="home_phone" placeholder="Home Phone" label="Home Phone" />
                <SubmitButton value="Submit" className={styles.submitButton} />
              </Form>
            </div>
          </div>
        ) : (
          <div className={styles.profileBlock}>
            <button type="button" className={styles.editButton + ' btn'} onClick={() => setBlock2Active(true)}>
              Edit
            </button>
            <h2 className={styles.inactiveBlockHeading}>Security</h2>
            <div className={styles.profileBlockFieldTitle}>Password</div>
            <div className={styles.profileBlockFieldValue}>*****</div>
            <div className={styles.profileBlockFieldTitle}>Cell Phone</div>
            <div className={styles.profileBlockFieldValue}>{userDetails && userDetails.mobile_phone}</div>
            <div className={styles.profileBlockFieldTitle}>Home Phone</div>
            <div className={styles.profileBlockFieldValue}>{userDetails && userDetails.home_phone}</div>
            <div className={styles.grayLine} />
          </div>
        )}
      </Container>
    </div>
  );
};
