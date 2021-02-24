import React, { useCallback } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '../../components/Modal';
import { InvestmentForm } from './InvestmentForm';
import { InvestmentFormInputs } from './types';
import { updateInvestment, getInvestmentList, selectInvestmentById, selectListLoading } from './investmentSlice';
import { BadRequestError } from '../../helpers/api';

export const EditInvestment = () => {
  let { investmentId } = useParams();
  investmentId = parseInt(investmentId, 10);

  const investmentItem = useSelector(selectInvestmentById(investmentId));
  const listLoading = useSelector(selectListLoading);

  const history = useHistory();
  const dispatch = useDispatch();

  const getInvestmentListAction = useCallback(() => dispatch(getInvestmentList()), [dispatch]);

  const onSubmit = async (data: InvestmentFormInputs) => {
    try {
      await updateInvestment(investmentId, data);
      history.push('/save/investment');
      getInvestmentListAction();
    } catch (err) {
      if (err instanceof BadRequestError) {
        console.log(err.response);
      } else {
        console.log(err);
        console.log(err.message);
      }
    }
  };

  const titles = {
    EF: 'Emergency Fund',
    STI: 'Short Term Investment',
    LTI: 'Long Term Investment',
  };

  if (listLoading) {
    return <Spinner animation="border" />;
  }

  if (investmentItem) {
    const investmentType = investmentItem.investment_type;

    if (!titles[investmentType]) {
      return null;
    }

    return (
      <Modal title={['Edit', titles[investmentType]]}>
        <InvestmentForm onSubmit={onSubmit} defaultValues={investmentItem} />
      </Modal>
    );
  }

  return null;
};
