import { takeLatest, put, ForkEffect } from 'redux-saga/effects';
import { exampleAction, exampleSuccessAction, exampleErrorAction } from './slice';
import { http } from '~/services';
import { exception } from '~/helpers';

function* fetchData(): Generator {
    try {
        const data = yield http.get('/todos');
        yield put(exampleSuccessAction(data));
    } catch (error) {
        exception(error);
        yield put(exampleErrorAction);
    }
}

export function* exampleSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(exampleAction.type, fetchData);
}
