import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { Typography } from '../../components/Typography';
import { Spacer } from '../../components/Spacer';

import styles from './AccountList.module.scss';

import {
  getAccountList,
  requestFastLinkData,
  selectAccountCheckingList,
  selectAccountCreditList,
  selectAccountLineOfCreditList,
  selectAccountOtherList,
  selectAccountSavingsList,
  selectListLoading,
} from './accountSlice';
import { AccountSavingsTable } from './AccountSavingsTable';
import { AccountCreditTable } from './AccountCreditTable';
import { AccountLineOfCreditTable } from './AccountLineOfCreditTable';
import { AccountCheckingTable } from './AccountCheckingTable';
import { AccountOtherTable } from './AccountOtherTable';

export function AccountList(): JSX.Element {
  const dispatch = useDispatch();
  const getAccountListAction = useCallback(() => dispatch(getAccountList()), [dispatch]);
  const [disabledSyncButton, setDisabledSyncButton] = useState(false);

  const accountSavingsList = useSelector(selectAccountSavingsList);
  const accountCreditList = useSelector(selectAccountCreditList);
  const accountLineOfCreditList = useSelector(selectAccountLineOfCreditList);
  const accountCheckingList = useSelector(selectAccountCheckingList);
  const accountOtherList = useSelector(selectAccountOtherList);
  const listLoading = useSelector(selectListLoading);

  useEffect(() => {
    getAccountListAction();
  }, [getAccountListAction]);

  if (listLoading) {
    return <Spinner animation="border" />;
  }

  const handleSyncAccountButtonClick = async () => {
    setDisabledSyncButton(true);
    try {
      const { jwtToken, fastLinkURL } = await requestFastLinkData();
      // Have to use ts-ignore because I have not found official typings and had no time to create my own ones
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.fastlink.open(
        {
          fastLinkURL: fastLinkURL,
          jwtToken: `Bearer ${jwtToken}`,
          params: {
            userExperienceFlow: 'Aggregation',
          },
          onSuccess: function (data: Record<string, unknown>) {
            console.log(data);
          },
          onError: function (data: Record<string, unknown>) {
            console.log(data);
          },
          onExit: function (data: Record<string, unknown>) {
            console.log(data);
          },
          onEvent: function (data: Record<string, unknown>) {
            console.log(data);
          },
        },
        'container-fastlink',
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row>
      <Col>
        <Typography variant="h3">INFORMATION</Typography>
        <Spacer variant="small" />
        <Typography variant="h1">Account Balances</Typography>
        <Spacer variant="large" />

        <div className="d-flex align-items-center">
          <Typography variant="h2">Checking Accounts</Typography>
          <input
            type="button"
            value="Sync Account"
            className={styles.syncAccountButton + ' ml-3'}
            onClick={handleSyncAccountButtonClick}
            disabled={disabledSyncButton}
          />
        </div>

        <div id="container-fastlink" className="mt-2 mb-2" />

        <AccountCheckingTable list={accountCheckingList} />
        <Spacer variant="gray-spacer" />

        <div className="d-flex align-items-center">
          <Typography variant="h2">Savings Accounts</Typography>
        </div>

        <AccountSavingsTable list={accountSavingsList} />
        <Spacer variant="gray-spacer" />

        <div className="d-flex align-items-center">
          <Typography variant="h2">Other Accounts</Typography>
        </div>

        <AccountOtherTable list={accountOtherList} />
        <Spacer variant="gray-spacer" />

        <div className="d-flex align-items-center">
          <Typography variant="h2">Credit Accounts</Typography>
        </div>

        <AccountCreditTable list={accountCreditList} />
        <Spacer variant="gray-spacer" />

        <div className="d-flex align-items-center">
          <Typography variant="h2">Line of Credit Accounts</Typography>
        </div>

        <AccountLineOfCreditTable list={accountLineOfCreditList} />

        <Spacer variant="red-spacer" />
      </Col>
    </Row>
  );
}
