import { takeLatest, put, ForkEffect } from 'redux-saga/effects';
import { exampleAction, exampleSuccessAction, exampleErrorAction } from './slice';
import { http } from '~/services';
import { exception } from '~/helpers';

function* fetchData(action: ReturnType<typeof exampleAction>): Generator {
    try {
        const response: any = yield http.get(`/todos/${action.payload}`);
        yield put(exampleSuccessAction(response.data));
    } catch (error) {
        exception(error);
        yield put(exampleErrorAction);
    }
}

export function* exampleSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeLatest(exampleAction.type, fetchData);
}
