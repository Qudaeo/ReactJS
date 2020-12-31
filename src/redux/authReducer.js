import {authAPI} from "../api/api";
import {stopSubmit} from 'redux-form'

const SET_AUTH = 'SET_AUTH';

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

export const getAuthMe = () => (dispatch) => {
    authAPI.getMe().then(
        data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
}

export const login = (email, password, rememberMe = false) => (dispatch) => {
    authAPI.login(email, password, rememberMe).then(
        data => {
            if (data.resultCode === 0) {
                dispatch(getAuthMe())
            } else {
                let errorMessage = data.messages ? data.messages[0] : "Unknown error"
                dispatch(stopSubmit("login", {_error: errorMessage}))
            }
        }
    )
}

export const logOut = () => (dispatch) => {
    authAPI.logOut().then(
        data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        }
    )
}

export default authReducer