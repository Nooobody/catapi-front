
import { createAction, handleActions } from 'redux-actions';
import { put, takeEvery } from 'redux-saga/effects';
import { actions as breedActions } from './breed';

export const actions = {
  init: createAction("INIT"),
  fetchError: createAction("FETCH_FAILED", error => error),
  clearError: createAction("CLEAR_ERROR"),
  setLoading: createAction("SET_LOADING", loading => loading)
}

// SAGAS

function* sagaInit() {
  yield put(actions.setLoading({loading: true}));
  yield put(breedActions.fetchAllBreeds());
}

export function* sagas() {
  yield takeEvery("INIT", sagaInit);
}

// REDUCERS

export const reducers = handleActions({
  [actions.fetchError]: (state, { payload }) => ({
    ...state, error: payload.error
  }),
  [actions.clearError]: (state) => ({
    ...state, error: ""
  }),
  [actions.setLoading]: (state, { payload }) => ({
    ...state, loading: payload.loading
  })
}, { error: "", loading: false })
