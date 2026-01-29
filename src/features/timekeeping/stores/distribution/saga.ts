import { type SagaIterator } from 'redux-saga';
import { all } from 'redux-saga/effects';

export default function* saga(): SagaIterator {
  yield all([]);
}
