/*import { createSelector } from "reselect"*/
import {RootStateType} from "./store"

export const getUsers = (state: RootStateType) => state.usersPage.users
/*export const getUsers2 = createSelector(getUsers,
    (users)=> users.filter(u=>true))*/

export const getCurrentPage = (state: RootStateType) => state.usersPage.currentPage
export const getTotalUsersCount = (state: RootStateType) => state.usersPage.totalUsersCount
export const getPageUsersSize = (state: RootStateType) => state.usersPage.pageUsersSize
export const getIsFetchingUsers = (state: RootStateType) => state.usersPage.isFetchingUsers
export const getFollowingInProcessing = (state: RootStateType) => state.usersPage.followingInProcessing