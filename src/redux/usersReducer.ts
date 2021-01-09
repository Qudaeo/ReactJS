import {userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelper";
import {PhotosType} from "../types/types";

const FOLLOW_SUCCESS = 'USER/FollowSuccess';
const UNFOLLOW_SUCCESS = 'USER/UnfollowSuccess';
const SET_USERS = 'USER/SetUsers';
const SET_CURRENT_PAGE = 'USER/SetCurrentPage';
const TOGGLE_IS_FETCHING_USERS = 'USER/ToggleIsFetchingUsers';
const TOGGLE_FOLLOW_IN_PROCESSING = 'USER/ToggleFollowInProcessing';

type UserType = {
    name: string
    id: number
    uniqueUrlName: null
    photos: PhotosType
    status: string
    followed: boolean
}

const initialFriendsPage = {
    users: [] as Array<UserType>,
    currentPage: 1,
    totalCount: 0,
    totalUsersCount: 0,
    pageUsersSize: 5,
    isFetchingUsers: true,
    followingInProcessing: [] as Array<number>
}

type InitialFriendsType = typeof initialFriendsPage

type ActionType = {
    type: typeof FOLLOW_SUCCESS |
        typeof UNFOLLOW_SUCCESS |
        typeof SET_USERS |
        typeof SET_CURRENT_PAGE |
        typeof TOGGLE_IS_FETCHING_USERS |
        typeof TOGGLE_FOLLOW_IN_PROCESSING
    userId: number
    users: Array<UserType>
    currentPage: number
    totalUsersCount: number
    isFetching: boolean
    isFetchingUsers: boolean
}

const usersReducer = (state = initialFriendsPage, action: ActionType): InitialFriendsType => {
    switch (action.type) {
        case FOLLOW_SUCCESS:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }

        case UNFOLLOW_SUCCESS:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }

        case SET_USERS:
            return {
                ...state,
                users: action.users,
                totalUsersCount: action.totalUsersCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case TOGGLE_IS_FETCHING_USERS:
            return {
                ...state,
                users: (action.isFetchingUsers) ? [] : state.users,
                isFetchingUsers: action.isFetchingUsers
            }
        case TOGGLE_FOLLOW_IN_PROCESSING:
            return {
                ...state,
                followingInProcessing: action.isFetching
                    ? [...state.followingInProcessing, action.userId]
                    : state.followingInProcessing.filter(id => (id !== action.userId))
            }

        default:
            return state
    }
}

type FollowingActionType = {
    type: typeof FOLLOW_SUCCESS
    userId: number
}
const followSuccess = (userId: number): FollowingActionType => ({type: FOLLOW_SUCCESS, userId});

type UnfollowingActionType = {
    type: typeof UNFOLLOW_SUCCESS
    userId: number
}
const unfollowSuccess = (userId: number): UnfollowingActionType => ({type: UNFOLLOW_SUCCESS, userId});

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
    totalUsersCount: number
}
const setUsers = (users: Array<UserType>, totalUsersCount: number): SetUsersActionType =>
    ({type: SET_USERS, users, totalUsersCount});

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});

type ToggleIsFetchingUsersType = {
    type: typeof TOGGLE_IS_FETCHING_USERS
    isFetchingUsers: boolean
}
const toggleIsFetchingUsers = (isFetchingUsers: boolean):ToggleIsFetchingUsersType =>
    ({type: TOGGLE_IS_FETCHING_USERS, isFetchingUsers});

type toggleFollowInProcessingActionType = {
    type: typeof TOGGLE_FOLLOW_IN_PROCESSING
    userId: number
    isFetching: boolean
}
const toggleFollowInProcessing = (userId: number, isFetching: boolean):toggleFollowInProcessingActionType => ({
    type: TOGGLE_FOLLOW_IN_PROCESSING, userId, isFetching
});

export const requestUsers = (pageUsersSize: number, currentPage: number) => async (dispatch: Function) => {
    dispatch(toggleIsFetchingUsers(true))
    dispatch(setCurrentPage(currentPage))

    const response = await userAPI.getUsers(pageUsersSize, currentPage)

    dispatch(toggleIsFetchingUsers(false))
    dispatch(setUsers(response.items, response.totalCount))
}

const followUnfollowFlow = async (dispatch: Function, methodAPI: Function, actionCreator: Function, userId: number) => {
    dispatch(toggleFollowInProcessing(userId, true))

    const response = await methodAPI(userId)

    if (response.resultCode === 0)
        dispatch(actionCreator(userId))

    dispatch(toggleFollowInProcessing(userId, false))
}

export const follow = (userId: number) => (dispatch: Function) => {
    followUnfollowFlow(dispatch, userAPI.setFollow, followSuccess, userId)
}

export const unfollow = (userId: number) => (dispatch: Function) => {
    followUnfollowFlow(dispatch, userAPI.setUnfollow, unfollowSuccess, userId)
}

export default usersReducer