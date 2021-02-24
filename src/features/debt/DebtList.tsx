import React, { useCallback, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '../../components/Typography';
import { Spacer } from '../../components/Spacer';
import { getDebtList, selectDebtList, selectListLoading } from './debtSlice';
import { DebtTable } from './DebtTable';

export function DebtList(): JSX.Element {
  const dispatch = useDispatch();
  const getDebtListAction = useCallback(() => dispatch(getDebtList()), [dispatch]);

  const listLoading = useSelector(selectListLoading);
  const debtList = useSelector(selectDebtList);

  useEffect(() => {
    getDebtListAction();
  }, [getDebtListAction]);

  if (listLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <Row>
      <Col>
        <Typography variant="h3">INFORMATION</Typography>

        <Spacer variant="small" />
        <div className="d-flex align-items-center">
          <Typography variant="h1">Debts</Typography>
        </div>

        <DebtTable debtList={debtList} />
      </Col>
    </Row>
  );
}
