import { fromJS } from 'immutable';
import { AsyncStorage } from 'react-native';
import { handleActions } from 'redux-actions';
import { get as lodashGet } from 'lodash';

import { apiTypes } from './redux-actions';
import { LOAD_LOCAL_STORAGE } from './constants';

const storeMemory = (storage, name, data) => {
  if (storage[name]) {
    AsyncStorage.setItem(storage[name], JSON.stringify({ data }));
    global.localStorage[storage[name]] = data;
  }
};

const loadMemory = (storage, name, defaultValue) => {
  if (storage[name]) {
    return global.localStorage[storage[name]] || defaultValue;
  }
  return defaultValue;
};

const defaultObject = {
  requesting: false,
  meta: {},
  error: {},
  data: {}
};

const apiStateHandlers = (states, storage, listValues) => {
  let actionHandlers = {};
  let initialState = {};
  for (let i = 0; i < states.length; i += 1) {
    const state = states[i];
    const {
      type,
      name,
      apiField,
      append,
      update,
      remove,
      onSuccess,
      clear
    } = state;
    const types = apiTypes(type);
    const defaultValue = listValues.indexOf(name) === -1 ? {} : [];
    actionHandlers = {
      ...actionHandlers,
      // request
      [types[0]]: currentState => {
        const newState = currentState
          .setIn([name, 'requesting'], true)
          .setIn([name, 'meta'], fromJS({}))
          .setIn([name, 'error'], fromJS({}));
        if (clear) {
          return newState.setIn([name, 'data'], fromJS(defaultValue));
        }
        return newState;
      },
      // success
      [types[1]]: (currentState, action) => {
        const payload =
          fromJS(
            apiField
              ? lodashGet(action.payload.data, apiField)
              : action.payload.data
          ) || fromJS(defaultValue);
        const meta = fromJS(action.payload.meta);
        storeMemory(
          storage,
          name,
          apiField
            ? lodashGet(action.payload.data, apiField)
            : action.payload.data
        );
        if (action.onSuccess)
          setTimeout(() => action.onSuccess(payload.toJS()), 0);
        const newState = (onSuccess
          ? onSuccess(currentState, action)
          : currentState
        )
          .setIn([name, 'requesting'], false)
          .setIn([name, 'data'], payload)
          .setIn(
            [name, 'meta'],
            meta ||
              fromJS({
                total: action.payload && action.payload.size
              })
          );
        // used when creation is done
        if (append && payload.get('id')) {
          return newState.updateIn([append, 'data'], list =>
            list.push(payload)
          );
        }
        // used when update is done
        if (update) {
          return newState.updateIn([update, 'data'], list =>
            list.map(item =>
              item.get('id') === payload.get('id') ? payload : item
            )
          );
        }
        // used when delete is done
        if (remove) {
          return newState.updateIn([remove, 'data'], list =>
            list.filter(item => item.get('id') !== payload.get('id'))
          );
        }
        return newState;
      },
      // failure
      [types[2]]: (currentState, action) => {
        const payload =
          fromJS(
            apiField ? lodashGet(action.payload, apiField) : action.payload
          ) || fromJS(defaultValue);
        if (action.onFailure)
          setTimeout(() => action.onFailure(payload.toJS()), 0);
        return currentState
          .setIn([name, 'requesting'], false)
          .setIn([name, 'meta'], fromJS({}))
          .setIn([name, 'error'], fromJS(action.payload));
      },
      // clear
      [types[3]]: currentState => {
        storeMemory(storage, name, {});
        return currentState
          .setIn([name, 'requesting'], false)
          .setIn([name, 'meta'], fromJS({}))
          .setIn([name, 'data'], fromJS(defaultValue))
          .setIn([name, 'error'], fromJS({}));
      }
    };
    initialState = {
      ...initialState,
      [name]: {
        ...defaultObject,
        data: defaultValue
      }
    };
  }
  return { actionHandlers, initialState };
};

const instantStateHandlers = (states, storage, listValues) => {
  const actionHandlers = {};
  const initialState = {};
  for (let i = 0; i < states.length; i += 1) {
    const state = states[i];
    const { type, name, kind } = state;
    const defaultData = listValues.indexOf(name) === -1 ? {} : [];
    const types = apiTypes(type);
    const defaultValue =
      kind === 'object'
        ? state.defaultValue || defaultData
        : state.defaultValue;
    // set
    actionHandlers[type] = (currentState, action) => {
      const value = action.payload || defaultValue;
      const storageValue = (kind === 'object' && value.data) || value;

      storeMemory(storage, name, storageValue);
      if (kind === 'object') {
        return currentState.set(name, fromJS(value));
      }

      return currentState.set(name, value);
    };
    // clear
    actionHandlers[types[3]] = currentState => {
      const storageValue =
        (kind === 'object' && defaultValue.data) || defaultValue;
      storeMemory(storage, name, storageValue);
      if (kind === 'object') {
        return currentState.set(name, fromJS(defaultValue));
      }
      return currentState.set(name, defaultValue);
    };
    initialState[name] = defaultValue;
  }
  return { actionHandlers, initialState };
};

const generateHandleActions = ({
  apiStates,
  instantStates = [],
  storage = {},
  listValues = []
}) => {
  const apiHandlers = apiStateHandlers(apiStates, storage, listValues);
  const instantHandlers = instantStateHandlers(
    instantStates,
    storage,
    listValues
  );
  return handleActions(
    {
      ...apiHandlers.actionHandlers,
      ...instantHandlers.actionHandlers,
      [LOAD_LOCAL_STORAGE]: currentState => {
        let state = currentState;
        for (let i = 0; i < apiStates.length; i += 1) {
          const { name } = apiStates[i];
          const defaultValue = listValues.indexOf(name) === -1 ? {} : [];
          state = state.setIn(
            [name, 'data'],
            fromJS(loadMemory(storage, name, defaultValue))
          );
        }
        for (let i = 0; i < instantStates.length; i += 1) {
          const { name, defaultValue } = instantStates[i];
          const value = loadMemory(storage, name, defaultValue);
          if (listValues.indexOf(name) !== -1 && !value.length) {
            state = state.set(name, []);
          } else {
            state = state.set(name, loadMemory(storage, name, defaultValue));
          }
        }
        return state;
      }
    },
    fromJS({
      ...apiHandlers.initialState,
      ...instantHandlers.initialState
    })
  );
};

export default generateHandleActions;
