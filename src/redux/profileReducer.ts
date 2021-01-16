import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {RootStateType} from "./store";

const ADD_POST = 'PROFILE/AddPost';
const DELETE_POST = 'PROFILE/DeletePost';
const SET_USER_PROFILE = 'PROFILE/SetUserProfile';
const SET_PROFILE_STATUS = 'PROFILE/SetProfileStatus';
const UPLOAD_PHOTO_SUCCESS = 'PROFILE/UploadPhotoSuccess';

const initialProfilePage = {
    posts: [
        {id: 1, message: 'Hey, how are you?', likesCount: 3},
        {id: 2, message: 'It\'s my first post!', likesCount: 10},
        {id: 3, message: 'yo yo yo', likesCount: 1},
        {id: 4, message: 'DADA', likesCount: 0}
    ] as Array<PostType>,
    status: '',
    profile: null as ProfileType | null
}

type  InitialProfileType = typeof initialProfilePage

type ActionType = AddPostActionType | DeletePostActionType | SetUserProfileActionType |
    setStatusActionType | UploadPhotoSuccessActionType

const profileReducer = (state = initialProfilePage, action: ActionType): InitialProfileType => {
    switch (action.type) {
        case ADD_POST:
            const newMessageElement: PostType = {
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
                } as ProfileType
            }

        default:
            return state
    }
}

type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPost = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText});

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type setStatusActionType = {
    type: typeof SET_PROFILE_STATUS
    status: string
}
export const setStatus = (status: string): setStatusActionType => ({type: SET_PROFILE_STATUS, status});

type UploadPhotoSuccessActionType = {
    type: typeof UPLOAD_PHOTO_SUCCESS
    photos: PhotosType
}
export const uploadPhotoSuccess = (photos: PhotosType): UploadPhotoSuccessActionType => ({
    type: UPLOAD_PHOTO_SUCCESS,
    photos
});

type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionType>

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0)
        dispatch(setStatus(status))
}

export const saveAvatarPhoto = (photoFile: any): ThunkType => async (dispatch) => {
    const response = await profileAPI.uploadAvatarPhoto(photoFile)
    if (response.resultCode === 0)
        dispatch(uploadPhotoSuccess(response.data.photos))
}

export const saveProfileData = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const response = await profileAPI.putProfileData(profile)

    if (response.resultCode === 0) {
        const userId = getState().auth.id
        userId && await dispatch(getProfile(userId))
    } else {
        const errorMessage = response.messages[0]
        const posBegin = errorMessage.indexOf('(Contacts->', 1)
        const errorFieldName = errorMessage.slice(posBegin + 11, -1).toLowerCase()

// @ts-ignore
        dispatch(stopSubmit("editProfile", {"contacts": {[errorFieldName]: errorMessage}}))

        return Promise.reject(errorMessage)
    }
}

export default profileReducer