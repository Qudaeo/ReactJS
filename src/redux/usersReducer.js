import {userAPI} from "../api/api";

const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING_USERS = 'TOGGLE_IS_FETCHING_USERS';
const TOGGLE_FOLLOW_IN_PROCESSING = 'TOGGLE_FOLLOW_IN_PROCESSING';


let initialFriendsPage = {
    users: [],
    currentPage: 1,
    totalCount: 0,
    pageUsersSize: 5,
    isFetchingUsers: true,
    followingInProcessing: []
}

const usersReducer = (state = initialFriendsPage, action) => {
    switch (action.type) {
        case FOLLOW_SUCCESS:

            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId)
                        return {...u, followed: true}
                    else
                        return u
                })
            }

        case UNFOLLOW_SUCCESS:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId)
                        return {...u, followed: false}
                    else
                        return u
                })
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

const followSuccess = (userId) => ({type: FOLLOW_SUCCESS, userId});
const unfollowSuccess = (userId) => ({type: UNFOLLOW_SUCCESS, userId});
const setUsers = (users, totalUsersCount) => ({type: SET_USERS, users, totalUsersCount});
const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
const toggleIsFetchingUsers = (isFetchingUsers) => ({type: TOGGLE_IS_FETCHING_USERS, isFetchingUsers});
const toggleFollowInProcessing =
    (userId, isFetching) => ({type: TOGGLE_FOLLOW_IN_PROCESSING, userId, isFetching});

export const requestUsers = (pageUsersSize, currentPage) => (dispatch) => {
    dispatch(toggleIsFetchingUsers(true))
    dispatch(setCurrentPage(currentPage))

    userAPI.getUsers(pageUsersSize, currentPage).then(data => {
        dispatch(toggleIsFetchingUsers(false))
        dispatch(setUsers(data.items, data.totalCount))
    })
}

export const follow = (userId) => (dispatch) => {
    dispatch(toggleFollowInProcessing(userId, true))

    userAPI.setFollow(userId).then(data => {
        if (data.resultCode === 0) dispatch(followSuccess(userId))
        dispatch(toggleFollowInProcessing(userId, false))
    })
}

export const unfollow = (userId) => (dispatch) => {
    dispatch(toggleFollowInProcessing(userId, true))

    userAPI.setUnfollow(userId).then(data => {
        if (data.resultCode === 0) dispatch(unfollowSuccess(userId))
        dispatch(toggleFollowInProcessing(userId, false))
    })
}

export default usersReducer