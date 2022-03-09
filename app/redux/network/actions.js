import { createApiAction, createAction } from 'redux/redux-actions';
import restApis from 'redux/restApis';
import {
  READ_NETWORKS,
  CREATE_NETWORK,
  SET_NETWORKS,
  UPDATE_NETWORK,
  REMOVE_NETWORK
} from 'redux/constants';

export const readNetworks = createApiAction(
  READ_NETWORKS,
  restApis('network').list
);

export const createNetwork = createApiAction(
  CREATE_NETWORK,
  restApis('network').create
);

export const updateNetwork = createApiAction(
  UPDATE_NETWORK,
  restApis('network').patch
);

export const removeNetwork = createApiAction(
  REMOVE_NETWORK,
  restApis('network').remove
);

export const setNetworks = createAction(SET_NETWORKS);
