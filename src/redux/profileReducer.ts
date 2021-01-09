import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import { PhotosType } from "../types/types";

const ADD_POST = 'PROFILE/AddPost';
const DELETE_POST = 'PROFILE/DeletePost';
const SET_USER_PROFILE = 'PROFILE/SetUserProfile';
const SET_PROFILE_STATUS = 'PROFILE/SetProfileStatus';
const UPLOAD_PHOTO_SUCCESS = 'PROFILE/UploadPhotoSuccess';

type PostType = {
    id: number
    message: string
    likesCount: number
}

type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string | null
    userId: number
    photos: PhotosType
}

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

type ActionType = {
    type: typeof ADD_POST |
        typeof DELETE_POST |
        typeof SET_USER_PROFILE |
        typeof SET_PROFILE_STATUS |
        typeof UPLOAD_PHOTO_SUCCESS
    newPostText: string
    profile: ProfileType
    postId: number
    status: string
    photos: PhotosType
}

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


export const getProfile = (userId: number) => async (dispatch: Function) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response))
}

export const getStatus = (userId: number) => async (dispatch: Function) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response))
}

export const updateStatus = (status: string) => async (dispatch: Function) => {
    const response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0)
        dispatch(setStatus(status))
}

export const saveAvatarPhoto = (photoFile: any) => async (dispatch: Function) => {
    const response = await profileAPI.uploadAvatarPhoto(photoFile)
    if (response.resultCode === 0)
        dispatch(uploadPhotoSuccess(response.data.photos))
}

export const saveProfileData = (profile: ProfileType) => async (dispatch: Function, getState: Function) => {
    const response = await profileAPI.putProfileData(profile)

    if (response.resultCode === 0) {
        const userId = getState().auth.id
        dispatch(getProfile(userId))
    } else {
        const errorMessage = response.messages[0]
        const posBegin = errorMessage.indexOf('(Contacts->', 1)
        const errorFieldName = errorMessage.slice(posBegin + 11, -1).toLowerCase()

        dispatch(stopSubmit("editProfile", {"contacts": {[errorFieldName]: errorMessage}}))

        return Promise.reject(errorMessage)
    }
}

export default profileReducer