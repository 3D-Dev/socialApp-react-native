import generateHandleActions from 'redux/state-handler';
import {
  READ_NETWORKS,
  CREATE_NETWORK,
  SET_NETWORKS,
  UPDATE_NETWORK,
  REMOVE_NETWORK
} from 'redux/constants';

const apiStates = [
  {
    type: READ_NETWORKS,
    name: 'readNetworksRequest'
  },
  {
    type: CREATE_NETWORK,
    name: 'createNetworkRequest'
  },
  {
    type: UPDATE_NETWORK,
    name: 'updateNetworkRequest'
  },
  {
    type: REMOVE_NETWORK,
    name: 'delteNetworkRequest'
  }
];

const instantStates = [
  {
    type: SET_NETWORKS,
    name: 'networks',
    kind: 'object',
    defaultValue: {}
  }
];

const storage = {
  networks: 'networks'
};

const listValues = [];

export default generateHandleActions({
  apiStates,
  instantStates,
  storage,
  listValues
});
