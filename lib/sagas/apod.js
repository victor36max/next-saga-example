import { take, put, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchApodStart,
  fetchApodSuccess,
  fetchApodFail,
} from '../reducers/apod';

// Make exception for process.env
/* eslint-disable no-undef */
const nasaApiKey = process.env.NASA_API_KEY;
/* eslint-enable */

export function* fetchApod(date) {
  const url = 'https://api.nasa.gov/planetary/apod';
  const params = {
    api_key: nasaApiKey,
    date,
  };

  try {
    const { data: apod } = yield call([axios, 'get'], url, { params });
    yield put(fetchApodSuccess(apod));
  } catch (error) {
    yield put(fetchApodFail(error));
  }
}

export function* watchFetchApod() {
  while (true) {
    const { payload: { date } } = yield take(fetchApodStart);
    yield call(fetchApod, date);
  }
}
