import {profileAPI} from "../api/api";

const ADD_POST = '/profile/ADD_POST';
const DELETE_POST = '/profile/DELETE_POST';
const SET_USER_PROFILE = '/profile/SET_USER_PROFILE';
const SET_PROFILE_STATUS = '/profile/SET_PROFILE_STATUS';

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
                posts: [...state.posts, newMessageElement]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => (post.id !== action.postId))
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

export const addPost = newPostText => ({type: ADD_POST, newPostText});
export const deletePost = postId => ({type: DELETE_POST, postId});
export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile});
export const setStatus = status => ({type: SET_PROFILE_STATUS, status});


export const getProfile = userId => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)

    dispatch(setUserProfile(response))
}

export const getStatus = userId => async dispatch => {
    let response = await profileAPI.getStatus(userId)

    !response && (response = DEFAULT_STATUS)
    dispatch(setStatus(response))

}

export const updateStatus = status => async dispatch => {
    const response = await profileAPI.updateStatus(status)

    if (response.resultCode === 0)
        dispatch(setStatus(status))
}

export default profileReducer