import generateHandleActions from 'redux/state-handler';
import {
  SET_PROFILE_DATA,
  UPDATE_PROFILE,
  READ_PROFILE,
  SET_USERS,
  READ_USERS
} from 'redux/constants';

const apiStates = [
  {
    type: UPDATE_PROFILE,
    name: 'profile',
    apiField: 'user'
  },
  {
    type: READ_PROFILE,
    name: 'profile',
    apiField: 'user'
  },
  {
    type: READ_USERS,
    name: 'requestReadUsers'
  }
];

const instantStates = [
  {
    type: SET_PROFILE_DATA,
    name: 'profileData',
    kind: 'object',
    defaultValue: {}
  },
  {
    type: SET_USERS,
    name: 'users',
    kind: 'object',
    defaultValue: {}
  }
];

const listValues = [];
const storage = {
  profileData: 'profileData',
  users: 'users'
};

export default generateHandleActions({
  apiStates,
  instantStates,
  listValues,
  storage
});
