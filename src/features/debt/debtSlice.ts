import { createSlice } from '@reduxjs/toolkit';
import { createAsyncAction } from 'redux-promise-middleware-actions';

import { RootState } from '../../redux/';
import { DebtFormInputs, DebtItems } from './types';
import { doDeleteRequest, doGetRequest, doPatchRequest } from '../../helpers/api';
import format from 'date-fns/format';

export interface DebtState {
  list: DebtItems;
  listLoading: boolean;
}

const initialState: DebtState = {
  list: [],
  listLoading: false,
};

export const getDebtList = createAsyncAction('GET_DEBT_LIST', async () => {
  return await doGetRequest('debts/');
});

export const deleteDebt = async (debtId: number) => await doDeleteRequest('debts/' + debtId + '/');

export const updateDebt = (debtId: number, debtRequestBody: DebtFormInputs) => {
  // TODO use transformers or something similar
  const updatedRequestBody = {
    ...debtRequestBody,
    // Important -- have to do this because of how API works
    account: debtRequestBody.account.id,
    maturity: format(Date.parse(debtRequestBody.maturity), 'yyyy-MM-dd'),
  };
  return doPatchRequest('debts/' + debtId + '/', updatedRequestBody);
};

export const debtSlice = createSlice({
  name: 'debt',
  initialState,
  reducers: {},
  extraReducers: {
    [String(getDebtList.pending)]: (state) => {
      return {
        ...state,
        listLoading: true,
      };
    },
    [String(getDebtList.rejected)]: (state) => {
      return {
        ...state,
        listLoading: false,
      };
    },
    [String(getDebtList.fulfilled)]: (state, action) => {
      const list = action.payload;
      return {
        ...state,
        list,
        listLoading: false,
      };
    },
  },
});

export const selectDebtList = (state: RootState) => state.debt.list;
export const selectListLoading = (state: RootState) => state.debt.listLoading;
export const selectDebtById = (debtId: number) => (state: RootState) =>
  state.debt.list.find((debtItem) => {
    return debtItem.id === debtId;
  });

export default debtSlice.reducer;
