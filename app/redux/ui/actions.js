import { createAction, createClearAction } from 'redux/redux-actions';
import {
  SET_HEADER_TITLE,
  CLEAR_HEADER_TITLE,
  SET_HEADER_RIGHT,
  SET_SCENE_KEY
} from 'redux/constants';

export const setHeaderTitle = createAction(SET_HEADER_TITLE);
export const clearHeaderTitle = createClearAction(CLEAR_HEADER_TITLE);
export const setHeaderRight = createAction(SET_HEADER_RIGHT);
export const setSceneKey = createAction(SET_SCENE_KEY);
