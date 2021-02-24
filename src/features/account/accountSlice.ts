import { createSlice } from '@reduxjs/toolkit';
import { createAsyncAction } from 'redux-promise-middleware-actions';

import { RootState } from '../../redux/';
import {
  AccountCheckingItem,
  AccountCreditItem,
  AccountItem,
  AccountLineOfCreditItem,
  AccountOtherItem,
  AccountSavingsItem,
  AccountType,
} from './types';
import { doGetRequest, doPatchRequest } from '../../helpers/api';
import { AccountItemFormInputs } from './types';

export interface AccountState {
  list: AccountItem[];
  listSavings: AccountSavingsItem[];
  listCredit: AccountCreditItem[];
  listLineOfCredit: AccountLineOfCreditItem[];
  listChecking: AccountCheckingItem[];
  listOther: AccountOtherItem[];
  listLoading: boolean;
}

const initialState: AccountState = {
  list: [],
  listSavings: [],
  listCredit: [],
  listLineOfCredit: [],
  listChecking: [],
  listOther: [],
  listLoading: false,
};

export const getAccountList = createAsyncAction('GET_ACCOUNT_LIST', async () => {
  return await doGetRequest('accounts/');
});

export const updateAccountItem = (accountItemId: number, accountItemRequestBody: AccountItemFormInputs) => {
  return doPatchRequest('accounts/' + accountItemId + '/', accountItemRequestBody);
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: {
    [String(getAccountList.pending)]: (state) => {
      return {
        ...state,
        listLoading: true,
      };
    },
    [String(getAccountList.rejected)]: (state) => {
      return {
        ...state,
        listLoading: false,
      };
    },
    [String(getAccountList.fulfilled)]: (state, action) => {
      const list = action.payload;
      return {
        ...state,
        list,
        listSavings: list.filter((item: AccountSavingsItem) => item.account_type === AccountType.SAVINGS),
        listCredit: list.filter((item: AccountCreditItem) => item.account_type === AccountType.CREDIT),
        listLineOfCredit: list.filter(
          (item: AccountLineOfCreditItem) => item.account_type === AccountType.LINE_OF_CREDIT,
        ),
        listChecking: list.filter((item: AccountCheckingItem) => item.account_type === AccountType.CHECKING),
        listOther: list.filter((item: AccountCheckingItem) => item.account_type === AccountType.OTHER),
        listLoading: false,
      };
    },
  },
});

export const requestFastLinkData = async () => {
  return await doGetRequest('user/fastlink/');
};

export const selectAccountList = (state: RootState) => state.account.list;
export const selectAccountSavingsList = (state: RootState) => state.account.listSavings;
export const selectAccountCreditList = (state: RootState) => state.account.listCredit;
export const selectAccountLineOfCreditList = (state: RootState) => state.account.listLineOfCredit;
export const selectAccountCheckingList = (state: RootState) => state.account.listChecking;
export const selectAccountOtherList = (state: RootState) => state.account.listOther;
export const selectListLoading = (state: RootState) => state.account.listLoading;
export const selectAccountItemById = (accountId: number) => (state: RootState) =>
  state.account.list.find((accountItem) => {
    return accountItem.id === accountId;
  });

export default accountSlice.reducer;
