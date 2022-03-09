import generateHandleActions from 'redux/state-handler';
import { SET_APP_SETTINGS } from 'redux/constants';

const apiStates = [];
const instantStates = [
  {
    type: SET_APP_SETTINGS,
    name: 'appSettings',
    kind: 'object',
    defaultValue: {
      appType: 'normal',
      theme: 'default',
      isOpened: false
    }
  }
];
const listValues = [];
const storage = {
  appSettings: 'appSettings'
};

export default generateHandleActions({
  apiStates,
  instantStates,
  listValues,
  storage
});
