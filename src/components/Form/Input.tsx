import React from 'react';
import { DisplayError } from './DisplayError';

import styles from './Input.module.scss';

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder: string;
  register?: (ref: HTMLInputElement) => void;
  name?: string;
  errors?: Record<string, Record<string, string>>;
  prefix?: string;
  labelClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  type,
  prefix,
  register,
  name,
  errors,
  className,
  labelClassName,
  placeholder,
  ...otherProps
}) => {
  if (type === 'hidden') {
    return <input type={type} name={name} ref={register} {...otherProps} />;
  }

  return (
    <div className={styles.inputRow + ' ' + className}>
      {/*prefix && <div className={styles.inputPrefix}>{prefix}</div>*/}
      <input
        type={type}
        name={name}
        ref={register}
        placeholder={placeholder}
        {...otherProps}
        className={styles.inputElement + ' ' + (prefix ? styles.inputElementWithPrefix : null)}
      />
      <label className={styles.inputLabel + ' ' + labelClassName}>{placeholder}</label>
      {name && <DisplayError errors={errors} name={name} />}
    </div>
  );
};
