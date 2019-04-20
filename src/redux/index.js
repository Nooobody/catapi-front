
import { reducers as appReducers, sagas as appSagas } from './components/app';
import { reducers as breedReducers, sagas as breedSagas } from './components/breed';
import { reducers as searchReducers, sagas as searchSagas } from './components/search';

import { all, call } from 'redux-saga/effects';

import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

function* sagas() {
  yield all([
    call(appSagas),
    call(breedSagas),
    call(searchSagas)
    // Add more here if needed.
  ])
}

export default function configureStore() {

  const reducers = combineReducers({
    app: appReducers,
    breed: breedReducers,
    search: searchReducers
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
