import {authAPI} from "../api/api";
import {stopSubmit} from 'redux-form'

const SET_AUTH = 'AUTH/SetAuth';
const SET_CAPTCHA_URL = 'AUTH/SetCaptchaUrl';

const initialAuthReducer = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
}

type InitialAuthType = typeof initialAuthReducer

type SetAuthUserDataActionType = {
    type: typeof SET_AUTH | typeof SET_CAPTCHA_URL
    payload: InitialAuthType
}

const authReducer = (state = initialAuthReducer, action: SetAuthUserDataActionType): InitialAuthType => {
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

const setAuthUserData =
    (id: null | number, email: null | string, login: null | string,
     isAuth: boolean, captchaURL: null | string): SetAuthUserDataActionType =>
        ({type: SET_AUTH, payload: {id, email, login, isAuth, captchaURL}});

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    payload: { captchaURL: string }
}
const setCaptchaURL = (captchaURL: string): SetCaptchaUrlActionType => ({type: SET_CAPTCHA_URL, payload: {captchaURL}});

export const getAuthMe = () => async (dispatch: Function) => {
    const response = await authAPI.getMe()

    if (response.resultCode === 0) {
        let {id, email, login} = response.data
        dispatch(setAuthUserData(id, email, login, true, null))
    }
}

export const login =
    (email: string, password: string, rememberMe = false, captcha = '') =>
        async (dispatch: Function) => {
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

export const logout = () => async (dispatch: Function) => {
    const response = await authAPI.logOut()

    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null))
    }
}

export default authReducer