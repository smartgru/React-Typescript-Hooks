import React, { useCallback } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '../../components/Modal';
import { AccountItemForm } from './AccountItemForm';
import { AccountItemFormInputs } from './types';
import { updateAccountItem, getAccountList, selectAccountItemById, selectListLoading } from './accountSlice';
import { BadRequestError } from '../../helpers/api';

export const EditAccountItem = () => {
  let { accountItemId } = useParams();
  accountItemId = parseInt(accountItemId, 10);

  const accountItem = useSelector(selectAccountItemById(accountItemId));
  const listLoading = useSelector(selectListLoading);

  const history = useHistory();
  const dispatch = useDispatch();

  const getAccountListAction = useCallback(() => dispatch(getAccountList()), [dispatch]);

  const onSubmit = async (data: AccountItemFormInputs) => {
    try {
      await updateAccountItem(accountItemId, data);
      history.push('/sync/balance/');
      getAccountListAction();
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
    CHECKING: 'Checking Account',
    SAVINGS: 'Savings Account',
    OTHER: 'Other Account',
    LINE_OF_CREDIT: 'LINE OF CREDIT',
    CREDIT: 'CREDIT',
  };

  if (listLoading) {
    return <Spinner animation="border" />;
  }

  if (accountItem) {
    const accountItemType = accountItem.account_type;

    if (!titles[accountItemType]) {
      return null;
    }

    return (
      <Modal title={['Edit', titles[accountItemType]]}>
        <AccountItemForm onSubmit={onSubmit} defaultValues={accountItem} />
      </Modal>
    );
  }

  return null;
};
