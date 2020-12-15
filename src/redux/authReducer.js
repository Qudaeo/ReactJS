import {userAPI} from "../api/api";
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
    userAPI.getAuthMe().then(
        data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login))

                userAPI.getProfile(id).then(data => {
                    dispatch(setUserProfile(data))
                })

            } else alert('Error')
        })
}

export default authReducer