import * as actionTypes from '../actions/actions';
import { updateObject } from "../utility";
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath:'/'
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, { loading: true, error: null })
        case actionTypes.AUTH_SUCCESS:
            console.log("Hi Sai",action.authData);
            return updateObject(state, {
                token: action.authData.token,
                error: null,
                userId: action.username,
                loading: false
            })
        case actionTypes.AUTH_FAILED:
            return updateObject(state, { error: action.error, loading: false })
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state,{token:null,userId:null})  
        case actionTypes.AUTH_REDIRECT_PATH:
            return updateObject(state,{authRedirectPath:action.path})      
        default:
            return state;
    }

}

export default reducer;