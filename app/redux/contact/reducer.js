import generateHandleActions from 'redux/state-handler';
import {
  READ_CONTACTS,
  REQUEST_CONTACT,
  ADD_CONTACT,
  SET_CONTACTS,
  REMOVE_CONTACT,
  READ_REQUESTS,
  SET_REQUESTS
} from 'redux/constants';

const apiStates = [
  {
    type: READ_CONTACTS,
    name: 'readContactsRequest'
  },
  {
    type: REQUEST_CONTACT,
    name: 'createContactRequest'
  },
  {
    type: ADD_CONTACT,
    name: 'addContactRequest'
  },
  {
    type: REMOVE_CONTACT,
    name: 'removeContactRequest'
  },
  {
    type: READ_REQUESTS,
    name: 'retrieveRequestsByMe'
  }
];

const instantStates = [
  {
    type: SET_CONTACTS,
    name: 'contacts',
    kind: 'object',
    defaultValue: {}
  },
  {
    type: SET_REQUESTS,
    name: 'requests',
    kind: 'object',
    defaultValue: {
      contacts: []
    }
  }
];

const storage = {
  contacts: 'contacts'
};

const listValues = [];

export default generateHandleActions({
  apiStates,
  instantStates,
  storage,
  listValues
});
