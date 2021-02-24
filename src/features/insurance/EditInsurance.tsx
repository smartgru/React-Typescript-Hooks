import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import { Modal } from '../../components/Modal';
import { InsuranceForm } from './InsuranceForm';
import { updateInsurance, getInsuranceList, selectInsuranceById, selectListLoading } from './insuranceSlice';
import { InsuranceFormInputs } from './types';
import { BadRequestError } from '../../helpers/api';

export const EditInsurance: React.FC = () => {
  let { insuranceId } = useParams();
  insuranceId = parseInt(insuranceId, 10);
  const insuranceItem = useSelector(selectInsuranceById(insuranceId));
  const listLoading = useSelector(selectListLoading);

  const history = useHistory();
  const dispatch = useDispatch();
  const getInsuranceListAction = useCallback(() => dispatch(getInsuranceList()), [dispatch]);

  const onSubmit = async (data: InsuranceFormInputs) => {
    try {
      await updateInsurance(insuranceId, data);
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

  if (listLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <Modal title={['Edit', 'Insurance']}>
      <InsuranceForm defaultValues={insuranceItem} onSubmit={onSubmit} />
    </Modal>
  );
};
