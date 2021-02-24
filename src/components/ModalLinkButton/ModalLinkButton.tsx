import React from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

import styles from './ModalLinkButton.module.scss';

export interface ModalLinkButtonProps extends LinkProps {
  to: string;
}

export const ModalLinkButton: React.FC<ModalLinkButtonProps> = ({ to, children, ...otherProps }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: to,
        state: { background: location },
      }}
      {...otherProps}
    >
      <button type="button" className={styles.button + ' btn'}>
        {children}
      </button>
    </Link>
  );
};
