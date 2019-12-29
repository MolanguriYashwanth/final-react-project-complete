import { put,call } from 'redux-saga/effects';
import delay from 'redux-saga';
import axios from "axios";
import * as actions from "../actions/index";
export function* logoutSaga(action) {
    yield call([localStorage,'removeItem'],"token")
    //yield localStorage.removeItem('token');
    yield localStorage.removeItem('username');
    yield put(actions.logoutSucced())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime);
    yield put(actions.logout())
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        "password": action.password,
        "username": action.email
    }
    let url = 'http://localhost:8085/authentication/login';
    if (!action.isSignUp) {
        try{
            const response = yield axios.post(url, authData)
            let configObj = JSON.parse(response.config.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', configObj['username'])
            yield put(actions.authSuccess(response.data, configObj['username']))
          //  yield put(actions.checkAuthTimeout(response.data.expiresIn))
        }
        catch(error){
            yield put(actions.authFailed(error))
        }
    }
}


export function* authCheckStateSaga(action){
    const token = localStorage.getItem('token');
    //const expirationDate = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('username');
    if(!token){
        yield put(actions.logout());
    }else{
        yield put(actions.authSuccess({token:token},userId))
    }
}