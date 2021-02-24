import { Middleware } from 'redux';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

export const authMiddleware: Middleware = () => (next) => async (action) => {
  if (!isPromise(action.payload)) {
    return next(action);
  }

  try {
    return await next(action);
  } catch (error) {
    console.error(error);
    console.log(action);

    return error;
  }
};
