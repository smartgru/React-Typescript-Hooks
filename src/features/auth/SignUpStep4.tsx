import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { isPreviousStepCompleted } from './authSlice';
import successSvg from '../../common/images/success.svg';

import styles from './SignUpSteps.module.scss';

export const SignUpStep4: React.FC = () => {
  const previousStepCompleted = useSelector(isPreviousStepCompleted(4));
  const history = useHistory();

  if (!previousStepCompleted) {
    history.push('/user/sign-up/1');
    return null;
  }

  return (
    <div className={styles.step4}>
      <img src={successSvg} className={styles.image} alt="success" width="141" height="27" />
      <h1 className={styles.thankYou}>Thank you for signing up</h1>
      <div className={styles.separator} />
      <div className={styles.description}>
        We will contact you <br /> with next steps
      </div>
    </div>
  );
};
