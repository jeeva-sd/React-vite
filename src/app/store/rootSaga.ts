// sagas.ts
import { AllEffect, ForkEffect, all, fork } from 'redux-saga/effects';
import { exampleSaga } from './example/saga';

export function* rootSaga(): Generator<AllEffect<ForkEffect<unknown>>, void, unknown> {
    yield all([fork(exampleSaga)]);
}