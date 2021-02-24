import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'redux-promise-middleware-actions';
import groupBy from 'lodash/groupBy';

import { RootState } from '../../redux/';
import { InsuranceFormInputs, InsuranceItems, InsuranceThumbnails, Thumbnails } from './types';
import { doDeleteRequest, doGetRequest, doPatchRequest, doPostRequest } from '../../helpers/api';
import { formatISO } from 'date-fns';

export interface InsuranceState {
  list: InsuranceItems;
  listLoading: boolean;
  thumbnailsLoading: boolean;
  thumbnails: InsuranceThumbnails;
}

const initialState: InsuranceState = {
  list: [],
  listLoading: false,
  thumbnailsLoading: false,
  thumbnails: {},
};

export const getInsuranceList = createAsyncAction('GET_INSURANCE_LIST', async () => {
  return await doGetRequest('insurances/');
});

export const getInsuranceThumbnails = createAsyncAction('GET_INSURANCE_THUMBNAILS', async () => {
  return await doGetRequest('thumbnails/test/');
});

export const deleteInsurance = async (insuranceId: number) => await doDeleteRequest('insurances/' + insuranceId + '/');

export const createInsurance = (insuranceRequestBody: InsuranceFormInputs) => {
  // TODO use transformers or something similar
  const updatedRequestBody = {
    ...insuranceRequestBody,
    expiry: formatISO(Date.parse(insuranceRequestBody.expiry)),
  };
  return doPostRequest('insurances/', updatedRequestBody);
};

export const updateInsurance = (insuranceId: number, insuranceRequestBody: InsuranceFormInputs) => {
  // TODO use transformers or something similar
  const updatedRequestBody = {
    ...insuranceRequestBody,
    expiry: formatISO(Date.parse(insuranceRequestBody.expiry)),
  };
  return doPatchRequest('insurances/' + insuranceId + '/', updatedRequestBody);
};

export const insuranceSlice = createSlice({
  name: 'insurance',
  initialState,
  reducers: {},
  extraReducers: {
    [String(getInsuranceList.pending)]: (state) => {
      return {
        ...state,
        listLoading: true,
      };
    },
    [String(getInsuranceList.rejected)]: (state) => {
      return {
        ...state,
        listLoading: false,
      };
    },
    [String(getInsuranceList.fulfilled)]: (state, action: PayloadAction<InsuranceItems>) => {
      const list = action.payload;
      return {
        ...state,
        list,
        listLoading: false,
      };
    },
    [String(getInsuranceThumbnails.pending)]: (state) => {
      return {
        ...state,
        thumbnailsLoading: true,
      };
    },
    [String(getInsuranceThumbnails.rejected)]: (state) => {
      return {
        ...state,
        thumbnailsLoading: false,
      };
    },
    [String(getInsuranceThumbnails.fulfilled)]: (state, action: PayloadAction<Thumbnails>) => {
      const thumbnails = action.payload;
      return {
        ...state,
        thumbnails: groupBy(thumbnails, 'title'),
        thumbnailsLoading: false,
      };
    },
  },
});

export const selectInsuranceList = (state: RootState) => state.insurance.list;
export const selectInsuranceThumbnails = (state: RootState) => state.insurance.thumbnails;
export const selectListLoading = (state: RootState) => state.insurance.listLoading;
export const selectInsuranceById = (insuranceId: number) => (state: RootState) =>
  state.insurance.list.find((insuranceItem) => {
    return insuranceItem.id === insuranceId;
  });

export default insuranceSlice.reducer;
