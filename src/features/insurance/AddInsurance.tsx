import React, { useCallback } from 'react';
import { Modal } from '../../components/Modal';
import { InsuranceForm } from './InsuranceForm';
import { InsuranceFormInputs } from './types';
import { createInsurance, getInsuranceList } from './insuranceSlice';
import { BadRequestError } from '../../helpers/api';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const AddInsurance: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const getInsuranceListAction = useCallback(() => dispatch(getInsuranceList()), [dispatch]);

  const onSubmit = async (data: InsuranceFormInputs) => {
    try {
      await createInsurance(data);
      history.push('/save/insurance');
      getInsuranceListAction();
    } catch (err) {
      if (err instanceof BadRequestError) {
        console.log(err.response);
      } else {
        console.log(err);
        console.log(err.message);
      }
    }
  };

  return (
    <Modal title={['Add', 'Insurance']}>
      <InsuranceForm onSubmit={onSubmit} />
    </Modal>
  );
};
