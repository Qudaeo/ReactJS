export const getUsers = (state) => {
    return state.usersPage.users
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const getPageUsersSize = (state) => {
    return state.usersPage.pageUsersSize
}

export const getIsFetchingUsers = (state) => {
    return state.usersPage.isFetchingUsers
}

export const getFollowingInProcessing = (state) => {
    return state.usersPage.followingInProcessing
}