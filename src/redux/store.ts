import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';

import accountReducer from '../features/account/accountSlice';
import authReducer from '../features/auth/authSlice';
import debtReducer from '../features/debt/debtSlice';
import insuranceReducer from '../features/insurance/insuranceSlice';
import investmentReducer from '../features/investment/investmentSlice';
import transactionReducer from '../features/transaction/transactionSlice';

import { authMiddleware } from './authMiddleware';

const middleware = [
  ...getDefaultMiddleware({ serializableCheck: false }),
  authMiddleware,
  promise,
  createLogger({
    collapsed: true,
  }),
];

export const store = configureStore({
  reducer: {
    account: accountReducer,
    auth: authReducer,
    debt: debtReducer,
    insurance: insuranceReducer,
    investment: investmentReducer,
    transaction: transactionReducer,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
