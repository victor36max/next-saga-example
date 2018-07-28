import { createActions, handleActions } from 'redux-actions';

const defaultState = { error: null, data: null, isLoading: false };

export const { fetchApodStart, fetchApodSuccess, fetchApodFail } = createActions({
  FETCH_APOD_START: date => ({ date }),
  FETCH_APOD_SUCCESS: apod => ({ apod }),
  FETCH_APOD_FAIL: error => ({ error }),
});

export const reducer = handleActions(
  {
    [fetchApodStart]: state => ({ ...state, error: null, isLoading: true }),
    [fetchApodSuccess]: (state, { payload: { apod } }) => ({
      error: null,
      isLoading: false,
      data: apod,
    }),
    [fetchApodFail]: (state, { payload: { error } }) => ({ error, isLoading: false, data: [] }),
  },
  defaultState,
);
