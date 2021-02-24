import React, { useCallback, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { Typography } from '../../components/Typography';
import { Spacer } from '../../components/Spacer';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionList, selectTransactionList, selectListLoading } from './transactionSlice';
import { TransactionTable } from './TransactionTable';

export function TransactionList(): JSX.Element {
  const dispatch = useDispatch();
  const getTransactionListAction = useCallback(() => dispatch(getTransactionList()), [dispatch]);

  const transactionList = useSelector(selectTransactionList);
  const listLoading = useSelector(selectListLoading);

  useEffect(() => {
    getTransactionListAction();
  }, [getTransactionListAction]);

  if (listLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <Row>
      <Col>
        <Typography variant="h3">INFORMATION</Typography>
        <Spacer variant="small" />

        <div className="d-flex align-items-center">
          <Typography variant="h1">Transactions</Typography>
        </div>

        <TransactionTable transactionList={transactionList} />
      </Col>
    </Row>
  );
}
