import React from 'react';
import get from 'lodash/get';

export interface DisplayErrorProps {
  errors?: Record<string, Record<string, string>>;
  name: string;
}

export const DisplayError: React.FC<DisplayErrorProps> = ({ errors, name }) => {
  return (
    <React.Fragment>
      {errors && get(errors, name) && (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          {get(errors, name).message}
        </div>
      )}
    </React.Fragment>
  );
};
