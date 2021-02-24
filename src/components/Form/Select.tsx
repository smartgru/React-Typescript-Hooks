import React from 'react';
import { DisplayError } from './DisplayError';

import styles from './Select.module.scss';

export interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  register?: (ref: HTMLSelectElement) => void;
  name: string;
  options: { value: string | number; label: string }[];
  errors?: Record<string, Record<string, string>>;
  wrapClassName?: string;
}

export const Select: React.FC<SelectProps> = ({
  register,
  options,
  errors,
  placeholder,
  name,
  className,
  wrapClassName,
  ...otherProps
}) => {
  return (
    <div className={styles.selectRow + ' ' + className}>
      <div className={styles.selectWrap + ' ' + wrapClassName}>
        <select name={name} ref={register} defaultValue="" className={styles.selectElement} required {...otherProps}>
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {<DisplayError errors={errors} name={name} />}
    </div>
  );
};
