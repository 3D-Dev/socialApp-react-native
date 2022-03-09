import generateHandleActions from 'redux/state-handler';
import { SET_CONSTANT } from 'redux/constants';

const apiStates = [];
const instantStates = [
  {
    type: SET_CONSTANT,
    name: 'constantData',
    kind: 'object',
    defaultValue: {}
  }
];
const listValues = [];
const storage = {
  constantData: 'constantData'
};

export default generateHandleActions({
  apiStates,
  instantStates,
  listValues,
  storage
});
