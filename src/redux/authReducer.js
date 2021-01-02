import {authAPI} from "../api/api";
import {stopSubmit} from 'redux-form'

const SET_AUTH = '/auth/SET_AUTH';

let initialAuthReducer = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialAuthReducer, action) => {
    switch (action.type) {
        case SET_AUTH:

            return ({
                ...state,
                ...action.payload
            })

        default:
            return state
    }
}

const setAuthUserData = (id, email, login, isAuth) =>
    ({type: SET_AUTH, payload: {id, email, login, isAuth}});

export const getAuthMe = () => async dispatch => {
    const response = await authAPI.getMe()

    if (response.resultCode === 0) {
        let {id, email, login} = response.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email, password, rememberMe = false) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe)

    if (response.resultCode === 0) {
        dispatch(getAuthMe())
    } else {
        let errorMessage = response.messages ? response.messages[0] : "Unknown error"
        dispatch(stopSubmit("login", {_error: errorMessage}))
    }
}

export const logout = () => async dispatch => {
    const response = await authAPI.logOut()

    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer