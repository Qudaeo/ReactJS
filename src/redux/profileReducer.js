import {profileAPI} from "../api/api";

const ADD_POST = '/profile/ADD_POST';
const DELETE_POST = '/profile/DELETE_POST';
const SET_USER_PROFILE = '/profile/SET_USER_PROFILE';
const SET_PROFILE_STATUS = '/profile/SET_PROFILE_STATUS';
const UPLOAD_PHOTO_SUCCESS = '/profile/UPLOAD_PHOTO_SUCCESS';

let initialProfilePage = {
    posts: [
        {id: 1, message: 'Hey, how are you?', likesCount: 3},
        {id: 2, message: 'It\'s my first post!', likesCount: 10},
        {id: 3, message: 'yo yo yo', likesCount: 1},
        {id: 4, message: 'DADA', likesCount: 0}
    ],
    status: ''
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
        case UPLOAD_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                }
            }

        default:
            return state
    }
}

export const addPost = newPostText => ({type: ADD_POST, newPostText});
export const deletePost = postId => ({type: DELETE_POST, postId});
export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile});
export const setStatus = status => ({type: SET_PROFILE_STATUS, status});
export const uploadPhotoSuccess = photos => ({type: UPLOAD_PHOTO_SUCCESS, photos});


export const getProfile = userId => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)

    dispatch(setUserProfile(response))
}

export const getStatus = userId => async dispatch => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response))
}

export const updateStatus = status => async dispatch => {
    const response = await profileAPI.updateStatus(status)

    if (response.resultCode === 0)
        dispatch(setStatus(status))
}

export const saveAvatarPhoto = photoFile => async dispatch => {
    const response = await profileAPI.uploadAvatarPhoto(photoFile)

    if (response.resultCode === 0) {
        dispatch(uploadPhotoSuccess(response.data.photos))
    }
}

export const saveProfileData = profile => async (dispatch, getState) => {
    const response = await profileAPI.putProfileData(profile)

    if (response.resultCode === 0) {
        let userId = getState().auth.id
        dispatch(getProfile(userId))
    }
}

export default profileReducer