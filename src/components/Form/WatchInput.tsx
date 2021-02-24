import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import { Input } from './Input';

export interface WatchInputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder: string;
  fieldToWatch: string;
  control?: Control;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataList: any[];
  dataKey: string;
}

export const WatchInput: React.FC<WatchInputProps> = ({
  control,
  fieldToWatch,
  dataList,
  dataKey,
  className,
  placeholder,
}) => {
  const fieldToWatchValue = useWatch({
    control,
    name: fieldToWatch,
  });

  if (!Array.isArray(dataList)) {
    return null;
  }

  const item = dataList.find((i) => i.id === parseInt(fieldToWatchValue as string, 10));

  if (item) {
    return <Input value={item[dataKey]} className={className} placeholder={placeholder || ''} disabled />;
  } else {
    return <Input className={className} placeholder={placeholder || ''} disabled />;
  }
};
