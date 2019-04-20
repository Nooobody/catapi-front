
import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery, delay } from 'redux-saga/effects';

import { API_URL } from '../../config';

import { actions as appActions } from './app';

// ACTIONS

export const actions = {
  fetchAllBreeds: createAction("FETCH_ALL_BREEDS"),
  s_fetchAllBreeds: createAction("FETCH_ALL_BREEDS_SUCCESSFUL", breeds => breeds),

  addFilter: createAction("ADD_FILTER", filter => filter),
  removeFilter: createAction("REMOVE_FILTER", filter => filter),
  clearFilters: createAction("CLEAR_FILTERS"),
}

// SAGAS

function* sagaFetchBreeds(action) {
  try {
    let resp = yield fetch(`http://${API_URL}/breed`);
    let breeds = yield resp.json();
    yield put(actions.s_fetchAllBreeds({breeds}));
    yield put(appActions.clearError());
    yield put(appActions.setLoading({loading: false}));
  }
  catch(e) {
    yield put(appActions.fetchError({error: "Failed to fetch breeds"}));

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
  [actions.addFilter]: (state, { payload }) => ({
    ...state,
    filters: state.filters.concat([payload.filter])
  }),
  [actions.removeFilter]: (state, { payload }) => ({
    ...state,
    filters: state.filters.slice().filter(fil => fil !== payload.filter)
  }),
  [actions.clearFilters]: (state, { payload }) => ({
    ...state,
    filters: []
  }),
}, {breeds: [], filters: [], error: ""});
