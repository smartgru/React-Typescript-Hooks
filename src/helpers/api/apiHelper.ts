import jwtDecode from 'jwt-decode';
import { DecodedToken } from './types';

export const API_URL_PREFIX = 'http://169.48.29.83:8000/api/v1';
export const LS_ACCESS_TOKEN_KEY = 'arctic_rich_access_token';
export const LS_REFRESH_TOKEN_KEY = 'arctic_rich_refresh_token';

export const getAccessTokenFromLS = () => localStorage.getItem(LS_ACCESS_TOKEN_KEY);
export const setAccessTokenToLS = (tokenValue: string) => localStorage.setItem(LS_ACCESS_TOKEN_KEY, tokenValue);
export const getRefreshTokenFromLS = () => localStorage.getItem(LS_REFRESH_TOKEN_KEY);
export const setRefreshTokenToLS = (tokenValue: string) => localStorage.setItem(LS_REFRESH_TOKEN_KEY, tokenValue);
export const clearTokens = () => {
  localStorage.removeItem(LS_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LS_REFRESH_TOKEN_KEY);
};

export class AuthenticationError extends Error {
  response: Record<string, unknown>;

  constructor(response: Record<string, unknown>) {
    super('401 Authentication Error');
    this.name = 'AuthenticationError';
    this.response = response;
  }
}

export class BadRequestError extends Error {
  response: Record<string, unknown>;

  constructor(response: Record<string, unknown>) {
    super('400 Bad Response');
    this.response = response;
  }
}

export const redirectToLoginPage = () => {
  window.location.replace('/user/login');
  return;
};

export const loginWithCredentials = async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch(`${API_URL_PREFIX}/token/`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 401) {
    const jsonResponse = await response.json();
    throw new AuthenticationError(jsonResponse);
  }

  const json = await response.json();

  setAccessTokenToLS(json.access);
  setRefreshTokenToLS(json.refresh);

  return json;
};

const refreshAccessToken = async () => {
  const response = await fetch(`${API_URL_PREFIX}/token/refresh/`, {
    method: 'POST',
    body: JSON.stringify({
      refresh: getRefreshTokenFromLS(),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  setAccessTokenToLS(json.access);
};

const checkAndUpdateTokens = async () => {
  if (!getAccessTokenFromLS()) {
    return redirectToLoginPage();
  } else {
    try {
      /**
       * Please refer to http://169.48.29.83:8000/api/v1/#gettoken to understand more about tokens workflow
       */
      const accessTokenExpiryTime = jwtDecode<DecodedToken>(getAccessTokenFromLS() as string).exp;
      const isAccessTokenOutdated = Date.now() > accessTokenExpiryTime * 1000;

      if (isAccessTokenOutdated) {
        const refreshTokenExpiryTime = jwtDecode<DecodedToken>(getRefreshTokenFromLS() as string).exp;
        const isRefreshTokenOutdated = Date.now() > refreshTokenExpiryTime * 1000;

        if (isRefreshTokenOutdated) {
          return redirectToLoginPage();
        } else {
          await refreshAccessToken();
        }
      }
    } catch (e) {
      clearTokens();
      return redirectToLoginPage();
    }
  }
};

export const doGetRequest = async (url: string, useCredentials = true) => {
  useCredentials && (await checkAndUpdateTokens());

  const response = await fetch(`${API_URL_PREFIX}/${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(useCredentials ? { Authorization: `Bearer ${getAccessTokenFromLS()}` } : {}),
    },
  });
  if (response.status === 401) {
    const jsonResponse = await response.json();
    throw new AuthenticationError(jsonResponse);
  }
  return await response.json();
};

export const doPostRequest = async (url: string, requestBody: unknown, useCredentials = true) => {
  useCredentials && (await checkAndUpdateTokens());

  const response = await fetch(`${API_URL_PREFIX}/${url}`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      ...(useCredentials ? { Authorization: `Bearer ${getAccessTokenFromLS()}` } : {}),
    },
  });
  if (response.status === 401) {
    const jsonResponse = await response.json();
    throw new AuthenticationError(jsonResponse);
  }
  if (response.status === 400) {
    const jsonResponse = await response.json();
    throw new BadRequestError(jsonResponse);
  }
  return await response.json();
};

export const doDeleteRequest = async (url: string, useCredentials = true) => {
  useCredentials && (await checkAndUpdateTokens());

  const response = await fetch(`${API_URL_PREFIX}/${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(useCredentials ? { Authorization: `Bearer ${getAccessTokenFromLS()}` } : {}),
    },
  });
  if (response.status === 401) {
    const jsonResponse = await response.json();
    throw new AuthenticationError(jsonResponse);
  }
  if (response.status === 400) {
    const jsonResponse = await response.json();
    throw new BadRequestError(jsonResponse);
  }
  return await response.text();
};

export const doPatchRequest = async (url: string, requestBody: unknown, useCredentials = true) => {
  useCredentials && (await checkAndUpdateTokens());

  const response = await fetch(`${API_URL_PREFIX}/${url}`, {
    method: 'PATCH',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      ...(useCredentials ? { Authorization: `Bearer ${getAccessTokenFromLS()}` } : {}),
    },
  });
  if (response.status === 401) {
    const jsonResponse = await response.json();
    throw new AuthenticationError(jsonResponse);
  }
  if (response.status === 400) {
    const jsonResponse = await response.json();
    throw new BadRequestError(jsonResponse);
  }
  return await response.json();
};

export const doPutRequest = async (url: string, requestBody: unknown, useCredentials = true) => {
  useCredentials && (await checkAndUpdateTokens());

  const response = await fetch(`${API_URL_PREFIX}/${url}`, {
    method: 'PUT',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      ...(useCredentials ? { Authorization: `Bearer ${getAccessTokenFromLS()}` } : {}),
    },
  });
  if (response.status === 401) {
    const jsonResponse = await response.json();
    throw new AuthenticationError(jsonResponse);
  }
  if (response.status === 400) {
    const jsonResponse = await response.json();
    throw new BadRequestError(jsonResponse);
  }
  return await response.json();
};
