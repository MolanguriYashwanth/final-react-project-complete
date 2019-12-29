import * as actionTypes from "./actions";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData,
        username: username
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}
export const checkAuthTimeout = (expirationTime) => {
    let timeoutTime=3000;
    if(expirationTime==="24h"){
        timeoutTime =3000;
    }
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout());
    //     }, timeoutTime*1000)
    // }
    return {
        type:actionTypes.AUTH_CHECKOUT_TIMEOUT,
        expirationTime:timeoutTime
    }
}
export const logout = ()=>{
    //localStorage.removeItem('token');
    //localStorage.removeItem('expirationDate');
    //localStorage.removeItem('username');
    return {
        type:actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucced =() =>{
   return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isSignUp) => {
    return {
        type:actionTypes.AUTH_USER,
        email:email,
        password:password,
        isSignUp:isSignUp
    }
    // return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         "password": password,
    //         "username": email
    //     }
    //     let url = 'http://localhost:8085/authentication/login';
    //     if (!isSignUp) {
    //         axios.post(url, authData).then((response) => {
    //             let configObj = JSON.parse(response.config.data);
    //             //const expirationDate = new Date(new Date().getTime() + 60*100);
    //             localStorage.setItem('token',response.data.token);
    //             //localStorage.setItem('expirationDate',expirationDate);
    //             localStorage.setItem('username',configObj['username'])
    //             dispatch(authSuccess(response.data, configObj['username']))
    //             dispatch(checkAuthTimeout(response.data.expiresIn))
    //         }).catch((err) => {
    //             dispatch(authFailed(err))
    //         })
    //     }
    // }
}


export const setAuthRedirectPath = (path) => {
return{
    type:actionTypes.AUTH_REDIRECT_PATH,
    path:path
}
}


export const authCheckState = () =>{
    return {
        type:actionTypes.AUTH_CHECK_STATE
    }
    // return dispatch =>{
    //     const token = localStorage.getItem('token');
    //     //const expirationDate = localStorage.getItem('expirationDate');
    //     const userId = localStorage.getItem('username');
    //     if(!token){
    //         dispatch(logout());
    //     }else{
    //         dispatch(authSuccess({token:token},userId))
    //     }
    // }
}