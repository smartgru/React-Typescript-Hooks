import React from 'react';
import { Controller } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayPickerInputProps } from 'react-day-picker/types/Props';
import 'react-day-picker/lib/style.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import dateFnsFormat from 'date-fns/format';
import dateFnsParseISO from 'date-fns/parseISO';

import styles from './DatePicker.module.scss';
import { DisplayError } from './DisplayError';

const FORMAT = 'MMM dd, yyyy';

function formatDate(date: Date, format: string) {
  return dateFnsFormat(date, format);
}

export interface DatePickerProps extends DayPickerInputProps {
  name: string;
  className?: string;
  control?: Control;
  errors?: Record<string, Record<string, string>>;
}

function getValue(value: string | Date) {
  if (typeof value === 'string') {
    return dateFnsParseISO(value);
  }
  return value;
}

export const DatePicker: React.FC<DatePickerProps> = ({ control, name, errors, placeholder, className }) => {
  return (
    <Row noGutters className={styles.inputRow + ' ' + className}>
      <Col>
        <Controller
          control={control}
          name={name}
          render={({ onChange, value }) => (
            <DayPickerInput
              onDayChange={onChange}
              value={getValue(value)}
              format={FORMAT}
              formatDate={formatDate}
              placeholder={placeholder}
            />
          )}
        />
        {name && <DisplayError errors={errors} name={name} />}
      </Col>
    </Row>
  );
};
