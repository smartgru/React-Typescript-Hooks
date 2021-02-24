import React, { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { DeepPartial } from 'react-hook-form/dist/types/utils';
import { Resolver, SubmitHandler, UnpackNestedValue } from 'react-hook-form/dist/types/form';

import styles from './Form.module.scss';

export interface FormProps<Inputs> {
  defaultValues?: UnpackNestedValue<DeepPartial<Inputs>>;
  onSubmit: SubmitHandler<Inputs>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  resolver?: Resolver<Inputs, object>;
}

interface AbstractFormElementProps {
  name: string;
}

export const Form = <Inputs,>({
  defaultValues,
  resolver,
  children,
  onSubmit,
}: PropsWithChildren<FormProps<Inputs>>) => {
  const methods = useForm<Inputs>({ defaultValues, resolver });
  const { handleSubmit, register, control, errors } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formBlock} noValidate>
      {Array.isArray(children)
        ? children.map((child) => {
            return (child as React.ReactElement<AbstractFormElementProps>).props &&
              (child as React.ReactElement<AbstractFormElementProps>).props.name
              ? React.createElement((child as React.ReactElement<AbstractFormElementProps>).type, {
                  ...{
                    ...(child as React.ReactElement<AbstractFormElementProps>).props,
                    register,
                    key: (child as React.ReactElement<AbstractFormElementProps>).props.name,
                    errors,
                    control,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};
