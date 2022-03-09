import generateHandleActions from 'redux/state-handler';
import {
  LIST_REFLECTIONS,
  ADD_REFLECTIONS,
  UPDATE_REFLECTIONS,
  REMOVE_REFLECTIONS,
  READ_USER_REFLECTIONS
} from 'redux/constants';

const apiStates = [
  {
    type: LIST_REFLECTIONS,
    name: 'reflections'
  },
  {
    type: ADD_REFLECTIONS,
    name: 'reflection'
  },
  {
    type: UPDATE_REFLECTIONS,
    name: 'reflection'
  },
  {
    type: REMOVE_REFLECTIONS,
    name: 'reflection'
  },
  {
    type: READ_USER_REFLECTIONS,
    name: 'requestReadUserReflections'
  }
];
const instantStates = [];
const listValues = [];
const storage = {
  reflections: 'reflections'
};

export default generateHandleActions({
  apiStates,
  instantStates,
  listValues,
  storage
});
