import {authAPI} from "../api/api";
import {stopSubmit} from 'redux-form'
import {AuthType, initialAuth} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {RootStateType} from "./store";

const SET_AUTH = 'AUTH/SetAuth';
const SET_CAPTCHA_URL = 'AUTH/SetCaptchaUrl';

type SetAuthUserDataActionType = setAuthActionType | SetCaptchaUrlActionType

const authReducer = (state = initialAuth, action: SetAuthUserDataActionType): AuthType => {
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

type setAuthActionType = {
    type: typeof SET_AUTH
    payload: AuthType
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

type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, SetAuthUserDataActionType>

export const getAuthMe = (): ThunkType => async (dispatch) => {
    const response = await authAPI.getMe()

    if (response.resultCode === 0) {
        const {id, email, login} = response.data
        dispatch(setAuthUserData(id, email, login, true, null))
    }
}

export const login =
    (email: string, password: string, rememberMe = false, captcha = ''):ThunkType =>
        async (dispatch) => {
            const response = await authAPI.login(email, password, rememberMe, captcha)

            if (response.resultCode === 0) {
                dispatch(getAuthMe())
            } else {
                if (response.resultCode === 10) {
                    const captchaResponse = await authAPI.getCaptchaURL()
                    dispatch(setCaptchaURL(captchaResponse.url))
                }

                const errorMessage = response.messages ? response.messages[0] : "Unknown error"
// @ts-ignore
                dispatch(stopSubmit("login", {_error: errorMessage}))
            }
        }

export const logout = ():ThunkType => async (dispatch) => {
    const response = await authAPI.logOut()

    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null))
    }
}

export default authReducer