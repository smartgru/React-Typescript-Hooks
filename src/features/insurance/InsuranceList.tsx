import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { getInsuranceList, selectInsuranceList, selectListLoading } from './insuranceSlice';
import { Typography } from '../../components/Typography';
import { Spacer } from '../../components/Spacer';
import { ModalLinkButton } from '../../components/ModalLinkButton';
import { InsuranceTable } from './InsuranceTable';
import { InsuranceGallery } from './InsuranceGallery';

export function InsuranceList(): JSX.Element {
  const dispatch = useDispatch();
  const getInsuranceListAction = useCallback(() => dispatch(getInsuranceList()), [dispatch]);

  const insuranceList = useSelector(selectInsuranceList);
  const listLoading = useSelector(selectListLoading);

  useEffect(() => {
    getInsuranceListAction();
  }, [getInsuranceListAction]);

  if (listLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <Row>
      <Col>
        <Typography variant="h3">INFORMATION</Typography>
        <Spacer variant="small" />

        <div className="d-flex align-items-center">
          <Typography variant="h1">Insurance</Typography>
          <ModalLinkButton to="/save/insurance/add" className="ml-3">
            Add
          </ModalLinkButton>
        </div>

        <InsuranceTable insuranceList={insuranceList} />

        <InsuranceGallery />
      </Col>
    </Row>
  );
}
