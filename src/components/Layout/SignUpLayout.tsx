import React from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

import styles from './SignUpLayout.module.scss';

export const SignUpLayout: React.FC = ({ children }) => {
  let { stepId } = useParams();
  stepId = parseInt(stepId, 10);

  return (
    <div className={styles.container}>
      <div className={styles.stepsBlock}>
        <div className={styles.logo} />
        <h1 className={styles.title}>Create your Arctic Rich account</h1>
        <div className={styles.steps}>
          <div className={styles.stepContainer}>
            <div
              className={clsx(styles.stepCircle, styles.stepCircleFirst, { [styles.stepCircleActive]: stepId >= 1 })}
            />
            <div className={styles.stepText}>Account</div>
          </div>
          <div className={styles.stepContainer}>
            <div className={clsx(styles.stepCircle, { [styles.stepCircleActive]: stepId >= 2 })} />
            <div className={styles.stepText}>Payment</div>
          </div>
          <div className={styles.stepContainer}>
            <div className={clsx(styles.stepCircle, { [styles.stepCircleActive]: stepId >= 3 })} />
            <div className={styles.stepText}>Personal</div>
          </div>
          <div className={styles.stepContainer}>
            <div
              className={clsx(styles.stepCircle, styles.stepCircleLast, { [styles.stepCircleActive]: stepId >= 4 })}
            />
            <div className={styles.stepText}>Finish</div>
          </div>
        </div>
      </div>
      <div className={styles.contentBlock}>{children}</div>
    </div>
  );
};
