import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'redux-promise-middleware-actions';

import { RootState } from '../../redux/';
import { TransactionItems } from './types';
import { doGetRequest } from '../../helpers/api';

export interface TransactionState {
  list: TransactionItems;
  listLoading: boolean;
}

const initialState: TransactionState = {
  list: [],
  listLoading: false,
};

export const getTransactionList = createAsyncAction('GET_TRANSACTION_LIST', async () => {
  return await doGetRequest('transactions/');
});

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: {
    [String(getTransactionList.pending)]: (state) => {
      return {
        ...state,
        listLoading: true,
      };
    },
    [String(getTransactionList.rejected)]: (state) => {
      return {
        ...state,
        listLoading: false,
      };
    },
    [String(getTransactionList.fulfilled)]: (state, action: PayloadAction<TransactionItems>) => {
      const list = action.payload;
      return {
        ...state,
        list,
        listLoading: false,
      };
    },
  },
});

export const selectTransactionList = (state: RootState) => state.transaction.list;
export const selectListLoading = (state: RootState) => state.transaction.listLoading;

export default transactionSlice.reducer;
