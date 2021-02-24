import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import {
  getInvestmentList,
  selectEmergencyFundInvestmentList,
  selectShortTemInvestmentList,
  selectLongTemInvestmentList,
  selectListLoading,
} from './investmentSlice';
import { Typography } from '../../components/Typography';
import { Spacer } from '../../components/Spacer';
import { ModalLinkButton } from '../../components/ModalLinkButton';
import { InvestmentTable } from './InvestmentTable';

export function InvestmentList(): JSX.Element {
  const dispatch = useDispatch();
  const getInvestmentListAction = useCallback(() => dispatch(getInvestmentList()), [dispatch]);

  const investmentEmergencyFundList = useSelector(selectEmergencyFundInvestmentList);
  const investmentShortTermList = useSelector(selectShortTemInvestmentList);
  const investmentLongTermList = useSelector(selectLongTemInvestmentList);

  const listLoading = useSelector(selectListLoading);

  useEffect(() => {
    getInvestmentListAction();
  }, [getInvestmentListAction]);

  if (listLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <Row>
      <Col>
        <Typography variant="h3">INFORMATION</Typography>
        <Spacer variant="small" />
        <Typography variant="h1">Investments</Typography>
        <Spacer variant="large" />

        <div className="d-flex align-items-center">
          <Typography variant="h2">Emergency Funds</Typography>
          <ModalLinkButton to="/save/investment/add/EF" className="ml-3">
            Add
          </ModalLinkButton>
        </div>
        <InvestmentTable list={investmentEmergencyFundList} />
        <Spacer variant="gray-spacer" />

        <div className="d-flex align-items-center">
          <Typography variant="h2">Short Term Investments</Typography>
          <ModalLinkButton to="/save/investment/add/STI" className="ml-3">
            Add
          </ModalLinkButton>
        </div>
        <InvestmentTable list={investmentShortTermList} />
        <Spacer variant="gray-spacer" />

        <div className="d-flex align-items-center">
          <Typography variant="h2">Long Term Investments</Typography>
          <ModalLinkButton to="/save/investment/add/LTI" className="ml-3">
            Add
          </ModalLinkButton>
        </div>
        <InvestmentTable list={investmentLongTermList} />

        <Spacer variant="red-spacer" />
      </Col>
    </Row>
  );
}
