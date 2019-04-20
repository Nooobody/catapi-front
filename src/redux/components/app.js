
import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import { actions as breedActions } from './breed';

export const actions = {
  init: createAction("INIT"),
  fetchError: createAction("FETCH_FAILED", error => error)
}

// SAGAS

function* sagaInit() {
  yield put(breedActions.fetchAllBreeds());
}

export function* sagas() {
  yield takeEvery("INIT", sagaInit);
}

// REDUCERS

export const reducers = handleActions({
  [actions.fetchError]: (state, { payload }) => ({
    ...state, error: payload.error
  })
}, { error: "" })
