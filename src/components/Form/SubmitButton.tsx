import React from 'react';

import styles from './SubmitButton.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export type SubmitButtonProps = React.HTMLProps<HTMLInputElement>;

export const SubmitButton: React.FC<SubmitButtonProps> = ({ value, className, ...otherProps }) => {
  return (
    <Row noGutters className={styles.inputRow + ' ' + className}>
      <Col>
        <input type="submit" {...otherProps} value={value} className={styles.inputElement} />
      </Col>
    </Row>
  );
};
