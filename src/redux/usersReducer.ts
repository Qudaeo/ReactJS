import {userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objectHelper";
import {UserType} from "../types/types";
import {InferActionsType, RootStateType} from "./store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";

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

const usersReducer = (state = initialFriendsPage, action: ActionType): InitialFriendsType => {
    switch (action.type) {
        case 'USER/FollowSuccess':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }

        case 'USER/UnfollowSuccess':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }

        case 'USER/SetUsers':
            return {
                ...state,
                users: action.users,
                totalUsersCount: action.totalUsersCount
            }
        case 'USER/SetCurrentPage':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'USER/ToggleIsFetchingUsers':
            return {
                ...state,
                users: (action.isFetchingUsers) ? [] : state.users,
                isFetchingUsers: action.isFetchingUsers
            }
        case 'USER/ToggleFollowInProcessing':
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

const action = {
    followSuccess: (userId: number) => ({type: 'USER/FollowSuccess', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'USER/UnfollowSuccess', userId} as const),
    setUsers: (users: Array<UserType>, totalUsersCount: number) =>
        ({type: 'USER/SetUsers', users, totalUsersCount} as const),
    setCurrentPage: (currentPage: number) => ({type: 'USER/SetCurrentPage', currentPage} as const),
    toggleIsFetchingUsers: (isFetchingUsers: boolean) =>
        ({type: 'USER/ToggleIsFetchingUsers', isFetchingUsers}) as const,
    toggleFollowInProcessing: (userId: number, isFetching: boolean) => ({
        type: 'USER/ToggleFollowInProcessing', userId, isFetching
    } as const)
}

type ActionType = InferActionsType<typeof action>

type DispatchType = Dispatch<ActionType>
type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionType>

export const requestUsers = (currentPage: number, pageUsersSize: number): ThunkType =>
    async (dispatch) => {
        dispatch(action.toggleIsFetchingUsers(true))
        dispatch(action.setCurrentPage(currentPage))

        const response = await userAPI.getUsers(currentPage, pageUsersSize)

        dispatch(action.toggleIsFetchingUsers(false))
        dispatch(action.setUsers(response.items, response.totalCount))
    }

const followUnfollowFlow = async (dispatch: DispatchType, methodAPI: any,
                                  actionCreator: (userId: number) => ActionType,
                                  userId: number) => {
    dispatch(action.toggleFollowInProcessing(userId, true))

    const response = await methodAPI(userId)

    if (response.resultCode === 0)
        dispatch(actionCreator(userId))

    dispatch(action.toggleFollowInProcessing(userId, false))
}

export const follow = (userId: number): ThunkType => (dispatch) => {
    return followUnfollowFlow(dispatch, userAPI.setFollow, action.followSuccess, userId)
}

export const unfollow = (userId: number): ThunkType => (dispatch) => {
    return followUnfollowFlow(dispatch, userAPI.setUnfollow, action.unfollowSuccess, userId)
}

export default usersReducer