import { createAction, createApiAction } from 'redux/redux-actions';
import restApis from 'redux/restApis';
import {
  SET_PROFILE_DATA,
  UPDATE_PROFILE,
  READ_PROFILE,
  SET_USERS,
  READ_USERS
} from 'redux/constants';

export const setProfileData = createAction(SET_PROFILE_DATA);
export const setUsers = createAction(SET_USERS);

export const readUsers = createApiAction(READ_USERS, restApis('user/all').list);

export const updateProfile = createApiAction(
  UPDATE_PROFILE,
  restApis('user/me').update
);

export const readProfile = createApiAction(
  READ_PROFILE,
  restApis('user/me').list
);
