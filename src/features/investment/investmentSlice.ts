import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'redux-promise-middleware-actions';

import { RootState } from '../../redux/';
import { InvestmentFormInputs, InvestmentItems } from './types';
import { doDeleteRequest, doGetRequest, doPatchRequest, doPostRequest } from '../../helpers/api';
import format from 'date-fns/format';

export interface InvestmentState {
  list: InvestmentItems;
  listEmergencyFund: InvestmentItems;
  listShortTermInvestment: InvestmentItems;
  listLongTermInvestment: InvestmentItems;
  listLoading: boolean;
}

const initialState: InvestmentState = {
  list: [],
  listEmergencyFund: [],
  listShortTermInvestment: [],
  listLongTermInvestment: [],
  listLoading: false,
};

export const getInvestmentList = createAsyncAction('GET_INVESTMENT_LIST', async () => {
  return await doGetRequest('investments/');
});

export const deleteInvestment = async (investmentId: number) =>
  await doDeleteRequest('investments/' + investmentId + '/');

export const createInvestment = (investmentRequestBody: InvestmentFormInputs) => {
  // TODO use transformers or something similar
  const updatedRequestBody = {
    ...investmentRequestBody,
    // Important -- have to do this because of how API works
    account: investmentRequestBody.account.id,
    maturity: format(Date.parse(investmentRequestBody.maturity), 'yyyy-MM-dd'),
  };
  return doPostRequest('investments/', updatedRequestBody);
};

export const updateInvestment = (investmentId: number, investmentRequestBody: InvestmentFormInputs) => {
  // TODO use transformers or something similar
  const updatedRequestBody = {
    ...investmentRequestBody,
    // Important -- have to do this because of how API works
    account: investmentRequestBody.account.id,
    maturity: format(Date.parse(investmentRequestBody.maturity), 'yyyy-MM-dd'),
  };
  return doPatchRequest('investments/' + investmentId + '/', updatedRequestBody);
};

export const investmentSlice = createSlice({
  name: 'investment',
  initialState,
  reducers: {},
  extraReducers: {
    [String(getInvestmentList.pending)]: (state) => {
      return {
        ...state,
        listLoading: true,
      };
    },
    [String(getInvestmentList.rejected)]: (state) => {
      return {
        ...state,
        listLoading: false,
      };
    },
    [String(getInvestmentList.fulfilled)]: (state, action: PayloadAction<InvestmentItems>) => {
      const list = action.payload;
      return {
        ...state,
        list,
        listEmergencyFund: list.filter((item) => item.investment_type === 'EF'),
        listShortTermInvestment: list.filter((item) => item.investment_type === 'STI'),
        listLongTermInvestment: list.filter((item) => item.investment_type === 'LTI'),
        listLoading: false,
      };
    },
  },
});

export const selectInvestmentList = (state: RootState) => state.investment.list;
export const selectEmergencyFundInvestmentList = (state: RootState) => state.investment.listEmergencyFund;
export const selectShortTemInvestmentList = (state: RootState) => state.investment.listShortTermInvestment;
export const selectLongTemInvestmentList = (state: RootState) => state.investment.listLongTermInvestment;
export const selectListLoading = (state: RootState) => state.investment.listLoading;
export const selectInvestmentById = (investmentId: number) => (state: RootState) =>
  state.investment.list.find((investmentItem) => {
    return investmentItem.id === investmentId;
  });

export default investmentSlice.reducer;
