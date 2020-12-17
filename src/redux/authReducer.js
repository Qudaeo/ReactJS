import {authAPI, profileAPI} from "../api/api";
import {setUserProfile} from "./profileReducer";

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
                ...action.authData,
                isAuth: true
            })

        default:
            return state
    }
}

const setAuthUserData = (id, email, login) => ({type: SET_AUTH, authData: {id, email, login}});

export const getAuthMe = () => (dispatch) => {
    authAPI.getMe().then(
        data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login))

                profileAPI.getProfile(id).then(data => {
                    dispatch(setUserProfile(data))
                })
            }
        })
}

export default authReducer