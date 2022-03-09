import { createApiAction, createAction } from 'redux/redux-actions';
import restApis from 'redux/restApis';
import {
  READ_CONTACTS,
  REQUEST_CONTACT,
  ADD_CONTACT,
  SET_CONTACTS,
  READ_REQUESTS,
  REMOVE_CONTACT,
  SET_REQUESTS
} from 'redux/constants';

export const readContacts = createApiAction(
  READ_CONTACTS,
  restApis('member').list
);

export const requestContact = createApiAction(
  REQUEST_CONTACT,
  restApis('member').create
);

export const addContact = createApiAction(
  ADD_CONTACT,
  restApis('member').update
);

export const removeContact = createApiAction(
  REMOVE_CONTACT,
  restApis('member').remove
);

export const readRequests = createApiAction(
  READ_REQUESTS,
  restApis('member/request/me').list
);

export const setRequests = createAction(SET_REQUESTS);

export const setContacts = createAction(SET_CONTACTS);
