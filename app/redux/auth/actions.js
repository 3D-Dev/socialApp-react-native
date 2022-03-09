import { createApiAction } from 'redux/redux-actions';
import restApis from 'redux/restApis';
import { SIGNUP_REQUEST, SIGNUP_CONFIRM, HEALTH_CHECK } from 'redux/constants';

export const signupRequest = createApiAction(
  SIGNUP_REQUEST,
  restApis('auth/signup-request').create
);

export const signupConfirm = createApiAction(
  SIGNUP_CONFIRM,
  restApis('auth/signup-confirm').create
);

export const healthCheck = createApiAction(
  HEALTH_CHECK,
  restApis('health-check').list
);
