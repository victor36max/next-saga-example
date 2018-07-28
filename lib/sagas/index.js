import { all } from 'redux-saga/effects';
import { watchFetchApod } from './apod';

export default function* rootSaga() {
  try {
    yield all([
      watchFetchApod(),
    ]);
  } catch (err) {
    console.log(err);
  }
}
