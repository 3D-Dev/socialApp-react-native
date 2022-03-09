import generateHandleActions from 'redux/state-handler';
import { SIGNUP_REQUEST, SIGNUP_CONFIRM, HEALTH_CHECK } from 'redux/constants';

const apiStates = [
  { type: SIGNUP_REQUEST, name: 'signupRequest' },
  { type: SIGNUP_CONFIRM, name: 'tokenInfo' },
  { type: HEALTH_CHECK, name: 'health' }
];
const instantStates = [];
const storage = {
  tokenInfo: 'tokenInfo'
};
const listValues = [];

export default generateHandleActions({
  apiStates,
  instantStates,
  storage,
  listValues
});
