import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncAction } from 'redux-promise-middleware-actions';

import { RootState } from '../../redux/';
import {
  doGetRequest,
  doPostRequest,
  doPatchRequest,
  setAccessTokenToLS,
  setRefreshTokenToLS,
  redirectToLoginPage,
  clearTokens,
} from '../../helpers/api';
import {
  UserDetails,
  SignUpStep1FormInputs,
  SignUpStep3FormInputs,
  ProfileForm1Inputs,
  ProfileForm2Inputs,
} from './types';

interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  userSignUp: {
    step1Completed: boolean;
    step2Completed: boolean;
    step3Completed: boolean;
    step4Completed: boolean;
    [key: string]: boolean;
  };
  userDetails?: UserDetails;
  userDetailsLoading: boolean;
}

const initialState: AuthState = {
  accessToken: undefined,
  refreshToken: undefined,
  userSignUp: {
    step1Completed: false,
    step2Completed: false,
    step3Completed: false,
    step4Completed: false,
  },
  userDetails: undefined,
  userDetailsLoading: false,
};

export const getUserDetails = createAsyncAction('GET_USER_DETAILS', async () => {
  return await doGetRequest('user/');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [String(getUserDetails.pending)]: (state) => {
      return {
        ...state,
        userDetailsLoading: true,
      };
    },
    [String(getUserDetails.rejected)]: (state) => {
      return {
        ...state,
        userDetailsLoading: false,
      };
    },
    [String(getUserDetails.fulfilled)]: (state, action: PayloadAction<UserDetails>) => {
      const userDetails = action.payload;
      return {
        ...state,
        userDetails,
        userDetailsLoading: false,
      };
    },
  },
  reducers: {
    setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      const { accessToken, refreshToken } = action.payload;

      setAccessTokenToLS(accessToken);
      setRefreshTokenToLS(refreshToken);

      return {
        ...state,
        accessToken,
        refreshToken,
      };
    },
    setStepCompleted: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        userSignUp: {
          ...state.userSignUp,
          [`step${action.payload}Completed`]: true,
        },
      };
    },
    resetAllSteps: (state) => {
      return {
        ...state,
        userSignUp: {
          ...state.userSignUp,
          step1Completed: false,
          step2Completed: false,
          step3Completed: false,
          step4Completed: false,
        },
      };
    },
  },
});

export const createUser = async (userRequestBody: SignUpStep1FormInputs) => {
  return await doPostRequest('user/', userRequestBody, false);
};

export const updateUser = async (userRequestBody: SignUpStep3FormInputs | ProfileForm1Inputs | ProfileForm2Inputs) => {
  return await doPatchRequest('user/', userRequestBody);
};

export const sendStripePaymentToken = async (paymentMethodId: string) => {
  return await doPostRequest('user/subscribe/' + paymentMethodId + '/', {});
};

export const signOut = () => {
  clearTokens();
  redirectToLoginPage();
};

export const { setTokens, setStepCompleted, resetAllSteps } = authSlice.actions;

export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const isPreviousStepCompleted = (currentStepId: number) => (state: RootState) =>
  state.auth.userSignUp[`step${currentStepId - 1}Completed`] === true;
export const selectUserDetails = (state: RootState) => state.auth.userDetails;
export const selectUserDetailsLoading = (state: RootState) => state.auth.userDetailsLoading;

export default authSlice.reducer;
