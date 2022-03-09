import generateHandleActions from 'redux/state-handler';
import {
  READ_FEEDBACKS,
  CREATE_FEEDBACKS,
  SET_FEEDBACKS,
  UPDATE_FEEDBACK,
  REMOVE_FEEDBACKS
} from 'redux/constants';

const apiStates = [
  {
    type: READ_FEEDBACKS,
    name: 'readFeedbacksRequest'
  },
  {
    type: CREATE_FEEDBACKS,
    name: 'createFeedbacksRequest'
  },
  {
    type: UPDATE_FEEDBACK,
    name: 'updateFeedbackRequest'
  },
  {
    type: REMOVE_FEEDBACKS,
    name: 'deleteFeedbacksRequest'
  }
];

const instantStates = [
  {
    type: SET_FEEDBACKS,
    name: 'feedbacks',
    kind: 'object',
    defaultValue: {}
  }
];

const storage = {
  feedbacks: 'feedbacks'
};
const listValues = [];

export default generateHandleActions({
  apiStates,
  instantStates,
  storage,
  listValues
});
