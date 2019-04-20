
import { createAction } from 'redux-actions';
import { handleActions } from 'redux-actions';
import { put, takeEvery, delay } from 'redux-saga/effects';

import { API_URL } from '../../config';

// ACTIONS

export const actions = {
  fetchAllBreeds: createAction("FETCH_ALL_BREEDS"),
  s_fetchAllBreeds: createAction("FETCH_ALL_BREEDS_SUCCESSFUL", breeds => breeds),

  searchBreedsByName: createAction("SEARCH_BREEDS_BY_NAME", search => search),
  s_searchBreedsByName: createAction("SEARCH_BREEDS_BY_NAME_SUCCESSFUL", searchResults => searchResults),

  fetchFailed: createAction("FETCH_FAILED", error => error),
  filterBreedsByOrigin: createAction("FILTER_BREEDS_BY_ORIGIN", filter => filter),

  clearFilter: createAction("CLEAR_FILTER"),
  clearSearch: createAction("CLEAR_SEARCH")
}

// SAGAS

function* sagaFetchBreeds(action) {
  try {
    let resp = yield fetch(`http://${API_URL}/breed`);
    let breeds = yield resp.json();
    yield put(actions.s_fetchAllBreeds({breeds}));
  }
  catch(e) {
    yield put(actions.fetchFailed({error: "Failed to fetch breeds"}));

    // Try again in 5 seconds...

    yield delay(1000 * 5);
    yield put(actions.fetchAllBreeds());
  }
}

function* sagaSearchBreeds(action) {
  try {
    let resp = yield fetch(`http://${API_URL}/breed/search/${action.payload.search}`)
    let searchResults = yield resp.json();
    yield put(actions.s_searchBreedsByName({searchResults}));
  }
  catch(e) {
    yield put(actions.fetchFailed({error: "Search failed, try again"}));
  }
}

export function* sagas() {
  yield takeEvery("FETCH_ALL_BREEDS", sagaFetchBreeds);
  yield takeEvery("SEARCH_BREEDS_BY_NAME", sagaSearchBreeds);
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
  [actions.searchBreedsByName]: (state, { payload }) => ({
    ...state,
    search: payload.search
  }),
  [actions.s_searchBreedsByName]: (state, { payload }) => ({
    ...state,
    searchResults: payload.searchResults,
    error: ""
  }),
  [actions.filterBreedsByOrigin]: (state, { payload }) => ({
    ...state,
    filter: payload.filter
  }),
  [actions.clearFilter]: (state, { payload }) => ({
    ...state,
    filter: ""
  }),
  [actions.clearSearch]: (state, { payload }) => ({
    ...state,
    search: "",
    searchResults: [],
    error: ""
  }),
}, {breeds: [], searchResults: [], filter: "", search: "", error: ""});
