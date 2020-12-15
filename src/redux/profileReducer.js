import {userAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialProfilePage = {
    profile: null,
    posts: [
        {id: 1, message: 'Hey, how are you?', likesCount: 3},
        {id: 2, message: 'It\'s my first post!', likesCount: 10},
        {id: 3, message: 'yo yo yo', likesCount: 1},
        {id: 4, message: 'DADA', likesCount: 0}
    ],
    newPostText: ''
}

const profileReducer = (state = initialProfilePage, action) => {
    switch (action.type) {
        case ADD_POST:
            let newMessageElement = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [newMessageElement, ...state.posts],
                newPostText: ''
            }

        case UPDATE_POST_TEXT:
            return {
                ...state,
                newPostText: action.newPostText
            }

        case  SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        default:
            return state
    }
}

export const addPost = () => ({type: ADD_POST});
export const updatePostText = (newPostText) => ({type: UPDATE_POST_TEXT, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

export const getProfile = (userId) => (dispatch) => {
    userAPI.getProfile(userId)
        .then(data => dispatch(setUserProfile(data)))
}

export default profileReducer