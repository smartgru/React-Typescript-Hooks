import React from 'react';

import styles from './Typography.module.scss';

export interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3';
}

export const Typography: React.FC<TypographyProps> = ({ variant, children }) => {
  switch (variant) {
    case 'h1':
      return <h1 className={styles.h1}>{children}</h1>;
    case 'h2':
      return <h2 className={styles.h2}>{children}</h2>;
    case 'h3':
      return <h3 className={styles.h3}>{children}</h3>;
  }
  return null;
};
