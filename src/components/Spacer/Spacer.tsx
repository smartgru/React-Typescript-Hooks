import React from 'react';

import styles from './Spacer.module.scss';

export interface SpacerProps {
  variant: 'small' | 'medium' | 'large' | 'red-spacer' | 'gray-spacer';
}

export const Spacer: React.FC<SpacerProps> = ({ variant }) => {
  switch (variant) {
    case 'small':
      return <div className={styles.small} />;
    case 'medium':
      return <div className={styles.medium} />;
    case 'large':
      return <div className={styles.large} />;
    case 'red-spacer':
      return <div className={styles.redSpacer} />;
    case 'gray-spacer':
      return <div className={styles.graySpacer} />;
  }
  return null;
};
