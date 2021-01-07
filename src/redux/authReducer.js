import {authAPI} from "../api/api";
import {stopSubmit} from 'redux-form'

const SET_AUTH = '/auth/SET_AUTH';
const SET_CAPTCHA_URL = '/auth/SET_CAPTCHA_URL';


let initialAuthReducer = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null
}

const authReducer = (state = initialAuthReducer, action) => {
    switch (action.type) {
        case SET_AUTH:
        case SET_CAPTCHA_URL:
            return ({
                ...state,
                ...action.payload
            })

        default:
            return state
    }
}

const setAuthUserData = (id, email, login, isAuth, captchaURL) =>
    ({type: SET_AUTH, payload: {id, email, login, isAuth, captchaURL}});

const setCaptchaURL = captchaURL => ({type: SET_CAPTCHA_URL, payload: {captchaURL}});


export const getAuthMe = () => async dispatch => {
    const response = await authAPI.getMe()

    if (response.resultCode === 0) {
        let {id, email, login} = response.data
        dispatch(setAuthUserData(id, email, login, true, null))
    }
}

export const login = (email, password, rememberMe = false, captcha = '') => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.resultCode === 0) {
        dispatch(getAuthMe())
    } else {
        if (response.resultCode === 10) {
            const captchaResponse = await authAPI.getCaptchaURL()
            dispatch(setCaptchaURL(captchaResponse.url))
        }

        const errorMessage = response.messages ? response.messages[0] : "Unknown error"
        dispatch(stopSubmit("login", {_error: errorMessage}))
    }
}

export const logout = () => async dispatch => {
    const response = await authAPI.logOut()

    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false,null))
    }
}

export default authReducer