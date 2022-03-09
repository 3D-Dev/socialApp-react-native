import { createApiAction, createAction } from 'redux/redux-actions';
import restApis from 'redux/restApis';
import {
  READ_FEEDBACKS,
  CREATE_FEEDBACKS,
  UPDATE_FEEDBACK,
  REMOVE_FEEDBACKS,
  SET_FEEDBACKS
} from 'redux/constants';

export const setFeedbacks = createAction(SET_FEEDBACKS);

export const readFeedbacks = createApiAction(
  READ_FEEDBACKS,
  restApis('feedback').list
);

export const createFeedbacks = createApiAction(
  CREATE_FEEDBACKS,
  restApis('feedback').create
);

export const deleteFeedbacks = createApiAction(
  REMOVE_FEEDBACKS,
  restApis('feedback').remove
);

export const updateFeedback = createApiAction(
  UPDATE_FEEDBACK,
  restApis('feedback').patch
);
