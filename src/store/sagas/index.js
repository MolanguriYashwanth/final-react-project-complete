import {takeEvery,all } from 'redux-saga/effects'
import * as actionTypes from "../actions/actions";

import {logoutSaga,checkAuthTimeoutSaga,authUserSaga,authCheckStateSaga} from './auth';


export function* watchAuth() {
    // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    // yield takeEvery(actionTypes.AUTH_CHECKOUT_TIMEOUT, checkAuthTimeoutSaga);
    // yield takeEvery(actionTypes.AUTH_USER,authUserSaga)
    // yield takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckStateSaga)

    yield all([
         takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
         takeEvery(actionTypes.AUTH_CHECKOUT_TIMEOUT, checkAuthTimeoutSaga),
         takeEvery(actionTypes.AUTH_USER,authUserSaga),
         takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckStateSaga)
    ])

  }
 