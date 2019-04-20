
import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';

import { API_URL } from '../../config';
import { actions as appActions } from './app';

export const actions = {
  searchBreedsByName: createAction("SEARCH_BREEDS_BY_NAME", search => search),
  s_searchBreedsByName: createAction("SEARCH_BREEDS_BY_NAME_SUCCESSFUL", searchResults => searchResults),
  clearSearch: createAction("CLEAR_SEARCH")
}

// SAGAS

function* sagaSearchBreeds(action) {
  try {
    let resp = yield fetch(`http://${API_URL}/breed/search/${action.payload.search}`)
    let searchResults = yield resp.json();
    yield put(actions.s_searchBreedsByName({searchResults}));
    yield put(appActions.clearError());
  }
  catch(e) {
    yield put(appActions.fetchError({error: "Search failed, try again"}));
  }
}

export function* sagas() {
  yield takeEvery("SEARCH_BREEDS_BY_NAME", sagaSearchBreeds);
}

// REDUCERS

export const reducers = handleActions({
  [actions.searchBreedsByName]: (state, { payload }) => ({
    ...state,
    search: payload.search
  }),
  [actions.s_searchBreedsByName]: (state, { payload }) => ({
    ...state,
    searchResults: payload.searchResults
  }),
  [actions.clearSearch]: (state, { payload }) => ({
    ...state,
    search: "",
    searchResults: []
  }),
}, { search: "", searchResults: [] });
