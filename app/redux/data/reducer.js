import generateHandleActions from 'redux/state-handler';
import { PICK_EMOTION, SET_REFLECTION } from 'redux/constants';

const apiStates = [];
const instantStates = [
  { type: PICK_EMOTION, name: 'pickedEmotion' },
  {
    type: SET_REFLECTION,
    name: 'reflection',
    kind: 'object',
    defaultValue: {}
  }
];
const listValues = ['taps', 'reflection'];
const storage = {
  theme: 'theme',
  reflection: 'reflection'
};

export default generateHandleActions({
  apiStates,
  instantStates,
  listValues,
  storage
});
