import {userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelper";

const FOLLOW_SUCCESS = '/user/FOLLOW_SUCCESS';
const UNFOLLOW_SUCCESS = '/user/UNFOLLOW_SUCCESS';
const SET_USERS = '/user/SET_USERS';
const SET_CURRENT_PAGE = '/user/SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING_USERS = '/user/TOGGLE_IS_FETCHING_USERS';
const TOGGLE_FOLLOW_IN_PROCESSING = '/user/TOGGLE_FOLLOW_IN_PROCESSING';


let initialFriendsPage = {
    users: [],
    currentPage: 1,
    totalCount: 0,
    pageUsersSize: 5,
    isFetchingUsers: true,
    followingInProcessing: []
}


const usersReducer = (state = initialFriendsPage, action) => {
    /*
    const followUnfollowSuccess = followOrUnfollow => ({
            ...state,
            user: updateObjectInArray(state.users, action.userId, "id", {followed: followOrUnfollow})
                    users: state.users.map(u => {
                        if (u.id === action.userId)
                            return {...u, followed: followOrUnfollow}
                        else
                            return u
        })

        }
    )

 */

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

const followSuccess = userId => ({type: FOLLOW_SUCCESS, userId});
const unfollowSuccess = userId => ({type: UNFOLLOW_SUCCESS, userId});
const setUsers = (users, totalUsersCount) => ({type: SET_USERS, users, totalUsersCount});
const setCurrentPage = currentPage => ({type: SET_CURRENT_PAGE, currentPage});
const toggleIsFetchingUsers = isFetchingUsers => ({
    type: TOGGLE_IS_FETCHING_USERS, isFetchingUsers
});
const toggleFollowInProcessing = (userId, isFetching) => ({
    type: TOGGLE_FOLLOW_IN_PROCESSING, userId, isFetching
});

export const requestUsers = (pageUsersSize, currentPage) => async dispatch => {
    dispatch(toggleIsFetchingUsers(true))
    dispatch(setCurrentPage(currentPage))

    const response = await userAPI.getUsers(pageUsersSize, currentPage)

    dispatch(toggleIsFetchingUsers(false))
    dispatch(setUsers(response.items, response.totalCount))
}

const followUnfollowFlow = async (dispatch, methodAPI, actionCreator, userId) => {
    dispatch(toggleFollowInProcessing(userId, true))

    const response = await methodAPI(userId)

    if (response.resultCode === 0)
        dispatch(actionCreator(userId))

    dispatch(toggleFollowInProcessing(userId, false))
}

export const follow = userId => dispatch => {
    followUnfollowFlow(dispatch, userAPI.setFollow, followSuccess, userId)
}

export const unfollow = userId => dispatch => {
    followUnfollowFlow(dispatch, userAPI.setUnfollow, unfollowSuccess, userId)
}

export default usersReducer