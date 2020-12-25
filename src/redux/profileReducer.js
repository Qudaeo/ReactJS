import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
/*const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';*/
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';
const DEFAULT_STATUS = 'Press to enter your status'

let initialProfilePage = {
    posts: [
        {id: 1, message: 'Hey, how are you?', likesCount: 3},
        {id: 2, message: 'It\'s my first post!', likesCount: 10},
        {id: 3, message: 'yo yo yo', likesCount: 1},
        {id: 4, message: 'DADA', likesCount: 0}
    ],
    status: 'Press to enter your status'
}

const profileReducer = (state = initialProfilePage, action) => {
    switch (action.type) {
        case ADD_POST:
            let newMessageElement = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [newMessageElement, ...state.posts]
            }

        case  SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case  SET_PROFILE_STATUS:
            return {
                ...state,
                status: action.status
            }

        default:
            return state
    }
}

export const addPost = (newPostText) => ({type: ADD_POST, newPostText});
/*export const updatePostText = (newPostText) => ({type: UPDATE_POST_TEXT, newPostText});*/
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_PROFILE_STATUS, status});

export const getProfile = (userId) => (dispatch) => {
    profileAPI.getProfile(userId)
        .then(data => dispatch(setUserProfile(data)))
}

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(data => {
            !data && (data = DEFAULT_STATUS)
            dispatch(setStatus(data))
        })
}

export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.resultCode === 0)
            dispatch(setStatus(status))
    })
}


export default profileReducer