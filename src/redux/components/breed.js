
import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery, delay } from 'redux-saga/effects';

import { API_URL } from '../../config';

import { actions as appActions } from './app';

// ACTIONS

export const actions = {
  fetchAllBreeds: createAction("FETCH_ALL_BREEDS"),
  s_fetchAllBreeds: createAction("FETCH_ALL_BREEDS_SUCCESSFUL", breeds => breeds),

  filterBreedsByOrigin: createAction("FILTER_BREEDS_BY_ORIGIN", filter => filter),
  clearFilter: createAction("CLEAR_FILTER"),
}

// SAGAS

function* sagaFetchBreeds(action) {
  try {
    let resp = yield fetch(`http://${API_URL}/breed`);
    let breeds = yield resp.json();
    yield put(actions.s_fetchAllBreeds({breeds}));
  }
  catch(e) {
    yield put(appActions.fetchFailed({error: "Failed to fetch breeds"}));

    // Try again in 5 seconds...
    yield delay(1000 * 5);
    yield put(actions.fetchAllBreeds());
  }
}

export function* sagas() {
  yield takeEvery("FETCH_ALL_BREEDS", sagaFetchBreeds);
}

// REDUCERS

export const reducers = handleActions({
  [actions.s_fetchAllBreeds]: (state, { payload }) => ({
    ...state,
    breeds: payload.breeds,
    error: ""
  }),
  [actions.fetchFailed]: (state, { payload }) => ({
    ...state,
    error: payload.error
  }),
  [actions.filterBreedsByOrigin]: (state, { payload }) => ({
    ...state,
    filter: payload.filter
  }),
  [actions.clearFilter]: (state, { payload }) => ({
    ...state,
    filter: ""
  }),
}, {breeds: [], filter: "", error: ""});
