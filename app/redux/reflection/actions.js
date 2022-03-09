import { createApiAction } from 'redux/redux-actions';
import restApis from 'redux/restApis';
import {
  LIST_REFLECTIONS,
  ADD_REFLECTIONS,
  UPDATE_REFLECTIONS,
  REMOVE_REFLECTIONS,
  READ_USER_REFLECTIONS
} from 'redux/constants';

export const listReflections = createApiAction(
  LIST_REFLECTIONS,
  restApis('reflection/list').list
);

export const addReflections = createApiAction(
  ADD_REFLECTIONS,
  restApis('reflection/add').create
);

export const updateReflections = createApiAction(
  UPDATE_REFLECTIONS,
  restApis('reflection/update').create
);

export const removeReflections = createApiAction(
  REMOVE_REFLECTIONS,
  restApis('reflection/remove').create
);

export const readUserReflections = createApiAction(
  READ_USER_REFLECTIONS,
  restApis('reflection/list/user').read
);
