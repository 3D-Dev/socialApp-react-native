import generateHandleActions from 'redux/state-handler';
import {
  GLOBAL_NOTIFICATION,
  SET_HEADER_TITLE,
  SET_HEADER_RIGHT,
  CLEAR_HEADER_TITLE,
  SET_SCENE_KEY
} from 'redux/constants';

const apiStates = [];
const instantStates = [
  { type: SET_HEADER_TITLE, name: 'headerTitle' },
  { type: CLEAR_HEADER_TITLE, name: 'headerTitle' },
  { type: SET_HEADER_RIGHT, name: 'headerRight' },
  { type: SET_SCENE_KEY, name: 'sceneKey', defaultValue: 'add' },
  {
    type: GLOBAL_NOTIFICATION,
    name: 'notification',
    kind: 'object',
    defaultValue: {}
  }
];
const listValues = [];
const storage = {
  // theme: 'theme'
};

export default generateHandleActions({
  apiStates,
  instantStates,
  listValues,
  storage
});
