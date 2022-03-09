import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import requestStatusMiddleware from './requestStatusMiddleware';
import rootReducer from './reducer';
// import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line no-unused-vars
export default function configureStore(initialState = {}) {
  // Create the store with middlewares
  // * sagaMiddleware: Makes redux-sagas work
  // * requestStatusMiddleware: Handles dispatching request status actions
  // * TODO: routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    requestStatusMiddleware
    // routerMiddleware(history),
  ];
  const enhancers = [applyMiddleware(...middlewares)];

  /* eslint-enable */
  const store = createStore(
    rootReducer, // reducer
    initialState, // preloadedState
    compose(...enhancers) // enhancers
  );

  // sagaMiddleware.run(rootSaga);

  return store;
}
