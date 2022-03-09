import { createAction } from 'redux/redux-actions';
import { PICK_EMOTION, SET_REFLECTION } from 'redux/constants';

export const setReflection = createAction(SET_REFLECTION);
export const pickEmotion = createAction(PICK_EMOTION);
