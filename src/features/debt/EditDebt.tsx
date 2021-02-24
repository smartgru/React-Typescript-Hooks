import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import { Modal } from '../../components/Modal';
import { DebtForm } from './DebtForm';
import { DebtFormInputs } from './types';
import { BadRequestError } from '../../helpers/api';
import { selectDebtById, selectListLoading, updateDebt, getDebtList } from './debtSlice';

export const EditDebt: React.FC = () => {
  let { debtId } = useParams();
  debtId = parseInt(debtId, 10);

  const debtItem = useSelector(selectDebtById(debtId));
  const listLoading = useSelector(selectListLoading);

  const history = useHistory();
  const dispatch = useDispatch();
  const getDebtListAction = useCallback(() => dispatch(getDebtList()), [dispatch]);

  const onSubmit = async (data: DebtFormInputs) => {
    try {
      await updateDebt(debtId, data);
      history.push('/loan');
      getDebtListAction();
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
    <Modal title={['Edit', 'Debt']}>
      <DebtForm defaultValues={debtItem} onSubmit={onSubmit} />
    </Modal>
  );
};
