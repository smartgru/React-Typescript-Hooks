import React from 'react';
import get from 'lodash/get';
import clsx from 'clsx';

import styles from './Checkbox.module.scss';

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  register?: (ref: HTMLInputElement) => void;
  name?: string;
  errors?: Record<string, Record<string, string>>;
}

export const Checkbox: React.FC<CheckboxProps> = ({ register, name, children, errors, className, ...otherProps }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const hasError = errors && get(errors, name!);
  return (
    <div className={styles.inputRow + ' ' + className}>
      <input
        type="checkbox"
        name={name}
        id={'checkbox_for_' + name}
        ref={register}
        {...otherProps}
        className={clsx(styles.inputElement, { [styles.inputElementWithError]: hasError })}
      />
      <label className={clsx(styles.label, { [styles.labelWithError]: hasError })} htmlFor={'checkbox_for_' + name}>
        {children}
      </label>
    </div>
  );
};
