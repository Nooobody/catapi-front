
import { reducers as breedReducers, sagas as breedSagas } from './components/breed';

import { all, call } from 'redux-saga/effects';

import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

function* sagas() {
  yield all([
    call(breedSagas)
    // Add more here if needed.
  ])
}

export default function configureStore() {

  const reducers = combineReducers({
    breed: breedReducers
    // Add more here if needed.
  });

  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  let store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(sagaMiddleware)
    )
  );

  sagaMiddleware.run(sagas);

  return store;
}
