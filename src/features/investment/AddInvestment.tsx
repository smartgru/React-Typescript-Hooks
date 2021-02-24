import React, { useCallback } from 'react';
import { Modal } from '../../components/Modal';
import { InvestmentForm } from './InvestmentForm';
import { InvestmentFormInputs, InvestmentType } from './types';
import { createInvestment, getInvestmentList } from './investmentSlice';
import { BadRequestError } from '../../helpers/api';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const AddInvestment: React.FC = () => {
  const history = useHistory();
  const { investmentType }: { investmentType: InvestmentType } = useParams();

  const dispatch = useDispatch();
  const getInvestmentListAction = useCallback(() => dispatch(getInvestmentList()), [dispatch]);

  const onSubmit = async (data: InvestmentFormInputs) => {
    try {
      await createInvestment(data);
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

  if (!titles[investmentType]) {
    return null;
  }

  return (
    <Modal title={['Add', titles[investmentType]]}>
      <InvestmentForm onSubmit={onSubmit} defaultValues={{ investment_type: investmentType }} />
    </Modal>
  );
};
