import {userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelper";

const FOLLOW_SUCCESS = 'USER/FollowSuccess';
const UNFOLLOW_SUCCESS = 'USER/UnfollowSuccess';
const SET_USERS = 'USER/SetUsers';
const SET_CURRENT_PAGE = 'USER/SetCurrentPage';
const TOGGLE_IS_FETCHING_USERS = 'USER/ToggleIsFetchingUsers';
const TOGGLE_FOLLOW_IN_PROCESSING = 'USER/ToggleFollowInProcessing';

type InitialFriendsType = {
    users: Object
    currentPage: number
    totalCount: number
    totalUsersCount: number
    pageUsersSize: number
    isFetchingUsers: boolean
    followingInProcessing: Array<number>
}

const initialFriendsPage: InitialFriendsType = {
    users: [],
    currentPage: 1,
    totalCount: 0,
    totalUsersCount: 0,
    pageUsersSize: 5,
    isFetchingUsers: true,
    followingInProcessing: []
}

type ActionType = {
    type: typeof FOLLOW_SUCCESS |
        typeof UNFOLLOW_SUCCESS |
        typeof SET_USERS |
        typeof SET_CURRENT_PAGE |
        typeof TOGGLE_IS_FETCHING_USERS |
        typeof TOGGLE_FOLLOW_IN_PROCESSING
    userId: number
    users: Object
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

const followSuccess = (userId: number) => ({type: FOLLOW_SUCCESS, userId});
const unfollowSuccess = (userId: number) => ({type: UNFOLLOW_SUCCESS, userId});
const setUsers = (users: Object, totalUsersCount: number) => ({type: SET_USERS, users, totalUsersCount});
const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage});
const toggleIsFetchingUsers = (isFetchingUsers: boolean) => ({
    type: TOGGLE_IS_FETCHING_USERS, isFetchingUsers
});
const toggleFollowInProcessing = (userId: number, isFetching: boolean) => ({
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