import React from 'react';

import styles from './LoginLayout.module.scss';

export const LoginLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo} />
      <h1 className={styles.title}>Please sign into your account</h1>
      {children}
    </div>
  );
};
